import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

export function LanguageSelector() {
  const { currentLanguage, languages, setCurrentLanguage, isLoading } = useLanguage();

  if (isLoading || languages.length === 0) {
    return null;
  }

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-2 text-muted-foreground hover:text-foreground"
        >
          <Globe className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">
            {currentLang?.native_name || currentLang?.name || 'EN'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.id}
            onClick={() => setCurrentLanguage(language.code)}
            className={cn(
              "flex items-center justify-between cursor-pointer",
              currentLanguage === language.code && "bg-accent"
            )}
          >
            <span className="font-medium">{language.native_name}</span>
            <span className="text-xs text-muted-foreground ml-2">
              {language.code.toUpperCase()}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}