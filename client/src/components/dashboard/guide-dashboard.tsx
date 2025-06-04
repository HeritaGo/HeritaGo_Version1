import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function GuideDashboard() {
  const { user } = useAuth();

  const { data: analytics } = useQuery({
    queryKey: ["/api/analytics/overview"],
    enabled: !!user && user.role === 'guide',
  });

  const { data: tours } = useQuery({
    queryKey: ["/api/tours/guide", user?.id],
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
        className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Hello Guide {user?.fullName}! 🌟</h1>
            <p className="text-green-100 text-lg">Ready to share Ceylon's wonders with travelers today?</p>
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

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-bl-full opacity-10"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Tours</p>
                  <p className="text-3xl font-bold text-slate-800">{analytics?.totalTours || 0}</p>
                  <p className="text-xs text-green-600 mt-1">+5 this month</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-route text-green-600 text-xl"></i>
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
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-bl-full opacity-10"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Tourists</p>
                  <p className="text-3xl font-bold text-slate-800">{analytics?.totalTourists || 0}</p>
                  <p className="text-xs text-blue-600 mt-1">All time</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-users text-blue-600 text-xl"></i>
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
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-bl-full opacity-10"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Monthly Earnings</p>
                  <p className="text-3xl font-bold text-slate-800">LKR {(analytics?.monthlyEarnings || 0).toLocaleString()}</p>
                  <p className="text-xs text-emerald-600 mt-1">+12% this month</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-coins text-emerald-600 text-xl"></i>
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
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-bl-full opacity-10"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Average Rating</p>
                  <p className="text-3xl font-bold text-slate-800">{analytics?.averageRating || 0}</p>
                  <p className="text-xs text-yellow-600 mt-1">From 127 reviews</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-star text-yellow-600 text-xl"></i>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Today's Tours */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <i className="fas fa-calendar-day text-green-500 mr-2"></i>
                    Today's Tours
                  </span>
                  <Badge className="bg-green-100 text-green-800">
                    {analytics?.activeTours || 0} active
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-800">Galle Fort Historical Walk</h4>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">9:00 AM - 12:00 PM • 6 tourists</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Group: Johnson Family</span>
                      <span className="font-semibold text-green-600">LKR 15,000</span>
                    </div>
                  </div>

                  <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-800">Ella Nine Arch Bridge Trek</h4>
                      <Badge className="bg-orange-100 text-orange-800">Upcoming</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">2:00 PM - 6:00 PM • 4 tourists</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Group: Adventure Seekers</span>
                      <span className="font-semibold text-orange-600">LKR 12,000</span>
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-800">Kandy Temple & Gardens</h4>
                      <Badge className="bg-blue-100 text-blue-800">Tomorrow</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">8:00 AM - 1:00 PM • 8 tourists</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Group: Cultural Explorers</span>
                      <span className="font-semibold text-blue-600">LKR 18,000</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Reviews */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-comments text-blue-500 mr-2"></i>
                  Recent Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-blue-500 text-white">JS</AvatarFallback>
                        </Avatar>
                        <div>
                          <h5 className="font-semibold text-slate-800">John Smith</h5>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className="fas fa-star text-yellow-400 text-sm"></i>
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500">2 days ago</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      "Amazing tour of Galle Fort! Samanthi was incredibly knowledgeable about the history and showed us hidden gems. Highly recommended!"
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-green-500 text-white">MJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <h5 className="font-semibold text-slate-800">Maria Johnson</h5>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className="fas fa-star text-yellow-400 text-sm"></i>
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500">1 week ago</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      "Perfect introduction to Sri Lankan culture. The temple visit was spiritual and educational. Thank you for the wonderful experience!"
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Revenue Chart */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-chart-line text-emerald-500 mr-2"></i>
                  Monthly Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-1">
                      LKR {(analytics?.monthlyEarnings || 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-green-600 flex items-center justify-center">
                      <i className="fas fa-arrow-up mr-1"></i>
                      +12% this month
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Tours Completed</span>
                      <span className="font-semibold text-slate-800">{analytics?.totalTours || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Active Bookings</span>
                      <span className="font-semibold text-slate-800">{analytics?.activeTours || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Average per Tour</span>
                      <span className="font-semibold text-slate-800">
                        LKR {analytics?.totalTours ? Math.round((analytics?.monthlyEarnings || 0) / analytics.totalTours).toLocaleString() : '0'}
                      </span>
                    </div>
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
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <i className="fas fa-plus mr-2"></i>
                    Add New Tour
                  </Button>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    <i className="fas fa-calendar mr-2"></i>
                    Manage Schedule
                  </Button>
                  <Button className="w-full bg-purple-500 hover:bg-purple-600">
                    <i className="fas fa-users mr-2"></i>
                    View Tourists
                  </Button>
                  <Button variant="outline" className="w-full">
                    <i className="fas fa-chart-bar mr-2"></i>
                    Analytics Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Guide Tips */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-lightbulb text-yellow-500 mr-2"></i>
                  Guide Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="fas fa-check text-blue-600 text-xs"></i>
                    </div>
                    <p className="text-slate-600">
                      Arrive 15 minutes early to meet your tourists and review the itinerary.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="fas fa-check text-green-600 text-xs"></i>
                    </div>
                    <p className="text-slate-600">
                      Share interesting local stories and cultural insights during tours.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="fas fa-check text-orange-600 text-xs"></i>
                    </div>
                    <p className="text-slate-600">
                      Keep emergency contacts handy and know the nearest medical facilities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
