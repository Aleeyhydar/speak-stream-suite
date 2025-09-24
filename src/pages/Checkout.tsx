import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, CreditCard, Shield, Check, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 19,
    period: 'month',
    features: ['10 Premium Voices', '1,000 Characters/month', 'HD Audio Quality', 'Basic Support'],
    recommended: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 49,
    period: 'month',
    features: ['50+ Premium Voices', '10,000 Characters/month', 'HD Audio Quality', 'Priority Support', 'Commercial Usage'],
    recommended: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    period: 'month',
    features: ['Unlimited Voices', 'Unlimited Characters', 'Ultra HD Audio', '24/7 Support', 'Custom Voice Training', 'API Access'],
    recommended: false,
  },
];

export default function Checkout() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    company: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
  });

  const currentPlan = plans.find(plan => plan.id === selectedPlan);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckout = async () => {
    if (!paymentMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method to continue.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email || !formData.fullName) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Here you would integrate with your payment processor
    toast({
      title: "Processing Payment",
      description: `Redirecting to ${paymentMethod} checkout...`,
    });

    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Payment Successful!",
        description: "Welcome to VoiceAI Premium! Redirecting to your dashboard...",
      });
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Complete Your Purchase</h1>
            <p className="text-muted-foreground">Choose your plan and payment method</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Plan Selection */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Select Your Plan</h2>
              <div className="space-y-3">
                {plans.map((plan) => (
                  <Card
                    key={plan.id}
                    className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedPlan === plan.id 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedPlan === plan.id 
                            ? 'bg-primary border-primary' 
                            : 'border-muted-foreground'
                        }`}>
                          {selectedPlan === plan.id && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{plan.name}</h3>
                            {plan.recommended && (
                              <Badge className="bg-primary text-primary-foreground">
                                <Star className="h-3 w-3 mr-1" />
                                Recommended
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            ${plan.price}/{plan.period}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">${plan.price}</div>
                        <div className="text-sm text-muted-foreground">per {plan.period}</div>
                      </div>
                    </div>
                    <div className="mt-3 pl-7">
                      <div className="grid grid-cols-1 gap-1">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Check className="h-3 w-3 text-primary" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-3">
                <Card
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    paymentMethod === 'grey' 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setPaymentMethod('grey')}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      paymentMethod === 'grey' 
                        ? 'bg-primary border-primary' 
                        : 'border-muted-foreground'
                    }`}>
                      {paymentMethod === 'grey' && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-800 rounded flex items-center justify-center">
                        <CreditCard className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">Grey Payment</div>
                        <div className="text-sm text-muted-foreground">Secure payment processing</div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    paymentMethod === 'payoneer' 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setPaymentMethod('payoneer')}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      paymentMethod === 'payoneer' 
                        ? 'bg-primary border-primary' 
                        : 'border-muted-foreground'
                    }`}>
                      {paymentMethod === 'payoneer' && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center">
                        <CreditCard className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">Payoneer</div>
                        <div className="text-sm text-muted-foreground">Global payment solution</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Billing Information */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="Your Company Inc."
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      placeholder="10001"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select onValueChange={(value) => handleInputChange('country', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="fr">France</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Order Summary */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              {currentPlan && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{currentPlan.name} Plan</div>
                      <div className="text-sm text-muted-foreground">Monthly subscription</div>
                    </div>
                    <div className="font-semibold">${currentPlan.price}/month</div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Subtotal</div>
                    <div className="font-semibold">${currentPlan.price}</div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">Tax</div>
                    <div className="text-sm">$0.00</div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center text-lg">
                    <div className="font-semibold">Total</div>
                    <div className="font-bold">${currentPlan.price}/month</div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <Button 
                      onClick={handleCheckout}
                      className="w-full h-12 text-lg font-medium"
                    >
                      Complete Purchase
                    </Button>
                    
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4" />
                      <span>Secure 256-bit SSL encryption</span>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}