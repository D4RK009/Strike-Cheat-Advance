import { Button } from "@/components/ui/button";
import { Shield, Users, Star, Zap, MessageCircle, TrendingUp, Award } from "lucide-react";

interface EnhancedHeroProps {
  onViewProducts: () => void;
  onJoinCommunity: () => void;
}

export function EnhancedHero({ onViewProducts, onJoinCommunity }: EnhancedHeroProps) {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-900/50 to-blue-900/20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <img 
                src="/assets/d692fdfb50225839abac00cae33f6006_1755073573630.png" 
                alt="Strike Cheats Logo" 
                className="h-20 w-20 rounded-full border-2 border-purple-500/50 shadow-2xl"
              />
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-20 blur-lg"></div>
            </div>
          </div>
          
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Elite Gaming
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Advantage
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Professional-grade gaming enhancements with undetectable technology. 
            <br className="hidden md:block" />
            Join <strong className="text-white">10,000+</strong> elite gamers worldwide.
          </p>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-slate-400 mb-12">
            <div className="flex items-center space-x-3 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2">
              <Shield className="text-green-400 h-5 w-5" />
              <span className="font-medium">99.9% Undetected</span>
            </div>
            <div className="flex items-center space-x-3 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2">
              <Users className="text-blue-400 h-5 w-5" />
              <span className="font-medium">10K+ Active Users</span>
            </div>
            <div className="flex items-center space-x-3 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2">
              <Star className="text-yellow-400 h-5 w-5" />
              <span className="font-medium">5-Star Support</span>
            </div>
            <div className="flex items-center space-x-3 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2">
              <Award className="text-purple-400 h-5 w-5" />
              <span className="font-medium">Trusted Platform</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
              onClick={onViewProducts}
            >
              <Zap className="mr-2 h-5 w-5" />
              Explore Products
            </Button>
            <Button 
              variant="outline"
              size="lg" 
              className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105"
              onClick={onJoinCommunity}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Join Community
            </Button>
          </div>

          {/* Secondary info */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Instant delivery & setup</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-slate-600 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>24/7 premium support</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-slate-600 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}