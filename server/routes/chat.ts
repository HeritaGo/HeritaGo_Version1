import { Router } from "express";
import { db } from "../db";
import { OpenAI } from "openai";
import { chatHistory } from "../../shared/schema/chat";
import { eq, desc } from "drizzle-orm";

const router = Router();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Store chat history in the database
interface ChatMessage {
  userId: string;
  message: string;
  response: string;
  timestamp: Date;
}

router.post("/message", async (req, res) => {
  try {
    const { message, userId, context } = req.body;
    
    // Import fallback responses
    const { FALLBACK_RESPONSES } = await import('../../shared/constants/chat-responses');

    // Function to get fallback response
    const getFallbackResponse = (message: string) => {
      const lowercaseMsg = message.toLowerCase();
      
      // Check for keywords and return appropriate response
      if (lowercaseMsg.includes('plan') && lowercaseMsg.includes('trip')) return FALLBACK_RESPONSES.RESPONSES["plan trip"];
      if (lowercaseMsg.includes('hotel') || lowercaseMsg.includes('stay')) return FALLBACK_RESPONSES.RESPONSES["find hotels"];
      if (lowercaseMsg.includes('weather')) return FALLBACK_RESPONSES.RESPONSES["weather"];
      if (lowercaseMsg.includes('emergency')) return FALLBACK_RESPONSES.RESPONSES["emergency"];
      if (lowercaseMsg.includes('photo') || lowercaseMsg.includes('camera')) return FALLBACK_RESPONSES.RESPONSES["photography"];
      if (lowercaseMsg.includes('adventure') || lowercaseMsg.includes('activity')) return FALLBACK_RESPONSES.RESPONSES["adventure"];
      
      // Default response if no keywords match
      return "I can help you with planning trips, finding hotels, checking weather, emergency information, photography spots, and adventure activities. What would you like to know about?";
    };

    // Check if OpenAI is available
    if (!process.env.OPENAI_API_KEY) {
      const fallbackResponse = getFallbackResponse(message);
      return res.json({ 
        response: fallbackResponse,
        timestamp: new Date().toISOString(),
        isFromFallback: true
      });
    }

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Prepare conversation history for OpenAI
    const messages = [
      {
        role: "system",
        content: `You are HeritaGo AI Assistant, an expert guide for tourists exploring Sri Lanka. Your knowledge includes:

        CULTURAL HERITAGE:
        - Ancient cities (Anuradhapura, Polonnaruwa, Sigiriya)
        - Temples and religious sites
        - Traditional arts and crafts
        - Local festivals and ceremonies

        TRAVEL INFORMATION:
        - Best times to visit each region
        - Transportation options and tips
        - Accommodation recommendations
        - Local cuisine and dining etiquette
        
        PRACTICAL ADVICE:
        - Weather patterns and seasonal changes
        - Safety tips and emergency contacts
        - Local customs and dress codes
        - Currency and payment methods
        
        EXPERIENCES:
        - Wildlife safaris and national parks
        - Beach destinations
        - Tea plantation tours
        - Adventure activities

        Provide accurate, culturally sensitive information in a friendly, concise manner. Focus on authentic experiences while ensuring tourist safety and comfort.`,
      },
      ...(Array.isArray(context) ? context : []), // Ensure context is an array
      {
        role: "user",
        content: message,
      },
    ];

    // Get response from OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Using 3.5-turbo as it's more widely available
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = completion.choices[0].message.content;

    try {
      // Store the conversation in the database
      if (userId) {
        await db.insert(chatHistory).values({
          userId,
          message,
          response: aiResponse || "",
          timestamp: new Date(),
        });
      }

      res.json({
        response: aiResponse,
        timestamp: new Date().toISOString(),
      });
    } catch (dbError) {
      console.error("Database Error:", dbError);
      // Still return the AI response even if DB storage fails
      res.json({
        response: aiResponse,
        timestamp: new Date().toISOString(),
        warning: "Failed to save chat history",
      });
    }
  } catch (error: any) {
    console.error("Chat API Error:", error);
    
    // Use fallback response system when OpenAI fails
    const fallbackResponse = getFallbackResponse(message);
    res.json({
      response: fallbackResponse,
      timestamp: new Date().toISOString(),
      isFromFallback: true,
      warning: "Using offline response system due to API issues"
    });
  }
});

// Get chat history for a user
router.get("/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await db
      .select()
      .from(chatHistory)
      .where(eq(chatHistory.userId, userId))
      .orderBy(desc(chatHistory.timestamp))
      .limit(50);

    res.json(history);
  } catch (error) {
    console.error("Chat History Error:", error);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

export default router;
