import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Star, 
  TrendingUp, 
  Award, 
  Clock,
  Activity,
  Package,
  BarChart3,
  Shield,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface RoleDashboardsProps {
  currentRole?: string;
}

export default function RoleDashboards({ currentRole }: RoleDashboardsProps) {
  const [activeRole, setActiveRole] = useState(currentRole || "tourist");

  const roles = [
    { 
      id: "tourist", 
      label: "Tourist Dashboard", 
      icon: Users,
      color: "bg-blue-500 text-white",
      description: "Your travel companion"
    },
    { 
      id: "guide", 
      label: "Guide Dashboard", 
      icon: MapPin,
      color: "bg-green-500 text-white",
      description: "Manage your tours"
    },
    { 
      id: "vendor", 
      label: "Vendor Dashboard", 
      icon: Package,
      color: "bg-orange-500 text-white",
      description: "Gear rental business"
    },
    { 
      id: "admin", 
      label: "Admin Dashboard", 
      icon: Shield,
      color: "bg-slate-700 text-white",
      description: "Platform management"
    }
  ];

  const renderTouristDashboard = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        {/* Current Trip */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              Your Next Adventure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl p-6 text-white mb-4">
              <h4 className="text-xl font-semibold mb-2">Kandy Cultural Triangle - 5 Days</h4>
              <p className="opacity-90 mb-4">Temple of the Tooth • Sigiriya Rock • Dambulla Caves</p>
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-80">Starting March 15, 2024</span>
                <Badge className="bg-white text-blue-600">LKR 85,000</Badge>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">78%</div>
                <div className="text-sm text-slate-600">Trip Progress</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <div className="text-2xl font-bold text-emerald-600">12</div>
                <div className="text-sm text-slate-600">Places Visited</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <div className="text-2xl font-bold text-orange-600">4.9</div>
                <div className="text-sm text-slate-600">Experience Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quest Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2 text-purple-600" />
              Quest Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600">Cultural Heritage Sites</span>
                <span className="text-slate-800 font-semibold">8/12</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600">Beach Destinations</span>
                <span className="text-slate-800 font-semibold">5/8</span>
              </div>
              <Progress value={62} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600">Mountain Adventures</span>
                <span className="text-slate-800 font-semibold">3/6</span>
              </div>
              <Progress value={50} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {/* Upcoming Trips */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Adventures</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Sigiriya Rock", time: "Tomorrow, 6:00 AM", type: "Guide Tour" },
              { name: "Tea Plantation", time: "Dec 15, 8:00 AM", type: "Nuwara Eliya" },
              { name: "Whale Watching", time: "Dec 18, 5:30 AM", type: "Mirissa Beach" }
            ].map((trip, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-800">{trip.name}</div>
                  <div className="text-sm text-slate-600">{trip.time}</div>
                  <div className="text-xs text-blue-600">{trip.type}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weather */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Weather</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl mb-2">☀️</div>
            <div className="text-2xl font-bold text-slate-800">28°C</div>
            <div className="text-slate-600">Sunny in Colombo</div>
            <div className="text-sm text-slate-600 mt-2">Perfect for exploring!</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderGuideDashboard = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        {/* Today's Tours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-green-600" />
              Today's Tours
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-xl">
              <h4 className="font-semibold text-slate-800">Galle Fort Historical Walk</h4>
              <p className="text-sm text-slate-600">9:00 AM - 12:00 PM • 6 tourists • LKR 15,000</p>
              <Badge className="bg-green-100 text-green-800 mt-2">Active</Badge>
            </div>
            <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-xl">
              <h4 className="font-semibold text-slate-800">Ella Nine Arch Bridge Trek</h4>
              <p className="text-sm text-slate-600">2:00 PM - 6:00 PM • 4 tourists • LKR 12,000</p>
              <Badge className="bg-orange-100 text-orange-800 mt-2">Upcoming</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
              Monthly Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-slate-50 rounded-lg flex items-center justify-center text-slate-500">
              Performance chart visualization
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {/* Earnings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Earnings This Month</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">LKR 245K</div>
            <div className="text-green-600 text-sm">+15% from last month</div>
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <div className="font-semibold">Tours</div>
                <div className="text-slate-600">87 completed</div>
              </div>
              <div>
                <div className="font-semibold">Rating</div>
                <div className="text-slate-600">4.8 ⭐</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-green-600 hover:bg-green-700 justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              Add New Tour
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Clock className="w-4 h-4 mr-2" />
              Manage Schedule
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderVendorDashboard = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        {/* Inventory Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="w-5 h-5 mr-2 text-orange-600" />
              Inventory Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Tents", count: 12, icon: "🏕️", color: "bg-blue-100 text-blue-800" },
                { name: "Bikes", count: 8, icon: "🚴", color: "bg-green-100 text-green-800" },
                { name: "Cameras", count: 5, icon: "📸", color: "bg-purple-100 text-purple-800" },
                { name: "Gear", count: 25, icon: "🎒", color: "bg-orange-100 text-orange-800" }
              ].map((item, index) => (
                <div key={index} className={`p-4 rounded-xl text-center ${item.color}`}>
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm">{item.count} available</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Rentals */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Rentals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { item: "Professional Camera Kit", customer: "John Doe", days: 3, status: "Active" },
              { item: "Mountain Bike", customer: "Sarah Smith", days: 1, status: "Returned" }
            ].map((rental, index) => (
              <div key={index} className="flex items-center justify-between bg-slate-50 p-4 rounded-xl">
                <div>
                  <div className="font-semibold text-slate-800">{rental.item}</div>
                  <div className="text-sm text-slate-600">
                    Rented by {rental.customer} • {rental.days} days
                  </div>
                </div>
                <Badge 
                  className={rental.status === "Active" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-orange-100 text-orange-800"
                  }
                >
                  {rental.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {/* Revenue */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-orange-600">LKR 180K</div>
              <div className="text-sm text-green-600">+18% this month</div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Total Rentals</span>
                <span className="font-semibold">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Active Rentals</span>
                <span className="font-semibold">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Return Rate</span>
                <span className="font-semibold">98.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-orange-600 hover:bg-orange-700 justify-start">
              <Package className="w-4 h-4 mr-2" />
              Add New Item
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Activity className="w-4 h-4 mr-2" />
              Manage Inventory
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: "Total Users", 
            value: "15,420", 
            change: "+5.2%", 
            icon: Users,
            color: "text-blue-600"
          },
          { 
            title: "Revenue", 
            value: "LKR 2.4M", 
            change: "+12.8%", 
            icon: DollarSign,
            color: "text-green-600"
          },
          { 
            title: "Active Bookings", 
            value: "892", 
            change: "Real-time", 
            icon: Calendar,
            color: "text-orange-600"
          },
          { 
            title: "System Health", 
            value: "99.9%", 
            change: "Optimal", 
            icon: Activity,
            color: "text-emerald-600"
          }
        ].map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-slate-800">{metric.value}</p>
                    <p className="text-sm text-green-600">{metric.change}</p>
                  </div>
                  <IconComponent className={`w-8 h-8 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-slate-600" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { service: "API Response Time", status: "125ms", icon: CheckCircle, color: "text-green-600" },
              { service: "Server Uptime", status: "99.9%", icon: CheckCircle, color: "text-green-600" },
              { service: "Database Health", status: "Optimal", icon: CheckCircle, color: "text-green-600" },
              { service: "Payment Gateway", status: "Warning", icon: AlertTriangle, color: "text-yellow-600" }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-slate-600">{item.service}</span>
                  <div className="flex items-center space-x-2">
                    <IconComponent className={`w-4 h-4 ${item.color}`} />
                    <span className="font-medium">{item.status}</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-slate-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { text: "New Tourist Registration", detail: "John Smith from Australia", time: "2 min ago" },
              { text: "Guide Profile Updated", detail: "Kamala Fernando updated availability", time: "15 min ago" },
              { text: "Large Group Booking", detail: "15-person group booked Kandy tour", time: "1 hour ago" }
            ].map((activity, index) => (
              <div key={index} className="bg-slate-50 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-800">{activity.text}</span>
                  <span className="text-sm text-slate-500">{activity.time}</span>
                </div>
                <p className="text-sm text-slate-600">{activity.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const dashboardRenderers = {
    tourist: renderTouristDashboard,
    guide: renderGuideDashboard,
    vendor: renderVendorDashboard,
    admin: renderAdminDashboard,
  };

  return (
    <div>
      {/* Role Tabs */}
      {!currentRole && (
        <div className="flex flex-wrap justify-center mb-12 gap-4">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Button
                key={role.id}
                variant={activeRole === role.id ? "default" : "outline"}
                onClick={() => setActiveRole(role.id)}
                className={`${
                  activeRole === role.id ? role.color : ""
                } transition-all duration-300`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {role.label}
              </Button>
            );
          })}
        </div>
      )}

      {/* Dashboard Content */}
      <motion.div
        key={activeRole}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {dashboardRenderers[activeRole as keyof typeof dashboardRenderers]()}
      </motion.div>
    </div>
  );
}
