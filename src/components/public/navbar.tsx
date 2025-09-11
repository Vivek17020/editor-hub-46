import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCategories } from "@/hooks/use-articles";
import { FileText, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SearchDialog } from "@/components/public/search-dialog";
import { UserMenu } from "@/components/public/user-menu";

export function Navbar() {
  const { data: categories } = useCategories();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-20 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-8 flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src="/lovable-uploads/ad21ceb4-1347-4691-ad1a-27e4295439ae.png" 
                alt="TheBulletinBriefs Logo" 
                className="w-10 h-10 rounded-full object-cover shadow-md group-hover:shadow-glow transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300" />
            </div>
            <span className="font-bold text-2xl bg-gradient-primary bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              TheBulletinBriefs
            </span>
          </Link>
          <nav className="flex items-center space-x-8 text-sm font-medium">
            <Link
              to="/"
              className="relative px-3 py-2 text-foreground/70 hover:text-foreground transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              Home
            </Link>
            {categories?.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="relative px-3 py-2 text-foreground/70 hover:text-foreground transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          className="mr-2 px-2 text-base hover:bg-muted/50 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden rounded-xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/ad21ceb4-1347-4691-ad1a-27e4295439ae.png" 
              alt="TheBulletinBriefs Logo" 
              className="w-9 h-9 rounded-full object-cover shadow-md"
            />
            <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
              TheBulletinBriefs
            </span>
            <div className="ml-2 p-1 rounded-md hover:bg-muted/30 transition-colors">
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </div>
          </div>
        </Button>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search functionality */}
          </div>
            <nav className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchOpen(true)}
              className="h-10 w-10 p-0 rounded-xl hover:bg-muted/50 hover:shadow-sm transition-all duration-300"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
            <div className="h-6 w-px bg-border" />
            <ThemeToggle />
            <UserMenu />
          </nav>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-4 pb-6 space-y-2 border-t border-border bg-background/95 backdrop-blur-sm">
            <Link
              to="/"
              className="block px-4 py-3 text-base font-medium text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-xl transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            {categories?.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="block px-4 py-3 text-base font-medium text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-xl transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}