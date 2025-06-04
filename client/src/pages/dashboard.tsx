import { useAuth } from "@/hooks/use-auth";
import Navbar from "@/components/Navbar";
import ChatBot from "@/components/ChatBot";
import TouristDashboard from "@/components/dashboards/TouristDashboard";
import GuideDashboard from "@/components/dashboards/GuideDashboard";
import VendorDashboard from "@/components/dashboards/VendorDashboard";
import AdminDashboard from "@/components/dashboards/AdminDashboard";

export default function Dashboard() {
  const { user } = useAuth();
  console.log("user:", user); // Add this line

  const renderDashboard = () => {
    switch (user?.role) {
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        {renderDashboard()}
      </div>
      <ChatBot />
    </div>
  );
}
