import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-lg"></div>
            <span className="text-xl font-bold text-slate-900">Hire & Fire</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">Features</Link>
            <Link href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">Pricing</Link>
            <Link href="#about" className="text-slate-600 hover:text-slate-900 transition-colors">About</Link>
            <Button variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center">
          <Badge className="gradient-primary mb-6">
            🚀 Now screening 10,000+ resumes daily
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Stop drowning in resumes.<br/>
            <span className="text-gradient">Start hiring smart.</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Our AI screens hundreds of resumes in seconds, surfaces the best candidates, and gives you back hours of your day. 
            Built specifically for small and medium businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="text-lg px-8 py-6 gradient-primary gradient-primary-hover" asChild>
              <Link href="/dashboard">Start Free Trial</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-2">
              Watch Demo
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-6 text-sm text-slate-500">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No credit card required
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              14-day free trial
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding">
        <div className="container-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Hire & Fire?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Built specifically for SMBs who need to hire fast without compromising quality
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <CardTitle className="text-xl">Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Screen hundreds of resumes in minutes. Our AI reads, analyzes, and ranks candidates instantly.</p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <CardTitle className="text-xl">Smart Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Advanced algorithms match candidates to your specific job requirements and company culture.</p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <CardTitle className="text-xl">Cost Effective</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Save thousands on recruiting fees. Perfect for SMBs with limited HR budgets.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-white section-padding">
        <div className="container-padding">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-0">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="mb-6">
                      <svg className="w-8 h-8 text-blue-600 mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                      </svg>
                      <blockquote className="text-xl text-slate-700 font-medium mb-4">
                        &quot;With Hire & Fire&apos;s AI-powered screening, we cut our hiring time from weeks to days. The quality of candidates has never been better.&quot;
                      </blockquote>
                      <div className="flex items-center">
                        <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center text-white font-semibold text-lg mr-4">
                          SM
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">Sarah Martinez</p>
                          <p className="text-slate-600 text-sm">CEO, TechStart Solutions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center mb-4">
                          <h4 className="font-semibold text-slate-900 mb-2">Ready to get started?</h4>
                          <p className="text-slate-600 text-sm mb-4">Join thousands of businesses transforming their hiring process</p>
                        </div>
                        <div className="space-y-3">
                          <input 
                            type="email" 
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <Button className="w-full gradient-primary gradient-primary-hover">
                            Start Free Trial
                          </Button>
                          <p className="text-xs text-slate-500 text-center">
                            14-day free trial • No credit card required
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="section-padding">
        <div className="container-padding">
          <div className="text-center mb-12">
            <p className="text-slate-600 mb-12 text-lg">Trusted by 500+ growing businesses</p>
            <div className="flex justify-center items-center space-x-12 opacity-60">
              <Badge variant="outline" className="px-6 py-3 text-lg">
                TechStart
              </Badge>
              <Badge variant="outline" className="px-6 py-3 text-lg">
                GrowthCo
              </Badge>
              <Badge variant="outline" className="px-6 py-3 text-lg">
                BuildFast
              </Badge>
              <Badge variant="outline" className="px-6 py-3 text-lg">
                ScaleUp
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-padding">
          <Card className="gradient-primary border-0">
            <CardContent className="text-center text-white p-8 md:p-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Hiring?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join hundreds of smart business owners who&apos;ve already revolutionized their hiring process
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
                  <Link href="/dashboard">Start Free Trial</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-blue-600">
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 gradient-primary rounded-lg"></div>
                <span className="text-xl font-bold">Hire & Fire</span>
              </div>
              <p className="text-slate-400">AI-powered resume screening for smart hiring decisions.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
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
