import { type User, type InsertUser, type Service, type InsertService } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
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
        title: "Neck Headshot",
        description: "Advanced neck targeting system with precision aimbot for instant eliminations using Strike Cheats technology.",
        price: 1499, // $14.99
        imageUrl: "/assets/file_00000000cbf06230882a04d9be45430c_1755072745113.png",
        category: "Aimbot",
        features: ["Neck Targeting", "Auto Aim", "Instant Kill", "Undetectable"],
        badge: "Premium"
      },
      {
        title: "Drag Headshot",
        description: "Drag-and-shoot headshot system for professional-level accuracy and consistent eliminations.",
        price: 1299, // $12.99
        imageUrl: "/assets/file_000000001dc861fb965e40358456c004_1755072762575.png",
        category: "Aimbot",
        features: ["Drag System", "Perfect Accuracy", "Quick Scope", "Anti-Ban"],
        badge: "Popular"
      },
      {
        title: "Body Headshot",
        description: "Body-to-head conversion system that automatically converts body shots into critical headshots.",
        price: 999, // $9.99
        imageUrl: "/assets/file_00000000bd48620ab92f92738d193ece_1755072776227.png",
        category: "Aimbot",
        features: ["Auto Convert", "Body to Head", "Damage Boost", "Silent Aim"],
        badge: "Hot"
      },
      {
        title: "Hologram Location",
        description: "Advanced ESP system showing enemy positions through walls with holographic display technology.",
        price: 1000, // $10.00
        imageUrl: "/assets/file_0000000062b861f8bbf45c64187797e6_1755072788109.png",
        category: "ESP",
        features: ["Wall Hack", "Enemy ESP", "Distance Info", "Health Display"],
        badge: "ESP"
      },
      {
        title: "IPA Mod Menu",
        description: "Complete iOS mod menu with all premium Strike Cheats features and customizable settings.",
        price: 1999, // $19.99
        imageUrl: "/assets/file_000000008f70622f870a6bceff3f87a3_1755072798725.png",
        category: "Mod",
        features: ["All Features", "iOS Support", "Custom Menu", "Regular Updates"],
        badge: "VIP"
      },
      {
        title: "Premium Group Access",
        description: "Exclusive access to our premium Telegram group with advanced Strike Cheats, priority support, and VIP community.",
        price: 2499, // $24.99
        imageUrl: "/assets/file_00000000db8061f8b25f402042c93720_1755143389974.png",
        category: "Premium",
        features: ["VIP Telegram Access", "Priority Support", "Exclusive Updates", "Premium Community"],
        badge: "VIP"
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
    return Array.from(this.services.values());
  }

  async getService(id: string): Promise<Service | undefined> {
    return this.services.get(id);
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
