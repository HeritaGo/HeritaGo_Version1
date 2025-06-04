import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminDashboard() {
  const { user } = useAuth();

  const { data: analytics } = useQuery({
    queryKey: ["/api/analytics/overview"],
    enabled: !!user && user.role === 'admin',
  });

  const { data: users } = useQuery({
    queryKey: ["/api/users"],
  });

  const { data: alerts } = useQuery({
    queryKey: ["/api/alerts"],
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
        className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Control Center</h1>
            <p className="text-purple-100 text-lg">Manage and monitor the entire HeritaGo platform</p>
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

      {/* Platform Stats */}
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
                  <p className="text-sm font-medium text-slate-600">Total Users</p>
                  <p className="text-3xl font-bold text-slate-800">{analytics?.totalUsers || 0}</p>
                  <p className="text-xs text-blue-600 mt-1">+12 this week</p>
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
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-bl-full opacity-10"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Bookings</p>
                  <p className="text-3xl font-bold text-slate-800">{analytics?.activeBookings || 0}</p>
                  <p className="text-xs text-green-600 mt-1">This month</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-calendar-check text-green-600 text-xl"></i>
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
                  <p className="text-sm font-medium text-slate-600">Platform Revenue</p>
                  <p className="text-3xl font-bold text-slate-800">LKR {(analytics?.totalRevenue || 0).toLocaleString()}</p>
                  <p className="text-xs text-purple-600 mt-1">+8% this month</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-chart-line text-purple-600 text-xl"></i>
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
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-bl-full opacity-10"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Alerts</p>
                  <p className="text-3xl font-bold text-slate-800">{alerts?.length || 0}</p>
                  <p className="text-xs text-red-600 mt-1">Requires attention</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* User Management */}
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
                    <i className="fas fa-user-cog text-blue-500 mr-2"></i>
                    User Management
                  </span>
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                    <i className="fas fa-plus mr-2"></i>
                    Add User
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div className="bg-teal-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-teal-600">{analytics?.touristCount || 0}</div>
                      <div className="text-sm text-slate-600">Tourists</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">{analytics?.guideCount || 0}</div>
                      <div className="text-sm text-slate-600">Guides</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-orange-600">{analytics?.vendorCount || 0}</div>
                      <div className="text-sm text-slate-600">Vendors</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600">{analytics?.adminCount || 0}</div>
                      <div className="text-sm text-slate-600">Admins</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-800">Recent Registrations</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-teal-500 text-white">AT</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-slate-800">Alex Thompson</div>
                            <div className="text-sm text-slate-600">Tourist • alex@email.com</div>
                          </div>
                        </div>
                        <Badge className="bg-teal-100 text-teal-800">Today</Badge>
                      </div>

                      <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-green-500 text-white">SP</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-slate-800">Samantha Perera</div>
                            <div className="text-sm text-slate-600">Guide • samantha@guide.lk</div>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Yesterday</Badge>
                      </div>

                      <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-orange-500 text-white">RG</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-slate-800">Rajesh Gupta</div>
                            <div className="text-sm text-slate-600">Vendor • rajesh@gear.lk</div>
                          </div>
                        </div>
                        <Badge className="bg-orange-100 text-orange-800">2 days ago</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* System Alerts */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-bell text-red-500 mr-2"></i>
                  System Alerts & Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-800">Weather Alert: Heavy Rain in Kandy</h4>
                      <Badge className="bg-red-100 text-red-800">Critical</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      Monsoon alert affecting 15 active tours. Guides and tourists have been notified.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Issued 2 hours ago</span>
                      <Button size="sm" variant="outline">
                        <i className="fas fa-eye mr-2"></i>
                        View Details
                      </Button>
                    </div>
                  </div>

                  <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded-r-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-800">Server Performance Alert</h4>
                      <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      High traffic detected. Response times increased by 15%. Consider scaling resources.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">30 minutes ago</span>
                      <Button size="sm" variant="outline">
                        <i className="fas fa-chart-line mr-2"></i>
                        Monitor
                      </Button>
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-800">New Feature Deployment</h4>
                      <Badge className="bg-blue-100 text-blue-800">Info</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      Enhanced AI chatbot features have been successfully deployed to production.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">1 hour ago</span>
                      <Button size="sm" variant="outline">
                        <i className="fas fa-info-circle mr-2"></i>
                        Release Notes
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Platform Health */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-heartbeat text-green-500 mr-2"></i>
                  Platform Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Server Status</span>
                    <Badge className="bg-green-100 text-green-800">
                      <i className="fas fa-circle text-green-500 mr-1"></i>
                      Online
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Database</span>
                    <Badge className="bg-green-100 text-green-800">
                      <i className="fas fa-circle text-green-500 mr-1"></i>
                      Healthy
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">AI Services</span>
                    <Badge className="bg-green-100 text-green-800">
                      <i className="fas fa-circle text-green-500 mr-1"></i>
                      Active
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Payment Gateway</span>
                    <Badge className="bg-green-100 text-green-800">
                      <i className="fas fa-circle text-green-500 mr-1"></i>
                      Connected
                    </Badge>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">99.8%</div>
                      <div className="text-sm text-slate-600">Uptime (30 days)</div>
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
                <CardTitle>Admin Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <i className="fas fa-broadcast-tower mr-2"></i>
                    Send Platform Alert
                  </Button>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    <i className="fas fa-chart-bar mr-2"></i>
                    Generate Report
                  </Button>
                  <Button className="w-full bg-green-500 hover:bg-green-600">
                    <i className="fas fa-user-plus mr-2"></i>
                    Create Admin Account
                  </Button>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    <i className="fas fa-cogs mr-2"></i>
                    System Settings
                  </Button>
                  <Link href="/alerts">
                    <Button variant="outline" className="w-full">
                      <i className="fas fa-exclamation-triangle mr-2"></i>
                      View All Alerts
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
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-history text-slate-500 mr-2"></i>
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm font-medium text-slate-800">User registration spike</div>
                      <div className="text-xs text-slate-600">15 new users in last hour</div>
                      <div className="text-xs text-slate-500">5 minutes ago</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm font-medium text-slate-800">Payment processed</div>
                      <div className="text-xs text-slate-600">Hotel booking confirmed</div>
                      <div className="text-xs text-slate-500">12 minutes ago</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm font-medium text-slate-800">Guide verification</div>
                      <div className="text-xs text-slate-600">New guide pending approval</div>
                      <div className="text-xs text-slate-500">25 minutes ago</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm font-medium text-slate-800">System backup</div>
                      <div className="text-xs text-slate-600">Daily backup completed</div>
                      <div className="text-xs text-slate-500">1 hour ago</div>
                    </div>
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