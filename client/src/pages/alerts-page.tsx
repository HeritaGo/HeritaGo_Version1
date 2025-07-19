import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Chatbot from "@/components/chatbot";
import AlertCard from "@/components/ui/alert-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";

const alertCategories = [
  { id: "all", name: "All Alerts", icon: "fas fa-bell" },
  { id: "weather", name: "Weather", icon: "fas fa-cloud-rain" },
  { id: "safety", name: "Safety", icon: "fas fa-shield-alt" },
  { id: "traffic", name: "Traffic", icon: "fas fa-car" },
  { id: "health", name: "Health", icon: "fas fa-medkit" },
];

const severityLevels = [
  { id: "all", name: "All Levels", color: "bg-gray-100 text-gray-800" },
  { id: "critical", name: "Critical", color: "bg-red-100 text-red-800" },
  { id: "high", name: "High", color: "bg-orange-100 text-orange-800" },
  { id: "medium", name: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { id: "low", name: "Low", color: "bg-blue-100 text-blue-800" },
];

export default function AlertsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSeverity, setSelectedSeverity] = useState("all");

  const {
    data: alerts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["/api/alerts"],
    refetchInterval: 60000, // Refetch every minute for real-time updates
  });

  const filteredAlerts = alerts?.filter((alert: any) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (alert.location &&
        alert.location.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      selectedCategory === "all" || alert.category === selectedCategory;
    const matchesSeverity =
      selectedSeverity === "all" || alert.severity === selectedSeverity;
    return (
      matchesSearch && matchesCategory && matchesSeverity && alert.isActive
    );
  });

  const getAlertStats = () => {
    if (!alerts) return { total: 0, critical: 0, high: 0, medium: 0, low: 0 };

    return alerts.reduce(
      (stats: any, alert: any) => {
        if (alert.isActive) {
          stats.total++;
          stats[alert.severity] = (stats[alert.severity] || 0) + 1;
        }
        return stats;
      },
      { total: 0, critical: 0, high: 0, medium: 0, low: 0 }
    );
  };

  const alertStats = getAlertStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
      <Navbar />

      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-orange-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl font-bold mb-6">Emergency Alerts</h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                Stay informed with real-time safety alerts, weather updates, and
                important notifications for your Sri Lankan adventure.
              </p>

              <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <Input
                  placeholder="Search alerts by location, type, or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-12 bg-white/20 border-white/30 text-white placeholder-white/70"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Alert Statistics */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-slate-800">
                  {alertStats.total}
                </div>
                <div className="text-slate-600">Active Alerts</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-red-600">
                  {alertStats.critical || 0}
                </div>
                <div className="text-slate-600">Critical</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-orange-600">
                  {alertStats.high || 0}
                </div>
                <div className="text-slate-600">High Priority</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-yellow-600">
                  {alertStats.medium || 0}
                </div>
                <div className="text-slate-600">Medium</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-blue-600">
                  {alertStats.low || 0}
                </div>
                <div className="text-slate-600">Low Priority</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="active" className="w-full">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters Sidebar */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="lg:w-1/4"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <i className="fas fa-filter mr-2 text-red-600"></i>
                        Filter Alerts
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Category Filters */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">
                          Category
                        </label>
                        <div className="space-y-2">
                          {alertCategories.map((category) => (
                            <Badge
                              key={category.id}
                              variant={
                                selectedCategory === category.id
                                  ? "default"
                                  : "outline"
                              }
                              className={`cursor-pointer w-full justify-start p-3 ${
                                selectedCategory === category.id
                                  ? "bg-red-600 text-white"
                                  : "hover:bg-slate-50"
                              }`}
                              onClick={() => setSelectedCategory(category.id)}
                            >
                              <i className={`${category.icon} mr-2`}></i>
                              {category.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Severity Filters */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">
                          Severity Level
                        </label>
                        <div className="space-y-2">
                          {severityLevels.map((level) => (
                            <Badge
                              key={level.id}
                              variant={
                                selectedSeverity === level.id
                                  ? "default"
                                  : "outline"
                              }
                              className={`cursor-pointer w-full justify-start p-3 ${
                                selectedSeverity === level.id
                                  ? "bg-red-600 text-white"
                                  : `${level.color} hover:opacity-80`
                              }`}
                              onClick={() => setSelectedSeverity(level.id)}
                            >
                              {level.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Emergency Contacts */}
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <h4 className="font-semibold text-red-800 mb-3">
                          <i className="fas fa-phone mr-2"></i>
                          Emergency Contacts
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-red-700">Police:</span>
                            <span className="font-semibold text-red-800">
                              119
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-red-700">Fire:</span>
                            <span className="font-semibold text-red-800">
                              110
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-red-700">Ambulance:</span>
                            <span className="font-semibold text-red-800">
                              1990
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-red-700">
                              Tourist Hotline:
                            </span>
                            <span className="font-semibold text-red-800">
                              1912
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Refresh Button */}
                      <Button
                        onClick={() => refetch()}
                        className="w-full bg-red-600 hover:bg-red-700"
                      >
                        <i className="fas fa-sync-alt mr-2"></i>
                        Refresh Alerts
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Alerts List */}
                <div className="lg:w-3/4">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="active">Active Alerts</TabsTrigger>
                    <TabsTrigger value="notifications">
                      My Notifications
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="active" className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                          {filteredAlerts?.length || 0} Active Alerts
                        </h2>
                        <p className="text-slate-600">
                          {selectedCategory !== "all" &&
                            `${
                              alertCategories.find(
                                (c) => c.id === selectedCategory
                              )?.name
                            } alerts`}
                          {selectedSeverity !== "all" &&
                            ` • ${selectedSeverity} priority`}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-slate-500">
                        <i className="fas fa-clock"></i>
                        <span>
                          Last updated: {new Date().toLocaleTimeString()}
                        </span>
                      </div>
                    </motion.div>

                    {isLoading ? (
                      <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="bg-white rounded-2xl shadow-lg p-6 animate-pulse"
                          >
                            <div className="flex items-start space-x-4">
                              <div className="bg-slate-200 w-12 h-12 rounded-full"></div>
                              <div className="flex-1 space-y-2">
                                <div className="bg-slate-200 h-6 rounded w-3/4"></div>
                                <div className="bg-slate-200 h-4 rounded w-1/2"></div>
                                <div className="bg-slate-200 h-16 rounded"></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {filteredAlerts?.map((alert: any, index: number) => (
                          <motion.div
                            key={alert.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                          >
                            <AlertCard alert={alert} />
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {!isLoading && filteredAlerts?.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                      >
                        <i className="fas fa-shield-alt text-6xl text-slate-300 mb-4"></i>
                        <h3 className="text-2xl font-semibold text-slate-600 mb-2">
                          No active alerts
                        </h3>
                        <p className="text-slate-500">
                          Great news! There are currently no alerts matching
                          your criteria.
                        </p>
                      </motion.div>
                    )}
                  </TabsContent>

                  <TabsContent value="notifications" className="space-y-6">
                    <div className="text-center py-16">
                      <i className="fas fa-bell text-6xl text-slate-300 mb-4"></i>
                      <h3 className="text-2xl font-semibold text-slate-600 mb-2">
                        Notification Center
                      </h3>
                      <p className="text-slate-500 mb-6">
                        Personalized alerts and notifications will appear here.
                      </p>
                      {!user && (
                        <Button className="bg-red-600 hover:bg-red-700">
                          Sign In to View Notifications
                        </Button>
                      )}
                    </div>
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </div>
        </section>

        {/* Safety Tips */}
        <section className="py-16 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Safety Tips for Sri Lanka
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Essential safety guidelines to ensure a secure and enjoyable
                journey
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <i className="fas fa-cloud-rain text-blue-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  Weather Awareness
                </h3>
                <p className="text-slate-600 text-sm">
                  Check weather conditions before traveling. Monsoon seasons can
                  affect road conditions and outdoor activities.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <i className="fas fa-medkit text-green-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  Health Precautions
                </h3>
                <p className="text-slate-600 text-sm">
                  Carry basic medications, stay hydrated, and be aware of local
                  health advisories, especially in rural areas.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <i className="fas fa-road text-orange-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  Transportation Safety
                </h3>
                <p className="text-slate-600 text-sm">
                  Use licensed transport providers, wear seatbelts, and be
                  cautious on mountain roads and during heavy traffic.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
      <AIChatbot />
    </div>
  );
}
