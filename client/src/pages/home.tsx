import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CheckCircle, Clock, Star, Menu, X, MessageCircle, Send, ChevronDown, Shield, Users, Award } from "lucide-react";
import { useState, useMemo, Suspense, lazy } from "react";
import type { Service } from "@shared/schema";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { useTheme } from "@/contexts/ThemeContext";
import { SearchFilter } from "@/components/ui/search-filter";
import { ServiceCard } from "@/components/ui/service-card";
import { EnhancedHero } from "@/components/ui/enhanced-hero";
import { PageLoadingSkeleton, ServiceCardSkeleton } from "@/components/ui/loading-skeleton";
import { ContactModal } from "@/components/ui/contact-modal";
import { StatsDisplay } from "@/components/ui/stats-display";

// Lazy load heavy components for better performance
const SnowflakeAnimation = lazy(() => import("@/components/ui/snowflakes"));

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [showLoading, setShowLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { currentTheme } = useTheme();

  const { data: servicesData, isLoading, error } = useQuery<{services: Service[], total: number}>({
    queryKey: ["/api/services"],
    select: (data) => Array.isArray(data) ? { services: data, total: data.length } : data
  });

  const services = servicesData?.services || [];

  // Extend loading time to show animation for at least 2 seconds (reduced from 3)
  useState(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  });

  // Enhanced search and filter functionality
  const filteredServices = useMemo(() => {
    if (!services) return [];
    
    return services.filter(service => {
      const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === "all" || service.category.toLowerCase() === selectedCategory.toLowerCase();
      
      return matchesSearch && matchesCategory;
    });
  }, [services, searchQuery, selectedCategory]);

  const categories = useMemo(() => {
    if (!services) return [];
    const cats = [...new Set(services.map(s => s.category))];
    return ["all", ...cats];
  }, [services]);

  const handleBuyNow = (serviceName: string) => {
    const discordInviteLink = "https://discord.gg/HmSRuruGv7";
    window.open(discordInviteLink, '_blank');
  };

  const handleDiscordContact = () => {
    window.open("https://discord.gg/HmSRuruGv7", '_blank');
  };

  const handleTelegramContact = () => {
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

  // Show loading skeleton while data is loading (performance optimized)
  if (isLoading || showLoading) {
    return <PageLoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center p-8 bg-slate-800 rounded-xl border border-slate-700">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Connection Error</h1>
          <p className="text-slate-300">Please check your connection and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Suspense fallback={null}>
        <SnowflakeAnimation />
      </Suspense>
      
      {/* Modern Navigation */}
      <nav className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/assets/d692fdfb50225839abac00cae33f6006_1755073573630.png" 
                alt="Strike Cheats Logo" 
                className="h-8 w-8 rounded-full border border-slate-600"
              />
              <span className="text-lg font-semibold text-white">Strike Cheats</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#services" className="text-slate-300 hover:text-white transition-colors">Products</a>
              <a href="#about" className="text-slate-300 hover:text-white transition-colors">About</a>
              <Button 
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white" 
                onClick={handleDiscordContact}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Discord
              </Button>
              <ThemeSwitcher />
              <Button 
                variant="outline" 
                size="sm"
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
                onClick={handleTelegramContact}
              >
                <Send className="w-4 h-4 mr-2" />
                Telegram
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-slate-700 bg-slate-900/98 backdrop-blur-md">
              <div className="px-4 pt-4 pb-6 space-y-4">
                <div className="space-y-2">
                  <a 
                    href="#services" 
                    className="flex items-center px-4 py-3 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Products
                  </a>
                  <a 
                    href="#about" 
                    className="flex items-center px-4 py-3 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </a>
                </div>

                <div className="border-t border-slate-700 pt-4 space-y-3">
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white" 
                    onClick={() => {
                      handleDiscordContact();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Join Discord
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-slate-600 text-slate-300 hover:bg-slate-800"
                    onClick={() => {
                      handleTelegramContact();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Join Telegram
                  </Button>
                </div>

                <div className="flex justify-center pt-2">
                  <ThemeSwitcher />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Hero Section with new component */}
      <EnhancedHero 
        onViewProducts={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
        onJoinCommunity={handleDiscordContact}
      />

      {/* Enhanced Search and Filter Section */}
      <section className="py-12 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            resultCount={filteredServices.length}
          />
        </div>
      </section>

      {/* Enhanced Services Grid with new components */}
      <section id="services" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Premium Gaming Solutions
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Choose from our comprehensive range of professional gaming enhancements
            </p>
          </div>

          {filteredServices.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
                <p className="text-slate-400 mb-6">
                  Try adjusting your search terms or category filter to find what you're looking for.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="border-slate-600 text-slate-300 hover:bg-slate-800"
                >
                  Clear filters
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Suspense fallback={
                Array.from({ length: 6 }).map((_, i) => <ServiceCardSkeleton key={i} />)
              }>
                {filteredServices.map((service, index) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onBuyNow={handleBuyNow}
                    index={index}
                  />
                ))}
              </Suspense>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Stats Section with new component */}
      <StatsDisplay />

      {/* Enhanced FAQ Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-400">Everything you need to know about our services</p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Are your enhancements undetected?",
                answer: "Yes, all our solutions use advanced protection methods and are regularly updated to maintain a 99.9% undetected rate. We continuously monitor detection systems and update our software accordingly."
              },
              {
                question: "What's your refund policy?",
                answer: "We offer full refunds within 24 hours of purchase if you're not satisfied. Our support team is available to help with any issues or concerns you may have."
              },
              {
                question: "How do I get started?",
                answer: "Simply choose your desired package, complete the payment, and join our support server. Our team will provide download links, setup instructions, and ongoing support."
              },
              {
                question: "Which games are supported?",
                answer: "We support multiple popular games with regular updates and new game additions. Contact our support team for the latest compatibility list and upcoming releases."
              },
              {
                question: "Is customer support really 24/7?",
                answer: "Absolutely! Our experienced support team is available around the clock through our Discord and Telegram channels to assist with any questions or technical issues."
              }
            ].map((faq, index) => (
              <Collapsible 
                key={index}
                open={openFAQ === index}
                onOpenChange={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-200 text-left border border-slate-700 hover:border-slate-600">
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${openFAQ === index ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4">
                  <div className="pt-3 text-slate-300 leading-relaxed bg-slate-800/50 p-4 rounded-b-lg -mt-1">
                    {faq.answer}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-slate-800 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src="/assets/d692fdfb50225839abac00cae33f6006_1755073573630.png" 
                  alt="Strike Cheats Logo" 
                  className="h-6 w-6 mr-2 rounded-full"
                />
                <span className="text-lg font-semibold text-white">Strike Cheats</span>
              </div>
              <p className="text-slate-400 mb-4">Professional gaming enhancements for elite players worldwide.</p>
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="text-green-400 h-4 w-4" />
                <span className="text-slate-300">Trusted by 10K+ gamers</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Products</h4>
              <ul className="space-y-2 text-slate-400">
                <li className="hover:text-white transition-colors cursor-pointer">Aimbot Systems</li>
                <li className="hover:text-white transition-colors cursor-pointer">ESP Features</li>
                <li className="hover:text-white transition-colors cursor-pointer">Mobile Mods</li>
                <li className="hover:text-white transition-colors cursor-pointer">VIP Access</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li className="hover:text-white transition-colors cursor-pointer">Setup Guide</li>
                <li className="hover:text-white transition-colors cursor-pointer">24/7 Support</li>
                <li className="hover:text-white transition-colors cursor-pointer">Refund Policy</li>
                <li className="hover:text-white transition-colors cursor-pointer">FAQ</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Community</h4>
              <div className="space-y-3">
                <div 
                  className="flex items-center space-x-2 text-slate-300 hover:text-white cursor-pointer transition-colors"
                  onClick={handleDiscordContact}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Discord Server</span>
                </div>
                <div 
                  className="flex items-center space-x-2 text-slate-300 hover:text-white cursor-pointer transition-colors"
                  onClick={handleTelegramContact}
                >
                  <Send className="h-4 w-4" />
                  <span>Telegram Group</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="flex items-center space-x-2">
                  <Star className="text-yellow-400 h-4 w-4" />
                  <span className="text-sm text-slate-300">5-Star Service</span>
                </div>
                <div className="w-1 h-4 bg-slate-600 rounded-full"></div>
                <div className="flex items-center space-x-2">
                  <Shield className="text-green-400 h-4 w-4" />
                  <span className="text-sm text-slate-300">Secure & Safe</span>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <p className="text-sm text-slate-400">
                  © 2024 Strike Cheats. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}