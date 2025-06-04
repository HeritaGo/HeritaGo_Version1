import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { user, logoutMutation } = useAuth();
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const { data: alerts } = useQuery({
    queryKey: ["/api/alerts"],
    enabled: !!user,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/', icon: 'fas fa-home' },
    { name: 'Destinations', href: '/destinations', icon: 'fas fa-map-marked-alt' },
    { name: 'Hotels', href: '/hotels', icon: 'fas fa-hotel' },
    { name: 'Gear Hub', href: '/gear-hub', icon: 'fas fa-hiking' },
    { name: 'Community', href: '/community', icon: 'fas fa-users' },
    { name: 'Quest', href: '/quest', icon: 'fas fa-trophy' },
  ];

  const isActive = (href: string) => {
    if (href === '/' && location === '/') return true;
    if (href !== '/' && location.startsWith(href)) return true;
    return false;
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'tourist': return 'bg-blue-500';
      case 'guide': return 'bg-green-500';
      case 'vendor': return 'bg-orange-500';
      case 'admin': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glassmorphism-dark shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <i className="fas fa-mountain text-white text-lg"></i>
              </div>
              <span className="text-xl font-bold text-white font-display">
                HeritaGo
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-teal-400 bg-white/10'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={`${item.icon} text-sm`}></i>
                  <span className="font-medium">{item.name}</span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Alerts Bell */}
            {user && (
              <Link href="/alerts">
                <motion.div 
                  className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="fas fa-bell text-white"></i>
                  {alerts && alerts.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center rounded-full animate-pulse">
                      {alerts.length}
                    </Badge>
                  )}
                </motion.div>
              </Link>
            )}

            {/* Dashboard Link */}
            {user && (
              <Link href="/dashboard">
                <Button variant="outline" className="hidden md:flex bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <i className="fas fa-tachometer-alt mr-2"></i>
                  Dashboard
                </Button>
              </Link>
            )}

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div 
                    className="flex items-center space-x-3 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.profileImage} />
                      <AvatarFallback className={getRoleColor(user.role)}>
                        {getUserInitials(user.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <div className="text-white font-medium text-sm">
                        {user.fullName}
                      </div>
                      <div className="text-white/60 text-xs capitalize">
                        {user.role}
                      </div>
                    </div>
                    <i className="fas fa-chevron-down text-white/60 text-xs"></i>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.fullName}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <Badge variant="outline" className="mt-1 capitalize">
                      {user.role}
                    </Badge>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="w-full">
                      <i className="fas fa-tachometer-alt mr-2"></i>
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="w-full">
                      <i className="fas fa-user mr-2"></i>
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="w-full">
                      <i className="fas fa-cog mr-2"></i>
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => logoutMutation.mutate()}
                    className="text-red-600 focus:text-red-600"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white">
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" className="text-white">
                <i className="fas fa-bars"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
