import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  Check, 
  Sprout, 
  Rocket, 
  Crown,
  Tag,
  TrendingUp,
  Handshake,
  Star,
  Menu,
  Linkedin,
  Twitter,
  Facebook,
  ArrowUp
} from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      companySize: "",
      serviceInterest: "",
      message: "",
    },
  });

  const createInquiryMutation = useMutation({
    mutationFn: async (data: InsertInquiry) => {
      const response = await apiRequest("POST", "/api/inquiries", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertInquiry) => {
    createInquiryMutation.mutate(data);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-warm-coral mr-3" />
              <span className="text-xl font-bold text-slate-900">HumanFirst HR</span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-slate-700 hover:text-warm-coral px-3 py-2 text-sm font-medium transition-colors"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-slate-700 hover:text-warm-coral px-3 py-2 text-sm font-medium transition-colors"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('success-stories')}
                  className="text-slate-700 hover:text-warm-coral px-3 py-2 text-sm font-medium transition-colors"
                >
                  Success Stories
                </button>
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-warm-coral hover:bg-warm-coral/90"
                >
                  Contact Us
                </Button>
              </div>
            </div>
            
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-700 hover:text-warm-coral"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <button 
                  onClick={() => scrollToSection('services')}
                  className="block px-3 py-2 text-slate-700 hover:text-warm-coral"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="block px-3 py-2 text-slate-700 hover:text-warm-coral"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('success-stories')}
                  className="block px-3 py-2 text-slate-700 hover:text-warm-coral"
                >
                  Success Stories
                </button>
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full mt-2 bg-warm-coral hover:bg-warm-coral/90"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-gray-100 pt-16 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Your People Are Your <span className="text-warm-coral">Greatest Asset</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                We help organizations unlock their human potential through strategic HR solutions, talent optimization, and organizational development that drives real business results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                <Button 
                  size="lg"
                  onClick={() => scrollToSection('contact')}
                  className="bg-warm-coral hover:bg-warm-coral/90 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                >
                  Get Free Consultation
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection('services')}
                  className="border-2 border-golden-sand text-slate-700 hover:bg-golden-sand hover:text-white px-8 py-4 text-lg transition-all"
                >
                  View Our Services
                </Button>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-6">
              <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl shadow-2xl p-8 text-center">
                <Users className="h-24 w-24 mx-auto mb-4 text-warm-coral" />
                <h3 className="text-2xl font-bold mb-2 text-slate-900">Professional HR Team</h3>
                <p className="text-lg text-slate-700">Ready to transform your organization</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Our Service Tiers</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Choose the level of support that fits your organization's needs and budget</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-stretch">
            {/* Essential Tier */}
            <Card className="border-2 border-gray-200 hover:border-golden-sand transition-all hover:shadow-lg flex flex-col">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-golden-sand/10 rounded-full mb-4">
                    <Sprout className="h-8 w-8 text-golden-sand" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Essential</h3>
                  <p className="text-slate-600 mb-4 min-h-[48px]">Perfect for small businesses getting started</p>
                  <div className="text-4xl font-bold text-slate-900 mb-4">$2,500<span className="text-lg font-normal text-slate-600">/month</span></div>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-golden-sand mr-3 flex-shrink-0" />
                    <span className="text-slate-700">HR Policy Development</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-golden-sand mr-3 flex-shrink-0" />
                    <span className="text-slate-700">Employee Handbook Creation</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-golden-sand mr-3 flex-shrink-0" />
                    <span className="text-slate-700">Basic Compliance Support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-golden-sand mr-3 flex-shrink-0" />
                    <span className="text-slate-700">Monthly HR Consultation</span>
                  </li>
                </ul>
                <Button className="w-full bg-golden-sand hover:bg-golden-sand/90 text-white mt-auto">
                  Choose Essential
                </Button>
              </CardContent>
            </Card>

            {/* Professional Tier - Most Popular */}
            <Card className="bg-warm-coral text-white shadow-xl relative border-0 flex flex-col">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-golden-sand text-slate-900 px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap shadow-lg">Most Popular</span>
              </div>
              <CardContent className="p-8 flex flex-col h-full pt-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                    <Rocket className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Professional</h3>
                  <p className="text-white/90 mb-4 min-h-[48px]">Comprehensive HR support for growing companies</p>
                  <div className="text-4xl font-bold mb-4">$5,000<span className="text-lg font-normal text-white/80">/month</span></div>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-golden-sand mr-3 flex-shrink-0" />
                    <span>Everything in Essential</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-golden-sand mr-3 flex-shrink-0" />
                    <span>Talent Acquisition Support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-golden-sand mr-3 flex-shrink-0" />
                    <span>Performance Management Systems</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-golden-sand mr-3 flex-shrink-0" />
                    <span>Employee Training Programs</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-golden-sand mr-3 flex-shrink-0" />
                    <span>Weekly Strategic Sessions</span>
                  </li>
                </ul>
                <Button className="w-full bg-white text-warm-coral hover:bg-white/90 mt-auto">
                  Choose Professional
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Tier */}
            <Card className="border-2 border-gray-200 hover:border-warm-coral transition-all hover:shadow-lg flex flex-col">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-warm-coral/10 rounded-full mb-4">
                    <Crown className="h-8 w-8 text-warm-coral" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Enterprise</h3>
                  <p className="text-slate-600 mb-4 min-h-[48px]">Full-service HR partnership for large organizations</p>
                  <div className="text-4xl font-bold text-slate-900 mb-4">Custom<span className="text-lg font-normal text-slate-600"> pricing</span></div>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-warm-coral mr-3 flex-shrink-0" />
                    <span className="text-slate-700">Everything in Professional</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-warm-coral mr-3 flex-shrink-0" />
                    <span className="text-slate-700">Dedicated HR Team</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-warm-coral mr-3 flex-shrink-0" />
                    <span className="text-slate-700">Custom Solution Development</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-warm-coral mr-3 flex-shrink-0" />
                    <span className="text-slate-700">24/7 Support</span>
                  </li>
                </ul>
                <Button className="w-full bg-warm-coral hover:bg-warm-coral/90 text-white mt-auto">
                  Contact for Pricing
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="lg:col-span-6 mb-12 lg:mb-0">
              <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl shadow-xl p-8">
                <div className="grid grid-cols-2 gap-4 items-center">
                  <div className="text-center">
                    <Handshake className="h-16 w-16 mx-auto mb-2 text-warm-coral" />
                    <h4 className="font-bold text-slate-900">Partnership</h4>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="h-16 w-16 mx-auto mb-2 text-golden-sand" />
                    <h4 className="font-bold text-slate-900">Growth</h4>
                  </div>
                  <div className="text-center">
                    <Users className="h-16 w-16 mx-auto mb-2 text-warm-coral" />
                    <h4 className="font-bold text-slate-900">People First</h4>
                  </div>
                  <div className="text-center">
                    <Star className="h-16 w-16 mx-auto mb-2 text-golden-sand" />
                    <h4 className="font-bold text-slate-900">Excellence</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                20+ Years of HR Excellence
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our team of certified HR professionals brings decades of experience across industries, helping organizations from startups to Fortune 500 companies optimize their human resources strategies.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 bg-warm-coral/10 rounded-lg">
                      <Tag className="h-6 w-6 text-warm-coral" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">Certified Experts</h3>
                    <p className="text-slate-600">SHRM-certified professionals with proven track records</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 bg-golden-sand/10 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-golden-sand" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">Proven Results</h3>
                    <p className="text-slate-600">Average 35% improvement in employee satisfaction</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 bg-warm-coral/10 rounded-lg">
                      <Handshake className="h-6 w-6 text-warm-coral" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">Partnership Approach</h3>
                    <p className="text-slate-600">We work as an extension of your internal team</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 bg-golden-sand/10 rounded-lg">
                      <Users className="h-6 w-6 text-golden-sand" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">Human-Centered</h3>
                    <p className="text-slate-600">Focus on both business results and employee wellbeing</p>
                  </div>
                </div>
              </div>
              
              <Button 
                size="lg"
                className="bg-warm-coral hover:bg-warm-coral/90 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl"
              >
                Learn More About Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success-stories" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Success Stories</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">See how we've helped organizations transform their HR operations and achieve remarkable results</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Testimonial 1 */}
            <Card className="bg-slate-50 hover:shadow-lg transition-all">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="flex text-golden-sand">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-slate-700 mb-6 italic">
                  "HumanFirst HR transformed our hiring process completely. We reduced time-to-hire by 50% and improved candidate quality significantly. Their expertise in talent acquisition is unmatched."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-warm-coral/10 flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-warm-coral" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Sarah Johnson</div>
                    <div className="text-slate-600 text-sm">CEO, TechStart Inc</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="bg-slate-50 hover:shadow-lg transition-all">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="flex text-golden-sand">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-slate-700 mb-6 italic">
                  "The performance management system they implemented has revolutionized how we develop our employees. Engagement scores increased by 40% in just six months."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-golden-sand/10 flex items-center justify-center mr-4">
                    <TrendingUp className="h-6 w-6 text-golden-sand" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Michael Chen</div>
                    <div className="text-slate-600 text-sm">HR Director, Global Manufacturing</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card className="bg-slate-50 hover:shadow-lg transition-all">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="flex text-golden-sand">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-slate-700 mb-6 italic">
                  "Their compliance expertise saved us from potential legal issues and gave us peace of mind. The policy framework they created is comprehensive yet practical."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-warm-coral/10 flex items-center justify-center mr-4">
                    <Handshake className="h-6 w-6 text-warm-coral" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Emily Rodriguez</div>
                    <div className="text-slate-600 text-sm">Operations Manager, RetailPlus</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Impact Metrics */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-12 text-center">
            <h3 className="text-2xl font-bold mb-8 text-slate-900">Our Impact by the Numbers</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2 text-warm-coral">500+</div>
                <div className="text-slate-700 font-medium">Companies Served</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2 text-warm-coral">35%</div>
                <div className="text-slate-700 font-medium">Avg. Employee Satisfaction Increase</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2 text-warm-coral">50%</div>
                <div className="text-slate-700 font-medium">Reduction in Time-to-Hire</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2 text-warm-coral">98%</div>
                <div className="text-slate-700 font-medium">Client Retention Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Ready to Transform Your HR?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Get in touch with our experts for a free consultation and discover how we can help your organization thrive</p>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5 mb-12 lg:mb-0">
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-12 h-12 bg-warm-coral/10 rounded-lg">
                          <Phone className="h-6 w-6 text-warm-coral" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-slate-900 mb-1">Phone</h4>
                        <p className="text-slate-600">(555) 123-4567</p>
                        <p className="text-slate-500 text-sm">Mon-Fri, 8am-6pm EST</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-12 h-12 bg-golden-sand/10 rounded-lg">
                          <Mail className="h-6 w-6 text-golden-sand" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-slate-900 mb-1">Email</h4>
                        <p className="text-slate-600">hello@humanfirsthr.com</p>
                        <p className="text-slate-500 text-sm">We'll respond within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-12 h-12 bg-warm-coral/10 rounded-lg">
                          <MapPin className="h-6 w-6 text-warm-coral" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-slate-900 mb-1">Office</h4>
                        <p className="text-slate-600">123 Business District<br />New York, NY 10001</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h4 className="text-lg font-semibold text-slate-900 mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-warm-coral">
                        <Linkedin className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-warm-coral">
                        <Twitter className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-warm-coral">
                        <Facebook className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-7">
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h3>
                  
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          {...form.register("firstName")}
                          className="mt-2"
                        />
                        {form.formState.errors.firstName && (
                          <p className="text-red-500 text-sm mt-1">{form.formState.errors.firstName.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          {...form.register("lastName")}
                          className="mt-2"
                        />
                        {form.formState.errors.lastName && (
                          <p className="text-red-500 text-sm mt-1">{form.formState.errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...form.register("email")}
                          className="mt-2"
                        />
                        {form.formState.errors.email && (
                          <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...form.register("phone")}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          {...form.register("company")}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="companySize">Company Size</Label>
                        <Select onValueChange={(value) => form.setValue("companySize", value)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">11-50 employees</SelectItem>
                            <SelectItem value="51-200">51-200 employees</SelectItem>
                            <SelectItem value="201-500">201-500 employees</SelectItem>
                            <SelectItem value="500+">500+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="serviceInterest">Service Interest</Label>
                      <Select onValueChange={(value) => form.setValue("serviceInterest", value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="essential">Essential Tier</SelectItem>
                          <SelectItem value="professional">Professional Tier</SelectItem>
                          <SelectItem value="enterprise">Enterprise Tier</SelectItem>
                          <SelectItem value="consultation">Free Consultation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        rows={4}
                        placeholder="Tell us about your HR challenges and goals..."
                        {...form.register("message")}
                        className="mt-2 resize-none"
                      />
                      {form.formState.errors.message && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
                      )}
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox id="privacy" required />
                      <Label htmlFor="privacy" className="text-sm text-slate-600">
                        I agree to the <button type="button" className="text-warm-coral hover:underline">Privacy Policy</button> and <button type="button" className="text-warm-coral hover:underline">Terms of Service</button> *
                      </Label>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-warm-coral hover:bg-warm-coral/90 text-white py-4 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                      disabled={createInquiryMutation.isPending}
                    >
                      {createInquiryMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <Users className="h-8 w-8 text-warm-coral mr-3" />
                <span className="text-xl font-bold">HumanFirst HR</span>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Transforming organizations through strategic HR solutions that put people first. We help businesses unlock their human potential and achieve sustainable growth.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-warm-coral">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-warm-coral">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-warm-coral">
                  <Facebook className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Services</h3>
              <ul className="space-y-3">
                <li><button className="text-slate-300 hover:text-white transition-colors">HR Strategy</button></li>
                <li><button className="text-slate-300 hover:text-white transition-colors">Talent Acquisition</button></li>
                <li><button className="text-slate-300 hover:text-white transition-colors">Performance Management</button></li>
                <li><button className="text-slate-300 hover:text-white transition-colors">Compliance</button></li>
                <li><button className="text-slate-300 hover:text-white transition-colors">Training & Development</button></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-3">
                <li><button className="text-slate-300 hover:text-white transition-colors">About Us</button></li>
                <li><button className="text-slate-300 hover:text-white transition-colors">Our Team</button></li>
                <li><button className="text-slate-300 hover:text-white transition-colors">Careers</button></li>
                <li><button className="text-slate-300 hover:text-white transition-colors">Blog</button></li>
                <li><button className="text-slate-300 hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">© 2024 HumanFirst HR. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <button className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</button>
              <button className="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</button>
              <button className="text-slate-400 hover:text-white text-sm transition-colors">Cookie Policy</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-warm-coral hover:bg-warm-coral/90 text-white shadow-lg hover:shadow-xl transition-all z-50"
          size="sm"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
