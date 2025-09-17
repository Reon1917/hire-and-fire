import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Check } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "฿999",
      period: "/month",
      description: "Perfect for small businesses just getting started",
      features: [
        "50 resume analyses / month",
        "Basic ranking & scoring",
        "Email support",
        "1 company profile"
      ],
      cta: "Start Free Trial",
      popular: false,
      href: "/dashboard"
    },
    {
      name: "Professional",
      price: "฿2,499",
      period: "/month",
      description: "Ideal for growing businesses with higher volume",
      features: [
        "200 resume analyses / month",
        "Advanced analytics dashboard",
        "API access + Priority support",
        "Up to 3 company profiles",
        "Custom scoring criteria"
      ],
      cta: "Start Free Trial",
      popular: true,
      href: "/dashboard"
    },
    {
      name: "Enterprise",
      price: "฿4,999",
      period: "/month",
      description: "For large teams with enterprise-level needs",
      features: [
        "Unlimited resume analyses",
        "White-label options",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced compliance features",
        "Multiple team access"
      ],
      cta: "Contact Sales",
      popular: false,
      href: "/contact"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
            <span className="text-xl font-bold text-slate-900">Hire & Fire</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">Home</Link>
            <Link href="/#features" className="text-slate-600 hover:text-slate-900 transition-colors">Features</Link>
            <Link href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">Pricing</Link>
            <Button variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
          Choose the perfect plan for your hiring needs. All plans include our core AI screening technology.
        </p>
        
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative transition-all duration-300 hover:shadow-lg ${
                plan.popular 
                  ? 'border-2 border-blue-500 shadow-lg scale-105' 
                  : 'border hover:border-slate-300'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-base mb-6 min-h-[3rem] flex items-center justify-center">
                  {plan.description}
                </CardDescription>
                
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-slate-900">{plan.price}</div>
                  {plan.period && (
                    <div className="text-slate-600 text-sm">{plan.period}</div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-0 pb-8 px-6">
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                      : ''
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                  asChild
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    What happens when I exceed my monthly screening limit?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    You&apos;ll be notified when you approach your limit. You can upgrade your plan or purchase additional screenings at $0.10 per resume.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Can I cancel or change my plan anytime?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect at your next billing cycle.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Is there a setup fee or contract?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    No setup fees and no long-term contracts. Pay monthly and cancel anytime with no penalties.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    How accurate is the AI screening?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Our AI has a 94% accuracy rate in matching candidates to job requirements, continuously learning from your feedback to improve over time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0">
          <CardContent className="text-center text-white p-8 md:p-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Hiring Process?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using AI to hire better, faster, and smarter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
                <Link href="/dashboard">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-blue-600">
                Schedule Demo
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-4">14-day free trial • No credit card required</p>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
                <span className="text-xl font-bold">Hire & Fire</span>
              </div>
              <p className="text-slate-400">AI-powered resume screening for smart hiring decisions.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="#about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#support" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="#privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="#terms" className="hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Hire & Fire. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 