import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ExternalLink, Sparkles } from "lucide-react";
import type { Service } from "@shared/schema";

interface ServiceCardProps {
  service: Service;
  onBuyNow: (serviceName: string) => void;
  index?: number;
}

export function ServiceCard({ service, onBuyNow, index = 0 }: ServiceCardProps) {
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

  const isPopular = service.badge === "Popular";
  const isVip = service.badge === "VIP";

  return (
    <Card 
      className={`
        bg-slate-800 border-slate-700 hover:border-purple-500/50 
        transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 
        group relative overflow-hidden
        ${isPopular ? 'ring-2 ring-purple-500/50' : ''}
        ${isVip ? 'ring-2 ring-yellow-500/50' : ''}
      `}
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      {/* Popular/VIP indicator */}
      {(isPopular || isVip) && (
        <div className={`
          absolute top-3 left-3 z-10 flex items-center gap-1 px-2 py-1 
          rounded-full text-xs font-medium backdrop-blur-sm
          ${isPopular ? 'bg-purple-500/90 text-white' : 'bg-yellow-500/90 text-black'}
        `}>
          <Sparkles className="h-3 w-3" />
          {isPopular ? 'Most Popular' : 'VIP'}
        </div>
      )}

      {/* Image section with overlay */}
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={service.imageUrl} 
          alt={service.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" 
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Price overlay on hover */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-lg px-3 py-2">
            <span className="text-purple-400 font-bold text-lg">
              {formatPrice(service.price)}
            </span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-1">
            {service.title}
          </h3>
          {service.badge && (
            <Badge variant={getBadgeVariant(service.badge)} className="ml-2 flex-shrink-0">
              {service.badge}
            </Badge>
          )}
        </div>
        
        {/* Description */}
        <p className="text-slate-300 mb-4 line-clamp-2 leading-relaxed">
          {service.description}
        </p>
        
        {/* Features */}
        <div className="space-y-2 mb-6">
          {service.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center text-sm">
              <CheckCircle className="text-green-400 mr-2 h-4 w-4 flex-shrink-0" />
              <span className="text-slate-300 truncate">{feature}</span>
            </div>
          ))}
          {service.features.length > 3 && (
            <div className="text-xs text-slate-400 ml-6">
              +{service.features.length - 3} more features
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-purple-400">
              {formatPrice(service.price)}
            </span>
            <span className="text-xs text-slate-500">One-time purchase</span>
          </div>
          
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 hover:scale-105 group/btn"
            onClick={() => onBuyNow(service.title)}
          >
            Get Access
            <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
          </Button>
        </div>
        
        {/* Category tag */}
        <div className="mt-3 pt-3 border-t border-slate-700/30">
          <span className="text-xs text-slate-500 uppercase tracking-wider">
            {service.category}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}