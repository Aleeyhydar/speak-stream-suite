import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { Loader2, Mail, Lock, Sparkles, Crown, Zap, Check, UserPlus } from 'lucide-react';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthDialog = ({ open, onOpenChange }: AuthDialogProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  const { signIn, signUp, signInWithGoogle } = useAuth();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);
    
    if (error) {
      toast({
        title: "Sign In Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      onOpenChange(false);
      resetForm();
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password);
    
    if (error) {
      toast({
        title: "Sign Up Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Account Created!",
        description: "Please check your email to verify your account.",
      });
      onOpenChange(false);
      resetForm();
    }
    setLoading(false);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const { error } = await signInWithGoogle();
    
    if (error) {
      toast({
        title: "Google Sign In Failed",
        description: error.message,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleContinueAsGuest = () => {
    onOpenChange(false);
    toast({
      title: "Continuing as Guest",
      description: "You can sign up later to save your progress.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] bg-gradient-to-br from-background to-muted/20 border-0 shadow-2xl p-0">
        <ScrollArea className="max-h-[80vh]">
          <div className="px-6">
            {/* Header with gradient background */}
            <div className="relative -mx-6 mb-6 px-6 py-8 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 rounded-t-lg border-b">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-t-lg opacity-50"></div>
              <div className="relative text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Join VoiceAI
                </DialogTitle>
                <p className="text-muted-foreground mt-2">
                  Transform your ideas into lifelike speech
                </p>
              </div>
            </div>

            {/* Quick Access Options */}
            <div className="space-y-3 mb-6">
              <Button 
                onClick={handleGoogleSignIn}
                variant="outline" 
                className="w-full h-12 border-2 hover:bg-accent/50"
                disabled={loading}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {loading ? "Connecting..." : "Continue with Google"}
              </Button>
              
              <Button 
                onClick={handleContinueAsGuest}
                variant="ghost" 
                className="w-full h-12 text-muted-foreground hover:text-foreground"
                disabled={loading}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Continue as Guest
              </Button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            {/* Benefits section */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-primary/5">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Crown className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Premium Voices</div>
                  <div className="text-xs text-muted-foreground">50+ options</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-accent/5">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <div className="text-sm font-medium">Unlimited</div>
                  <div className="text-xs text-muted-foreground">No limits</div>
                </div>
              </div>
            </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50">
            <TabsTrigger value="signin" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Sign Up
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin" className="space-y-6 mt-6">
            <form onSubmit={handleSignIn} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="signin-email" className="text-sm font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 bg-background/50 border-muted-foreground/20 focus:border-primary transition-colors"
                    disabled={loading}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signin-password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11 bg-background/50 border-muted-foreground/20 focus:border-primary transition-colors"
                    disabled={loading}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-11 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing you in...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup" className="space-y-6 mt-6">
            {/* Pro features preview */}
            <div className="p-4 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Crown className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">Get Pro Features</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-primary" />
                  <span>50+ Premium Voices</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-primary" />
                  <span>HD Audio Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-primary" />
                  <span>Unlimited Usage</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-primary" />
                  <span>Project History</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSignUp} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-sm font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 bg-background/50 border-muted-foreground/20 focus:border-primary transition-colors"
                    disabled={loading}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Minimum 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11 bg-background/50 border-muted-foreground/20 focus:border-primary transition-colors"
                    disabled={loading}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-11 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating your account...
                  </>
                ) : (
                  <>
                    <Crown className="mr-2 h-4 w-4" />
                    Create Free Account
                  </>
                )}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </TabsContent>
        </Tabs>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};