import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { AI_CHATBOT_RESPONSES, QUICK_CHAT_ACTIONS } from "@/lib/sample-data";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AIChatbot() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: AI_CHATBOT_RESPONSES.WELCOME,
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", { 
        message,
        userId: user?.id 
      });
      return response.json();
    },
    onSuccess: (data) => {
      setIsTyping(false);
      addMessage(data.response, false);
    },
    onError: (error) => {
      setIsTyping(false);
      toast({
        title: "Chat Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
      console.error("Chat error:", error);
    },
  });

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
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    addMessage(userMessage, true);
    setIsTyping(true);

    chatMutation.mutate(userMessage);
  };

  const handleQuickAction = (action: string) => {
    setInputMessage(action);
    handleSendMessage();
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
                className="fas fa-robot text-xl"
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
                          <i className="fas fa-robot text-lg"></i>
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold">HeritaGo AI Assistant</CardTitle>
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
                                <i className="fas fa-robot text-sm"></i>
                              </AvatarFallback>
                            </Avatar>
                          )}
                          
                          <div className={`rounded-2xl p-3 ${
                            message.isUser 
                              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.isUser ? 'text-white/70' : 'text-gray-500'
                            }`}>
                              {formatTime(message.timestamp)}
                            </p>
                          </div>

                          {message.isUser && user && (
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                                {user.fullName.charAt(0)}
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
                              <i className="fas fa-robot text-sm"></i>
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
                    >
                      {action}
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
                    disabled={chatMutation.isPending}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || chatMutation.isPending}
                    className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                  >
                    {chatMutation.isPending ? (
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
