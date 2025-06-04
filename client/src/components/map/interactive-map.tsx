import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MapPin {
  id: string;
  name: string;
  type: "heritage" | "beach" | "nature" | "hotel" | "restaurant";
  coordinates: { x: number; y: number };
  rating: number;
  description: string;
  image: string;
}

const sriLankaPins: MapPin[] = [
  {
    id: "sigiriya",
    name: "Sigiriya Rock Fortress",
    type: "heritage",
    coordinates: { x: 65, y: 35 },
    rating: 4.8,
    description: "Ancient rock fortress and palace ruins with stunning frescoes",
    image: "/api/placeholder/300/200"
  },
  {
    id: "galle-fort",
    name: "Galle Fort",
    type: "heritage", 
    coordinates: { x: 45, y: 85 },
    rating: 4.7,
    description: "Dutch colonial fortress overlooking the Indian Ocean",
    image: "/api/placeholder/300/200"
  },
  {
    id: "kandy-temple",
    name: "Temple of the Tooth",
    type: "heritage",
    coordinates: { x: 60, y: 50 },
    rating: 4.6,
    description: "Sacred Buddhist temple housing a tooth relic of Buddha",
    image: "/api/placeholder/300/200"
  },
  {
    id: "ella-rock",
    name: "Ella Rock",
    type: "nature",
    coordinates: { x: 70, y: 65 },
    rating: 4.5,
    description: "Scenic hiking destination with panoramic mountain views",
    image: "/api/placeholder/300/200"
  },
  {
    id: "unawatuna",
    name: "Unawatuna Beach",
    type: "beach",
    coordinates: { x: 45, y: 88 },
    rating: 4.4,
    description: "Crescent-shaped beach perfect for swimming and snorkeling",
    image: "/api/placeholder/300/200"
  },
  {
    id: "yala",
    name: "Yala National Park",
    type: "nature",
    coordinates: { x: 75, y: 80 },
    rating: 4.6,
    description: "Wildlife sanctuary famous for leopard spotting",
    image: "/api/placeholder/300/200"
  },
  {
    id: "nuwara-eliya",
    name: "Nuwara Eliya",
    type: "nature",
    coordinates: { x: 65, y: 60 },
    rating: 4.3,
    description: "Hill station known as 'Little England' with tea plantations",
    image: "/api/placeholder/300/200"
  },
  {
    id: "anuradhapura",
    name: "Anuradhapura",
    type: "heritage",
    coordinates: { x: 55, y: 25 },
    rating: 4.5,
    description: "Ancient capital with sacred Buddhist sites and stupas",
    image: "/api/placeholder/300/200"
  }
];

const typeColors = {
  heritage: "bg-amber-500",
  beach: "bg-blue-500", 
  nature: "bg-green-500",
  hotel: "bg-purple-500",
  restaurant: "bg-red-500"
};

const typeIcons = {
  heritage: "fas fa-monument",
  beach: "fas fa-umbrella-beach",
  nature: "fas fa-tree",
  hotel: "fas fa-hotel",
  restaurant: "fas fa-utensils"
};

export default function InteractiveMap() {
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(null);
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Explore Sri Lanka</h2>
        <p className="text-slate-600">Discover amazing destinations across the Pearl of the Indian Ocean</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Interactive Map */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative w-full h-[500px] bg-gradient-to-br from-emerald-100 via-teal-50 to-blue-100">
                {/* Sri Lanka Island Shape */}
                <div className="absolute inset-4 bg-gradient-to-br from-green-200 via-emerald-300 to-teal-400 rounded-3xl shadow-lg">
                  <div className="absolute inset-2 bg-gradient-to-br from-green-100 via-emerald-200 to-teal-300 rounded-2xl">
                    
                    {/* Map Pins */}
                    {sriLankaPins.map((pin) => (
                      <motion.div
                        key={pin.id}
                        className="absolute cursor-pointer"
                        style={{
                          left: `${pin.coordinates.x}%`,
                          top: `${pin.coordinates.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onHoverStart={() => setHoveredPin(pin.id)}
                        onHoverEnd={() => setHoveredPin(null)}
                        onClick={() => setSelectedPin(pin)}
                      >
                        <div className={`w-8 h-8 rounded-full ${typeColors[pin.type]} flex items-center justify-center text-white shadow-lg border-2 border-white ${hoveredPin === pin.id ? 'ring-4 ring-white/50' : ''}`}>
                          <i className={`${typeIcons[pin.type]} text-xs`}></i>
                        </div>
                        
                        {/* Hover Tooltip */}
                        {hoveredPin === pin.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white rounded-lg shadow-lg border text-sm font-medium text-slate-800 whitespace-nowrap z-10"
                          >
                            {pin.name}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}

                    {/* Map Labels */}
                    <div className="absolute top-4 left-4 text-xs font-semibold text-green-800">
                      Northern Province
                    </div>
                    <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-green-800">
                      Central Province
                    </div>
                    <div className="absolute bottom-4 left-4 text-xs font-semibold text-green-800">
                      Southern Province
                    </div>
                    <div className="absolute top-1/2 right-4 text-xs font-semibold text-green-800">
                      Eastern Province
                    </div>
                  </div>
                </div>

                {/* Ocean waves animation */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-2 left-2 w-6 h-6 bg-blue-300/30 rounded-full animate-pulse"></div>
                  <div className="absolute top-8 right-8 w-4 h-4 bg-blue-400/40 rounded-full animate-pulse delay-700"></div>
                  <div className="absolute bottom-12 left-8 w-5 h-5 bg-blue-300/35 rounded-full animate-pulse delay-300"></div>
                  <div className="absolute bottom-4 right-12 w-3 h-3 bg-blue-400/30 rounded-full animate-pulse delay-1000"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Destination Details */}
        <div className="space-y-6">
          {/* Legend */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-slate-800 mb-4">Map Legend</h3>
              <div className="space-y-3">
                {Object.entries(typeColors).map(([type, color]) => (
                  <div key={type} className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${color}`}></div>
                    <span className="text-sm text-slate-600 capitalize">
                      {type === 'heritage' ? 'Heritage Sites' : 
                       type === 'beach' ? 'Beaches' :
                       type === 'nature' ? 'Nature & Wildlife' :
                       type === 'hotel' ? 'Hotels' : 'Restaurants'}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Selected Destination */}
          {selectedPin && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-t-lg flex items-center justify-center">
                    <i className={`${typeIcons[selectedPin.type]} text-4xl text-slate-500`}></i>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={`${typeColors[selectedPin.type]} text-white`}>
                        {selectedPin.type.charAt(0).toUpperCase() + selectedPin.type.slice(1)}
                      </Badge>
                      <div className="flex items-center text-amber-500">
                        <i className="fas fa-star mr-1"></i>
                        <span className="text-sm font-medium">{selectedPin.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{selectedPin.name}</h3>
                    <p className="text-slate-600 text-sm mb-4">{selectedPin.description}</p>
                    <div className="space-y-2">
                      <Button className="w-full bg-teal-500 hover:bg-teal-600">
                        <i className="fas fa-info-circle mr-2"></i>
                        View Details
                      </Button>
                      <Button variant="outline" className="w-full">
                        <i className="fas fa-route mr-2"></i>
                        Plan Visit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Quick Stats */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-slate-800 mb-4">Sri Lanka Highlights</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">UNESCO World Heritage Sites</span>
                  <span className="font-semibold text-slate-800">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">National Parks</span>
                  <span className="font-semibold text-slate-800">26</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Pristine Beaches</span>
                  <span className="font-semibold text-slate-800">100+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Ancient Temples</span>
                  <span className="font-semibold text-slate-800">500+</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}