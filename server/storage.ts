import { type User, type InsertUser, type Service, type InsertService } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  getServicesByCategory(category: string): Promise<Service[]>;
  searchServices(query: string): Promise<Service[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private services: Map<string, Service>;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.initializeServices();
  }

  private initializeServices() {
    const initialServices: InsertService[] = [
      {
        title: "Advanced Precision Aimbot",
        description: "Next-generation neck targeting system with AI-powered precision tracking for instant eliminations. Features advanced prediction algorithms and customizable targeting zones.",
        price: 1499, // $14.99
        imageUrl: "/assets/file_00000000cbf06230882a04d9be45430c_1755072745113.png",
        category: "Aimbot",
        features: ["AI-Powered Targeting", "Neck & Head Precision", "Prediction Algorithms", "Undetectable Anti-Cheat", "Customizable Settings", "Instant Activation"],
        badge: "Premium"
      },
      {
        title: "Professional Drag System",
        description: "Professional-grade drag-and-shoot system designed for competitive gameplay. Delivers consistent accuracy with natural mouse movement patterns.",
        price: 1299, // $12.99
        imageUrl: "/assets/file_000000001dc861fb965e40358456c004_1755072762575.png",
        category: "Aimbot",
        features: ["Natural Movement Patterns", "Drag System Technology", "Perfect Accuracy", "Quick Scope Support", "Anti-Detection Shield", "Pro Player Settings"],
        badge: "Popular"
      },
      {
        title: "Smart Auto-Convert",
        description: "Intelligent body-to-headshot conversion system that automatically optimizes your shots for maximum damage output with seamless integration.",
        price: 999, // $9.99
        imageUrl: "/assets/file_00000000bd48620ab92f92738d193ece_1755072776227.png",
        category: "Aimbot",
        features: ["Smart Conversion", "Damage Optimization", "Body to Head Auto", "Silent Operation", "Instant Results", "Smart Detection Bypass"],
        badge: "Hot"
      },
      {
        title: "Elite ESP System",
        description: "Advanced holographic enemy detection system with wall penetration technology. See through any surface with detailed enemy information display.",
        price: 1000, // $10.00
        imageUrl: "/assets/file_0000000062b861f8bbf45c64187797e6_1755072788109.png",
        category: "ESP",
        features: ["Holographic Display", "Wall Penetration", "Enemy Health Info", "Distance Calculator", "Weapon Detection", "Team Recognition"],
        badge: "ESP"
      },
      {
        title: "Ultimate iOS Mod Suite",
        description: "Complete mobile gaming modification suite for iOS devices. Includes all premium features with an intuitive interface and cloud synchronization.",
        price: 1999, // $19.99
        imageUrl: "/assets/file_000000008f70622f870a6bceff3f87a3_1755072798725.png",
        category: "Mobile",
        features: ["All Premium Features", "iOS Optimization", "Cloud Sync", "Custom Interface", "Regular Updates", "Multi-Game Support"],
        badge: "VIP"
      },
      {
        title: "VIP Elite Membership",
        description: "Exclusive access to our premium community with advanced features, priority support, early access to new releases, and VIP-only content.",
        price: 2499, // $24.99
        imageUrl: "/assets/file_00000000db8061f8b25f402042c93720_1755143389974.png",
        category: "Premium",
        features: ["VIP Community Access", "Priority Support", "Early Access Features", "Exclusive Content", "Personal Account Manager", "Lifetime Updates"],
        badge: "VIP"
      },
      {
        title: "Velocity Optimizer",
        description: "Advanced movement and speed optimization system that enhances player mobility without triggering anti-cheat systems.",
        price: 899, // $8.99
        imageUrl: "/assets/file_00000000cbf06230882a04d9be45430c_1755072745113.png",
        category: "Enhancement",
        features: ["Speed Optimization", "Movement Enhancement", "Jump Boost", "Slide Improvement", "Natural Physics", "Anti-Detection"],
        badge: "New"
      },
      {
        title: "Tactical Radar Pro",
        description: "Professional-grade minimap enhancement with real-time enemy positioning, movement prediction, and tactical overlay systems.",
        price: 1199, // $11.99
        imageUrl: "/assets/file_000000001dc861fb965e40358456c004_1755072762575.png",
        category: "ESP",
        features: ["Real-time Radar", "Movement Prediction", "Tactical Overlay", "Custom Markers", "Range Finder", "Team Coordination"],
        badge: "Premium"
      }
    ];

    initialServices.forEach(service => {
      this.createService(service);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values()).sort((a, b) => {
      // Sort by badge priority, then by price (descending)
      const badgePriority: Record<string, number> = {
        'VIP': 5,
        'Popular': 4,
        'Hot': 3,
        'Premium': 2,
        'ESP': 1,
        'New': 1
      };
      
      const aPriority = badgePriority[a.badge || ''] || 0;
      const bPriority = badgePriority[b.badge || ''] || 0;
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      
      return b.price - a.price;
    });
  }

  async getService(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async getServicesByCategory(category: string): Promise<Service[]> {
    const allServices = await this.getAllServices();
    return allServices.filter(service => 
      service.category.toLowerCase() === category.toLowerCase()
    );
  }

  async searchServices(query: string): Promise<Service[]> {
    const allServices = await this.getAllServices();
    const searchLower = query.toLowerCase();
    
    return allServices.filter(service =>
      service.title.toLowerCase().includes(searchLower) ||
      service.description.toLowerCase().includes(searchLower) ||
      service.features.some(feature => feature.toLowerCase().includes(searchLower)) ||
      service.category.toLowerCase().includes(searchLower)
    );
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = { 
      ...insertService, 
      id,
      badge: insertService.badge || null
    };
    this.services.set(id, service);
    return service;
  }
}

export const storage = new MemStorage();