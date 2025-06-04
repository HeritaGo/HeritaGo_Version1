import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TouristDashboard() {
  const { user } = useAuth();

  const { data: analytics } = useQuery({
    queryKey: ["/api/analytics/overview"],
    enabled: !!user && user.role === 'tourist',
  });

  const { data: destinations } = useQuery({
    queryKey: ["/api/destinations"],
  });

  const { data: alerts } = useQuery({
    queryKey: ["/api/alerts"],
  });

  const { data: bookings } = useQuery({
    queryKey: ["/api/bookings/user", user?.id],
    enabled: !!user,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-3xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.fullName}! 🌴</h1>
            <p className="text-teal-100 text-lg">Ready for your next Sri Lankan adventure?</p>
          </div>
          <div className="hidden md:block">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.profileImage} />
              <AvatarFallback className="bg-white/20 text-white text-2xl">
                {user?.fullName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-bl-full opacity-10"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Trips</p>
                  <p className="text-3xl font-bold text-slate-800">{analytics?.totalTrips || 0}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-map-marked-alt text-blue-600 text-xl"></i>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-bl-full opacity-10"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Places Visited</p>
                  <p className="text-3xl font-bold text-slate-800">{analytics?.placesVisited || 0}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-map-marker-alt text-green-600 text-xl"></i>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-bl-full opacity-10"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Quest Points</p>
                  <p className="text-3xl font-bold text-slate-800">{analytics?.questPoints || 0}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-trophy text-purple-600 text-xl"></i>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-bl-full opacity-10"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Alerts</p>
                  <p className="text-3xl font-bold text-slate-800">{alerts?.length || 0}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-bell text-orange-600 text-xl"></i>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quest Progress */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-trophy text-yellow-500 mr-2"></i>
                  Quest Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl font-bold">
                        {Math.floor((analytics?.questPoints || 0) / 1000) + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Explorer Level {Math.floor((analytics?.questPoints || 0) / 1000) + 1}</h3>
                    <p className="text-slate-600">{analytics?.questPoints || 0} quest points earned</p>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress to next level</span>
                      <span>{((analytics?.questPoints || 0) % 1000) / 10}%</span>
                    </div>
                    <Progress value={((analytics?.questPoints || 0) % 1000) / 10} className="h-3" />
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-amber-600">{analytics?.completedQuests || 0}</div>
                      <div className="text-sm text-slate-600">Completed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{analytics?.upcomingBookings || 0}</div>
                      <div className="text-sm text-slate-600">Upcoming</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{destinations?.length || 0}</div>
                      <div className="text-sm text-slate-600">Available</div>
                    </div>
                  </div>

                  <Link href="/quest">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      <i className="fas fa-play mr-2"></i>
                      Continue Quest
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-clock text-teal-500 mr-2"></i>
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <i className="fas fa-check text-white"></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800">Galle Fort Quest Completed</h4>
                      <p className="text-sm text-slate-600">Earned 100 quest points • 2 hours ago</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">+100 pts</Badge>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <i className="fas fa-calendar text-white"></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800">Hotel Booked</h4>
                      <p className="text-sm text-slate-600">Tea Garden Lodge, Ella • 1 day ago</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Confirmed</Badge>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                      <i className="fas fa-trophy text-white"></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800">Achievement Unlocked</h4>
                      <p className="text-sm text-slate-600">Heritage Master • 3 days ago</p>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">New!</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Upcoming Trips */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-calendar-alt text-emerald-500 mr-2"></i>
                  Upcoming Adventures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl flex items-center justify-center">
                      <i className="fas fa-mountain text-white"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Sigiriya Rock</h4>
                      <p className="text-sm text-slate-600">Tomorrow, 6:00 AM</p>
                      <p className="text-xs text-emerald-600">with Local Guide</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl flex items-center justify-center">
                      <i className="fas fa-leaf text-white"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Tea Plantation Tour</h4>
                      <p className="text-sm text-slate-600">Dec 15, 8:00 AM</p>
                      <p className="text-xs text-emerald-600">Nuwara Eliya</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center">
                      <i className="fas fa-water text-white"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Whale Watching</h4>
                      <p className="text-sm text-slate-600">Dec 18, 5:30 AM</p>
                      <p className="text-xs text-emerald-600">Mirissa Beach</p>
                    </div>
                  </div>
                </div>
                
                <Link href="/destinations">
                  <Button variant="outline" className="w-full mt-4">
                    <i className="fas fa-plus mr-2"></i>
                    Plan New Adventure
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weather Widget */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-cloud-sun text-yellow-500 mr-2"></i>
                  Current Weather
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-5xl mb-4">☀️</div>
                  <div className="text-3xl font-bold text-slate-800 mb-1">28°C</div>
                  <div className="text-slate-600 mb-4">Sunny in Colombo</div>
                  <div className="bg-green-50 text-green-800 p-3 rounded-xl">
                    <i className="fas fa-thumbs-up mr-2"></i>
                    Perfect for exploring!
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/destinations">
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">
                      <i className="fas fa-map-marked-alt mr-2"></i>
                      Explore Destinations
                    </Button>
                  </Link>
                  <Link href="/hotels">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">
                      <i className="fas fa-hotel mr-2"></i>
                      Find Hotels
                    </Button>
                  </Link>
                  <Link href="/gear-hub">
                    <Button className="w-full bg-purple-500 hover:bg-purple-600">
                      <i className="fas fa-hiking mr-2"></i>
                      Rent Gear
                    </Button>
                  </Link>
                  <Link href="/community">
                    <Button variant="outline" className="w-full">
                      <i className="fas fa-users mr-2"></i>
                      Join Community
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
