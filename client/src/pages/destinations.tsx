import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import ChatBot from "@/components/ChatBot";
import Map from "@/components/Map";
import WeatherWidget from "@/components/WeatherWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Star, Search, Filter, Mountain, Waves, TreePine, Landmark, Camera } from "lucide-react";
import type { Destination } from "@shared/schema";

const categories = [
  { id: "all", label: "All", icon: MapPin },
  { id: "heritage", label: "Heritage", icon: Landmark },
  { id: "beach", label: "Beaches", icon: Waves },
  { id: "mountain", label: "Mountains", icon: Mountain },
  { id: "culture", label: "Culture", icon: TreePine },
  { id: "wildlife", label: "Wildlife", icon: Camera },
];

export default function Destinations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const { data: destinations = [], isLoading } = useQuery<Destination[]>({
    queryKey: ["/api/destinations"],
  });

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dest.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDestinationSelect = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16">
        {/* Header */}
        <section className="bg-gradient-ceylon text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Discover Sri Lanka
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                Explore breathtaking destinations with real-time weather updates and local insights
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Sidebar - Filters & Search */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Search className="mr-2 h-5 w-5" />
                    Search Destinations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    type="text"
                    placeholder="Search places..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4"
                  />
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground mb-3">Categories</h4>
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <category.icon className="mr-2 h-4 w-4" />
                        {category.label}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <WeatherWidget location="Colombo" />
            </div>

            {/* Center - Map */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    Interactive Map
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Map 
                    destinations={filteredDestinations}
                    onDestinationSelect={handleDestinationSelect}
                    selectedDestination={selectedDestination}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Destinations Grid */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">
              {selectedCategory === "all" ? "All Destinations" : `${categories.find(c => c.id === selectedCategory)?.label} Destinations`}
              <span className="text-muted-foreground ml-2">({filteredDestinations.length})</span>
            </h2>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-muted"></div>
                    <CardContent className="p-4">
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDestinations.map((destination, index) => (
                  <motion.div
                    key={destination.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card 
                      className={`group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden ${
                        selectedDestination?.id === destination.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => handleDestinationSelect(destination)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        {destination.imageUrl ? (
                          <img 
                            src={destination.imageUrl} 
                            alt={destination.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                            <MapPin className="h-16 w-16 text-muted-foreground" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <Badge 
                            variant="secondary" 
                            className="bg-background/90 text-foreground capitalize"
                          >
                            {destination.category}
                          </Badge>
                        </div>
                        {destination.rating > 0 && (
                          <div className="absolute top-4 right-4 bg-background/90 rounded-full px-2 py-1 flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium">{destination.rating}</span>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                          {destination.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {destination.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-muted-foreground text-sm">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{destination.weatherZone || "Sri Lanka"}</span>
                          </div>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {!isLoading && filteredDestinations.length === 0 && (
              <Card className="p-8 text-center">
                <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No destinations found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or category filters.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>

      <ChatBot />
    </div>
  );
}
