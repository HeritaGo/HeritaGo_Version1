import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Droplets, 
  Eye, 
  Thermometer,
  Sunrise,
  Sunset,
  RefreshCw
} from "lucide-react";

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

const weatherLocations = [
  "colombo",
  "kandy", 
  "galle",
  "ella",
  "nuwara_eliya"
];

const locationDisplayNames: { [key: string]: string } = {
  colombo: "Colombo",
  kandy: "Kandy",
  galle: "Galle", 
  ella: "Ella",
  nuwara_eliya: "Nuwara Eliya"
};

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case "sunny":
      return { icon: Sun, color: "text-yellow-500" };
    case "partly cloudy":
      return { icon: Cloud, color: "text-blue-500" };
    case "light rain":
    case "rain":
      return { icon: CloudRain, color: "text-blue-600" };
    case "misty":
    case "cool":
      return { icon: Cloud, color: "text-slate-500" };
    default:
      return { icon: Sun, color: "text-yellow-500" };
  }
};

const getTemperatureColor = (temp: number) => {
  if (temp >= 30) return "text-red-500";
  if (temp >= 25) return "text-orange-500";
  if (temp >= 20) return "text-yellow-500";
  if (temp >= 15) return "text-blue-500";
  return "text-blue-600";
};

export default function WeatherWidget() {
  const [selectedLocation, setSelectedLocation] = useState("colombo");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch weather data for selected location
  const { data: weather, isLoading, refetch } = useQuery<WeatherData>({
    queryKey: ["/api/weather", selectedLocation],
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="w-8 h-8 text-slate-400" />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weather) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-slate-500">
            Weather data unavailable
          </div>
        </CardContent>
      </Card>
    );
  }

  const { icon: WeatherIcon, color: iconColor } = getWeatherIcon(weather.condition);
  const tempColor = getTemperatureColor(weather.temperature);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Cloud className="w-5 h-5 mr-2 text-blue-600" />
            Weather Forecast
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => refetch()}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </CardTitle>
        
        {/* Location Selector */}
        <div className="flex flex-wrap gap-2 pt-2">
          {weatherLocations.map((location) => (
            <Button
              key={location}
              variant={selectedLocation === location ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLocation(location)}
              className="text-xs h-7"
            >
              {locationDisplayNames[location]}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Main Weather Display */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <motion.div 
              className={`text-4xl font-bold ${tempColor} mb-1`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {weather.temperature}°C
            </motion.div>
            <div className="text-lg text-slate-800 font-medium">
              {weather.condition}
            </div>
            <div className="text-sm text-slate-600">
              {locationDisplayNames[selectedLocation]}
            </div>
          </div>
          
          <motion.div
            initial={{ rotate: -10, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <WeatherIcon className={`w-16 h-16 ${iconColor}`} />
          </motion.div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-blue-500" />
            <div>
              <div className="text-sm text-slate-600">Humidity</div>
              <div className="font-semibold">{weather.humidity}%</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Wind className="w-4 h-4 text-slate-500" />
            <div>
              <div className="text-sm text-slate-600">Wind Speed</div>
              <div className="font-semibold">{weather.windSpeed} km/h</div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="border-t border-slate-200 pt-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Sunrise className="w-4 h-4 text-orange-500" />
              <span className="text-slate-600">Sunrise</span>
            </div>
            <span className="font-medium">6:15 AM</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Sunset className="w-4 h-4 text-orange-600" />
              <span className="text-slate-600">Sunset</span>
            </div>
            <span className="font-medium">6:30 PM</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-slate-500" />
              <span className="text-slate-600">Visibility</span>
            </div>
            <span className="font-medium">10 km</span>
          </div>
        </div>

        {/* Travel Recommendation */}
        <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <Thermometer className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Travel Tip</span>
          </div>
          <p className="text-sm text-green-700">
            {weather.temperature > 25 
              ? "Perfect weather for outdoor activities! Don't forget sunscreen."
              : weather.temperature > 20
              ? "Great weather for sightseeing. Light jacket recommended."
              : "Cool weather, ideal for hiking. Bring warm clothing."
            }
          </p>
        </div>

        {/* Current Time */}
        <div className="mt-4 text-center">
          <div className="text-xs text-slate-500">Local Time</div>
          <div className="text-sm font-medium text-slate-700">
            {currentTime.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit',
              timeZoneName: 'short' 
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
