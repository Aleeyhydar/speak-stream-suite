import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Mic, Volume2, Zap, Shield, Clock, Users, Star, Sparkles, Bot, Headphones, AudioWaveform, Check, Play, Globe, BarChart3, Bell } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import SoundWave from "@/components/SoundWave";
import heroImage from "@/assets/hero-soundwave.jpg";
const Index = () => {
  return <div className="min-h-screen bg-background">
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
                  <span className="block text-gradient text-slate-600">Lifelike Speech</span>
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
              <img src={heroImage} alt="Advanced sound wave visualization representing AI voice technology" className="w-full h-auto rounded-2xl shadow-2xl" />
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

      {/* Voice Cloning - Coming Soon */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-100">
              <Sparkles className="h-3 w-3 mr-1" />
              Coming Soon
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Voice Cloning Technology
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Create personalized AI voices with just a few minutes of audio. Perfect for content creators, 
              businesses, and developers who need consistent brand voices.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="card-premium text-center">
              <CardContent className="p-8">
                <div className="p-4 bg-purple-100 rounded-full w-fit mx-auto mb-6">
                  <Bot className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Personal Voice Clone</h3>
                <p className="text-muted-foreground">
                  Upload 10 minutes of audio to create your personal AI voice that 
                  sounds just like you.
                </p>
              </CardContent>
            </Card>

            <Card className="card-premium text-center">
              <CardContent className="p-8">
                <div className="p-4 bg-blue-100 rounded-full w-fit mx-auto mb-6">
                  <Headphones className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Studio Quality</h3>
                <p className="text-muted-foreground">
                  Professional-grade voice cloning with emotional nuances 
                  and natural speech patterns.
                </p>
              </CardContent>
            </Card>

            <Card className="card-premium text-center">
              <CardContent className="p-8">
                <div className="p-4 bg-green-100 rounded-full w-fit mx-auto mb-6">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Secure & Private</h3>
                <p className="text-muted-foreground">
                  Your voice data is encrypted and protected with enterprise-level 
                  security protocols.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button className="btn-secondary">
              <Bell className="h-4 w-4 mr-2" />
              Notify Me When Available
            </Button>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Professionals Worldwide
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From content creators to enterprise teams, VoiceAI powers voice solutions across industries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center space-y-4">
              <div className="p-4 bg-blue-100 rounded-full w-fit mx-auto">
                <Play className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold">Content Creators</h3>
              <p className="text-muted-foreground text-sm">
                Podcasters, YouTubers, and audiobook narrators creating engaging content
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="p-4 bg-green-100 rounded-full w-fit mx-auto">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold">Businesses</h3>
              <p className="text-muted-foreground text-sm">
                Marketing teams creating voiceovers for ads, presentations, and training materials
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="p-4 bg-purple-100 rounded-full w-fit mx-auto">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold">Educators</h3>
              <p className="text-muted-foreground text-sm">
                Teachers and course creators making learning content accessible worldwide
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="p-4 bg-orange-100 rounded-full w-fit mx-auto">
                <BarChart3 className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold">Developers</h3>
              <p className="text-muted-foreground text-sm">
                Building voice-enabled apps, games, and interactive experiences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-premium">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">
                  "VoiceAI has revolutionized how I create content. The quality is incredible 
                  and it saves me hours of recording time."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold">S</span>
                  </div>
                  <div>
                    <div className="font-semibold">Sarah Johnson</div>
                    <div className="text-sm text-muted-foreground">Podcast Producer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">
                  "The multilingual support is fantastic. We use it for all our 
                  international marketing campaigns."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-semibold">M</span>
                  </div>
                  <div>
                    <div className="font-semibold">Mike Chen</div>
                    <div className="text-sm text-muted-foreground">Marketing Director</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">
                  "As a developer, the API integration was seamless. Customer support 
                  is top-notch too!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-semibold">A</span>
                  </div>
                  <div>
                    <div className="font-semibold">Alex Rivera</div>
                    <div className="text-sm text-muted-foreground">Software Engineer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
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

      {/* Demo Visualization Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              See VoiceAI in Action
            </h2>
            <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-strong)]">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg text-left">
                    <div className="text-sm text-muted-foreground mb-2">Input Text:</div>
                    <p className="font-medium">
                      "Welcome to VoiceAI, where cutting-edge technology meets natural speech synthesis."
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button className="btn-hero flex-1">
                      <Play className="h-4 w-4 mr-2" />
                      Generate & Play
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-center h-32 bg-gradient-to-r from-primary/10 to-accent rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AudioWaveform className="h-8 w-8 text-primary" />
                      <div className="flex space-x-1">
                        {[...Array(12)].map((_, i) => (
                          <div
                            key={i}
                            className="sound-wave"
                            style={{ height: `${Math.random() * 40 + 10}px` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Audio Waveform Visualization</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </div>;
};
export default Index;