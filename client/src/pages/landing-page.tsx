import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/hero-section";
import AIChatbot from "@/components/ai-chatbot";
import InteractiveMap from "@/components/interactive-map";
import WeatherWidget from "@/components/weather-widget";
import AlertsPanel from "@/components/alerts-panel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Star, 
  Users, 
  Mountain, 
  Waves, 
  Camera,
  Tent,
  Calendar,
  Shield,
  Trophy,
  Sparkles,
  ChevronRight
} from "lucide-react";

export default function LandingPage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const handleGetStarted = () => {
    if (user) {
      setLocation(`/dashboard/${user.role}`);
    } else {
      setLocation("/auth");
    }
  };

  const destinations = [
    {
      name: "Ancient Heritage",
      description: "Explore 2,500 years of history",
      locations: "Anuradhapura • Polonnaruwa • Sigiriya",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      icon: Mountain,
    },
    {
      name: "Tropical Beaches",
      description: "Paradise awaits your arrival",
      locations: "Unawatuna • Mirissa • Arugam Bay",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      icon: Waves,
    },
    {
      name: "Hill Country",
      description: "Misty mountains & tea gardens",
      locations: "Ella • Nuwara Eliya • Kandy",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      icon: Mountain,
    },
    {
      name: "Wildlife Safari",
      description: "Encounter majestic creatures",
      locations: "Yala • Udawalawe • Minneriya",
      image: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      icon: Camera,
    },
  ];

  const roleFeatures = [
    {
      role: "Tourist",
      title: "Discover Ceylon",
      description: "Plan your perfect Sri Lankan adventure with AI assistance and local insights",
      features: ["AI Travel Planner", "Interactive Maps", "Quest Mode Gaming", "Local Guide Access"],
      color: "from-blue-500 to-cyan-500",
      icon: Users,
    },
    {
      role: "Guide",
      title: "Share Your Expertise",
      description: "Connect with travelers and showcase the beauty of Sri Lanka",
      features: ["Manage Tours", "Earnings Dashboard", "Client Reviews", "Schedule Management"],
      color: "from-green-500 to-emerald-500",
      icon: MapPin,
    },
    {
      role: "Vendor",
      title: "Gear Rental Business",
      description: "Rent out equipment and gear to adventure seekers",
      features: ["Inventory Management", "Booking System", "Revenue Analytics", "Customer Reviews"],
      color: "from-orange-500 to-red-500",
      icon: Tent,
    },
    {
      role: "Admin",
      title: "Platform Management",
      description: "Comprehensive oversight and analytics for the entire platform",
      features: ["User Management", "Analytics Dashboard", "Content Moderation", "System Monitoring"],
      color: "from-purple-500 to-indigo-500",
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <HeroSection onGetStarted={handleGetStarted} />

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">25K+</div>
                <div className="text-muted-foreground">Happy Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-500 mb-2">200+</div>
                <div className="text-muted-foreground">Destinations</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-500 mb-2">150+</div>
                <div className="text-muted-foreground">Expert Guides</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-500 mb-2">24/7</div>
                <div className="text-muted-foreground">AI Assistant</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Role Features Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Personalized Experience for Everyone
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Whether you're a traveler, guide, vendor, or admin - HeritaGo adapts to your unique needs with intelligent dashboards and powerful tools.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {roleFeatures.map((feature, index) => (
                <motion.div
                  key={feature.role}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className={`h-32 bg-gradient-to-br ${feature.color} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute top-4 left-4">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        {feature.features.map((item, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full" onClick={handleGetStarted}>
                        Join as {feature.role}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Destinations Showcase */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Discover Sri Lanka's Wonders
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                From ancient kingdoms to pristine beaches, from misty mountains to vibrant cities - explore the diverse beauty of the Pearl of the Indian Ocean.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {destinations.map((destination, index) => (
                <motion.div
                  key={destination.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer transform transition-all duration-500 hover:scale-105"
                >
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center mb-2">
                          <destination.icon className="w-5 h-5 text-white mr-2" />
                          <Badge variant="secondary" className="bg-white/20 text-white">
                            Heritage
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{destination.name}</h3>
                        <p className="text-gray-200 text-sm mb-3">{destination.description}</p>
                        <div className="flex items-center text-white text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{destination.locations}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" className="animate-pulse-glow" onClick={() => setLocation("/destinations")}>
                <MapPin className="w-5 h-5 mr-2" />
                Explore Interactive Map
              </Button>
            </div>
          </div>
        </section>

        {/* Interactive Map Preview */}
        <section className="py-20 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Sri Lanka Interactive Map
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Explore destinations with real-time weather, emergency alerts, and personalized recommendations.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <WeatherWidget />
                <AlertsPanel />
              </div>
              <div className="lg:col-span-3">
                <InteractiveMap />
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Why Choose HeritaGo?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience Sri Lanka like never before with our cutting-edge features and local expertise.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Sparkles,
                  title: "AI-Powered Planning",
                  description: "Smart travel recommendations based on your preferences, budget, and travel style."
                },
                {
                  icon: Users,
                  title: "Expert Local Guides",
                  description: "Connect with certified local guides who know the hidden gems and cultural secrets."
                },
                {
                  icon: Shield,
                  title: "Safety First",
                  description: "Real-time alerts, emergency support, and comprehensive safety information."
                },
                {
                  icon: Trophy,
                  title: "Quest Mode",
                  description: "Gamified exploration with challenges, rewards, and achievement badges."
                },
                {
                  icon: Calendar,
                  title: "Smart Booking",
                  description: "Seamless hotel and gear rental bookings with instant confirmation."
                },
                {
                  icon: Star,
                  title: "Community Driven",
                  description: "Reviews, tips, and experiences shared by fellow travelers and locals."
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-ceylon">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Explore Ceylon?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of travelers who have discovered the magic of Sri Lanka with HeritaGo's intelligent travel companion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" onClick={handleGetStarted}>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Your Adventure
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  <Camera className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <AIChatbot />
    </div>
  );
}
