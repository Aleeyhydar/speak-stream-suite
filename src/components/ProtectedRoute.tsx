import { ReactNode, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AuthDialog } from '@/components/AuthDialog';
import { Loader2, Lock, ArrowRight, Star, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
                <Lock className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Unlock AI Voice Conversion
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                Sign in to access our advanced AI-powered voice conversion features and transform your audio experience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  onClick={() => setShowAuthDialog(true)}
                  className="btn-hero px-8 py-3 text-lg"
                  size="lg"
                >
                  Sign In to Continue
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                
                <Link to="/">
                  <Button variant="outline" size="lg" className="px-8 py-3">
                    Return Home
                  </Button>
                </Link>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="card-premium text-center">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-muted-foreground">
                    Convert text to speech in seconds with our optimized AI models.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-premium text-center">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                  <p className="text-muted-foreground">
                    Natural-sounding voices with emotion and perfect pronunciation.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-premium text-center">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
                  <p className="text-muted-foreground">
                    Your data is encrypted and protected with enterprise-grade security.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-muted/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-6">
                Join thousands of users who trust our AI voice technology for their projects.
              </p>
              <Button 
                onClick={() => setShowAuthDialog(true)}
                className="btn-hero"
                size="lg"
              >
                Create Your Account
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        <Footer />
        <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
      </div>
    );
  }

  return <>{children}</>;
};