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
import GoogleMapSriLanka from "@/components/map/GoogleMapSriLanka";

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

  const toggleCategory = (categoryId: string) => {
    setActiveCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Explore Sri Lanka</h2>
        <p className="text-slate-600">Discover amazing destinations across the Pearl of the Indian Ocean</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Google Map Section */}
        <div className="lg:col-span-2">
          <GoogleMapSriLanka searchQuery={searchQuery} activeCategories={activeCategories} />
        </div>

        {/* Controls Sidebar */}
        <div className="space-y-6">
          <Card className="shadow-md">
            <CardContent className="p-6">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
