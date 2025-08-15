import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all services with optional filtering and search
  app.get("/api/services", async (req, res) => {
    try {
      const { search, category, limit, offset } = req.query;
      let services = await storage.getAllServices();
      
      // Apply search filter if provided
      if (search && typeof search === 'string') {
        const searchLower = search.toLowerCase();
        services = services.filter(service => 
          service.title.toLowerCase().includes(searchLower) ||
          service.description.toLowerCase().includes(searchLower) ||
          service.features.some(feature => feature.toLowerCase().includes(searchLower)) ||
          service.category.toLowerCase().includes(searchLower)
        );
      }
      
      // Apply category filter if provided
      if (category && typeof category === 'string' && category !== 'all') {
        services = services.filter(service => 
          service.category.toLowerCase() === category.toLowerCase()
        );
      }
      
      // Apply pagination if provided
      const startIndex = offset ? parseInt(offset as string, 10) : 0;
      const maxResults = limit ? parseInt(limit as string, 10) : services.length;
      
      if (startIndex > 0 || maxResults < services.length) {
        services = services.slice(startIndex, startIndex + maxResults);
      }
      
      // For backward compatibility, return array format if no query params
      if (!search && !category && !limit && !offset) {
        res.json(services);
      } else {
        // Add metadata for frontend when using filtering/pagination
        res.json({
          services,
          total: services.length,
          hasMore: startIndex + maxResults < services.length
        });
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  // Get service categories
  app.get("/api/categories", async (req, res) => {
    try {
      const services = await storage.getAllServices();
      const categories = [...new Set(services.map(s => s.category))];
      res.json({ categories });
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Get popular/featured services (must be before :id route)
  app.get("/api/services/featured", async (req, res) => {
    try {
      const services = await storage.getAllServices();
      const featuredServices = services.filter(service => 
        service.badge === 'Popular' || service.badge === 'VIP' || service.badge === 'Hot'
      );
      res.json(featuredServices);
    } catch (error) {
      console.error('Error fetching featured services:', error);
      res.status(500).json({ message: "Failed to fetch featured services" });
    }
  });

  // Get single service with detailed information
  app.get("/api/services/:id", async (req, res) => {
    try {
      const service = await storage.getService(req.params.id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      console.error('Error fetching service:', error);
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  // Get service statistics
  app.get("/api/stats", async (req, res) => {
    try {
      const services = await storage.getAllServices();
      const stats = {
        totalProducts: services.length,
        categories: [...new Set(services.map(s => s.category))].length,
        averagePrice: services.reduce((sum, s) => sum + s.price, 0) / services.length,
        priceRange: {
          min: Math.min(...services.map(s => s.price)),
          max: Math.max(...services.map(s => s.price))
        },
        badgeDistribution: services.reduce((acc, service) => {
          const badge = service.badge || 'None';
          acc[badge] = (acc[badge] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      };
      res.json(stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "healthy", 
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage()
    });
  });

  // Contact/inquiry endpoint (mock)
  app.post("/api/contact", (req, res) => {
    const { name, email, message, service } = req.body;
    
    // In a real app, this would send an email or store in database
    console.log('Contact inquiry received:', { name, email, service });
    
    res.json({ 
      success: true, 
      message: "Thank you for your inquiry. We'll get back to you soon!",
      reference: `REF-${Date.now()}`
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}