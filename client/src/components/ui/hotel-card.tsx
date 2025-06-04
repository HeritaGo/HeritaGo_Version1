import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

interface Hotel {
  id: number;
  name: string;
  description: string;
  location: string;
  pricePerNight: number;
  rating: string;
  amenities: string[];
  imageUrl?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
  };
}

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const getPlaceholderImage = () => {
    const images = [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    ];
    return images[hotel.id % images.length];
  };

  const getAmenityIcon = (amenity: string) => {
    const icons: { [key: string]: string } = {
      'WiFi': 'fas fa-wifi',
      'Pool': 'fas fa-swimming-pool',
      'Restaurant': 'fas fa-utensils',
      'Spa': 'fas fa-spa',
      'Gym': 'fas fa-dumbbell',
      'Beach Access': 'fas fa-umbrella-beach',
      'Mountain View': 'fas fa-mountain',
      'Tea Tours': 'fas fa-leaf',
      'Air Conditioning': 'fas fa-snowflake',
      'Parking': 'fas fa-parking',
      'Bar': 'fas fa-cocktail',
      'Room Service': 'fas fa-concierge-bell',
    };
    return icons[amenity] || 'fas fa-check';
  };

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
            src={hotel.imageUrl || getPlaceholderImage()}
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Rating Badge */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-white/90 text-slate-800 font-semibold">
              <i className="fas fa-star text-yellow-500 mr-1"></i>
              {hotel.rating}
            </Badge>
          </div>

          {/* Price Badge */}
          <div className="absolute bottom-4 right-4">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-3 py-1 rounded-full font-bold text-sm">
              LKR {hotel.pricePerNight.toLocaleString()}/night
            </div>
          </div>
        </div>

        <CardContent className="p-6 flex-1 flex flex-col">
          {/* Hotel Info */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-teal-700 transition-colors duration-300">
              {hotel.name}
            </h3>
            
            <p className="text-slate-600 text-sm flex items-center mb-3">
              <i className="fas fa-map-marker-alt text-teal-500 mr-2"></i>
              {hotel.location}
            </p>

            <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
              {hotel.description}
            </p>

            {/* Amenities */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-slate-700 mb-2">Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {hotel.amenities?.slice(0, 4).map((amenity) => (
                  <Badge
                    key={amenity}
                    variant="outline"
                    className="text-xs bg-teal-50 text-teal-700 border-teal-200"
                  >
                    <i className={`${getAmenityIcon(amenity)} mr-1`}></i>
                    {amenity}
                  </Badge>
                ))}
                {hotel.amenities && hotel.amenities.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{hotel.amenities.length - 4} more
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white group-hover:shadow-lg transition-all duration-300"
            >
              <i className="fas fa-calendar-check mr-2"></i>
              Book Now
            </Button>
            
            <div className="flex space-x-2">
              <Link href={`/hotels/${hotel.id}`} className="flex-1">
                <Button variant="outline" className="w-full" size="sm">
                  <i className="fas fa-info-circle mr-2"></i>
                  Details
                </Button>
              </Link>
              
              {hotel.contactInfo?.phone && (
                <Button variant="outline" size="sm" className="flex-1">
                  <i className="fas fa-phone mr-2"></i>
                  Call
                </Button>
              )}
            </div>
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
