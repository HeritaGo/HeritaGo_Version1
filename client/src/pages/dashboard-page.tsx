import { useAuth } from "@/hooks/use-auth";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Chatbot from "@/components/chatbot";
import TouristDashboard from "@/components/dashboard/tourist-dashboard";
import GuideDashboard from "@/components/dashboard/guide-dashboard";
import VendorDashboard from "@/components/dashboard/vendor-dashboard";
import AdminDashboard from "@/components/dashboard/admin-dashboard";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  const renderDashboard = () => {
    switch (user.role) {
      case "tourist":
        return <TouristDashboard />;
      case "guide":
        return <GuideDashboard />;
      case "vendor":
        return <VendorDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <TouristDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      <Navbar />

      <div className="pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
            </h1>
            <p className="text-xl text-slate-600">
              Welcome back, {user.fullName}! Here's your personalized overview.
            </p>
          </div>

          {renderDashboard()}
        </motion.div>
      </div>

      <Footer />
      <Chatbot />
    </div>
  );
}
