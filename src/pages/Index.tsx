import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Mic, Volume2, Zap, Shield, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import SoundWave from "@/components/SoundWave";
import heroImage from "@/assets/hero-soundwave.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-6">
                  <SoundWave className="scale-75" />
                  <span className="text-sm font-medium tracking-wider uppercase opacity-80">
                    AI Voice Technology
                  </span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Transform Text to
                  <span className="block text-gradient">Lifelike Speech</span>
                </h1>
                <p className="text-xl opacity-90 max-w-lg">
                  The most advanced and affordable voice AI platform. Create natural-sounding speech 
                  from text with our cutting-edge AI technology.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/convert">
                  <Button className="btn-hero group">
                    Start Converting
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button className="btn-secondary">
                    View Pricing
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center space-x-8 text-sm opacity-80">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span>Lightning Fast</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Enterprise Security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Advanced sound wave visualization representing AI voice technology"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose VoiceAI?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Industry-leading voice synthesis technology trusted by thousands of businesses worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-premium text-center">
              <CardContent className="p-8">
                <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-6">
                  <Volume2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Premium Voice Quality</h3>
                <p className="text-muted-foreground">
                  Experience unparalleled voice quality with our advanced neural networks 
                  trained on diverse, high-quality speech data.
                </p>
              </CardContent>
            </Card>

            <Card className="card-premium text-center">
              <CardContent className="p-8">
                <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-6">
                  <Mic className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Speech to Text</h3>
                <p className="text-muted-foreground">
                  Accurate transcription services that convert your audio recordings 
                  into text with industry-leading precision.
                </p>
              </CardContent>
            </Card>

            <Card className="card-premium text-center">
              <CardContent className="p-8">
                <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-6">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Generate high-quality audio in seconds, not minutes. 
                  Our optimized infrastructure ensures rapid processing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">10M+</div>
              <div className="text-muted-foreground">Audio Files Generated</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-muted-foreground">Languages Supported</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-muted-foreground">Expert Support</div>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
