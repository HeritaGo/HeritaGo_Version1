import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, MapPin, Hotel, Cloud, AlertTriangle, MessageCircle } from "lucide-react";

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface QuickAction {
  label: string;
  icon: () => JSX.Element;
  message: string;
}

const quickActions: QuickAction[] = [
  {
    label: "Plan Trip",
    icon: MapPin,
    message: "Help me plan a 3-day trip to Sri Lanka",
  },
  {
    label: "Find Hotels",
    icon: Hotel,
    message: "Show me hotels near Kandy under LKR 10,000 per night",
  },
  {
    label: "Weather Info",
    icon: Cloud,
    message: "What's the weather like in Colombo today?",
  },
  {
    label: "Emergency",
    icon: AlertTriangle,
    message: "I need emergency contact information for Sri Lanka",
  },
];

// Mock API request function
const apiRequest = async (message: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  const msg = message.toLowerCase();
  let response = "";
  
  if (msg.includes('trip') || msg.includes('plan')) {
    response = "I'd love to help you plan your Sri Lankan adventure! For a 3-day trip, I recommend visiting Colombo (Day 1), Kandy (Day 2), and Sigiriya (Day 3). Would you like specific recommendations for each location?";
  } else if (msg.includes('hotel')) {
    response = "Here are some great hotels near Kandy under LKR 10,000 per night:\n\n• Hotel Suisse - LKR 8,500/night\n• Queens Hotel - LKR 9,200/night\n• Hotel Topaz - LKR 7,800/night\n\nWould you like more details about any of these options?";
  } else if (msg.includes('weather')) {
    response = "Today in Colombo: Partly cloudy with temperatures around 28°C (82°F). There's a 30% chance of afternoon showers. Perfect weather for exploring the city! Don't forget your umbrella just in case.";
  } else if (msg.includes('emergency')) {
    response = "Important Sri Lanka Emergency Contacts:\n\n• Police: 119\n• Fire & Ambulance: 110\n• Tourist Helpline: 1912\n• Tourist Police: +94 11 242 1052\n\nStay safe and keep these numbers handy during your travels!";
  } else if (msg.includes('food') || msg.includes('eat')) {
    response = "Sri Lankan cuisine is incredible! Must-try dishes:\n\n• Rice & Curry - The national dish\n• Kottu Roti - Stir-fried bread with vegetables\n• Hoppers - Bowl-shaped pancakes\n• Fish Ambul Thiyal - Sour fish curry\n\nWould you like restaurant recommendations in any specific city?";
  } else if (msg.includes('transport') || msg.includes('travel')) {
    response = "Getting around Sri Lanka:\n\n• Tuk-tuks - Great for short distances\n• Trains - Scenic routes, especially to Kandy\n• Buses - Economical but can be crowded\n• Private drivers - Most comfortable option\n\nFor long distances, I recommend hiring a driver. Would you like contact details?";
  } else if (msg.includes('beach') || msg.includes('coast')) {
    response = "Sri Lanka has stunning beaches! Top recommendations:\n\n• Unawatuna - Great for swimming and snorkeling\n• Mirissa - Perfect for whale watching\n• Arugam Bay - World-class surfing\n• Bentota - Water sports and luxury resorts\n\nWhich type of beach experience are you looking for?";
  } else if (msg.includes('culture') || msg.includes('temple')) {
    response = "Sri Lanka's cultural treasures:\n\n• Temple of the Tooth, Kandy - Sacred Buddhist relic\n• Sigiriya Rock Fortress - Ancient royal citadel\n• Dambulla Cave Temple - Golden temple complex\n• Polonnaruwa - Ancient capital ruins\n\nRemember to dress modestly when visiting temples. Need specific visiting hours?";
  } else {
    response = "Thank you for your message! I'm here to help with travel planning, hotel recommendations, weather updates, food suggestions, transport options, beaches, cultural sites, and emergency information for Sri Lanka. What would you like to know more about?";
  }
  
  return response;
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI travel assistant for Sri Lanka. How can I help you explore the Pearl of the Indian Ocean today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText?: string) => {
    const message = messageText || inputValue.trim();
    if (!message) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await apiRequest(message);
      const aiMessage: ChatMessage = {
        id: Date.now().toString() + "_ai",
        content: response,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: Date.now().toString() + "_error",
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    handleSendMessage(action.message);
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(20, 184, 166, 0.6), 0 0 40px rgba(20, 184, 166, 0.4), 0 0 60px rgba(20, 184, 166, 0.2);
          }
          50% {
            box-shadow: 0 0 30px rgba(20, 184, 166, 0.8), 0 0 60px rgba(20, 184, 166, 0.6), 0 0 90px rgba(20, 184, 166, 0.4);
          }
        }
      `}</style>
      <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Toggle Button */}
      <div className={`transition-all duration-300 ${isOpen ? 'scale-100' : 'scale-100 hover:scale-110'}`}>
        <button
          className={`relative w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
            isOpen ? 'rotate-45' : 'hover:shadow-3xl animate-pulse-glow'
          }`}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            boxShadow: isOpen 
              ? "0 0 0 0 rgba(20, 184, 166, 0.7)" 
              : "0 0 20px rgba(20, 184, 166, 0.6), 0 0 40px rgba(20, 184, 166, 0.4), 0 0 60px rgba(20, 184, 166, 0.2)",
            animation: isOpen ? 'none' : 'pulse-glow 2s ease-in-out infinite'
          }}
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform duration-200" />
          ) : (
            <MessageCircle className="w-6 h-6 transition-transform duration-200" />
          )}
          
          {/* Notification Badge */}
          {!isOpen && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
              !
            </div>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-96 max-w-[calc(100vw-2rem)] transform transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in">
          <div className="h-[32rem] flex flex-col shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Ceylon AI Assistant</h3>
                    <p className="text-white/80 text-sm">Always here to help you explore 🇱🇰</p>
                  </div>
                </div>
                <div className="bg-white/20 text-white border border-white/30 px-2 py-1 rounded-full text-xs">
                  Online
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white/50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}
                  >
                    <div className={`flex items-end space-x-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {!message.isUser && (
                        <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      <div className={`rounded-2xl p-3 shadow-sm ${
                        message.isUser 
                          ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white' 
                          : 'bg-white border border-gray-200 text-gray-800'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.isUser ? 'text-white/70' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>

                      {message.isUser && (
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex items-end space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-2xl p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 border-t border-gray-200 bg-white/70">
              <div className="flex flex-wrap gap-2 mb-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-all duration-200 hover:scale-105 flex items-center gap-1"
                      onClick={() => handleQuickAction(action)}
                      disabled={isTyping}
                    >
                      <Icon />
                      {action.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 flex-shrink-0 bg-white">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Ask me about Sri Lanka..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  disabled={isTyping}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white p-2 rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isTyping ? (
                    <div className="w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}