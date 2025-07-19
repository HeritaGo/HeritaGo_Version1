import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Chatbot from "@/components/chatbot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";

// Mock community data
const forumPosts = [
  {
    id: 1,
    title: "Best time to visit Sigiriya Rock?",
    author: "TravelLover_2024",
    role: "tourist",
    replies: 12,
    likes: 25,
    timeAgo: "2 hours ago",
    excerpt:
      "Planning to visit Sigiriya next month. What's the best time of day to climb the rock?",
  },
  {
    id: 2,
    title: "Hidden gems in Ella - Local's perspective",
    author: "EllaGuide_Sam",
    role: "guide",
    replies: 8,
    likes: 18,
    timeAgo: "4 hours ago",
    excerpt:
      "As a local guide, here are some amazing spots in Ella that most tourists miss...",
  },
  {
    id: 3,
    title: "Camera equipment rental in Colombo?",
    author: "PhotoEnthusiast",
    role: "tourist",
    replies: 5,
    likes: 10,
    timeAgo: "6 hours ago",
    excerpt:
      "Looking for professional camera gear rental in Colombo. Any recommendations?",
  },
];

const travelGroups = [
  {
    id: 1,
    name: "Solo Travelers Sri Lanka",
    members: 1245,
    description: "Connect with fellow solo adventurers exploring Ceylon",
    image: "/api/placeholder/300/200",
  },
  {
    id: 2,
    name: "Photography Tours LK",
    members: 892,
    description:
      "Capture the beauty of Sri Lanka with like-minded photographers",
    image: "/api/placeholder/300/200",
  },
  {
    id: 3,
    name: "Cultural Heritage Explorers",
    members: 567,
    description: "Dive deep into Sri Lanka's rich cultural heritage",
    image: "/api/placeholder/300/200",
  },
];

const chatRooms = [
  {
    id: 1,
    name: "General Travel Chat",
    members: 234,
    lastMessage: "Anyone been to Yala recently?",
    time: "5 min ago",
  },
  {
    id: 2,
    name: "Guides & Tourists",
    members: 156,
    lastMessage: "Available for Kandy tour tomorrow",
    time: "12 min ago",
  },
  {
    id: 3,
    name: "Gear Exchange",
    members: 89,
    lastMessage: "Selling hiking boots size 42",
    time: "1 hour ago",
  },
];

export default function CommunityPage() {
  const { user } = useAuth();
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");

  const getRoleColor = (role: string) => {
    switch (role) {
      case "tourist":
        return "bg-blue-100 text-blue-800";
      case "guide":
        return "bg-green-100 text-green-800";
      case "vendor":
        return "bg-orange-100 text-orange-800";
      case "admin":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      <Navbar />

      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-teal-600 to-orange-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl font-bold mb-6">Community Hub</h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                Connect with fellow travelers, local guides, and vendors. Share
                experiences, get advice, and plan your perfect Sri Lankan
                adventure together.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Community Stats */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-teal-600">15,420</div>
                <div className="text-slate-600">Active Members</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-orange-500">2,856</div>
                <div className="text-slate-600">Forum Posts</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-green-600">48</div>
                <div className="text-slate-600">Travel Groups</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-blue-600">892</div>
                <div className="text-slate-600">Connections Made</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="forum" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="forum">Forum</TabsTrigger>
                <TabsTrigger value="groups">Travel Groups</TabsTrigger>
                <TabsTrigger value="chat">Live Chat</TabsTrigger>
                <TabsTrigger value="connections">Connections</TabsTrigger>
              </TabsList>

              {/* Forum Tab */}
              <TabsContent value="forum" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    {/* Create New Post */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <i className="fas fa-edit mr-2 text-teal-600"></i>
                          Create New Post
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Input
                          placeholder="What's your question or topic?"
                          value={newPostTitle}
                          onChange={(e) => setNewPostTitle(e.target.value)}
                        />
                        <Textarea
                          placeholder="Share your thoughts, ask questions, or offer advice..."
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                          rows={4}
                        />
                        <Button className="w-full bg-teal-600 hover:bg-teal-700">
                          <i className="fas fa-paper-plane mr-2"></i>
                          Post to Community
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Forum Posts */}
                    <div className="space-y-4">
                      {forumPosts.map((post, index) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                          <Card className="hover:shadow-lg transition-shadow duration-200">
                            <CardContent className="p-6">
                              <div className="flex items-start space-x-4">
                                <Avatar>
                                  <AvatarFallback>
                                    {post.author[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <h3 className="font-semibold text-lg">
                                      {post.title}
                                    </h3>
                                    <Badge className={getRoleColor(post.role)}>
                                      {post.role}
                                    </Badge>
                                  </div>
                                  <p className="text-slate-600 mb-3">
                                    {post.excerpt}
                                  </p>
                                  <div className="flex items-center space-x-6 text-sm text-slate-500">
                                    <span>by {post.author}</span>
                                    <span>{post.timeAgo}</span>
                                    <button className="flex items-center space-x-1 hover:text-teal-600">
                                      <i className="fas fa-reply"></i>
                                      <span>{post.replies} replies</span>
                                    </button>
                                    <button className="flex items-center space-x-1 hover:text-red-500">
                                      <i className="fas fa-heart"></i>
                                      <span>{post.likes}</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Trending Topics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">#SriLankaTravel</span>
                            <Badge variant="outline">245 posts</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">#Sigiriya</span>
                            <Badge variant="outline">189 posts</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">#BeachHoliday</span>
                            <Badge variant="outline">156 posts</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">#CulturalTour</span>
                            <Badge variant="outline">134 posts</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Community Guidelines</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-2 text-slate-600">
                          <li>• Be respectful to all community members</li>
                          <li>• Share authentic experiences and advice</li>
                          <li>• No spam or promotional content</li>
                          <li>• Help others discover Sri Lanka responsibly</li>
                          <li>• Report inappropriate content</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Travel Groups Tab */}
              <TabsContent value="groups">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {travelGroups.map((group, index) => (
                    <motion.div
                      key={group.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow duration-200">
                        <div className="h-48 bg-gradient-to-r from-teal-400 to-orange-400 rounded-t-lg"></div>
                        <CardContent className="p-6">
                          <h3 className="font-semibold text-lg mb-2">
                            {group.name}
                          </h3>
                          <p className="text-slate-600 text-sm mb-4">
                            {group.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500">
                              <i className="fas fa-users mr-1"></i>
                              {group.members.toLocaleString()} members
                            </span>
                            <Button size="sm">Join Group</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Live Chat Tab */}
              <TabsContent value="chat">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card className="h-96">
                      <CardHeader>
                        <CardTitle>General Travel Chat</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col h-full">
                        <div className="flex-1 bg-slate-50 rounded-lg p-4 mb-4">
                          <div className="text-center text-slate-500">
                            <i className="fas fa-comments text-2xl mb-2"></i>
                            <p>Start chatting with fellow travelers!</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Type your message..."
                            className="flex-1"
                          />
                          <Button>
                            <i className="fas fa-paper-plane"></i>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Active Rooms</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {chatRooms.map((room) => (
                            <div
                              key={room.id}
                              className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-sm">
                                  {room.name}
                                </span>
                                <span className="text-xs text-slate-500">
                                  {room.members}
                                </span>
                              </div>
                              <p className="text-xs text-slate-600">
                                {room.lastMessage}
                              </p>
                              <span className="text-xs text-slate-400">
                                {room.time}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Connections Tab */}
              <TabsContent value="connections">
                <div className="text-center py-16">
                  <i className="fas fa-users text-6xl text-slate-300 mb-4"></i>
                  <h3 className="text-2xl font-semibold text-slate-600 mb-2">
                    Connect with Fellow Travelers
                  </h3>
                  <p className="text-slate-500 mb-6">
                    Find travel buddies, local guides, and trusted vendors for
                    your Sri Lankan adventure
                  </p>
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    <i className="fas fa-search mr-2"></i>
                    Find Connections
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>

      <Footer />
      <AIChatbot />
    </div>
  );
}
