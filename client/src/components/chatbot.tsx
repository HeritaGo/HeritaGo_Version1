import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Send, Bot, User, MapPin, Hotel, Cloud, AlertTriangle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface ChatMessage {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const quickActions = [
  { label: "Plan Trip", icon: MapPin, message: "Help me plan a 3-day trip to Sri Lanka" },
  { label: "Find Hotels", icon: Hotel, message: "Show me hotels near Kandy under LKR 10,000 per night" },
  { label: "Weather Info", icon: Cloud, message: "What's the weather like in Colombo today?" },
  { label: "Emergency", icon: AlertTriangle, message: "I need emergency contact information for Sri Lanka" },
];

export default function ChatBot() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      content: "Hello! I'm your AI travel assistant for Sri Lanka. How can I help you explore the Pearl of the Indian Ocean today? 🇱🇰",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [messageIdCounter, setMessageIdCounter] = useState(2);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", {
        message,
        context: {
          userId: user?.id,
          userRole: user?.role,
        }
      });
      return response.json();
    },
    onSuccess: (data) => {
      const newMessage: ChatMessage = {
        id: messageIdCounter + 1,
        content: data.response,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, newMessage]);
      setMessageIdCounter(prev => prev + 2);
    },
    onError: () => {
      const errorMessage: ChatMessage = {
        id: messageIdCounter + 1,
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      setMessageIdCounter(prev => prev + 2);
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (messageText?: string) => {
    const message = messageText || inputValue.trim();
    if (!message) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: messageIdCounter,
      content: message,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Send to API
    chatMutation.mutate(message);
  };

  const handleQuickAction = (action: typeof quickActions[0]) => {
    handleSendMessage(action.message);
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 right-0 w-96 h-[500px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-6rem)]"
          >
            <Card className="h-full flex flex-col shadow-2xl border-0">
              {/* Header */}
              <CardHeader className="bg-gradient-ceylon text-white p-4 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Ceylon AI Assistant</div>
                      <div className="text-xs opacity-80">Always here to help</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/10 p-1 h-auto"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[85%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.isUser 
                          ? 'bg-primary text-white' 
                          : 'bg-secondary text-white'
                      }`}>
                        {message.isUser ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </div>
                      <div className={`rounded-lg p-3 ${
                        message.isUser 
                          ? 'bg-primary text-white' 
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <div className={`text-xs mt-1 opacity-70 ${
                          message.isUser ? 'text-white' : 'text-slate-600'
                        }`}>
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {chatMutation.isPending && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-slate-100 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </CardContent>

              {/* Quick Actions */}
              <div className="p-3 border-t">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickAction(action)}
                        className="flex items-center space-x-1 text-xs h-8"
                        disabled={chatMutation.isPending}
                      >
                        <Icon className="h-3 w-3" />
                        <span>{action.label}</span>
                      </Button>
                    );
                  })}
                </div>

                {/* Input */}
                <div className="flex items-center space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 text-sm"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    disabled={chatMutation.isPending}
                  />
                  <Button
                    onClick={() => handleSendMessage()}
                    size="sm"
                    className="bg-primary hover:bg-primary/90 px-3"
                    disabled={!inputValue.trim() || chatMutation.isPending}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-ceylon shadow-2xl border-0 relative"
        >
          <AnimatePresence>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <X className="h-6 w-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <MessageCircle className="h-6 w-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-gradient-ceylon animate-pulse-glow opacity-75" />
        </Button>
      </motion.div>
    </div>
  );
}
