import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Star, Calendar, Phone, Mail, Clock, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import Navigation from "@/components/navigation";
import WeatherWidget from "@/components/weather-widget";
import InteractiveMap from "@/components/interactive-map";
import { useState, useEffect } from "react";

const heroCarouselImages = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
  "/images/hero4.jpg",
  "/images/hero5.jpg",
  "/images/hero6.jpg",
];

function HeroCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="absolute inset-0 w-full h-full z-0">
      {images.map((img, i) => (
        <motion.img
          key={img}
          src={img}
          alt=""
          className="object-cover w-full h-full absolute inset-0 transition-opacity duration-1000"
          initial={{ opacity: 0 }}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 1 }}
          style={{ zIndex: i === index ? 1 : 0 }}
        />
      ))}
    
      {/* White overlay ON TOP of images */}
      <div className="absolute inset-0 bg-white/50 z-10 pointer-events-none" />
    </div>
  );
}
const destinations = [
  {
    id: 1,
    name: "Sigiriya Rock Fortress",
    description: "Ancient rock citadel with stunning frescoes and breathtaking views",
    location: "Central Province",
    category: "Heritage",
    rating: "4.8",
    imageUrl: "/api/placeholder/400/300",
  },
  {
    id: 2,
    name: "Unawatuna Beach",
    description: "Golden sandy beach perfect for swimming and snorkeling",
    location: "Southern Province",
    category: "Beach",
    rating: "4.7",
    imageUrl: "/api/placeholder/400/300",
  },
  {
    id: 3,
    name: "Ella Nine Arch Bridge",
    description: "Iconic railway bridge surrounded by lush tea plantations",
    location: "Uva Province",
    category: "Nature",
    rating: "4.9",
    imageUrl: "/api/placeholder/400/300",
  },
];

const hotels = [
  {
    id: 1,
    name: "Heritage Kandalama",
    description: "Luxury eco-hotel overlooking ancient reservoir",
    location: "Dambulla",
    rating: "4.6",
    pricePerNight: 180,
  },
  {
    id: 2,
    name: "Galle Face Hotel",
    description: "Historic colonial hotel in the heart of Colombo",
    location: "Colombo",
    rating: "4.5",
    pricePerNight: 120,
  },
  {
    id: 3,
    name: "98 Acres Resort",
    description: "Boutique resort nestled in tea plantation hills",
    location: "Ella",
    rating: "4.8",
    pricePerNight: 200,
  },
];

export default function PublicLanding() {
  const { user } = useAuth();
    const [isNavVisible, setIsNavVisible] = useState(true);
  
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show nav when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsNavVisible(true);
      } 
      // Hide nav when scrolling down (and not near top)
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavVisible(false);
      }
      
      lastScrollY = currentScrollY;
      
      // Handle parallax for glassmorphism layers
      const parallaxBg = document.querySelector('.parallax-bg') as HTMLElement | null;
      const parallaxMid = document.querySelector('.parallax-mid') as HTMLElement | null;
      const parallaxFg = document.querySelector('.parallax-fg') as HTMLElement | null;
      
      if (parallaxBg && parallaxMid && parallaxFg) {
        const bgSpeed = currentScrollY * 0.1;
        const midSpeed = currentScrollY * 0.3;
        const fgSpeed = currentScrollY * 0.5;
        
        parallaxBg.style.transform = `translate(-50%, -50%) translateY(${bgSpeed}px)`;
        parallaxMid.style.transform = `translate(-50%, -50%) translateY(${midSpeed}px)`;
        parallaxFg.style.transform = `translate(-50%, -50%) translateY(${fgSpeed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50">
       {/* Navigation with scroll hide/show */}
      <Navigation isVisible={isNavVisible} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">

        <HeroCarousel images={heroCarouselImages} />

        {/* Glassmorphism Overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl" />

        {/* Additional gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-orange-600/20" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-teal-700 to-orange-600 bg-clip-text text-transparent mb-6 mt-28 drop-shadow-sm">
            Discover Ceylon
          </h1>
    <p className="text-xl md:text-2xl text-gray-800 mb-8 max-w-3xl mx-auto font-medium drop-shadow-sm">
      Experience the wonder of Sri Lanka through authentic journeys, expert guidance, and AI-powered travel assistance
    </p>
    
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
      {!user ? (
        <>
          <Link href="/auth">
            <Button size="lg" className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
              Start Your Journey
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="border-teal-600/70 text-teal-700 hover:bg-teal-50/80 px-8 py-3 backdrop-blur-sm bg-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            Explore Without Login
          </Button>
        </>
      ) : (
        <Link href="/dashboard">
          <Button size="lg" className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
            Go to Dashboard
          </Button>
        </Link>
      )}
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
      {[
        { value: "25K+", label: "Happy Travelers" },
        { value: "200+", label: "Destinations" },
        { value: "150+", label: "Expert Guides" },
        { value: "24/7", label: "AI Assistant" }
      ].map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg"
        >
          <div className="text-3xl md:text-4xl font-bold text-teal-700 mb-2 drop-shadow-sm">{stat.value}</div>
          <div className="text-gray-700 font-medium">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  </motion.div>
      </section>

      {/* Weather Widget */}
      <section className="py-8 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WeatherWidget />
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Sri Lanka</h2>
            <p className="text-xl text-gray-600">Discover heritage sites, pristine beaches, and mountain escapes</p>
          </motion.div>
          <InteractiveMap />
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Destinations</h2>
            <p className="text-xl text-gray-600">Must-visit places that showcase Sri Lanka's beauty</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="h-48 bg-gradient-to-br from-teal-400 to-orange-400 relative">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-900">
                        {destination.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/90 px-2 py-1 rounded">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{destination.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {destination.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{destination.description}</p>
                    {!user && (
                      <Link href="/auth">
                        <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800">
                          Login to Book Tours
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Premium Accommodations</h2>
            <p className="text-xl text-gray-600">Experience luxury and comfort across the island</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="h-48 bg-gradient-to-br from-orange-400 to-red-400 relative">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-900">
                        ${hotel.pricePerNight}/night
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/90 px-2 py-1 rounded">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{hotel.rating}</span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{hotel.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {hotel.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{hotel.description}</p>
                    {!user && (
                      <Link href="/auth">
                        <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                          Login to Book Hotels
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-orange-600">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Explore Ceylon?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of travelers who have discovered the magic of Sri Lanka through HeritaGo
          </p>
          {!user && (
            <Link href="/auth">
              <Button size="lg" variant="secondary" className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3">
                Create Your Account
              </Button>
            </Link>
          )}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">
                HeritaGo
              </h3>
              <p className="text-gray-400">
                Your gateway to authentic Sri Lankan experiences
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/auth" className="hover:text-white transition-colors">Sign In</Link></li>
                <li>Destinations</li>
                <li>Hotels</li>
                <li>Tours</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Safety Guidelines</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+94 11 123 4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>hello@heritago.lk</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2025 HeritaGo. Explore Ceylone Like Never Before.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}