import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function VendorDashboard() {
  const { user } = useAuth();

  const { data: analytics } = useQuery({
    queryKey: ["/api/analytics/overview"],
    enabled: !!user && user.role === 'vendor',
  });

  const { data: gearItems } = useQuery({
    queryKey: ["/api/gear/vendor", user?.id],
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
        className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome {user?.fullName}! 🎒</h1>
            <p className="text-orange-100 text-lg">Your gear is helping travelers explore Sri Lanka safely</p>
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

      {/* Business Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-bl-full opacity-10"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Rentals</p>
                  <p className="text-3xl font-bold text-slate-800">{analytics?.totalRentals || 0}</p>
                  <p className="text-xs text-orange-600 mt-1">+8 this week</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-handshake text-orange-600 text-xl"></i>
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
                  <p className="text-sm font-medium text-slate-600">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-slate-800">LKR {(analytics?.monthlyRevenue || 0).toLocaleString()}</p>
                  <p className="text-xs text-green-600 mt-1">+18% this month</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-chart-line text-green-600 text-xl"></i>
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
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-bl-full opacity-10"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Rentals</p>
                  <p className="text-3xl font-bold text-slate-800">{analytics?.activeRentals || 0}</p>
                  <p className="text-xs text-blue-600 mt-1">Currently rented</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-box-open text-blue-600 text-xl"></i>
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
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-bl-full opacity-10"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Return Rate</p>
                  <p className="text-3xl font-bold text-slate-800">{analytics?.returnRate || 0}%</p>
                  <p className="text-xs text-purple-600 mt-1">Excellent!</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-undo text-purple-600 text-xl"></i>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Inventory Overview */}
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
                    <i className="fas fa-boxes text-orange-500 mr-2"></i>
                    Inventory Overview
                  </span>
                  <Link href="/gear-hub">
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                      <i className="fas fa-plus mr-2"></i>
                      Add Item
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-xl text-center">
                    <i className="fas fa-campground text-blue-600 text-2xl mb-2"></i>
                    <div className="font-semibold text-slate-800">Camping</div>
                    <div className="text-sm text-slate-600">12 items</div>
                    <div className="text-xs text-green-600">8 available</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl text-center">
                    <i className="fas fa-hiking text-green-600 text-2xl mb-2"></i>
                    <div className="font-semibold text-slate-800">Hiking</div>
                    <div className="text-sm text-slate-600">18 items</div>
                    <div className="text-xs text-green-600">15 available</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl text-center">
                    <i className="fas fa-camera text-purple-600 text-2xl mb-2"></i>
                    <div className="font-semibold text-slate-800">Photography</div>
                    <div className="text-sm text-slate-600">8 items</div>
                    <div className="text-xs text-green-600">5 available</div>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded-xl text-center">
                    <i className="fas fa-swimming-pool text-cyan-600 text-2xl mb-2"></i>
                    <div className="font-semibold text-slate-800">Water Sports</div>
                    <div className="text-sm text-slate-600">7 items</div>
                    <div className="text-xs text-orange-600">2 available</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-800">Top Performing Items</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <i className="fas fa-campground text-blue-600"></i>
                        </div>
                        <div>
                          <div className="font-medium text-slate-800">Professional Camping Tent</div>
                          <div className="text-sm text-slate-600">32 rentals this month</div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">High Demand</Badge>
                    </div>

                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <i className="fas fa-hiking text-green-600"></i>
                        </div>
                        <div>
                          <div className="font-medium text-slate-800">Hiking Backpack Set</div>
                          <div className="text-sm text-slate-600">28 rentals this month</div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">High Demand</Badge>
                    </div>

                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <i className="fas fa-camera text-purple-600"></i>
                        </div>
                        <div>
                          <div className="font-medium text-slate-800">DSLR Camera Kit</div>
                          <div className="text-sm text-slate-600">15 rentals this month</div>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Popular</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Rentals */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-clock text-blue-500 mr-2"></i>
                  Recent Rental Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-green-50 p-4 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <i className="fas fa-check text-white"></i>
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-800">Professional Camera Kit</h5>
                        <p className="text-sm text-slate-600">Rented by John Doe • 3 days • LKR 7,500</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between bg-blue-50 p-4 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <i className="fas fa-undo text-white"></i>
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-800">Mountain Bike</h5>
                        <p className="text-sm text-slate-600">Returned by Sarah Smith • 1 day • LKR 2,000</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Returned</Badge>
                  </div>

                  <div className="flex items-center justify-between bg-orange-50 p-4 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                        <i className="fas fa-clock text-white"></i>
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-800">Camping Tent Set</h5>
                        <p className="text-sm text-slate-600">Reserved by Mike Johnson • Pickup tomorrow • LKR 4,500</p>
                      </div>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">Pending</Badge>
                  </div>

                  <div className="flex items-center justify-between bg-purple-50 p-4 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                        <i className="fas fa-calendar text-white"></i>
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-800">Snorkeling Gear</h5>
                        <p className="text-sm text-slate-600">Booked by Emma Davis • Next week • LKR 3,000</p>
                      </div>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">Scheduled</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Revenue Summary */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-wallet text-green-500 mr-2"></i>
                  Revenue Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      LKR {(analytics?.monthlyRevenue || 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-green-600 flex items-center justify-center">
                      <i className="fas fa-arrow-up mr-1"></i>
                      +18% this month
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">This Week</span>
                      <span className="font-semibold text-slate-800">LKR 45,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Average per Rental</span>
                      <span className="font-semibold text-slate-800">LKR 2,850</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Top Category</span>
                      <span className="font-semibold text-slate-800">Camping</span>
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
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    <i className="fas fa-plus mr-2"></i>
                    Add New Item
                  </Button>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    <i className="fas fa-boxes mr-2"></i>
                    Manage Inventory
                  </Button>
                  <Button className="w-full bg-green-500 hover:bg-green-600">
                    <i className="fas fa-handshake mr-2"></i>
                    Process Returns
                  </Button>
                  <Button variant="outline" className="w-full">
                    <i className="fas fa-chart-bar mr-2"></i>
                    View Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Vendor Tips */}
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
                  Vendor Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="fas fa-check text-blue-600 text-xs"></i>
                    </div>
                    <p className="text-slate-600">
                      Regularly clean and maintain equipment to ensure quality and safety.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="fas fa-check text-green-600 text-xs"></i>
                    </div>
                    <p className="text-slate-600">
                      Update availability in real-time to avoid double bookings.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="fas fa-check text-orange-600 text-xs"></i>
                    </div>
                    <p className="text-slate-600">
                      Respond quickly to rental requests to maximize bookings.
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
