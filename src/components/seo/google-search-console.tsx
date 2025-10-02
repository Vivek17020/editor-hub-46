import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Search, Copy, CheckCircle, ExternalLink, Globe, RefreshCw } from 'lucide-react';

interface SiteSettings {
  google_verification_code?: string;
  indexnow_key?: string;
}

export function GoogleSearchConsole() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const siteUrl = 'https://thebulletinbriefs.in';
  const sitemapUrl = `${siteUrl}/sitemap.xml`;
  const newsSitemapUrl = `${siteUrl}/news-sitemap.xml`;
  const indexNowKey = 'e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0';

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setSettings(data);
        setVerificationCode(data.google_verification_code || '');
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveVerificationCode = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          id: 1,
          google_verification_code: verificationCode,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Google verification code saved. Add the meta tag to your site.',
      });

      setSettings({ ...settings, google_verification_code: verificationCode });
    } catch (error) {
      console.error('Error saving verification code:', error);
      toast({
        title: 'Error',
        description: 'Failed to save verification code',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: `${label} copied to clipboard`,
    });
  };

  const submitToGoogleSearchConsole = () => {
    window.open('https://search.google.com/search-console', '_blank');
  };

  const submitToBingWebmasterTools = () => {
    window.open('https://www.bing.com/webmasters', '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Google Search Console Verification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Google Search Console Verification
          </CardTitle>
          <CardDescription>
            Verify your site ownership with Google to enable indexing and analytics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="verification">Google Verification Code</Label>
            <div className="flex gap-2">
              <Input
                id="verification"
                placeholder="google-site-verification=xxxxxxxxxxxxx"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <Button onClick={saveVerificationCode} disabled={saving || !verificationCode}>
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Get your verification code from Google Search Console and paste it here
            </p>
          </div>

          {settings.google_verification_code && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Verification code saved! The meta tag is automatically added to your site.
                <br />
                <code className="mt-2 block bg-muted p-2 rounded text-xs">
                  {`<meta name="google-site-verification" content="${settings.google_verification_code}" />`}
                </code>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2 pt-2">
            <Button onClick={submitToGoogleSearchConsole} variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Google Search Console
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sitemap Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Sitemap Configuration
          </CardTitle>
          <CardDescription>
            Submit your sitemaps to search engines for better indexing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-sm">Main Sitemap</p>
                <code className="text-xs text-muted-foreground">{sitemapUrl}</code>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(sitemapUrl, 'Sitemap URL')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-sm">News Sitemap</p>
                <code className="text-xs text-muted-foreground">{newsSitemapUrl}</code>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(newsSitemapUrl, 'News Sitemap URL')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Alert>
            <RefreshCw className="h-4 w-4" />
            <AlertDescription>
              <strong>Automatic Updates:</strong> Your sitemaps are automatically updated when you publish new articles.
              Search engines are notified automatically via IndexNow and sitemap pings.
            </AlertDescription>
          </Alert>

          <div className="flex gap-2">
            <Button onClick={submitToGoogleSearchConsole} variant="outline" size="sm">
              Submit to Google
            </Button>
            <Button onClick={submitToBingWebmasterTools} variant="outline" size="sm">
              Submit to Bing
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* IndexNow Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            IndexNow Protocol
          </CardTitle>
          <CardDescription>
            Instant indexing for Bing, Yandex, and other search engines
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>IndexNow Key</Label>
            <div className="flex items-center gap-2">
              <Input value={indexNowKey} readOnly className="font-mono text-sm" />
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(indexNowKey, 'IndexNow Key')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Key file is already deployed at: {siteUrl}/e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0.txt
            </p>
          </div>

          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Auto-configured:</strong> IndexNow is automatically triggered when you publish articles.
              Your content is instantly submitted to Bing, Yandex, and other participating search engines.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Setup Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Setup Instructions</CardTitle>
          <CardDescription>Follow these steps to complete search engine integration</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 list-decimal list-inside text-sm">
            <li>
              <strong>Google Search Console:</strong>
              <ul className="ml-6 mt-1 space-y-1 list-disc list-inside text-muted-foreground">
                <li>Go to Google Search Console and add your property</li>
                <li>Choose "HTML tag" verification method</li>
                <li>Copy the verification code and save it above</li>
                <li>Click "Verify" in Google Search Console</li>
                <li>Submit both sitemaps (main and news) in GSC</li>
              </ul>
            </li>
            <li>
              <strong>Bing Webmaster Tools:</strong>
              <ul className="ml-6 mt-1 space-y-1 list-disc list-inside text-muted-foreground">
                <li>Sign up at Bing Webmaster Tools</li>
                <li>Add your site and verify ownership</li>
                <li>Submit your sitemaps in the Sitemaps section</li>
              </ul>
            </li>
            <li>
              <strong>Automatic Indexing:</strong>
              <ul className="ml-6 mt-1 space-y-1 list-disc list-inside text-muted-foreground">
                <li>New articles are automatically submitted to search engines</li>
                <li>Google and Bing receive sitemap ping notifications</li>
                <li>IndexNow protocol notifies multiple search engines instantly</li>
              </ul>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
