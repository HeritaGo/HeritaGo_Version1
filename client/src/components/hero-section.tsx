import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, Play, Rocket, Users, MapPin, Star, Clock } from "lucide-react";

const stats = [
  { value: "25K+", label: "Happy Travelers", delay: 0 },
  { value: "200+", label: "Destinations", delay: 0.1 },
  { value: "150+", label: "Expert Guides", delay: 0.2 },
  { value: "24/7", label: "AI Assistant", delay: 0.3 },
];

const floatingElements = [
  { size: "w-20 h-20", color: "bg-primary/20", delay: 0, position: "top-20 left-10" },
  { size: "w-16 h-16", color: "bg-secondary/30", delay: -2, position: "top-40 right-20" },
  { size: "w-12 h-12", color: "bg-accent/25", delay: -4, position: "bottom-32 left-1/4" },
];

export default function HeroSection() {
  return (
    <section className="min-h-screen hero-bg flex items-center justify-center relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute ${element.size} ${element.color} rounded-full animate-float`}
            style={{ 
              animationDelay: `${element.delay}s`,
              top: element.position.includes('top') ? element.position.split(' ')[0].replace('top-', '') + 'rem' : 'auto',
              bottom: element.position.includes('bottom') ? element.position.split(' ')[0].replace('bottom-', '') + 'rem' : 'auto',
              left: element.position.includes('left') ? element.position.split(' ')[1].replace('left-', '').replace('1/4', '25%') : 'auto',
              right: element.position.includes('right') ? element.position.split(' ')[1].replace('right-', '') + 'rem' : 'auto',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Main Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore Ceylon
            <br />
            <span className="text-gradient-ceylon bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Like Never Before
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover Sri Lanka's hidden gems with AI-powered travel planning, local expertise, 
            and unforgettable adventures across the Pearl of the Indian Ocean.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/auth">
              <Button 
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg font-semibold animate-pulse-glow"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Start Your Journey
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="lg"
              className="glassmorphism text-white border-white/20 hover:bg-white/10 px-8 py-4 text-lg font-semibold"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Preview
            </Button>
          </motion.div>
        </motion.div>

        {/* Hero Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 + stat.delay }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="glassmorphism border-white/10 hover:border-white/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <motion.div 
                    className="text-3xl font-bold text-white mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      delay: 1.2 + stat.delay 
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-200 text-sm font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="flex flex-col items-center text-white/80 cursor-pointer hover:text-white transition-colors"
          >
            <span className="text-sm font-medium mb-2">Scroll to explore</span>
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl hidden lg:block"
        >
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: Users, label: "AI Planning", color: "from-cyan-500 to-blue-500" },
              { icon: MapPin, label: "Local Guides", color: "from-green-500 to-emerald-500" },
              { icon: Star, label: "Top Destinations", color: "from-orange-500 to-red-500" },
              { icon: Clock, label: "24/7 Support", color: "from-purple-500 to-pink-500" },
            ].map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glassmorphism p-4 rounded-xl text-center group cursor-pointer"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-white text-sm font-medium">{feature.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
