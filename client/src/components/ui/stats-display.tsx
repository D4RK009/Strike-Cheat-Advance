import { Shield, Users, Star, Award, TrendingUp, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface StatsData {
  totalProducts: number;
  categories: number;
  averagePrice: number;
  priceRange: {
    min: number;
    max: number;
  };
  badgeDistribution: Record<string, number>;
}

export function StatsDisplay() {
  const { data: stats } = useQuery<StatsData>({
    queryKey: ["/api/stats"],
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const displayStats = [
    {
      icon: Users,
      label: "Active Users",
      value: "10K+",
      color: "text-blue-400",
      description: "Trusted worldwide"
    },
    {
      icon: Shield,
      label: "Undetected Rate",
      value: "99.9%",
      color: "text-green-400",
      description: "Proven security"
    },
    {
      icon: Clock,
      label: "Support Available",
      value: "24/7",
      color: "text-purple-400",
      description: "Always here to help"
    },
    {
      icon: Star,
      label: "Average Rating",
      value: "5★",
      color: "text-yellow-400",
      description: "Excellent service"
    },
    {
      icon: Award,
      label: "Years Experience",
      value: "5+",
      color: "text-pink-400",
      description: "Industry leaders"
    },
    {
      icon: TrendingUp,
      label: "Success Rate",
      value: "98%",
      color: "text-cyan-400",
      description: "Proven results"
    }
  ];

  return (
    <section className="bg-slate-800/50 backdrop-blur-sm py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Trusted Worldwide</h2>
          <p className="text-slate-400 text-lg">Join the elite gaming community that dominates</p>
          {stats && (
            <div className="mt-4 text-sm text-slate-500">
              Featuring {stats.totalProducts} premium products across {stats.categories} categories
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {displayStats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both'
              }}
            >
              <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-colors">
                <stat.icon className={`${stat.color} h-8 w-8 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`} />
                <div className="text-2xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                  {stat.value}
                </div>
                <div className="text-slate-300 text-sm font-medium mb-1">
                  {stat.label}
                </div>
                <div className="text-slate-500 text-xs">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional trust indicators */}
        <div className="mt-16 pt-12 border-t border-slate-700/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-400">Instant</div>
              <div className="text-slate-300">Delivery & Activation</div>
              <div className="text-sm text-slate-500">Get started in minutes</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-400">Secure</div>
              <div className="text-slate-300">Payment Processing</div>
              <div className="text-sm text-slate-500">Your data is protected</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-400">Expert</div>
              <div className="text-slate-300">Development Team</div>
              <div className="text-sm text-slate-500">Continuous innovation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}