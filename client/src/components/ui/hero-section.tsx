import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HERO_STATS } from "@/lib/sample-data";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";

export default function HeroSection() {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-pattern"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-orange-400/20 rounded-full"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-12 h-12 bg-emerald-400/20 rounded-full"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 4 }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Main Heading */}
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-display">
              Explore{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Ceylon
                </span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                />
              </span>
              <br />
              Like Never Before
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Discover Sri Lanka's hidden gems with AI-powered travel planning, local expertise, 
            and unforgettable adventures across the Pearl of the Indian Ocean.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            {user ? (
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl"
                >
                  <i className="fas fa-tachometer-alt mr-2"></i>
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/auth">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl"
                >
                  <i className="fas fa-rocket mr-2"></i>
                  Start Your Journey
                </Button>
              </Link>
            )}
            
            <Button
              variant="outline"
              size="lg"
              className="glassmorphism text-white border-white/30 hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300"
            >
              <i className="fas fa-play mr-2"></i>
              Watch Preview
            </Button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {HERO_STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glassmorphism rounded-2xl p-6 text-center backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-white mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, type: "spring", stiffness: 200 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-white/80 text-sm md:text-base font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/60 text-center"
        >
          <i className="fas fa-chevron-down text-2xl mb-2"></i>
          <p className="text-sm">Scroll to explore</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
