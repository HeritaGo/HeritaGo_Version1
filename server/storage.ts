import { 
  users, destinations, hotels, gearItems, bookings, tours, emergencyAlerts, questProgress, chatMessages,
  type User, type InsertUser, type Destination, type InsertDestination, type Hotel, type InsertHotel,
  type GearItem, type InsertGearItem, type Booking, type InsertBooking, type Tour, type InsertTour,
  type EmergencyAlert, type InsertEmergencyAlert, type QuestProgress, type InsertQuestProgress,
  type ChatMessage, type InsertChatMessage
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session); 

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Destinations
  getDestinations(): Promise<Destination[]>;
  getDestination(id: number): Promise<Destination | undefined>;
  createDestination(destination: InsertDestination): Promise<Destination>;
  
  // Hotels
  getHotels(): Promise<Hotel[]>;
  getHotel(id: number): Promise<Hotel | undefined>;
  createHotel(hotel: InsertHotel): Promise<Hotel>;
  
  // Gear Items
  getGearItems(): Promise<GearItem[]>;
  getGearItemsByVendor(vendorId: number): Promise<GearItem[]>;
  createGearItem(gearItem: InsertGearItem): Promise<GearItem>;
  
  // Tours
  getTours(): Promise<Tour[]>;
  getToursByGuide(guideId: number): Promise<Tour[]>;
  createTour(tour: InsertTour): Promise<Tour>;
  
  // Bookings
  getBookingsByUser(userId: number): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  
  // Emergency Alerts
  getActiveEmergencyAlerts(): Promise<EmergencyAlert[]>;
  createEmergencyAlert(alert: InsertEmergencyAlert): Promise<EmergencyAlert>;
  
  // Quest Progress
  getQuestProgressByUser(userId: number): Promise<QuestProgress[]>;
  updateQuestProgress(progress: InsertQuestProgress): Promise<QuestProgress>;
  
  // Chat Messages
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  // Analytics
  getAnalyticsOverview(userId: number, role: string): Promise<any>;
  
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private destinations: Map<number, Destination>;
  private hotels: Map<number, Hotel>;
  private gearItems: Map<number, GearItem>;
  private tours: Map<number, Tour>;
  private bookings: Map<number, Booking>;
  private emergencyAlerts: Map<number, EmergencyAlert>;
  private questProgress: Map<number, QuestProgress>;
  private chatMessages: Map<number, ChatMessage>;
  
  private currentUserId: number;
  private currentDestinationId: number;
  private currentHotelId: number;
  private currentGearItemId: number;
  private currentTourId: number;
  private currentBookingId: number;
  private currentAlertId: number;
  private currentQuestProgressId: number;
  private currentChatMessageId: number;
  
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.destinations = new Map();
    this.hotels = new Map();
    this.gearItems = new Map();
    this.tours = new Map();
    this.bookings = new Map();
    this.emergencyAlerts = new Map();
    this.questProgress = new Map();
    this.chatMessages = new Map();
    
    this.currentUserId = 1;
    this.currentDestinationId = 1;
    this.currentHotelId = 1;
    this.currentGearItemId = 1;
    this.currentTourId = 1;
    this.currentBookingId = 1;
    this.currentAlertId = 1;
    this.currentQuestProgressId = 1;
    this.currentChatMessageId = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
    
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample Users
    const sampleUsers = [
      {
        username: "tourist_demo",
        email: "tourist@heritago.lk",
        password: "$2b$10$xyz", // In real app, this would be properly hashed
        fullName: "John Smith",
        role: "tourist",
        phoneNumber: "+94 77 123 4567",
        isActive: true,
        createdAt: new Date(),
      },
      {
        username: "guide_demo",
        email: "guide@heritago.lk",
        password: "$2b$10$xyz",
        fullName: "Samanthi Fernando",
        role: "guide",
        phoneNumber: "+94 77 234 5678",
        isActive: true,
        createdAt: new Date(),
      },
      {
        username: "vendor_demo",
        email: "vendor@heritago.lk",
        password: "$2b$10$xyz",
        fullName: "Adventure Gear Lanka",
        role: "vendor",
        phoneNumber: "+94 77 345 6789",
        isActive: true,
        createdAt: new Date(),
      },
      {
        username: "admin_demo",
        email: "admin@heritago.lk",
        password: "$2b$10$xyz",
        fullName: "System Administrator",
        role: "admin",
        phoneNumber: "+94 77 456 7890",
        isActive: true,
        createdAt: new Date(),
      }
    ];

    sampleUsers.forEach(user => {
      const newUser: User = { ...user, id: this.currentUserId++ };
      this.users.set(newUser.id, newUser);
    });

    // Sample Destinations
    const sampleDestinations = [
      {
        name: "Sigiriya Rock Fortress",
        description: "Ancient rock fortress and palace with stunning frescoes and gardens",
        category: "heritage",
        location: "Matale District",
        latitude: "7.9570",
        longitude: "80.7603",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
        rating: "4.8",
        isActive: true,
      },
      {
        name: "Galle Fort",
        description: "Historic UNESCO World Heritage Dutch colonial fortress",
        category: "heritage",
        location: "Galle",
        latitude: "6.0329",
        longitude: "80.2168",
        rating: "4.7",
        isActive: true,
      },
      {
        name: "Unawatuna Beach",
        description: "Pristine golden beach with crystal clear waters",
        category: "beach",
        location: "Galle District",
        latitude: "6.0108",
        longitude: "80.2486",
        rating: "4.6",
        isActive: true,
      },
    ];

    sampleDestinations.forEach(dest => {
      const newDest: Destination = { ...dest, id: this.currentDestinationId++ };
      this.destinations.set(newDest.id, newDest);
    });

    // Sample Hotels
    const sampleHotels = [
      {
        name: "Ocean Paradise Resort",
        description: "Luxury beachfront resort with infinity pool",
        location: "Bentota",
        pricePerNight: 15000,
        rating: "4.8",
        amenities: ["WiFi", "Pool", "Restaurant", "Spa"],
        contactInfo: { phone: "+94 34 2275176", email: "info@oceanparadise.lk" },
        isActive: true,
      },
      {
        name: "Tea Garden Lodge",
        description: "Cozy mountain lodge overlooking tea plantations",
        location: "Ella",
        pricePerNight: 8500,
        rating: "4.6",
        amenities: ["WiFi", "Mountain View", "Tea Tours", "Restaurant"],
        contactInfo: { phone: "+94 57 2050050", email: "stay@teagarden.lk" },
        isActive: true,
      },
    ];

    sampleHotels.forEach(hotel => {
      const newHotel: Hotel = { ...hotel, id: this.currentHotelId++ };
      this.hotels.set(newHotel.id, newHotel);
    });

    // Sample Gear Items
    const sampleGearItems = [
      {
        vendorId: 3, // vendor_demo user
        name: "Professional Camping Tent",
        description: "4-person waterproof tent perfect for mountain camping",
        category: "camping",
        pricePerDay: 1500,
        availability: 5,
        isActive: true,
      },
      {
        vendorId: 3,
        name: "Hiking Backpack Set",
        description: "Complete hiking gear including boots and equipment",
        category: "hiking",
        pricePerDay: 800,
        availability: 8,
        isActive: true,
      },
    ];

    sampleGearItems.forEach(gear => {
      const newGear: GearItem = { ...gear, id: this.currentGearItemId++ };
      this.gearItems.set(newGear.id, newGear);
    });

    // Sample Emergency Alerts
    const sampleAlerts = [
      {
        title: "Weather Warning",
        message: "Heavy rainfall expected in Kandy region for the next 24 hours",
        severity: "medium",
        category: "weather",
        location: "Kandy",
        isActive: true,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      {
        title: "Road Closure",
        message: "A9 highway maintenance work between Dambulla and Vavuniya",
        severity: "low",
        category: "traffic",
        location: "A9 Highway",
        isActive: true,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
      },
    ];

    sampleAlerts.forEach(alert => {
      const newAlert: EmergencyAlert = { ...alert, id: this.currentAlertId++ };
      this.emergencyAlerts.set(newAlert.id, newAlert);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values()).filter(dest => dest.isActive);
  }

  async getDestination(id: number): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }

  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const id = this.currentDestinationId++;
    const destination: Destination = { ...insertDestination, id };
    this.destinations.set(id, destination);
    return destination;
  }

  async getHotels(): Promise<Hotel[]> {
    return Array.from(this.hotels.values()).filter(hotel => hotel.isActive);
  }

  async getHotel(id: number): Promise<Hotel | undefined> {
    return this.hotels.get(id);
  }

  async createHotel(insertHotel: InsertHotel): Promise<Hotel> {
    const id = this.currentHotelId++;
    const hotel: Hotel = { ...insertHotel, id };
    this.hotels.set(id, hotel);
    return hotel;
  }

  async getGearItems(): Promise<GearItem[]> {
    return Array.from(this.gearItems.values()).filter(gear => gear.isActive);
  }

  async getGearItemsByVendor(vendorId: number): Promise<GearItem[]> {
    return Array.from(this.gearItems.values()).filter(
      gear => gear.vendorId === vendorId && gear.isActive
    );
  }

  async createGearItem(insertGearItem: InsertGearItem): Promise<GearItem> {
    const id = this.currentGearItemId++;
    const gearItem: GearItem = { ...insertGearItem, id };
    this.gearItems.set(id, gearItem);
    return gearItem;
  }

  async getTours(): Promise<Tour[]> {
    return Array.from(this.tours.values()).filter(tour => tour.isActive);
  }

  async getToursByGuide(guideId: number): Promise<Tour[]> {
    return Array.from(this.tours.values()).filter(
      tour => tour.guideId === guideId && tour.isActive
    );
  }

  async createTour(insertTour: InsertTour): Promise<Tour> {
    const id = this.currentTourId++;
    const tour: Tour = { ...insertTour, id };
    this.tours.set(id, tour);
    return tour;
  }

  async getBookingsByUser(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(booking => booking.userId === userId);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const booking: Booking = { 
      ...insertBooking, 
      id,
      createdAt: new Date()
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async getActiveEmergencyAlerts(): Promise<EmergencyAlert[]> {
    const now = new Date();
    return Array.from(this.emergencyAlerts.values()).filter(
      alert => alert.isActive && (!alert.expiresAt || alert.expiresAt > now)
    );
  }

  async createEmergencyAlert(insertAlert: InsertEmergencyAlert): Promise<EmergencyAlert> {
    const id = this.currentAlertId++;
    const alert: EmergencyAlert = { 
      ...insertAlert, 
      id,
      createdAt: new Date()
    };
    this.emergencyAlerts.set(id, alert);
    return alert;
  }

  async getQuestProgressByUser(userId: number): Promise<QuestProgress[]> {
    return Array.from(this.questProgress.values()).filter(
      progress => progress.userId === userId
    );
  }

  async updateQuestProgress(insertProgress: InsertQuestProgress): Promise<QuestProgress> {
    const id = this.currentQuestProgressId++;
    const progress: QuestProgress = { ...insertProgress, id };
    this.questProgress.set(id, progress);
    return progress;
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentChatMessageId++;
    const message: ChatMessage = { 
      ...insertMessage, 
      id,
      timestamp: new Date()
    };
    this.chatMessages.set(id, message);
    return message;
  }

  async getAnalyticsOverview(userId: number, role: string): Promise<any> {
    switch (role) {
      case 'tourist':
        return {
          totalTrips: 3,
          placesVisited: 12,
          questPoints: 2450,
          upcomingBookings: 2,
          completedQuests: 8,
          favoriteDestinations: ["Sigiriya", "Galle Fort", "Ella"]
        };
      case 'guide':
        return {
          totalTours: 87,
          totalTourists: 342,
          monthlyEarnings: 245000,
          averageRating: 4.8,
          activeTours: 5,
          upcomingTours: 3
        };
      case 'vendor':
        return {
          totalRentals: 156,
          monthlyRevenue: 180000,
          activeRentals: 23,
          returnRate: 98.5,
          topGearCategory: "camping",
          inventoryItems: 45
        };
      case 'admin':
        return {
          totalUsers: 15420,
          monthlyRevenue: 2400000,
          activeBookings: 892,
          activeAlerts: 3,
          newUsersThisWeek: 245,
          systemUptime: 99.9
        };
      default:
        return {};
    }
  }
}

export const storage = new MemStorage();
