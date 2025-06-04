import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MapPin, 
  Calendar, 
  Star, 
  Clock, 
  Trophy, 
  Heart,
  Camera,
  Mountain,
  Waves,
  Plus,
  ArrowRight,
  TrendingUp
} from "lucide-react";

export default function TouristDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: trips } = useQuery({
    queryKey: ["/api/trips"],
  });

  const { data: bookings } = useQuery({
    queryKey: ["/api/bookings"],
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  const upcomingTrips = [
    {
      id: 1,
      title: "Sigiriya Rock Adventure",
      date: "Tomorrow, 6:00 AM",
      location: "Ancient City",
      guide: "Kumara Fernando",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Tea Plantation Tour",
      date: "Dec 15, 8:00 AM",
      location: "Nuwara Eliya",
      guide: "Sarah Perera",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Whale Watching",
      date: "Dec 18, 5:30 AM",
      location: "Mirissa Beach",
      guide: "Ocean Adventures",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    },
  ];

  const questCategories = [
    { name: "Cultural Heritage Sites", completed: 8, total: 12, progress: 67, color: "bg-blue-500" },
    { name: "Beach Destinations", completed: 5, total: 8, progress: 62, color: "bg-cyan-500" },
    { name: "Mountain Adventures", completed: 3, total: 6, progress: 50, color: "bg-green-500" },
    { name: "Wildlife Encounters", completed: 2, total: 5, progress: 40, color: "bg-orange-500" },
  ];

  const achievements = [
    { title: "First Steps", description: "Completed your first destination", icon: Trophy, unlocked: true },
    { title: "Heritage Explorer", description: "Visited 5 cultural sites", icon: Mountain, unlocked: true },
    { title: "Beach Lover", description: "Explored 3 beaches", icon: Waves, unlocked: true },
    { title: "Photography Pro", description: "Shared 10 photos", icon: Camera, unlocked: false },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome back, Explorer!</h1>
              <p className="text-muted-foreground mt-1">Continue your Sri Lankan adventure</p>
            </div>
            <Button size="lg" className="animate-pulse-glow">
              <Plus className="w-5 h-5 mr-2" />
              Plan New Trip
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Places Visited</p>
                  <p className="text-3xl font-bold">{stats?.placesVisited || 12}</p>
                </div>
                <MapPin className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Trips</p>
                  <p className="text-3xl font-bold">{stats?.totalTrips || 8}</p>
                </div>
                <Calendar className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Experiences</p>
                  <p className="text-3xl font-bold">{stats?.experiences || 25}</p>
                </div>
                <Heart className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Avg Rating</p>
                  <p className="text-3xl font-bold">{stats?.averageRating || 4.8}</p>
                </div>
                <Star className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Adventure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    Your Next Adventure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white mb-4">
                    <h3 className="text-xl font-semibold mb-2">Kandy Cultural Triangle - 5 Days</h3>
                    <p className="text-white/90 mb-4">Temple of the Tooth • Sigiriya Rock • Dambulla Caves</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white/80">Starting March 15, 2024</span>
                      <Badge variant="secondary" className="bg-white text-primary">
                        LKR 85,000
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Trip Progress</span>
                      <span>{stats?.questProgress || 78}%</span>
                    </div>
                    <Progress value={stats?.questProgress || 78} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quest Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-orange-500" />
                    Quest Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {questCategories.map((category, index) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {category.completed}/{category.total}
                        </span>
                      </div>
                      <Progress value={category.progress} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-500" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: "Completed quest", target: "Galle Fort Heritage Walk", time: "2 hours ago", points: "+50 XP" },
                      { action: "Booked experience", target: "Whale Watching Tour", time: "1 day ago", points: "" },
                      { action: "Earned achievement", target: "Beach Explorer Badge", time: "3 days ago", points: "+100 XP" },
                      { action: "Reviewed location", target: "Sigiriya Rock Fortress", time: "1 week ago", points: "+25 XP" },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.target}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                          {activity.points && (
                            <Badge variant="outline" className="text-xs">
                              {activity.points}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Trips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-green-500" />
                    Upcoming Adventures
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingTrips.map((trip) => (
                    <div key={trip.id} className="flex items-center space-x-4 p-3 bg-muted rounded-xl hover:bg-muted/80 transition-colors cursor-pointer">
                      <img 
                        src={trip.image} 
                        alt={trip.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{trip.title}</p>
                        <p className="text-sm text-muted-foreground">{trip.date}</p>
                        <p className="text-xs text-primary">{trip.guide}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Explorer Level */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-orange-500" />
                    Explorer Level
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-2xl">3</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Adventure Seeker</h3>
                  <p className="text-sm text-muted-foreground mb-4">2,450 XP earned</p>
                  <Progress value={65} className="mb-2" />
                  <p className="text-xs text-muted-foreground">850 XP to Level 4</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={achievement.title}
                      className={`flex items-center space-x-3 p-2 rounded-lg ${
                        achievement.unlocked ? 'bg-green-50' : 'bg-muted opacity-60'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        achievement.unlocked ? 'bg-green-500' : 'bg-muted-foreground'
                      }`}>
                        <achievement.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Plan New Trip
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MapPin className="w-4 h-4 mr-2" />
                    Find Hotels
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Camera className="w-4 h-4 mr-2" />
                    Share Experience
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
