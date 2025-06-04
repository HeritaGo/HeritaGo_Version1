import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { z } from "zod";
import { insertDestinationSchema, insertHotelSchema, insertGearItemSchema, insertBookingSchema, insertTourSchema, insertEmergencyAlertSchema, insertChatMessageSchema, insertQuestProgressSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  // Setup authentication routes
  setupAuth(app);

  // Destinations API
  app.get("/api/destinations", async (req, res) => {
    try {
      const destinations = await storage.getDestinations();
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch destinations" });
    }
  });

  app.get("/api/destinations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const destination = await storage.getDestination(id);
      if (!destination) {
        return res.status(404).json({ error: "Destination not found" });
      }
      res.json(destination);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch destination" });
    }
  });

  // Hotels API
  app.get("/api/hotels", async (req, res) => {
    try {
      const hotels = await storage.getHotels();
      res.json(hotels);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch hotels" });
    }
  });

  app.get("/api/hotels/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const hotel = await storage.getHotel(id);
      if (!hotel) {
        return res.status(404).json({ error: "Hotel not found" });
      }
      res.json(hotel);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch hotel" });
    }
  });

  // Gear API
  app.get("/api/gear", async (req, res) => {
    try {
      const gearItems = await storage.getGearItems();
      res.json(gearItems);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gear items" });
    }
  });

  app.get("/api/gear/vendor/:vendorId", async (req, res) => {
    try {
      const vendorId = parseInt(req.params.vendorId);
      const gearItems = await storage.getGearItemsByVendor(vendorId);
      res.json(gearItems);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch vendor gear items" });
    }
  });

  app.post("/api/gear", async (req, res) => {
    if (!req.isAuthenticated() || req.user?.role !== 'vendor') {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    try {
      const gearData = insertGearItemSchema.parse({
        ...req.body,
        vendorId: req.user.id
      });
      const gearItem = await storage.createGearItem(gearData);
      res.status(201).json(gearItem);
    } catch (error) {
      res.status(400).json({ error: "Invalid gear item data" });
    }
  });

  // Tours API
  app.get("/api/tours", async (req, res) => {
    try {
      const tours = await storage.getTours();
      res.json(tours);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tours" });
    }
  });

  app.get("/api/tours/guide/:guideId", async (req, res) => {
    try {
      const guideId = parseInt(req.params.guideId);
      const tours = await storage.getToursByGuide(guideId);
      res.json(tours);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch guide tours" });
    }
  });

  app.post("/api/tours", async (req, res) => {
    if (!req.isAuthenticated() || req.user?.role !== 'guide') {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    try {
      const tourData = insertTourSchema.parse({
        ...req.body,
        guideId: req.user.id
      });
      const tour = await storage.createTour(tourData);
      res.status(201).json(tour);
    } catch (error) {
      res.status(400).json({ error: "Invalid tour data" });
    }
  });

  // Bookings API
  app.get("/api/bookings/user/:userId", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    try {
      const userId = parseInt(req.params.userId);
      if (req.user?.id !== userId && req.user?.role !== 'admin') {
        return res.status(403).json({ error: "Forbidden" });
      }
      
      const bookings = await storage.getBookingsByUser(userId);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    try {
      const bookingData = insertBookingSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ error: "Invalid booking data" });
    }
  });

  // Emergency Alerts API
  app.get("/api/alerts", async (req, res) => {
    try {
      const alerts = await storage.getActiveEmergencyAlerts();
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch alerts" });
    }
  });

  app.post("/api/alerts", async (req, res) => {
    if (!req.isAuthenticated() || req.user?.role !== 'admin') {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    try {
      const alertData = insertEmergencyAlertSchema.parse(req.body);
      const alert = await storage.createEmergencyAlert(alertData);
      res.status(201).json(alert);
    } catch (error) {
      res.status(400).json({ error: "Invalid alert data" });
    }
  });

  // Quest Progress API
  app.get("/api/quest-progress/:userId", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    try {
      const userId = parseInt(req.params.userId);
      if (req.user?.id !== userId && req.user?.role !== 'admin') {
        return res.status(403).json({ error: "Forbidden" });
      }
      
      const progress = await storage.getQuestProgressByUser(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quest progress" });
    }
  });

  app.post("/api/quest-progress", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    try {
      const progressData = insertQuestProgressSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      const progress = await storage.updateQuestProgress(progressData);
      res.status(201).json(progress);
    } catch (error) {
      res.status(400).json({ error: "Invalid quest progress data" });
    }
  });

  // Chat API
  app.post("/api/chat", async (req, res) => {
    try {
      const messageData = insertChatMessageSchema.parse({
        ...req.body,
        userId: req.isAuthenticated() ? req.user?.id : null
      });
      
      // Simple AI response logic (in a real app, this would integrate with OpenAI)
      let response = "I'm here to help you explore Sri Lanka! ";
      const message = req.body.message.toLowerCase();
      
      if (message.includes('plan') || message.includes('trip')) {
        response += "I can help you plan an amazing trip! What type of experience interests you - beaches, mountains, cultural sites, or wildlife?";
      } else if (message.includes('hotel') || message.includes('accommodation')) {
        response += "I can suggest great hotels based on your preferences. Which region are you planning to visit?";
      } else if (message.includes('weather')) {
        response += "Sri Lanka has a tropical climate. The weather is generally warm year-round. Would you like specific weather information for a particular region?";
      } else if (message.includes('emergency') || message.includes('help')) {
        response += "For emergencies in Sri Lanka: Police (119), Fire (110), Ambulance (108). I can also provide current safety alerts for your location.";
      } else if (message.includes('gear') || message.includes('equipment')) {
        response += "We have various gear available for rent including camping equipment, hiking gear, cameras, and water sports equipment. What do you need?";
      } else {
        response += "Feel free to ask me about destinations, hotels, gear rentals, weather, emergency information, or trip planning!";
      }
      
      const chatMessage = await storage.createChatMessage({
        ...messageData,
        response
      });
      
      res.json(chatMessage);
    } catch (error) {
      res.status(400).json({ error: "Invalid message data" });
    }
  });

  // Weather API (mock implementation)
  app.get("/api/weather/:location", async (req, res) => {
    const location = req.params.location;
    
    // Mock weather data for Sri Lankan cities
    const weatherData: Record<string, { temperature: number; condition: string; humidity: number }> = {
      colombo: { temperature: 28, condition: "Partly Cloudy", humidity: 75 },
      kandy: { temperature: 24, condition: "Light Rain", humidity: 80 },
      galle: { temperature: 29, condition: "Sunny", humidity: 70 },
      ella: { temperature: 22, condition: "Misty", humidity: 85 },
      anuradhapura: { temperature: 30, condition: "Hot", humidity: 65 }
    };
    
    const weather = weatherData[location.toLowerCase()] || weatherData.colombo;
    res.json({ location, ...weather });
  });

  // Analytics API for dashboards
  app.get("/api/analytics/overview", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    try {
      const analytics = await storage.getAnalyticsOverview(req.user.id, req.user.role);
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
