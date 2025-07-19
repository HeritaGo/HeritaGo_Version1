import { useAuth } from "@/hooks/use-auth";
import Navbar from "@/components/navbar";
import Chatbot from "@/components/chatbot";
import TouristDashboard from "@/components/dashboard/tourist-dashboard";
import GuideDashboard from "@/components/dashboard/guide-dashboard";
import VendorDashboard from "@/components/dashboard/vendor-dashboard";
import AdminDashboard from "@/components/dashboard/admin-dashboard";

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
      <div className="pt-16">{renderDashboard()}</div>
      <Chatbot />
    </div>
  );
}
