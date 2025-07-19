import google.generativeai as genai
from typing import List, Dict, Optional
import os
from dotenv import load_dotenv

load_dotenv()

class GeminiService:
    def __init__(self):
        # Configure Gemini
        genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
        self.model = genai.GenerativeModel('gemini-pro')
        
        # System prompt for Sri Lanka tourism context
        self.system_prompt = """You are HeritaGo AI Assistant 🤖, a friendly and knowledgeable guide for Sri Lanka tourism! 🇱🇰

Your expertise includes:
• Cultural Heritage Sites (Sigiriya, Anuradhapura, Polonnaruwa) 🏛️
• Beaches and Wildlife (Yala, Mirissa, Trincomalee) 🏖️
• Adventure Activities (Hiking, Surfing, Safari) 🏃‍♂️
• Local Cuisine and Dining 🍛
• Transportation and Accommodation 🚂
• Weather and Best Times to Visit ☀️
• Safety and Emergency Information 🏥

Always:
• Use relevant emojis
• Be friendly and enthusiastic
• Provide specific, actionable advice
• Include local insights and tips
• Be culturally sensitive
• Keep responses concise but informative"""

    async def get_response(self, message: str, user_context: Optional[Dict] = None) -> str:
        try:
            # Start chat
            chat = self.model.start_chat(history=[])
            
            # Add system context
            chat.send_message(self.system_prompt)
            
            # Add user context if available
            if user_context:
                context_str = f"User Info: Role: {user_context.get('role', 'tourist')}, Location: {user_context.get('location', 'unknown')}"
                chat.send_message(context_str)
            
            # Get response
            response = chat.send_message(message)
            return response.text
            
        except Exception as e:
            print(f"Gemini API Error: {str(e)}")
            return self._get_fallback_response(message.lower())

    def _get_fallback_response(self, message: str) -> str:
        # Basic fallback responses based on keywords
        if 'emergency' in message:
            return "🚨 Emergency contacts in Sri Lanka:\n• Police: 119\n• Ambulance: 1990\n• Tourist Police: +94 11 2421451"
        elif 'weather' in message:
            return "🌤️ Sri Lanka has a tropical climate. Best time to visit:\n• Dec-Mar: Dry and sunny\n• Apr-Sep: Southwest monsoon\n• Oct-Nov: Inter-monsoon period"
        elif 'hotel' in message or 'stay' in message:
            return "🏨 Popular areas to stay:\n• Colombo: Modern city hotels\n• Kandy: Cultural heritage hotels\n• Ella: Mountain retreats\n• Mirissa: Beach resorts"
        else:
            return "I'm your Sri Lanka travel assistant! I can help with:\n• Trip planning 🗺️\n• Hotels and accommodation 🏨\n• Weather updates ☀️\n• Emergency info 🚨\n• Local tips and recommendations 🌟\n\nWhat would you like to know?"
