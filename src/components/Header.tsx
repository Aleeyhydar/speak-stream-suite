import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Mic, Volume2, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AuthDialog } from "@/components/AuthDialog";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="p-2 bg-primary rounded-lg group-hover:scale-105 transition-transform">
            <Volume2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">VoiceAI</span>
        </Link>

        <nav className="hidden lg:flex items-center space-x-8">
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
          {user && (
            <Link
              to="/projects"
              className={`font-medium transition-colors hover:text-primary ${
                location.pathname === "/projects" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Projects
            </Link>
          )}
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
          {/* Desktop Navigation */}
          {user ? (
            <>
              <span className="hidden lg:block text-sm text-muted-foreground">
                {user.email}
              </span>
              <Button 
                variant="ghost" 
                onClick={handleSignOut}
                className="hidden lg:inline-flex"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                onClick={() => setShowAuthDialog(true)}
                className="hidden lg:inline-flex"
              >
                Sign In
              </Button>
              <Button 
                className="btn-hero hidden lg:inline-flex"
                onClick={() => setShowAuthDialog(true)}
              >
                Get Started
              </Button>
            </>
          )}

          {/* Mobile & Tablet Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-6">
                <Link
                  to="/"
                  className={`text-lg font-medium transition-colors hover:text-primary ${
                    location.pathname === "/" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/convert"
                  className={`text-lg font-medium transition-colors hover:text-primary ${
                    location.pathname === "/convert" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Convert
                </Link>
                {user && (
                  <Link
                    to="/projects"
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      location.pathname === "/projects" ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    Projects
                  </Link>
                )}
                <Link
                  to="/pricing"
                  className={`text-lg font-medium transition-colors hover:text-primary ${
                    location.pathname === "/pricing" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Pricing
                </Link>
                
                <div className="border-t pt-4 space-y-4">
                  {user ? (
                    <>
                      <div className="text-sm text-muted-foreground">
                        {user.email}
                      </div>
                      <Button 
                        variant="ghost" 
                        onClick={handleSignOut}
                        className="w-full justify-start"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="ghost" 
                        onClick={() => setShowAuthDialog(true)}
                        className="w-full justify-start"
                      >
                        Sign In
                      </Button>
                      <Button 
                        className="btn-hero w-full"
                        onClick={() => setShowAuthDialog(true)}
                      >
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
      </div>
    </header>
  );
};

export default Header;