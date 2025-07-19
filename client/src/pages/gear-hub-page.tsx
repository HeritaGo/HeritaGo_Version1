import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Chatbot from "@/components/chatbot";
import GearCard from "@/components/ui/gear-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";

const gearCategories = [
  { id: "all", name: "All Equipment", icon: "fas fa-tools" },
  { id: "camping", name: "Camping", icon: "fas fa-campground" },
  { id: "hiking", name: "Hiking", icon: "fas fa-hiking" },
  { id: "photography", name: "Photography", icon: "fas fa-camera" },
  { id: "water-sports", name: "Water Sports", icon: "fas fa-swimming-pool" },
];

export default function GearHubPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: gearItems, isLoading } = useQuery({
    queryKey: ["/api/gear"],
  });

  const filteredGear = gearItems?.filter((gear: any) => {
    const matchesSearch =
      gear.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gear.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || gear.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      <Navbar />

      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-teal-600 to-orange-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl font-bold mb-6">Gear Hub</h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                Rent professional equipment for your Sri Lankan adventure. From
                camping gear to photography equipment, we've got you covered.
              </p>

              <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Search camping gear, cameras, hiking equipment..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-12 bg-white/20 border-white/30 text-white placeholder-white/70"
                    />
                  </div>
                  {user?.role === "vendor" && (
                    <Button className="h-12 bg-white text-teal-600 hover:bg-white/90">
                      <i className="fas fa-plus mr-2"></i>
                      Add New Item
                    </Button>
                  )}
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-3 justify-center">
                  {gearCategories.map((category) => (
                    <Badge
                      key={category.id}
                      variant={
                        selectedCategory === category.id ? "default" : "outline"
                      }
                      className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category.id
                          ? "bg-white text-teal-600"
                          : "bg-white/20 text-white border-white/30 hover:bg-white/30"
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <i className={`${category.icon} mr-2`}></i>
                      {category.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-teal-600">500+</div>
                <div className="text-slate-600">Available Items</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-orange-500">50+</div>
                <div className="text-slate-600">Verified Vendors</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-green-600">98%</div>
                <div className="text-slate-600">Return Rate</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-blue-600">24/7</div>
                <div className="text-slate-600">Support</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gear Items */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                {filteredGear?.length || 0} Items Available
              </h2>
              <p className="text-slate-600">
                Quality equipment from trusted local vendors
              </p>
            </motion.div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl shadow-lg p-6 animate-pulse"
                  >
                    <div className="bg-slate-200 h-48 rounded-xl mb-4"></div>
                    <div className="bg-slate-200 h-6 rounded mb-2"></div>
                    <div className="bg-slate-200 h-4 rounded mb-4"></div>
                    <div className="bg-slate-200 h-10 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGear?.map((gear: any, index: number) => (
                  <motion.div
                    key={gear.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <GearCard gear={gear} />
                  </motion.div>
                ))}
              </div>
            )}

            {!isLoading && filteredGear?.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <i className="fas fa-tools text-6xl text-slate-300 mb-4"></i>
                <h3 className="text-2xl font-semibold text-slate-600 mb-2">
                  No gear found
                </h3>
                <p className="text-slate-500">
                  Try adjusting your search or filter criteria
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Renting gear is simple and secure with our verified vendor
                network
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-search text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  1. Browse & Select
                </h3>
                <p className="text-slate-600">
                  Find the perfect equipment from our extensive catalog of
                  verified gear
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-calendar-check text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  2. Book & Pay
                </h3>
                <p className="text-slate-600">
                  Reserve your dates and make secure payments through our
                  platform
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-handshake text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  3. Collect & Enjoy
                </h3>
                <p className="text-slate-600">
                  Pick up your gear and embark on your Sri Lankan adventure with
                  confidence
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
