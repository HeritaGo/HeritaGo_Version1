import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

interface GearItem {
  id: number;
  name: string;
  description: string;
  category: string;
  pricePerDay: number;
  availability: number;
  vendorId?: number;
  imageUrl?: string;
}

interface GearCardProps {
  gear: GearItem;
}

export default function GearCard({ gear }: GearCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'camping': return 'bg-blue-100 text-blue-800';
      case 'hiking': return 'bg-green-100 text-green-800';
      case 'photography': return 'bg-purple-100 text-purple-800';
      case 'water-sports': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'camping': return 'fas fa-campground';
      case 'hiking': return 'fas fa-hiking';
      case 'photography': return 'fas fa-camera';
      case 'water-sports': return 'fas fa-swimming-pool';
      default: return 'fas fa-tools';
    }
  };

  const getPlaceholderImage = (category: string) => {
    const images = {
      camping: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
      hiking: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
      photography: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
      'water-sports': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    };
    return images[category as keyof typeof images] || images.camping;
  };

  const getAvailabilityStatus = (availability: number) => {
    if (availability === 0) return { text: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (availability <= 3) return { text: 'Low Stock', color: 'bg-orange-100 text-orange-800' };
    return { text: 'Available', color: 'bg-green-100 text-green-800' };
  };

  const availabilityStatus = getAvailabilityStatus(gear.availability);

  return (
    <motion.div
      className="group cursor-pointer"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={gear.imageUrl || getPlaceholderImage(gear.category)}
            alt={gear.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge className={`${getCategoryColor(gear.category)} font-medium`}>
              <i className={`${getCategoryIcon(gear.category)} mr-1 text-xs`}></i>
              {gear.category.charAt(0).toUpperCase() + gear.category.slice(1).replace('-', ' ')}
            </Badge>
          </div>

          {/* Availability Badge */}
          <div className="absolute top-4 right-4">
            <Badge className={`${availabilityStatus.color} font-semibold`}>
              {availabilityStatus.text}
            </Badge>
          </div>

          {/* Price Badge */}
          <div className="absolute bottom-4 right-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
              LKR {gear.pricePerDay.toLocaleString()}/day
            </div>
          </div>
        </div>

        <CardContent className="p-6 flex-1 flex flex-col">
          {/* Gear Info */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
              {gear.name}
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
              {gear.description}
            </p>

            {/* Availability Count */}
            <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
              <span className="flex items-center">
                <i className="fas fa-box mr-1 text-orange-500"></i>
                {gear.availability} available
              </span>
              <span className="flex items-center">
                <i className="fas fa-truck mr-1 text-green-500"></i>
                Free delivery
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white group-hover:shadow-lg transition-all duration-300"
              disabled={gear.availability === 0}
            >
              {gear.availability === 0 ? (
                <>
                  <i className="fas fa-times mr-2"></i>
                  Out of Stock
                </>
              ) : (
                <>
                  <i className="fas fa-shopping-cart mr-2"></i>
                  Rent Now
                </>
              )}
            </Button>
            
            <div className="flex space-x-2">
              <Link href={`/gear-hub/${gear.id}`} className="flex-1">
                <Button variant="outline" className="w-full" size="sm">
                  <i className="fas fa-info-circle mr-2"></i>
                  Details
                </Button>
              </Link>
              
              <Button variant="outline" size="sm" className="flex-1">
                <i className="fas fa-heart mr-2"></i>
                Save
              </Button>
            </div>
          </div>
        </CardContent>

        {/* Hover Effect Line */}
        <motion.div
          className="h-1 bg-gradient-to-r from-orange-500 to-red-500"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{ originX: 0 }}
        />
      </Card>
    </motion.div>
  );
}
