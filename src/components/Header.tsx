import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Mic, Volume2 } from "lucide-react";

const Header = () => {
  const location = useLocation();

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="p-2 bg-primary rounded-lg group-hover:scale-105 transition-transform">
            <Volume2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">VoiceAI</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`font-medium transition-colors hover:text-primary ${
              location.pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            to="/convert"
            className={`font-medium transition-colors hover:text-primary ${
              location.pathname === "/convert" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Convert
          </Link>
          <Link
            to="/pricing"
            className={`font-medium transition-colors hover:text-primary ${
              location.pathname === "/pricing" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="hidden sm:inline-flex">
            Sign In
          </Button>
          <Button className="btn-hero">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;