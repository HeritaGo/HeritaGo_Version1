import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

// Mock API request function with smart responses
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

const QUICK_CHAT_ACTIONS = [
  "Help me plan a 3-day trip to Sri Lanka",
  "Show me hotels near Kandy under LKR 10,000 per night", 
  "What's the weather like in Colombo today?",
  "I need emergency contact information for Sri Lanka",
  "Best Sri Lankan food to try",
  "How to get around Sri Lanka"
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hello! I'm your AI travel assistant for Sri Lanka. How can I help you explore the Pearl of the Indian Ocean today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const addMessage = (content: string, isUser: boolean) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      isUser,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    addMessage(userMessage, true);
    setIsTyping(true);
    setIsLoading(true);

    try {
      const response = await apiRequest(userMessage);
      setIsTyping(false);
      addMessage(response, false);
    } catch (error) {
      setIsTyping(false);
      addMessage("Sorry, I'm having trouble connecting right now. Please try again in a moment.", false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    setInputMessage(action);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          className="relative w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full shadow-2xl flex items-center justify-center group"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            boxShadow: isOpen 
              ? "0 0 0 0 rgba(20, 184, 166, 0.7)" 
              : ["0 0 0 0 rgba(20, 184, 166, 0.7)", "0 0 0 20px rgba(20, 184, 166, 0)", "0 0 0 0 rgba(20, 184, 166, 0.7)"]
          }}
          transition={{ 
            boxShadow: { 
              duration: 2, 
              repeat: isOpen ? 0 : Infinity,
              ease: "easeInOut" 
            }
          }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.i
                key="close"
                className="fas fa-times text-xl"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            ) : (
              <motion.i
                key="chat"
                className="fas fa-comment text-xl"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
          
          {/* Notification Badge */}
          {!isOpen && (
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <i className="fas fa-exclamation"></i>
            </motion.div>
          )}
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)]"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Card className="h-[32rem] flex flex-col shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              {/* Chat Header */}
              <CardHeader className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-t-lg flex-shrink-0 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10 bg-white/20">
                        <AvatarFallback className="bg-transparent text-white">
                          <i className="fas fa-comment text-lg"></i>
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold">Ceylon AI Assistant</CardTitle>
                      <p className="text-white/80 text-sm">Always here to help you explore 🇱🇰</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                    Online
                  </Badge>
                </div>
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 p-0 overflow-hidden">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-end space-x-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          {!message.isUser && (
                            <Avatar className="h-8 w-8 bg-gradient-to-r from-teal-500 to-emerald-500 flex-shrink-0">
                              <AvatarFallback className="bg-transparent text-white">
                                <i className="fas fa-comment text-sm"></i>
                              </AvatarFallback>
                            </Avatar>
                          )}
                          
                          <div className={`rounded-2xl p-3 ${
                            message.isUser 
                              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.isUser ? 'text-white/70' : 'text-gray-500'
                            }`}>
                              {formatTime(message.timestamp)}
                            </p>
                          </div>

                          {message.isUser && (
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                                U
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-end space-x-2">
                          <Avatar className="h-8 w-8 bg-gradient-to-r from-teal-500 to-emerald-500">
                            <AvatarFallback className="bg-transparent text-white">
                              <i className="fas fa-comment text-sm"></i>
                            </AvatarFallback>
                          </Avatar>
                          <div className="bg-gray-100 rounded-2xl p-3">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>
              </CardContent>

              {/* Quick Actions */}
              <div className="px-4 py-2 border-t border-gray-200">
                <div className="flex flex-wrap gap-2 mb-3">
                  {QUICK_CHAT_ACTIONS.slice(0, 4).map((action) => (
                    <motion.button
                      key={action}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors duration-200"
                      onClick={() => handleQuickAction(action)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isLoading}
                    >
                      {action.length > 30 ? action.substring(0, 30) + '...' : action}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 flex-shrink-0">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask me about Sri Lanka..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                  >
                    {isLoading ? (
                      <i className="fas fa-spinner animate-spin"></i>
                    ) : (
                      <i className="fas fa-paper-plane"></i>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}