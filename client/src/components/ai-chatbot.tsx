import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MessageCircle,
  Send,
  X,
  MapPin,
  Hotel,
  Cloud,
  AlertTriangle,
  Camera,
  Mountain,
  Waves,
  Star,
  Calendar,
} from "lucide-react";

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const quickActions = [
  {
    label: "Plan Trip",
    icon: MapPin,
    prompt: "Help me plan a 3-day trip to Sri Lanka",
  },
  {
    label: "Find Hotels",
    icon: Hotel,
    prompt: "Find me the best hotels in Kandy under LKR 15,000",
  },
  {
    label: "Weather Info",
    icon: Cloud,
    prompt: "What's the weather like in Ella this week?",
  },
  {
    label: "Emergency Help",
    icon: AlertTriangle,
    prompt: "I need emergency contact information",
  },
  {
    label: "Photography Spots",
    icon: Camera,
    prompt: "Best photography locations in Sri Lanka",
  },
  {
    label: "Adventure Activities",
    icon: Mountain,
    prompt: "What adventure activities can I do in Sri Lanka?",
  },
];

export default function AIChatbot() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      content: `Welcome to HeritaGo! I'm your AI travel assistant for Sri Lanka. I can help you with:\n\n• Planning personalized trips\n• Finding hotels and accommodations\n• Weather updates and alerts\n• Local recommendations\n• Emergency information\n\nHow can I assist you today? 🇱🇰`,
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      try {
        const response = await apiRequest("POST", "/api/chat/message", {
          message,
          userId: user?.id,
          context: [
            {
              role: "system",
              content: `You are an AI travel assistant for Sri Lanka. 
                       Provide accurate information about:
                       - Tourist destinations and heritage sites
                       - Local customs and etiquette
                       - Travel tips and recommendations
                       - Weather and best times to visit
                       - Local cuisine and dining
                       - Transportation options
                       - Emergency services
                       Always be helpful, concise, and culturally sensitive.`,
            },
          ],
        });
        
        const data = await response.json();
        
        // Add typing animation delay for more natural feel
        if (data.isFromFallback) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        return data;
    },
    onSuccess: (data) => {
      const aiMessage: ChatMessage = {
        id: Date.now().toString() + "_ai",
        content: data.response,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    },
    onError: () => {
      const errorMessage: ChatMessage = {
        id: Date.now().toString() + "_error",
        content:
          "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsTyping(false);
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputValue.trim();
    if (!messageToSend) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: messageToSend,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    chatMutation.mutate(messageToSend);
  };

  const handleQuickAction = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-2xl hover:shadow-3xl transition-all duration-300"
          size="lg"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <MessageCircle className="h-6 w-6" />
                {/* Pulse indicator */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-slate-200 z-40 flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10 border-2 border-white/20">
                  <AvatarFallback className="bg-white/20 text-white font-bold">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Ceylon AI Assistant</h3>
                  <p className="text-xs text-white/80">
                    Always here to help • Online
                  </p>
                </div>
              </div>
              <Badge className="bg-white/20 text-white border-0">
                {user ? user.role : "Guest"}
              </Badge>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="flex items-start space-x-2 max-w-[80%]">
                    {!message.isUser && (
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarFallback className="bg-primary text-white text-xs font-bold">
                          AI
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <div
                        className={`
                          p-3 rounded-2xl shadow-sm
                          ${
                            message.isUser
                              ? "bg-primary text-white rounded-br-sm"
                              : "bg-white text-slate-800 rounded-bl-sm border border-slate-200"
                          }
                        `}
                      >
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                      <p
                        className={`text-xs text-slate-400 mt-1 ${
                          message.isUser ? "text-right" : "text-left"
                        }`}
                      >
                        {formatTimestamp(message.timestamp)}
                      </p>
                    </div>
                    {message.isUser && (
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarFallback className="bg-slate-700 text-white text-xs font-bold">
                          {user ? user.fullName.charAt(0) : "U"}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className="bg-primary text-white text-xs font-bold">
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-white p-3 rounded-2xl rounded-bl-sm border border-slate-200 shadow-sm">
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="p-4 border-t bg-white">
                <p className="text-xs text-slate-600 mb-3 text-center">
                  Quick actions to get started:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.slice(0, 4).map((action) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={action.label}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickAction(action.prompt)}
                        className="justify-start text-xs h-8"
                        disabled={isTyping}
                      >
                        <Icon className="h-3 w-3 mr-1" />
                        {action.label}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-center space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about Sri Lanka..."
                  className="flex-1 border-slate-300 focus:border-primary"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={isTyping}
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-primary hover:bg-primary/90 px-3"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* Additional Quick Actions */}
              <div className="flex flex-wrap gap-1 mt-2">
                {quickActions.slice(4).map((action) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={action.label}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuickAction(action.prompt)}
                      className="text-xs h-6 px-2 text-slate-600 hover:text-primary"
                      disabled={isTyping}
                    >
                      <Icon className="h-3 w-3 mr-1" />
                      {action.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
