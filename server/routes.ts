import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { z } from "zod";
import OpenAI from "openai";
import {
  insertDestinationSchema,
  insertHotelSchema,
  insertGearItemSchema,
  insertBookingSchema,
  insertTourSchema,
  insertEmergencyAlertSchema,
  insertChatMessageSchema,
  insertQuestProgressSchema,
} from "@shared/schema";

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
    if (!req.isAuthenticated() || req.user?.role !== "vendor") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const gearData = insertGearItemSchema.parse({
        ...req.body,
        vendorId: req.user.id,
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
    if (!req.isAuthenticated() || req.user?.role !== "guide") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const tourData = insertTourSchema.parse({
        ...req.body,
        guideId: req.user.id,
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
      if (req.user?.id !== userId && req.user?.role !== "admin") {
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
        userId: req.user.id,
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
    if (!req.isAuthenticated() || req.user?.role !== "admin") {
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
      if (req.user?.id !== userId && req.user?.role !== "admin") {
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
        userId: req.user.id,
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
        userId: req.isAuthenticated() ? req.user?.id : null,
      });

      // Get real-time data for context
      const [destinations, hotels, alerts, weather] = await Promise.all([
        storage.getDestinations(),
        storage.getHotels(),
        storage.getActiveEmergencyAlerts(),
        // Get weather for major cities
        Promise.all(
          ["colombo", "kandy", "galle"].map((city) =>
            fetch(
              `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city},sri-lanka`
            )
              .then((res) => res.json())
              .catch(() => null)
          )
        ),
      ]);

      const message = messageData.message.toLowerCase();
      let aiPrompt = "";

      // Build context-aware prompt based on user's message with emojis
      if (message.includes("plan") || message.includes("trip")) {
        const topDestinations = destinations
          .slice(0, 5)
          .map((d) => `🏛️ ${d.name}: ${d.description.substring(0, 100)}...`)
          .join("\n");
        aiPrompt = `✨ Help plan an exciting trip to Sri Lanka! 🇱🇰 Current top destinations:\n${topDestinations}\n\nMake the response engaging and cheerful! Include emojis and format the response to be visually appealing. Focus on creating an exciting itinerary with activities, must-see spots, and local experiences! 🌟`;
      } else if (
        message.includes("hotel") ||
        message.includes("accommodation")
      ) {
        const availableHotels = hotels
          .slice(0, 5)
          .map(
            (h) =>
              `🏨 ${h.name} in ${h.location}: $${
                h.pricePerNight
              }/night, Rating: ${h.rating || "N/A"}/5`
          )
          .join("\n");
        aiPrompt = `🛎️ Let me help you find the perfect place to stay in Sri Lanka!\n\nAvailable options:\n${availableHotels}\n\nMake the response welcoming and detailed! Include emojis for amenities and features. Highlight the unique aspects of each location! 🌺`;
      } else if (message.includes("weather")) {
        const weatherInfo = weather
          .filter(Boolean)
          .map(
            (w) =>
              `🌡️ ${w.location.name}: ${w.current.temp_c}°C, ${w.current.condition.text}`
          )
          .join("\n");
        aiPrompt = `☀️ Current weather update for Sri Lanka!\n\n${weatherInfo}\n\nProvide a friendly weather forecast with practical tips for travelers! Include activity recommendations based on the weather. Use weather-related emojis! 🌤️`;
      } else if (message.includes("emergency") || message.includes("help")) {
        const activeAlerts = alerts
          .map((a) => `⚠️ ${a.severity} alert in ${a.location}: ${a.message}`)
          .join("\n");
        aiPrompt = `🆘 Important Safety Information for Sri Lanka:\n
          - 👮 Police: 119
          - 🚑 Ambulance: 1990
          - 🚔 Tourist Police: +94 11 2421451
          ${
            activeAlerts ? `\n🚨 Current Alerts:\n${activeAlerts}` : ""
          }\n\nProvide reassuring and clear safety guidance with emergency contacts and precautions! 🛡️`;
      } else if (message.includes("culture") || message.includes("customs")) {
        aiPrompt = `🏮 Discover the Rich Cultural Heritage of Sri Lanka! 🇱🇰\n
Share engaging information about:
          - 🕉️ Temple etiquette and sacred sites
          - 🍽️ Traditional dining customs and etiquette
          - 🙏 Local greetings and gestures
          - 👗 Appropriate dress guidelines
          - 🎭 Vibrant festivals and celebrations\n
Make the response culturally respectful and informative! Include colorful descriptions and local insights! ✨`;
      } else if (message.includes("food") || message.includes("cuisine")) {
        aiPrompt = `🍛 Explore the Delicious World of Sri Lankan Cuisine! 🌶️\n
Let me tell you about:
          - 🍚 Famous local dishes and specialties
          - 🌶️ Spice levels and unique flavors
          - 🍜 Must-try regional delicacies
          - 🥘 Best street food experiences
          - 🍽️ Local dining customs and tips\n
Make the response mouth-watering! Include food recommendations and culinary adventures! 😋`;
      } else {
        aiPrompt = `🌺 Welcome to Magical Sri Lanka! 🇱🇰\n
Let me share with you:
          - 🏖️ Breathtaking destinations
          - 🎭 Authentic cultural experiences
          - 💡 Essential travel tips and insights
          - 🙏 Local customs and traditions
          - 📅 Exciting current events\n
Make the response inspiring and enthusiastic! Include practical tips and hidden gems! ✨`;
      }

      // Prepare conversation history for OpenAI
      const messages = [
        {
          role: "system" as const,
          content: `You are HeritaGo AI Assistant 🤖, a friendly and enthusiastic guide for Sri Lanka tourism! 🇱🇰

Response Guidelines:
- Always use relevant emojis throughout your responses
- Structure your answers with clear sections and bullet points
- Be enthusiastic and engaging, like a friend showing around their home country
- Include specific recommendations and insider tips
- Keep responses concise but packed with valuable information
- Add local phrases or greetings when appropriate
- Use formatting (like bullet points •) to make responses visually appealing
- End responses with an encouraging message or question to keep the conversation going

Current date: ${new Date().toLocaleDateString()} 📅

Remember: You're not just providing information - you're helping create memorable experiences in Sri Lanka! ✨`,
        },
        {
          role: "user" as const,
          content: `${aiPrompt}\n\nUser's question: ${messageData.message}`,
        },
      ];

      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      // Get AI response
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      });

      const response = completion.choices[0].message.content;

      // Store the conversation
      const chatMessage = await storage.createChatMessage({
        ...messageData,
        response,
      });

      res.json({
        ...chatMessage,
        context: {
          destinations: destinations?.length || 0,
          hotels: hotels?.length || 0,
          alerts: alerts?.length || 0,
          weatherAvailable: weather.filter(Boolean).length > 0,
        },
      });
    } catch (error) {
      console.error("Chat API Error:", error);
      res.status(500).json({
        error: "Failed to process chat message",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  // Weather API (mock implementation)
  app.get("/api/weather/:location", async (req, res) => {
    const location = req.params.location;

    // Mock weather data for Sri Lankan cities
    const weatherData: Record<
      string,
      { temperature: number; condition: string; humidity: number }
    > = {
      colombo: { temperature: 28, condition: "Partly Cloudy", humidity: 75 },
      kandy: { temperature: 24, condition: "Light Rain", humidity: 80 },
      galle: { temperature: 29, condition: "Sunny", humidity: 70 },
      ella: { temperature: 22, condition: "Misty", humidity: 85 },
      anuradhapura: { temperature: 30, condition: "Hot", humidity: 65 },
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
      const analytics = await storage.getAnalyticsOverview(
        req.user.id,
        req.user.role
      );
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
