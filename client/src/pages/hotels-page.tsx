import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import AIChatbot from "@/components/chatbot/ai-chatbot";
import HotelCard from "@/components/ui/hotel-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HotelsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const { data: hotels, isLoading } = useQuery({
    queryKey: ["/api/hotels"],
  });

  const amenities = ["WiFi", "Pool", "Restaurant", "Spa", "Gym", "Beach Access", "Mountain View", "Tea Tours"];

  const filteredHotels = hotels?.filter((hotel: any) => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = hotel.pricePerNight >= priceRange[0] && hotel.pricePerNight <= priceRange[1];
    const matchesAmenities = selectedAmenities.length === 0 || 
                           selectedAmenities.every(amenity => hotel.amenities?.includes(amenity));
    return matchesSearch && matchesPrice && matchesAmenities;
  });

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

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
              <h1 className="text-5xl font-bold mb-6">Stay in Paradise</h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                From luxury beach resorts to cozy mountain lodges, find the perfect accommodation for your Sri Lankan adventure.
              </p>
              
              <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <Input
                  placeholder="Search hotels by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-12 bg-white/20 border-white/30 text-white placeholder-white/70"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                      <i className="fas fa-filter mr-2 text-teal-600"></i>
                      Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">
                        Price Range (LKR per night)
                      </label>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={50000}
                        min={0}
                        step={1000}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-slate-600">
                        <span>LKR {priceRange[0].toLocaleString()}</span>
                        <span>LKR {priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">
                        Amenities
                      </label>
                      <div className="space-y-2">
                        {amenities.map((amenity) => (
                          <Badge
                            key={amenity}
                            variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
                            className="cursor-pointer mr-2 mb-2"
                            onClick={() => toggleAmenity(amenity)}
                          >
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Clear Filters */}
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSearchTerm("");
                        setPriceRange([0, 50000]);
                        setSelectedAmenities([]);
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Hotels Grid */}
              <div className="lg:w-3/4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-6"
                >
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    {filteredHotels?.length || 0} Hotels Available
                  </h2>
                  <p className="text-slate-600">
                    Best accommodations for your Sri Lankan getaway
                  </p>
                </motion.div>

                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                        <div className="bg-slate-200 h-48 rounded-xl mb-4"></div>
                        <div className="bg-slate-200 h-6 rounded mb-2"></div>
                        <div className="bg-slate-200 h-4 rounded mb-4"></div>
                        <div className="bg-slate-200 h-10 rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredHotels?.map((hotel: any, index: number) => (
                      <motion.div
                        key={hotel.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <HotelCard hotel={hotel} />
                      </motion.div>
                    ))}
                  </div>
                )}

                {!isLoading && filteredHotels?.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <i className="fas fa-hotel text-6xl text-slate-300 mb-4"></i>
                    <h3 className="text-2xl font-semibold text-slate-600 mb-2">No hotels found</h3>
                    <p className="text-slate-500">Try adjusting your search or filter criteria</p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
      <AIChatbot />
    </div>
  );
}
