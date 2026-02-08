import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Grape, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const navLinks = [
    { name: "Our Story", href: "/our-story" },
    { name: "Projects", href: "/projects" },
    { name: "Learn More", href: "/learn-more" },
  ];

  const NavLinks = ({ className = "", onClick = () => {} }) => (
    <div className={className}>
      {navLinks.map((link) => (
        <Link
          key={link.name}
          to={link.href}
          className="text-foreground hover:text-primary transition-colors font-medium"
          onClick={onClick}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );

  if (isMobile) {
    return (
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3 group">
              <Grape className="h-7 w-7 text-primary transition-all duration-300 group-hover:scale-110" />
              <span className="font-semibold text-2xl tracking-wide text-foreground bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent hover:from-primary/90 hover:to-primary transition-all duration-300">
                Nysa
              </span>
            </Link>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-background">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                      <Grape className="h-6 w-6 text-primary" />
                      <span className="font-semibold text-xl tracking-wide bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                        Nysa
                      </span>
                    </div>
                  </div>
                  
                  <NavLinks 
                    className="flex flex-col space-y-6" 
                    onClick={() => setIsOpen(false)} 
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <Grape className="h-7 w-7 text-primary transition-all duration-300 group-hover:scale-110" />
              <span className="font-semibold text-2xl tracking-wide text-foreground bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent hover:from-primary/90 hover:to-primary transition-all duration-300">
                Nysa
              </span>
            </Link>
            
            <NavLinks className="hidden md:flex items-center space-x-6" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;