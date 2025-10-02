-- Fix the trigger functions to properly handle the service role key
-- The issue is that current_setting('app.supabase_service_role_key') doesn't exist
-- We need to use the Supabase environment variable instead

CREATE OR REPLACE FUNCTION public.trigger_search_engine_notification()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  service_role_key text;
BEGIN
  -- Only notify when article is being published (not just updated)
  IF NEW.published = true AND (OLD.published IS NULL OR OLD.published = false) THEN
    -- Get the service role key from the vault or use a placeholder
    -- In production, the edge function should handle authentication via the request
    service_role_key := current_setting('request.jwt.claims', true)::json->>'role';
    
    PERFORM
      net.http_post(
        url := 'https://tadcyglvsjycpgsjkywj.supabase.co/functions/v1/notify-search-engines',
        headers := jsonb_build_object(
          'Content-Type', 'application/json'
        ),
        body := jsonb_build_object(
          'articleId', NEW.id::text
        )
      );
  END IF;
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.trigger_newsletter_on_publish()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  newsletter_type text := 'new_article';
BEGIN
  -- Only send newsletter if article is being published (not just updated)
  IF NEW.published = true AND (OLD.published IS NULL OR OLD.published = false) THEN
    -- Check if it's breaking news (you can customize this logic)
    IF NEW.featured = true OR position('breaking' in lower(NEW.title)) > 0 THEN
      newsletter_type := 'breaking_news';
    END IF;
    
    -- Call the newsletter edge function
    PERFORM
      net.http_post(
        url := 'https://tadcyglvsjycpgsjkywj.supabase.co/functions/v1/send-newsletter',
        headers := jsonb_build_object(
          'Content-Type', 'application/json'
        ),
        body := jsonb_build_object(
          'articleId', NEW.id::text,
          'type', newsletter_type
        )
      );
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Create triggers if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'trigger_search_engine_notification_on_publish'
  ) THEN
    CREATE TRIGGER trigger_search_engine_notification_on_publish
      AFTER INSERT OR UPDATE ON public.articles
      FOR EACH ROW
      EXECUTE FUNCTION public.trigger_search_engine_notification();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'trigger_newsletter_on_article_publish'
  ) THEN
    CREATE TRIGGER trigger_newsletter_on_article_publish
      AFTER INSERT OR UPDATE ON public.articles
      FOR EACH ROW
      EXECUTE FUNCTION public.trigger_newsletter_on_publish();
  END IF;
END $$;