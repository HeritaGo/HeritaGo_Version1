import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

interface Destination {
  id: number;
  name: string;
  description: string;
  category: string;
  location: string;
  rating: string;
  imageUrl?: string;
}

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'heritage': return 'bg-amber-100 text-amber-800';
      case 'beach': return 'bg-blue-100 text-blue-800';
      case 'mountain': return 'bg-green-100 text-green-800';
      case 'wildlife': return 'bg-emerald-100 text-emerald-800';
      case 'cultural': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'heritage': return 'fas fa-monument';
      case 'beach': return 'fas fa-umbrella-beach';
      case 'mountain': return 'fas fa-mountain';
      case 'wildlife': return 'fas fa-paw';
      case 'cultural': return 'fas fa-temple';
      default: return 'fas fa-map-marker-alt';
    }
  };

  const getPlaceholderImage = (category: string) => {
    // Using beautiful Sri Lankan stock photos based on category
    const images = {
      heritage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      beach: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      mountain: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      wildlife: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      cultural: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    };
    return images[category as keyof typeof images] || images.heritage;
  };

  return (
    <motion.div
      className="group cursor-pointer"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={destination.imageUrl || getPlaceholderImage(destination.category)}
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge className={`${getCategoryColor(destination.category)} font-medium`}>
              <i className={`${getCategoryIcon(destination.category)} mr-1 text-xs`}></i>
              {destination.category.charAt(0).toUpperCase() + destination.category.slice(1)}
            </Badge>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-white/90 text-slate-800 font-semibold">
              <i className="fas fa-star text-yellow-500 mr-1"></i>
              {destination.rating}
            </Badge>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white text-xl font-bold mb-1 drop-shadow-lg">
              {destination.name}
            </h3>
            <p className="text-white/90 text-sm flex items-center">
              <i className="fas fa-map-marker-alt mr-1"></i>
              {destination.location}
            </p>
          </div>
        </div>

        <CardContent className="p-6">
          <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
            {destination.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-slate-500">
              <span className="flex items-center">
                <i className="fas fa-eye mr-1"></i>
                Popular
              </span>
              <span className="flex items-center">
                <i className="fas fa-camera mr-1"></i>
                Photo Spot
              </span>
            </div>
            
            <Link href={`/destinations/${destination.id}`}>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white group-hover:shadow-lg transition-all duration-300"
              >
                Explore
                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-200"></i>
              </Button>
            </Link>
          </div>
        </CardContent>

        {/* Hover Effect Line */}
        <motion.div
          className="h-1 bg-gradient-to-r from-teal-500 to-emerald-500"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{ originX: 0 }}
        />
      </Card>
    </motion.div>
  );
}
