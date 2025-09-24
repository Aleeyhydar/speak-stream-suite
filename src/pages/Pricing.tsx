import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown, Building } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      icon: Zap,
      price: "$0",
      period: "forever",
      description: "Perfect for trying out our platform",
      features: [
        "3,000 characters per session",
        "1 voice option (Aria)",
        "Standard quality audio (16kHz)",
        "MP3 format only",
        "Basic support",
        "Personal use only"
      ],
      limitations: [
        "No project history access",
        "No commercial use",
        "Cannot save or re-download projects"
      ],
      cta: "Get Started Free",
      variant: "secondary" as const
    },
    {
      name: "Pro",
      icon: Crown,
      price: "$29",
      period: "per month",
      description: "For professionals and content creators",
      popular: true,
      features: [
        "500,000 characters per month",
        "50+ premium voices",
        "High-quality audio (48kHz)",
        "Multiple formats (MP3, WAV, FLAC)",
        "Project history & re-download access",
        "Priority support",
        "Commercial use included",
        "Custom voice cloning",
        "API access",
        "Bulk processing"
      ],
      cta: "Start Pro Trial",
      variant: "default" as const
    },
    {
      name: "Business",
      icon: Building,
      price: "$99",
      period: "per month",
      description: "For teams and large-scale applications",
      features: [
        "2,000,000 characters per month",
        "All premium voices + custom voices",
        "Ultra-high quality audio (96kHz)",
        "All formats + custom formats",
        "Unlimited project history storage",
        "Advanced project management tools",
        "Dedicated support manager",
        "Full commercial license",
        "Custom voice development",
        "Advanced API features",
        "White-label solutions",
        "SSO integration",
        "Custom integrations"
      ],
      cta: "Contact Sales",
      variant: "default" as const
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Choose the perfect plan for your voice AI needs. All plans include our core features 
            with no hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card 
                key={plan.name} 
                className={`card-premium relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-8">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold">
                      {plan.price}
                      <span className="text-lg font-normal text-muted-foreground">
                        /{plan.period}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.limitations?.map((limitation, limitIndex) => (
                      <li key={limitIndex} className="flex items-start space-x-3 opacity-60">
                        <div className="h-5 w-5 flex-shrink-0 mt-0.5 flex items-center justify-center">
                          <div className="h-1 w-3 bg-muted-foreground rounded" />
                        </div>
                        <span className="text-sm">{limitation}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${plan.variant === 'secondary' ? 'btn-secondary' : 'btn-hero'}`}
                    asChild
                  >
                    <Link to={plan.name === 'Free' ? '/convert' : '/checkout'}>
                      {plan.cta}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">What happens if I exceed my character limit?</h3>
              <p className="text-muted-foreground">
                If you exceed your monthly character limit, you can either upgrade your plan or 
                purchase additional character packs. Your service won't be interrupted.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Can I change plans anytime?</h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect 
                immediately, and we'll prorate any billing differences.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Do you offer custom enterprise solutions?</h3>
              <p className="text-muted-foreground">
                Absolutely! We offer custom enterprise solutions with dedicated infrastructure, 
                custom voice development, and specialized support. Contact our sales team for details.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Is there a free trial for paid plans?</h3>
              <p className="text-muted-foreground">
                Yes, we offer a 7-day free trial for our Pro plan. No credit card required to start, 
                and you can cancel anytime during the trial period.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;