import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CheckCircle, Clock, Star, Menu, X, MessageCircle, Send, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { Service } from "@shared/schema";
import SnowflakeAnimation from "@/components/ui/snowflakes";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { useTheme } from "@/contexts/ThemeContext";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [showLoading, setShowLoading] = useState(true);
  const { currentTheme } = useTheme();

  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  // Extend loading time to show animation for at least 3 seconds
  useState(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000); // 3 seconds minimum loading time

    return () => clearTimeout(timer);
  });

  const handleBuyNow = (serviceName: string) => {
    // Discord server invite link
    const discordInviteLink = "https://discord.gg/HmSRuruGv7";
    window.open(discordInviteLink, '_blank');
  };

  const handleDiscordContact = () => {
    window.open("https://discord.gg/HmSRuruGv7", '_blank');
  };

  const handleTelegramContact = () => {
    // Join Telegram server
    window.open("https://t.me/strikexiters", '_blank');
  };

  const formatPrice = (priceInCents: number) => {
    return `$${(priceInCents / 100).toFixed(0)}`;
  };

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "Premium": return "default";
      case "Popular": return "secondary";
      case "Hot": return "destructive";
      case "ESP": return "secondary";
      case "VIP": return "destructive";
      case "Accounts": return "secondary";
      default: return "default";
    }
  };

  if (isLoading || showLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900/20 to-black relative overflow-hidden">
        <SnowflakeAnimation />
        
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/30 via-transparent to-transparent"></div>
        
        {/* Main loading container */}
        <div className="relative z-10 flex flex-col items-center space-y-8">
          {/* Logo with enhanced animations */}
          <div className="relative">
            <img 
              src="/assets/d692fdfb50225839abac00cae33f6006_1755073573630.png" 
              alt="Strike Cheats Logo" 
              className="h-24 w-24 rounded-full border-4 shadow-2xl animate-pulse-glow hover:animate-spin-slow transition-all duration-1000"
              style={{
                borderColor: `${currentTheme.primary}B3`,
                boxShadow: `0 0 40px ${currentTheme.primary}80, 0 0 80px ${currentTheme.primary}40, 0 0 120px ${currentTheme.primary}20`
              }}
            />
            {/* Rotating ring around logo */}
            <div 
              className="absolute inset-0 rounded-full border-2 border-transparent animate-spin-slow"
              style={{
                borderTopColor: currentTheme.primary,
                borderRightColor: `${currentTheme.primary}60`
              }}
            ></div>
            {/* Secondary rotating ring */}
            <div 
              className="absolute inset-[-8px] rounded-full border border-transparent animate-spin-reverse"
              style={{
                borderBottomColor: `${currentTheme.primary}40`,
                borderLeftColor: `${currentTheme.primary}20`
              }}
            ></div>
          </div>

          {/* Animated title */}
          <div className="text-center">
            <h1 
              className="text-4xl font-black text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text animate-text-shimmer tracking-wider"
              style={{fontFamily: 'Impact, Arial Black, sans-serif'}}
            >
              Strike Cheats
            </h1>
            <p className="text-gray-400 mt-2 animate-fade-in-delayed">Loading premium experience...</p>
          </div>

          {/* Advanced loading spinner */}
          <div className="relative">
            {/* Main spinner */}
            <div 
              className="w-16 h-16 rounded-full border-4 border-transparent animate-spin"
              style={{
                borderTopColor: currentTheme.primary,
                borderRightColor: `${currentTheme.primary}60`
              }}
            ></div>
            
            {/* Inner spinner */}
            <div 
              className="absolute top-2 left-2 w-12 h-12 rounded-full border-2 border-transparent animate-spin-reverse"
              style={{
                borderBottomColor: `${currentTheme.primary}80`,
                borderLeftColor: `${currentTheme.primary}40`
              }}
            ></div>
            
            {/* Pulse dot in center */}
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full animate-pulse-fast"
              style={{backgroundColor: currentTheme.primary}}
            ></div>
          </div>

          {/* Loading dots */}
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full animate-bounce-delayed"
                style={{
                  backgroundColor: currentTheme.primary,
                  animationDelay: `${i * 0.2}s`
                }}
              ></div>
            ))}
          </div>

          {/* Loading text with typewriter effect */}
          <div className="flex items-center space-x-1 text-gray-300">
            <span className="animate-typewriter">Initializing Strike Cheats</span>
            <span className="animate-blink">|</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Services</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SnowflakeAnimation />
      {/* Navigation */}
      <nav className="bg-black/80 backdrop-blur-sm border-b border-purple-500/20 sticky top-0 z-50 animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center animate-bounce-in">
              <img 
                src="/assets/d692fdfb50225839abac00cae33f6006_1755073573630.png" 
                alt="Strike Cheats Logo" 
                className="h-10 w-10 mr-3 animate-pulse-slow rounded-full border-2 shadow-lg"
                style={{
                  borderColor: `${currentTheme.primary}80`,
                  boxShadow: `0 0 10px ${currentTheme.primary}40`
                }}
              />
              <span className="text-xl font-bold text-white tracking-wider" style={{fontFamily: 'Orbitron, Impact, Arial Black, sans-serif', textShadow: `0 0 10px ${currentTheme.primary}60`}}>Strike Cheats</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 animate-slide-in-left" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
              <a href="#services" className="text-gray-300 hover:text-primary transition-all duration-300 hover:scale-110">Products</a>
              <a href="#about" className="text-gray-300 hover:text-primary transition-all duration-300 hover:scale-110">About</a>
              <Button 
                className="bg-primary hover:bg-primary-dark text-white flex items-center space-x-1 transition-all duration-300 transform hover:scale-105 px-3 py-2 text-sm" 
                onClick={handleDiscordContact}
                data-testid="button-discord"
              >
                <MessageCircle className="h-3 w-3" />
                <span>Discord</span>
              </Button>
              <ThemeSwitcher />
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-white flex items-center space-x-1 transition-all duration-300 transform hover:scale-105 px-3 py-2 text-sm"
                onClick={handleTelegramContact}
                data-testid="button-telegram"
              >
                <Send className="w-3 h-3" />
                <span>Telegram</span>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:text-primary"
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t bg-gradient-to-b from-black/95 via-purple-900/20 to-black/95 backdrop-blur-md animate-slide-in-down shadow-2xl"
                 style={{
                   borderColor: `${currentTheme.primary}30`,
                   boxShadow: `0 8px 32px ${currentTheme.primary}20`
                 }}>
              <div className="px-4 pt-4 pb-6 space-y-4">
                {/* Navigation Links */}
                <div className="space-y-2">
                  <a 
                    href="#services" 
                    className="flex items-center px-4 py-3 text-gray-300 hover:text-white rounded-xl transition-all duration-300 hover:scale-105 group"
                    style={{
                      backgroundColor: `${currentTheme.primary}10`,
                      border: `1px solid ${currentTheme.primary}20`
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-medium">Products</span>
                    <div className="ml-auto w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150"
                         style={{backgroundColor: currentTheme.primary}}></div>
                  </a>
                  <a 
                    href="#about" 
                    className="flex items-center px-4 py-3 text-gray-300 hover:text-white rounded-xl transition-all duration-300 hover:scale-105 group"
                    style={{
                      backgroundColor: `${currentTheme.primary}10`,
                      border: `1px solid ${currentTheme.primary}20`
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-medium">About</span>
                    <div className="ml-auto w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150"
                         style={{backgroundColor: currentTheme.primary}}></div>
                  </a>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent my-4"></div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    className="w-full text-white flex items-center justify-center space-x-3 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg" 
                    style={{
                      background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.primary}CC)`,
                      boxShadow: `0 4px 20px ${currentTheme.primary}40`
                    }}
                    onClick={() => {
                      handleDiscordContact();
                      setMobileMenuOpen(false);
                    }}
                    data-testid="button-mobile-discord"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Join Discord</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full text-white flex items-center justify-center space-x-3 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
                    style={{
                      borderColor: `${currentTheme.primary}60`,
                      backgroundColor: `${currentTheme.primary}15`,
                      color: currentTheme.primary
                    }}
                    onClick={() => {
                      handleTelegramContact();
                      setMobileMenuOpen(false);
                    }}
                    data-testid="button-mobile-telegram"
                  >
                    <Send className="w-5 h-5" />
                    <span>Join Telegram</span>
                  </Button>
                </div>

                {/* Theme Switcher */}
                <div className="pt-2">
                  <div className="flex items-center justify-center p-3 rounded-xl"
                       style={{
                         backgroundColor: `${currentTheme.primary}10`,
                         border: `1px solid ${currentTheme.primary}20`
                       }}>
                    <ThemeSwitcher />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 flex justify-center">
            <img 
              src="/assets/d692fdfb50225839abac00cae33f6006_1755073573630.png" 
              alt="Strike Cheats Logo" 
              className="h-20 w-20 rounded-full border-4 shadow-2xl animate-bounce-slow hover:animate-spin-slow transition-all duration-500 glow-effect"
              style={{
                borderColor: `${currentTheme.primary}B3`,
                boxShadow: `0 0 30px ${currentTheme.primary}60, 0 0 60px ${currentTheme.primary}40`
              }}
            />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-primary mb-6 animate-fade-in-up animate-text-glow tracking-wider text-center" style={{fontFamily: 'Impact, Arial Black, sans-serif'}}>
            Strike Cheats
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto animate-slide-in-left" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
            Dominate the battlefield with our undetectable Strike Cheats. Advanced features, instant delivery, and guaranteed performance.
          </p>
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-400 animate-bounce-in" style={{animationDelay: '0.6s', animationFillMode: 'both'}}>
            <div className="flex items-center">
              <CheckCircle className="text-green-400 mr-2 h-4 w-4" />
              <span>Undetectable</span>
            </div>
            <div className="flex items-center">
              <Clock className="text-blue-400 mr-2 h-4 w-4" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center">
              <Star className="text-yellow-400 mr-2 h-4 w-4" />
              <span>5-Star Rated</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text mb-4" style={{fontFamily: 'Impact, Arial Black, sans-serif'}}>
              Premium Strike Cheats
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Choose from our comprehensive range of Strike Cheats designed to dominate every match
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.map((service) => (
              <Card 
                key={service.id} 
                className="backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border animate-fade-in-up"
                data-testid={`card-service-${service.id}`}
                style={{
                  backgroundColor: `${currentTheme.card}99`,
                  borderColor: `${currentTheme.primary}30`,
                  boxShadow: `0 4px 6px ${currentTheme.primary}15, 0 1px 3px ${currentTheme.primary}08`,
                  animationDelay: `${0.1 * (services.indexOf(service) + 1)}s`, 
                  animationFillMode: 'both'
                }}
              >
                <img 
                  src={service.imageUrl} 
                  alt={service.title}
                  className="w-full h-48 object-cover rounded-t-2xl" 
                />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white" data-testid={`text-title-${service.id}`}>
                      {service.title}
                    </h3>
                    {service.badge && (
                      <Badge variant={getBadgeVariant(service.badge)} data-testid={`badge-${service.id}`}>
                        {service.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-300 mb-4" data-testid={`text-description-${service.id}`}>
                    {service.description}
                  </p>
                  <ul className="text-sm text-gray-400 mb-6 space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="text-green-400 mr-2 h-4 w-4" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-primary" data-testid={`text-price-${service.id}`}>
                      {formatPrice(service.price)}
                    </span>
                    <Button 
                      className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-110 animate-pulse-slow"
                      onClick={() => handleBuyNow(service.title)}
                      data-testid={`button-buy-${service.id}`}
                    >
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="bg-purple-900/20 backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Trusted by Elite Gamers</h2>
            <p className="text-gray-300">Join thousands of satisfied Strike Cheats users worldwide</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
            <div className="text-center animate-bounce-in" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
              <div className="text-3xl font-bold text-primary animate-pulse-slow">10K+</div>
              <div className="text-gray-300">Active Users</div>
            </div>
            <div className="text-center animate-bounce-in" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
              <div className="text-3xl font-bold text-primary animate-pulse-slow">99.9%</div>
              <div className="text-gray-300">Undetected Rate</div>
            </div>
            <div className="text-center animate-bounce-in" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
              <div className="text-3xl font-bold text-primary animate-pulse-slow">24/7</div>
              <div className="text-gray-300">Support Available</div>
            </div>
            <div className="text-center animate-bounce-in" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
              <div className="text-3xl font-bold text-primary animate-pulse-slow">5★</div>
              <div className="text-gray-300">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-black/80 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 animate-bounce-in">
            <h2 className="text-2xl font-bold text-white mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-400 text-sm">Everything you need to know about our services</p>
          </div>

          <div className="space-y-2">
            {[
              {
                question: "Are your cheats undetected?",
                answer: "Yes, all our cheats are regularly updated and use advanced protection methods to remain undetected. We have a 99.9% success rate."
              },
              {
                question: "Do you offer refunds?",
                answer: "We offer refunds within 24 hours of purchase if you're not satisfied with our product. Contact our support team for assistance."
              },
              {
                question: "How do I get started?",
                answer: "Simply choose your desired package, make the payment, and join our Telegram server. Our team will provide you with download links and setup instructions."
              },
              {
                question: "What games do you support?",
                answer: "We currently support multiple games through Strike Cheats. Contact our support team for the latest game compatibility list."
              },
              {
                question: "Is customer support available?",
                answer: "Yes, we provide 24/7 customer support through our Telegram server. Our experienced team is always ready to help."
              }
            ].map((faq, index) => (
              <Collapsible 
                key={index}
                open={openFAQ === index}
                onOpenChange={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-gradient-to-r from-gray-900/60 to-gray-800/60 rounded-xl hover:from-gray-800/70 hover:to-gray-700/70 transition-all duration-300 text-left border border-gray-700/50 hover:border-primary/30">
                  <span className="text-sm font-medium text-white">{faq.question}</span>
                  <ChevronDown className={`h-4 w-4 text-primary transition-transform duration-300 ${openFAQ === index ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-3 pb-3 text-gray-300 text-xs leading-relaxed">
                  <div className="mt-2 p-2 bg-gray-900/40 rounded-lg border-l-2 border-primary/50">
                    {faq.answer}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-purple-900/30 via-black to-purple-800/30 text-white py-16 border-t border-purple-500/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center mb-6">
                <img 
                  src="/assets/d692fdfb50225839abac00cae33f6006_1755073573630.png" 
                  alt="Strike Cheats Logo" 
                  className="h-8 w-8 mr-3 rounded-full border shadow-lg"
                  style={{
                    borderColor: `${currentTheme.primary}60`,
                    boxShadow: `0 0 8px ${currentTheme.primary}40`
                  }}
                />
                <span className="text-xl font-bold" style={{fontFamily: 'Orbitron, Impact, Arial Black, sans-serif', color: currentTheme.primary}}>Strike Cheats</span>
              </div>
              <p className="text-gray-400 mb-4">Premium Strike Cheats for elite gamers worldwide.</p>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="text-green-400 h-4 w-4" />
                <span className="text-gray-300">Trusted by 10K+ users</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-white text-lg" style={{color: currentTheme.primary}}>Products</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-primary transition-colors cursor-pointer">Premium Hacks</li>
                <li className="hover:text-primary transition-colors cursor-pointer">VIP Features</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Mobile Optimizer</li>
                <li className="hover:text-primary transition-colors cursor-pointer">ESP & Aimbot</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-white text-lg" style={{color: currentTheme.primary}}>Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-primary transition-colors cursor-pointer">Installation Guide</li>
                <li className="hover:text-primary transition-colors cursor-pointer">24/7 Support</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Refund Policy</li>
                <li className="hover:text-primary transition-colors cursor-pointer">FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-white text-lg" style={{color: currentTheme.primary}}>Connect</h4>
              <div className="space-y-4">
                <div 
                  className="flex items-center space-x-3 text-gray-300 hover:text-primary cursor-pointer transition-all duration-300 transform hover:scale-105"
                  onClick={handleDiscordContact}
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Discord Community</span>
                </div>
                <div 
                  className="flex items-center space-x-3 text-gray-300 hover:text-primary cursor-pointer transition-all duration-300 transform hover:scale-105"
                  onClick={handleTelegramContact}
                >
                  <Send className="h-5 w-5" />
                  <span>Telegram Channel</span>
                </div>
              </div>
              
            </div>
          </div>
          
          <div className="border-t border-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="flex items-center space-x-2">
                  <Star className="text-yellow-400 h-4 w-4" />
                  <span className="text-sm text-gray-300">5-Star Rated Service</span>
                </div>
                <div className="w-1 h-4 bg-gray-600 rounded-full"></div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-green-400 h-4 w-4" />
                  <span className="text-sm text-gray-300">99.9% Undetected</span>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <p className="text-sm text-gray-400">
                  Made with <span className="text-red-500 animate-pulse">♡</span> by{' '}
                  <span 
                    className="font-bold text-lg tracking-wider animate-pulse-slow hover:scale-110 inline-block transition-transform duration-300"
                    style={{
                      color: currentTheme.primary,
                      textShadow: `0 0 10px ${currentTheme.primary}60`,
                      fontFamily: 'Impact, Arial Black, sans-serif'
                    }}
                  >
                    D4RK Exe⁷
                  </span>
                </p>
                <p className="text-xs text-gray-500 mt-1">© 2024 Strike Cheats. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}