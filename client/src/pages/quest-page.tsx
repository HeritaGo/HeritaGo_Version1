import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import AIChatbot from "@/components/chatbot/ai-chatbot";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";

const questCategories = [
  {
    id: "heritage",
    name: "Heritage Explorer",
    icon: "fas fa-monument",
    color: "from-amber-500 to-orange-500",
    description: "Discover ancient kingdoms and UNESCO sites",
    totalQuests: 12,
  },
  {
    id: "nature",
    name: "Nature Guardian",
    icon: "fas fa-leaf",
    color: "from-green-500 to-emerald-500",
    description: "Explore national parks and wildlife",
    totalQuests: 10,
  },
  {
    id: "beach",
    name: "Beach Hopper",
    icon: "fas fa-umbrella-beach",
    color: "from-blue-500 to-cyan-500",
    description: "Visit pristine beaches and coastal towns",
    totalQuests: 8,
  },
  {
    id: "culture",
    name: "Culture Enthusiast",
    icon: "fas fa-temple",
    color: "from-purple-500 to-pink-500",
    description: "Experience local traditions and festivals",
    totalQuests: 15,
  },
  {
    id: "adventure",
    name: "Adventure Seeker",
    icon: "fas fa-mountain",
    color: "from-red-500 to-orange-500",
    description: "Conquer mountains and extreme sports",
    totalQuests: 6,
  },
  {
    id: "food",
    name: "Food Explorer",
    icon: "fas fa-utensils",
    color: "from-yellow-500 to-red-500",
    description: "Taste authentic Sri Lankan cuisine",
    totalQuests: 20,
  },
];

const achievements = [
  {
    id: "first_visit",
    name: "First Steps",
    description: "Complete your first quest",
    icon: "fas fa-baby",
    earned: true,
    points: 100,
  },
  {
    id: "heritage_master",
    name: "Heritage Master",
    description: "Visit 5 UNESCO World Heritage sites",
    icon: "fas fa-crown",
    earned: true,
    points: 500,
  },
  {
    id: "wildlife_photographer",
    name: "Wildlife Photographer",
    description: "Spot and photograph 10 different animals",
    icon: "fas fa-camera",
    earned: false,
    points: 300,
  },
  {
    id: "tea_connoisseur",
    name: "Tea Connoisseur",
    description: "Visit 3 tea plantations and taste different varieties",
    icon: "fas fa-coffee",
    earned: false,
    points: 250,
  },
  {
    id: "temple_pilgrim",
    name: "Temple Pilgrim",
    description: "Visit 10 temples across different regions",
    icon: "fas fa-pray",
    earned: true,
    points: 400,
  },
  {
    id: "beach_explorer",
    name: "Beach Explorer",
    description: "Visit beaches on all 4 coasts of Sri Lanka",
    icon: "fas fa-water",
    earned: false,
    points: 350,
  },
];

export default function QuestPage() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: questProgress } = useQuery({
    queryKey: ["/api/quest-progress", user?.id],
    enabled: !!user,
  });

  const { data: destinations } = useQuery({
    queryKey: ["/api/destinations"],
  });

  // Calculate user level and progress
  const totalPoints = questProgress?.reduce((sum: number, quest: any) => sum + quest.points, 0) || 0;
  const userLevel = Math.floor(totalPoints / 1000) + 1;
  const pointsToNextLevel = ((userLevel * 1000) - totalPoints);
  const levelProgress = ((totalPoints % 1000) / 1000) * 100;

  const getQuestsByCategory = (categoryId: string) => {
    if (!destinations) return [];
    return destinations.filter((dest: any) => 
      categoryId === "all" || dest.category === categoryId
    );
  };

  const isQuestCompleted = (destinationId: number) => {
    return questProgress?.some((quest: any) => 
      quest.destinationId === destinationId && quest.isCompleted
    );
  };

  const completedQuests = questProgress?.filter((quest: any) => quest.isCompleted).length || 0;
  const totalQuests = destinations?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Navbar />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl font-bold mb-6">Quest Mode</h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                Turn your Sri Lankan adventure into an exciting quest! Complete challenges, earn points, and unlock achievements as you explore Ceylon.
              </p>
              
              {user && (
                <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">{userLevel}</div>
                      <div className="text-white/80">Explorer Level</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">{totalPoints.toLocaleString()}</div>
                      <div className="text-white/80">Total Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">{completedQuests}/{totalQuests}</div>
                      <div className="text-white/80">Quests Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">{achievements.filter(a => a.earned).length}</div>
                      <div className="text-white/80">Achievements</div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Level {userLevel} Progress</span>
                      <span>{pointsToNextLevel} points to Level {userLevel + 1}</span>
                    </div>
                    <Progress value={levelProgress} className="h-3 bg-white/20" />
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Quest Categories */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Quest Categories</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Choose your adventure path and start earning points
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {questCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className={`h-32 bg-gradient-to-br ${category.color} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <i className={`${category.icon} text-white text-4xl`}></i>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/20 text-white">
                          {category.totalQuests} quests
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{category.name}</h3>
                      <p className="text-slate-600 text-sm mb-4">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">
                          {getQuestsByCategory(category.id).filter((dest: any) => 
                            isQuestCompleted(dest.id)
                          ).length} completed
                        </span>
                        <Button size="sm" className="group-hover:shadow-lg transition-all duration-300">
                          Start Quest
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="quests" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="quests">Active Quests</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              </TabsList>

              <TabsContent value="quests" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* Quest List */}
                  <div className="lg:col-span-3 space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <h3 className="text-2xl font-bold text-slate-800 mb-6">Available Quests</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {destinations?.slice(0, 6).map((destination: any, index: number) => {
                          const isCompleted = isQuestCompleted(destination.id);
                          return (
                            <motion.div
                              key={destination.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                              <Card className={`overflow-hidden border-2 transition-all duration-300 ${
                                isCompleted 
                                  ? 'border-green-200 bg-green-50' 
                                  : 'border-transparent hover:border-purple-200 hover:shadow-lg'
                              }`}>
                                <div className="relative h-32 bg-gradient-to-r from-purple-400 to-pink-400">
                                  <div className="absolute inset-0 bg-black/20"></div>
                                  <div className="absolute top-4 left-4">
                                    <Badge className={`${
                                      isCompleted 
                                        ? 'bg-green-500 text-white' 
                                        : 'bg-white/20 text-white'
                                    }`}>
                                      {isCompleted ? 'Completed' : 'Available'}
                                    </Badge>
                                  </div>
                                  <div className="absolute top-4 right-4">
                                    <Badge className="bg-yellow-500 text-white">
                                      <i className="fas fa-star mr-1"></i>
                                      100 pts
                                    </Badge>
                                  </div>
                                  <div className="absolute bottom-4 left-4 right-4">
                                    <h4 className="text-white font-bold text-lg">{destination.name}</h4>
                                  </div>
                                </div>
                                <CardContent className="p-4">
                                  <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                                    {destination.description}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-500 flex items-center">
                                      <i className="fas fa-map-marker-alt mr-1"></i>
                                      {destination.location}
                                    </span>
                                    <Button 
                                      size="sm" 
                                      variant={isCompleted ? "outline" : "default"}
                                      disabled={isCompleted}
                                    >
                                      {isCompleted ? (
                                        <>
                                          <i className="fas fa-check mr-2"></i>
                                          Completed
                                        </>
                                      ) : (
                                        <>
                                          <i className="fas fa-play mr-2"></i>
                                          Start
                                        </>
                                      )}
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  </div>

                  {/* Progress Sidebar */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Your Progress</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                              <span className="text-white text-2xl font-bold">{userLevel}</span>
                            </div>
                            <div className="text-lg font-semibold text-slate-800">Explorer Level {userLevel}</div>
                            <div className="text-sm text-slate-600">{totalPoints.toLocaleString()} total points</div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Progress to Level {userLevel + 1}</span>
                              <span>{Math.round(levelProgress)}%</span>
                            </div>
                            <Progress value={levelProgress} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <i className="fas fa-check text-green-600"></i>
                            </div>
                            <div>
                              <div className="font-medium">Completed Galle Fort</div>
                              <div className="text-slate-500">+100 points</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <i className="fas fa-trophy text-blue-600"></i>
                            </div>
                            <div>
                              <div className="font-medium">Achievement Unlocked</div>
                              <div className="text-slate-500">Heritage Master</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                              <i className="fas fa-level-up-alt text-purple-600"></i>
                            </div>
                            <div>
                              <div className="font-medium">Level Up!</div>
                              <div className="text-slate-500">Reached Level {userLevel}</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <Card className={`${
                          achievement.earned 
                            ? 'border-yellow-200 bg-yellow-50' 
                            : 'border-gray-200 bg-gray-50'
                        } transition-all duration-300 hover:shadow-lg`}>
                          <CardContent className="p-6 text-center">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                              achievement.earned 
                                ? 'bg-yellow-500 text-white' 
                                : 'bg-gray-300 text-gray-500'
                            }`}>
                              <i className={`${achievement.icon} text-2xl`}></i>
                            </div>
                            <h4 className="font-bold text-lg mb-2">{achievement.name}</h4>
                            <p className="text-slate-600 text-sm mb-4">{achievement.description}</p>
                            <div className="flex items-center justify-center space-x-2">
                              <Badge className={`${
                                achievement.earned 
                                  ? 'bg-yellow-500 text-white' 
                                  : 'bg-gray-200 text-gray-600'
                              }`}>
                                <i className="fas fa-star mr-1"></i>
                                {achievement.points} points
                              </Badge>
                              {achievement.earned && (
                                <Badge className="bg-green-500 text-white">
                                  <i className="fas fa-check mr-1"></i>
                                  Earned
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="leaderboard" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center py-16"
                >
                  <i className="fas fa-trophy text-6xl text-slate-300 mb-4"></i>
                  <h3 className="text-2xl font-semibold text-slate-600 mb-2">Leaderboard Coming Soon</h3>
                  <p className="text-slate-500">Compete with other travelers and see who's the ultimate Sri Lanka explorer!</p>
                </motion.div>
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
