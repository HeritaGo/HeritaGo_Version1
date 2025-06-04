import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Trophy, 
  Star, 
  MapPin, 
  Target, 
  Gift, 
  Crown, 
  Zap,
  Camera,
  Map,
  Compass,
  Medal,
  Lock,
  CheckCircle,
  Camera as CameraIcon
} from "lucide-react";

interface QuestProgress {
  id: number;
  destinationId: number;
  status: "not_started" | "in_progress" | "completed";
  pointsEarned: number;
  badgesEarned: string[];
  completedAt?: string;
}

interface Destination {
  id: number;
  name: string;
  category: string;
  location: string;
  rating: string;
}

const questCategories = [
  {
    id: "heritage",
    name: "Heritage Hunter",
    icon: Crown,
    color: "bg-yellow-500",
    description: "Explore Sri Lanka's ancient wonders",
    totalSites: 12,
    pointsPerSite: 250
  },
  {
    id: "beach",
    name: "Beach Explorer", 
    icon: Target,
    color: "bg-blue-500",
    description: "Discover pristine coastal gems",
    totalSites: 8,
    pointsPerSite: 200
  },
  {
    id: "nature",
    name: "Mountain Adventurer",
    icon: Compass,
    color: "bg-green-500", 
    description: "Conquer peaks and valleys",
    totalSites: 6,
    pointsPerSite: 300
  }
];

const badges = [
  { id: "first_quest", name: "First Quest", icon: "🎯", description: "Complete your first quest" },
  { id: "heritage_master", name: "Heritage Master", icon: "👑", description: "Visit 5 heritage sites" },
  { id: "beach_lover", name: "Beach Lover", icon: "🏖️", description: "Visit 3 beaches" },
  { id: "mountain_climber", name: "Mountain Climber", icon: "⛰️", description: "Reach 3 mountain peaks" },
  { id: "photographer", name: "Photographer", icon: "📸", description: "Take 10 quest photos" },
  { id: "explorer", name: "Explorer", icon: "🗺️", description: "Visit 10 different locations" },
  { id: "champion", name: "Champion", icon: "🏆", description: "Earn 5000 quest points" }
];

const mockDestinations: Destination[] = [
  { id: 1, name: "Sigiriya Rock Fortress", category: "heritage", location: "Dambulla", rating: "4.8" },
  { id: 2, name: "Unawatuna Beach", category: "beach", location: "Galle", rating: "4.6" },
  { id: 3, name: "Ella Nine Arch Bridge", category: "nature", location: "Ella", rating: "4.9" }
];

export default function QuestMode() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch quest progress
  const { data: questProgress = [] } = useQuery<QuestProgress[]>({
    queryKey: ["/api/quest-progress"],
    enabled: !!user,
  });

  // Fetch destinations
  const { data: destinations = [] } = useQuery<Destination[]>({
    queryKey: ["/api/destinations"],
  });

  // Update quest progress mutation
  const updateQuestMutation = useMutation({
    mutationFn: async ({ destinationId, pointsEarned, badgesEarned }: {
      destinationId: number;
      pointsEarned: number;
      badgesEarned?: string[];
    }) => {
      const res = await apiRequest("POST", "/api/quest-progress", {
        destinationId,
        pointsEarned,
        badgesEarned,
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quest-progress"] });
    },
  });

  if (!user) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Lock className="w-12 h-12 mx-auto mb-4 text-slate-400" />
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Quest Mode Locked</h3>
          <p className="text-slate-600 mb-4">Sign in to start your Sri Lankan adventure quest!</p>
          <Button className="bg-teal-600 hover:bg-teal-700">Sign In to Play</Button>
        </CardContent>
      </Card>
    );
  }

  // Calculate total stats
  const totalPoints = questProgress.reduce((sum, quest) => sum + quest.pointsEarned, 0);
  const completedQuests = questProgress.filter(q => q.status === "completed").length;
  const allBadges = questProgress.flatMap(q => q.badgesEarned || []);
  const uniqueBadges = [...new Set(allBadges)];

  // Calculate level (every 1000 points = 1 level)
  const currentLevel = Math.floor(totalPoints / 1000) + 1;
  const pointsToNextLevel = 1000 - (totalPoints % 1000);
  const levelProgress = ((totalPoints % 1000) / 1000) * 100;

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return user?.username?.[0]?.toUpperCase() || "U";
  };

  const handleScanQR = (destinationId: number) => {
    // Simulate QR code scanning
    const category = destinations.find(d => d.id === destinationId)?.category;
    const categoryQuest = questCategories.find(c => c.id === category);
    
    if (categoryQuest) {
      const pointsEarned = categoryQuest.pointsPerSite;
      const newBadges = [];
      
      // Check for badge achievements
      if (completedQuests === 0) newBadges.push("first_quest");
      if (category === "heritage" && questProgress.filter(q => q.status === "completed").length >= 4) {
        newBadges.push("heritage_master");
      }
      
      updateQuestMutation.mutate({
        destinationId,
        pointsEarned,
        badgesEarned: newBadges.length > 0 ? newBadges : undefined,
      });
    }
    
    setShowQRScanner(false);
  };

  return (
    <div className="space-y-8">
      {/* Player Profile */}
      <Card className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-16 w-16 border-4 border-white/20">
              <AvatarFallback className="bg-white/20 text-white text-xl font-bold">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{user.firstName || user.username}</h2>
              <div className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-yellow-300" />
                <span className="text-lg">Level {currentLevel} Explorer</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <div className="text-2xl font-bold">{totalPoints}</div>
              <div className="text-sm opacity-90">Quest Points</div>
            </div>
            <div className="text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <div className="text-2xl font-bold">{completedQuests}</div>
              <div className="text-sm opacity-90">Quests Completed</div>
            </div>
            <div className="text-center">
              <Medal className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <div className="text-2xl font-bold">{uniqueBadges.length}</div>
              <div className="text-sm opacity-90">Badges Earned</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Level Progress</span>
              <span>{pointsToNextLevel} points to Level {currentLevel + 1}</span>
            </div>
            <Progress value={levelProgress} className="h-3 bg-white/20" />
          </div>
        </CardContent>
      </Card>

      {/* Quest Categories */}
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-6">Quest Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {questCategories.map((category) => {
            const IconComponent = category.icon;
            const categoryProgress = questProgress.filter(q => 
              destinations.find(d => d.id === q.destinationId)?.category === category.id && 
              q.status === "completed"
            ).length;
            
            return (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all duration-300"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800 mb-2">{category.name}</h4>
                    <p className="text-slate-600 text-sm mb-4">{category.description}</p>
                    <div className="text-2xl font-bold text-slate-800 mb-1">
                      {categoryProgress}/{category.totalSites}
                    </div>
                    <Progress 
                      value={(categoryProgress / category.totalSites) * 100} 
                      className="h-2 mb-3" 
                    />
                    <Badge variant="outline" className="text-xs">
                      {category.pointsPerSite} points each
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* QR Scanner */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CameraIcon className="w-5 h-5 mr-2 text-teal-600" />
            Check In at Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="w-24 h-24 border-4 border-teal-600 border-dashed rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Camera className="w-12 h-12 text-teal-600" />
            </div>
            <p className="text-slate-600 mb-4">
              Scan the QR code at your destination to check in and earn quest points!
            </p>
            <Button 
              onClick={() => setShowQRScanner(true)}
              className="bg-teal-600 hover:bg-teal-700"
            >
              <Camera className="w-4 h-4 mr-2" />
              Scan QR Code
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Badges Collection */}
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-6">Badge Collection</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {badges.map((badge) => {
            const isEarned = uniqueBadges.includes(badge.id);
            return (
              <motion.div
                key={badge.id}
                className={`p-4 rounded-xl text-center transition-all duration-300 ${
                  isEarned 
                    ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg" 
                    : "bg-slate-100 text-slate-400"
                }`}
                whileHover={isEarned ? { scale: 1.1 } : {}}
                title={badge.description}
              >
                <div className="text-2xl mb-1">{badge.icon}</div>
                <div className="text-xs font-medium">{badge.name}</div>
                {isEarned && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 bg-white rounded-full" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Achievements */}
      {questProgress.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-600" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {questProgress
                .filter(q => q.status === "completed")
                .slice(-3)
                .map((quest, index) => {
                  const destination = destinations.find(d => d.id === quest.destinationId);
                  return (
                    <div key={quest.id} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-800">
                          Visited {destination?.name || "Unknown Location"}
                        </div>
                        <div className="text-sm text-slate-600">
                          Earned {quest.pointsEarned} points
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        +{quest.pointsEarned}
                      </Badge>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* QR Scanner Modal */}
      <AnimatePresence>
        {showQRScanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">
                QR Code Scanner
              </h3>
              <div className="aspect-square bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                <Camera className="w-16 h-16 text-slate-400" />
              </div>
              <p className="text-slate-600 text-center mb-4">
                Point your camera at the QR code at the destination
              </p>
              
              {/* Demo buttons for testing */}
              <div className="space-y-2">
                <p className="text-sm text-slate-500 text-center">Demo destinations:</p>
                {mockDestinations.map((dest) => (
                  <Button
                    key={dest.id}
                    variant="outline"
                    className="w-full"
                    onClick={() => handleScanQR(dest.id)}
                  >
                    Check in at {dest.name}
                  </Button>
                ))}
              </div>
              
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => setShowQRScanner(false)}
              >
                Cancel
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
