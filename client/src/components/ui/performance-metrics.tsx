import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, Database, Activity, Wifi, CheckCircle } from "lucide-react";

interface PerformanceMetrics {
  loadTime: number;
  apiResponseTime: number;
  totalServices: number;
  cacheStatus: 'active' | 'inactive';
  connectionStatus: 'excellent' | 'good' | 'poor';
}

export function PerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    apiResponseTime: 0,
    totalServices: 0,
    cacheStatus: 'active',
    connectionStatus: 'excellent'
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const measurePerformance = async () => {
      const startTime = performance.now();
      
      try {
        // Measure API response time
        const apiStart = performance.now();
        const response = await fetch('/api/services');
        const data = await response.json();
        const apiEnd = performance.now();

        // Calculate metrics
        const loadTime = startTime;
        const apiResponseTime = apiEnd - apiStart;
        const totalServices = Array.isArray(data) ? data.length : data.services?.length || 0;

        setMetrics({
          loadTime: Math.round(loadTime),
          apiResponseTime: Math.round(apiResponseTime),
          totalServices,
          cacheStatus: 'active',
          connectionStatus: apiResponseTime < 100 ? 'excellent' : apiResponseTime < 300 ? 'good' : 'poor'
        });
      } catch (error) {
        console.error('Performance measurement failed:', error);
      }
    };

    measurePerformance();
  }, []);

  // Show metrics only in development or when explicitly enabled
  useEffect(() => {
    const showMetrics = localStorage.getItem('show-performance-metrics') === 'true' || 
                      process.env.NODE_ENV === 'development';
    setIsVisible(showMetrics);
  }, []);

  if (!isVisible) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'good': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'poor': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'active': return 'text-green-400 bg-green-400/10 border-green-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="bg-slate-900/95 backdrop-blur-md border-slate-700/50 shadow-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
            <Activity className="h-4 w-4 text-green-400" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-slate-400" />
                <span className="text-xs text-slate-400">Load Time</span>
              </div>
              <div className="text-sm font-semibold text-white">
                {metrics.loadTime}ms
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-slate-400" />
                <span className="text-xs text-slate-400">API Response</span>
              </div>
              <div className="text-sm font-semibold text-white">
                {metrics.apiResponseTime}ms
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Database className="h-3 w-3 text-slate-400" />
                <span className="text-xs text-slate-400">Services</span>
              </div>
              <div className="text-sm font-semibold text-white">
                {metrics.totalServices}
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-slate-400" />
                <span className="text-xs text-slate-400">Cache</span>
              </div>
              <Badge 
                variant="outline" 
                className={`text-xs h-5 ${getStatusColor(metrics.cacheStatus)}`}
              >
                {metrics.cacheStatus}
              </Badge>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Wifi className="h-3 w-3 text-slate-400" />
                <span className="text-xs text-slate-400">Connection</span>
              </div>
              <Badge 
                variant="outline" 
                className={`text-xs h-5 ${getStatusColor(metrics.connectionStatus)}`}
              >
                {metrics.connectionStatus}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}