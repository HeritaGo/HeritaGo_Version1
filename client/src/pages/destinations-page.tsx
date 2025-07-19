import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Chatbot from "@/components/chatbot";
import DestinationCard from "@/components/ui/destination-card";
import InteractiveMap from "@/components/map/interactive-map";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const categories = [
  { id: "all", name: "All Destinations", icon: "fas fa-globe" },
  { id: "heritage", name: "Heritage Sites", icon: "fas fa-monument" },
  { id: "beach", name: "Beaches", icon: "fas fa-umbrella-beach" },
  { id: "mountain", name: "Mountains", icon: "fas fa-mountain" },
  { id: "wildlife", name: "Wildlife", icon: "fas fa-paw" },
  { id: "cultural", name: "Cultural", icon: "fas fa-temple" },
];

export default function DestinationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  const { data: destinations, isLoading } = useQuery({
    queryKey: ["/api/destinations"],
  });

  const filteredDestinations = destinations?.filter((dest: any) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || dest.category === selectedCategory;
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
              <h1 className="text-5xl font-bold mb-6">Discover Sri Lanka</h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                From ancient kingdoms to pristine beaches, explore the diverse
                beauty and rich heritage of the Pearl of the Indian Ocean.
              </p>

              {/* Search and Filters */}
              <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Search destinations, locations, or activities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-12 bg-white/20 border-white/30 text-white placeholder-white/70"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      onClick={() => setViewMode("grid")}
                      className="h-12"
                    >
                      <i className="fas fa-th-large mr-2"></i>
                      Grid
                    </Button>
                    <Button
                      variant={viewMode === "map" ? "default" : "outline"}
                      onClick={() => setViewMode("map")}
                      className="h-12"
                    >
                      <i className="fas fa-map mr-2"></i>
                      Map
                    </Button>
                  </div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-3 justify-center">
                  {categories.map((category) => (
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

        {/* Content Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {viewMode === "grid" ? (
              <>
                {/* Results Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex justify-between items-center mb-8"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      {filteredDestinations?.length || 0} Destinations Found
                    </h2>
                    <p className="text-slate-600">
                      {selectedCategory !== "all" &&
                        `in ${
                          categories.find((c) => c.id === selectedCategory)
                            ?.name
                        }`}
                      {searchTerm && ` matching "${searchTerm}"`}
                    </p>
                  </div>
                </motion.div>

                {/* Destinations Grid */}
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => (
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDestinations?.map(
                      (destination: any, index: number) => (
                        <motion.div
                          key={destination.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                          <DestinationCard destination={destination} />
                        </motion.div>
                      )
                    )}
                  </div>
                )}

                {!isLoading && filteredDestinations?.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <i className="fas fa-search text-6xl text-slate-300 mb-4"></i>
                    <h3 className="text-2xl font-semibold text-slate-600 mb-2">
                      No destinations found
                    </h3>
                    <p className="text-slate-500">
                      Try adjusting your search or filter criteria
                    </p>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <InteractiveMap destinations={filteredDestinations} />
              </motion.div>
            )}
          </div>
        </section>
      </div>

      <Footer />
      <Chatbot />
    </div>
  );
}
