import { Grape } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 border-t">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Grape className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Nysa
          </span>
        </div>
        <p className="text-muted-foreground mb-4">
          Maintaining ancient vineyard heritage, one vine at a time.
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
          <Link 
            to="/privacy-policy" 
            className="hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
          <Link 
            to="/terms-of-use" 
            className="hover:text-primary transition-colors"
          >
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;