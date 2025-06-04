import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  MapPin, 
  Plus, 
  Minus, 
  Crosshair, 
  Cloud,
  AlertTriangle,
  Star,
  Navigation
} from "lucide-react";

interface MapPin {
  id: string;
  name: string;
  type: "heritage" | "beach" | "nature" | "hotel" | "restaurant";
  coordinates: { x: number; y: number };
  rating: number;
  description: string;
}

const mapPins: MapPin[] = [
  {
    id: "sigiriya",
    name: "Sigiriya Rock",
    type: "heritage",
    coordinates: { x: 35, y: 25 },
    rating: 4.8,
    description: "Ancient rock fortress"
  },
  {
    id: "unawatuna",
    name: "Unawatuna Beach",
    type: "beach", 
    coordinates: { x: 65, y: 75 },
    rating: 4.6,
    description: "Pristine beach paradise"
  },
  {
    id: "ella",
    name: "Ella Nine Arch",
    type: "nature",
    coordinates: { x: 55, y: 60 },
    rating: 4.9,
    description: "Iconic railway bridge"
  },
  {
    id: "kandy",
    name: "Temple of Tooth",
    type: "heritage",
    coordinates: { x: 45, y: 45 },
    rating: 4.7,
    description: "Sacred Buddhist temple"
  },
  {
    id: "galle",
    name: "Galle Fort",
    type: "heritage",
    coordinates: { x: 60, y: 80 },
    rating: 4.5,
    description: "Dutch colonial fortress"
  }
];

const categories = [
  { id: "heritage", label: "Heritage Sites", color: "bg-teal-500", checked: true },
  { id: "beach", label: "Beaches", color: "bg-blue-500", checked: true },
  { id: "nature", label: "Nature", color: "bg-green-500", checked: false },
  { id: "hotel", label: "Hotels", color: "bg-purple-500", checked: false },
  { id: "restaurant", label: "Restaurants", color: "bg-orange-500", checked: false }
];

export default function InteractiveMap() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState(
    categories.filter(c => c.checked).map(c => c.id)
  );
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const filteredPins = mapPins.filter(pin => 
    activeCategories.includes(pin.type) &&
    (searchQuery === "" || pin.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleCategory = (categoryId: string) => {
    setActiveCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getCategoryColor = (type: string) => {
    const category = categories.find(c => c.id === type);
    return category?.color || "bg-gray-500";
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.5));

  return (
    <Card className="shadow-2xl overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Map Controls Sidebar */}
        <div className="lg:w-1/3 p-6 bg-slate-50 border-r border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Map Controls</h3>
          
          {/* Search */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Search Destinations
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Search places..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            </div>
          </div>

          {/* Filter Categories */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Categories
            </label>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={activeCategories.includes(category.id)}
                    onCheckedChange={() => toggleCategory(category.id)}
                  />
                  <div className={`w-3 h-3 rounded-full ${category.color}`} />
                  <label 
                    htmlFor={category.id}
                    className="text-sm text-slate-600 cursor-pointer"
                  >
                    {category.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Weather Widget */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center">
                <Cloud className="w-4 h-4 mr-2 text-blue-600" />
                Current Weather
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-slate-800">28°C</div>
                  <div className="text-sm text-slate-600">Partly Cloudy</div>
                  <div className="text-sm text-slate-500">Colombo</div>
                </div>
                <div className="text-3xl">🌤️</div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Alerts */}
          <Card className="bg-red-50 border-red-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center text-red-800">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-red-700">
                <strong>Weather Warning:</strong> Heavy rainfall expected in Kandy region
              </div>
              <div className="text-sm text-red-700">
                <strong>Road Closure:</strong> A9 highway maintenance work
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Display */}
        <div className="lg:w-2/3 relative">
          <div className="h-96 lg:h-[600px] bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden">
            {/* Sri Lanka Map Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="relative w-80 h-96 bg-emerald-200 opacity-30 rounded-3xl transform rotate-12"
                animate={{ scale: zoomLevel }}
                transition={{ duration: 0.3 }}
                style={{
                  clipPath: "polygon(20% 10%, 80% 15%, 85% 85%, 15% 90%)"
                }}
              />
            </div>
            
            {/* Interactive Map Pins */}
            <div className="absolute inset-0">
              {filteredPins.map((pin) => {
                const IconComponent = MapPin;
                return (
                  <motion.div
                    key={pin.id}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                    style={{ 
                      left: `${pin.coordinates.x}%`, 
                      top: `${pin.coordinates.y}%`,
                      scale: zoomLevel
                    }}
                    whileHover={{ scale: zoomLevel * 1.2 }}
                    whileTap={{ scale: zoomLevel * 0.9 }}
                    onClick={() => setSelectedPin(pin)}
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  >
                    <div className={`w-10 h-10 ${getCategoryColor(pin.type)} rounded-full flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    
                    {/* Pin Label */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-lg shadow-lg text-xs font-semibold text-slate-800 whitespace-nowrap">
                      {pin.name}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Map Controls Overlay */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white hover:bg-slate-50 w-10 h-10 p-0"
                onClick={handleZoomIn}
              >
                <Plus className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white hover:bg-slate-50 w-10 h-10 p-0"
                onClick={handleZoomOut}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white hover:bg-slate-50 w-10 h-10 p-0"
              >
                <Crosshair className="w-4 h-4" />
              </Button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg p-4 shadow-lg">
              <h5 className="font-semibold text-slate-800 mb-2 text-sm">Legend</h5>
              <div className="space-y-1">
                {categories.filter(c => activeCategories.includes(c.id)).map((category) => (
                  <div key={category.id} className="flex items-center text-xs">
                    <div className={`w-3 h-3 ${category.color} rounded-full mr-2`} />
                    <span className="text-slate-600">{category.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Pin Details */}
            {selectedPin && (
              <motion.div
                className="absolute bottom-4 right-4 bg-white rounded-lg p-4 shadow-2xl max-w-xs"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-slate-800">{selectedPin.name}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => setSelectedPin(null)}
                  >
                    ×
                  </Button>
                </div>
                <p className="text-sm text-slate-600 mb-2">{selectedPin.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{selectedPin.rating}</span>
                  </div>
                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                    <Navigation className="w-3 h-3 mr-1" />
                    Directions
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Zoom Level Indicator */}
            <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1 text-sm text-slate-600">
              Zoom: {Math.round(zoomLevel * 100)}%
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
