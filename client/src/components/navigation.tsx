import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Mountain, 
  Bell, 
  Menu, 
  X, 
  Home, 
  MapPin, 
  Calendar, 
  Store, 
  Users, 
  Shield,
  LogOut
} from "lucide-react";

export default function Navigation({ isVisible = true }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logoutMutation } = useAuth();
  const [location] = useLocation();

  const navigationItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/destinations", label: "Destinations", icon: MapPin },
    { href: "/hotels", label: "Hotels", icon: Calendar },
    { href: "/gear-hub", label: "Gear Hub", icon: Store },
    { href: "/community", label: "Community", icon: Users },
    { href: "/alerts", label: "Alerts", icon: Bell },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
  };

  const getUserInitials = () => {
    if (user?.fullName) {
      const names = user.fullName.split(" ");
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return names[0][0].toUpperCase();
    }
    return user?.username?.[0]?.toUpperCase() || "U";
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "tourist": return "bg-blue-100 text-blue-800";
      case "guide": return "bg-green-100 text-green-800";
      case "vendor": return "bg-orange-100 text-orange-800";
      case "admin": return "bg-slate-100 text-slate-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 glassmorphism-dark transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div>
                <img 
                  src="/images/logoW.png" // Update this path to your PNG location (e.g., /logo.png or /assets/logo.png)
                  alt="HeritaGo Logo"
                  className="w-26 h-28"
                />
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? "bg-white/20 text-white"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.label}</span>
                    {item.label === "Alerts" && (
                      <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 text-xs">
                        3
                      </Badge>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* User Menu / Auth */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Dashboard Link */}
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>

                {/* User Avatar */}
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-teal-600 text-white text-sm">
                      {getUserInitials()}
                    </AvatarFallback>
                      {user.fullName || user.username}
                  </Avatar>
                  <div className="hidden lg:block">
                    <div className="text-sm text-white font-medium">
                      {user.fullName || user.username}
                    </div>
                    <Badge className={`text-xs ${getRoleColor(user.role)}`}>
                      {user.role}
                    </Badge>
                  </div>
                </div>

                {/* Logout Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className="text-white hover:bg-white/10"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Link href="/auth">
                <Button 
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                  size="sm"
                >
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/20 mt-2 pt-4 pb-4"
            >
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link key={item.href} href={item.href}>
                      <motion.div
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                          isActive(item.href)
                            ? "bg-white/20 text-white"
                            : "text-white/80 hover:text-white hover:bg-white/10"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span>{item.label}</span>
                        {item.label === "Alerts" && (
                          <Badge variant="destructive" className="ml-auto h-5 w-5 p-0 text-xs">
                            3
                          </Badge>
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
                
                {user && (
                  <>
                    <div className="border-t border-white/20 my-2 pt-2">
                      <Link href="/dashboard">
                        <motion.div
                          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10"
                          onClick={() => setIsMobileMenuOpen(false)}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Shield className="w-4 h-4" />
                          <span>Dashboard</span>
                        </motion.div>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}