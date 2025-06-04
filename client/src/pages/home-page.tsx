import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import AIChatbot from "@/components/chatbot/ai-chatbot";
import HeroSection from "@/components/ui/hero-section";
import RoleCards from "@/components/ui/role-cards";
import InteractiveMap from "@/components/map/interactive-map";
import DestinationCard from "@/components/ui/destination-card";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

export default function HomePage() {
  const { user, isLoading } = useAuth();

  const { data: destinations } = useQuery({
    queryKey: ["/api/destinations"],
  });

  const { data: alerts } = useQuery({
    queryKey: ["/api/alerts"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-orange-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/auth" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Dashboard Preview based on user role */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Welcome back, <span className="text-teal-600">{user.fullName}</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Your personalized {user.role} dashboard awaits with powerful tools and insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Active Status</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Online
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Member Since</span>
                  <span className="font-semibold text-slate-800">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Role</span>
                  <span className="capitalize font-semibold text-teal-600">{user.role}</span>
                </div>
              </div>
            </motion.div>

            {/* Emergency Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                Active Alerts ({alerts?.length || 0})
              </h3>
              <div className="space-y-3">
                {alerts?.slice(0, 3).map((alert: any) => (
                  <div key={alert.id} className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="font-semibold text-red-800 text-sm">{alert.title}</div>
                    <div className="text-red-700 text-xs mt-1">{alert.location}</div>
                  </div>
                )) || (
                  <div className="text-slate-500 text-sm">No active alerts</div>
                )}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-semibold transition-colors duration-200">
                  <i className="fas fa-tachometer-alt mr-2"></i>
                  Go to Dashboard
                </button>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-colors duration-200">
                  <i className="fas fa-map-marked-alt mr-2"></i>
                  Explore Destinations
                </button>
                <button className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 rounded-xl font-semibold transition-colors duration-200">
                  <i className="fas fa-comments mr-2"></i>
                  Community Chat
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Role-specific Features */}
      <RoleCards userRole={user.role} />

      {/* Destinations Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Discover Sri Lanka's Wonders
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From ancient kingdoms to pristine beaches, explore the diverse beauty of Ceylon.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations?.slice(0, 6).map((destination: any, index: number) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <DestinationCard destination={destination} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Interactive Map of Sri Lanka
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Explore destinations with real-time weather and emergency alerts.
            </p>
          </motion.div>
          <InteractiveMap />
        </div>
      </section>

      <Footer />
      <AIChatbot />
    </div>
  );
}
