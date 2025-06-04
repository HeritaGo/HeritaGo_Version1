import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROLE_FEATURES } from "@/lib/sample-data";
import { Link } from "wouter";

interface RoleCardsProps {
  userRole?: string;
}

export default function RoleCards({ userRole }: RoleCardsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 font-display">
            Your Personalized Experience
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Whether you're exploring, guiding, or providing services - HeritaGo adapts to your unique needs
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {Object.entries(ROLE_FEATURES).map(([role, feature]) => (
            <motion.div key={role} variants={cardVariants}>
              <Card className={`relative overflow-hidden h-full group cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                userRole === role ? 'ring-2 ring-teal-500 shadow-lg' : ''
              }`}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Current User Badge */}
                {userRole === role && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-teal-500 text-white">
                      <i className="fas fa-check mr-1"></i>
                      Active
                    </Badge>
                  </div>
                )}

                <CardHeader className="relative z-10 pb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <i className={`${feature.icon} text-white text-2xl`}></i>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-teal-700 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    {feature.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                  <ul className="space-y-3 mb-6">
                    {feature.features.map((featureItem, index) => (
                      <motion.li
                        key={featureItem}
                        className="flex items-center text-sm text-slate-600"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-2 h-2 bg-teal-500 rounded-full mr-3 flex-shrink-0"></div>
                        {featureItem}
                      </motion.li>
                    ))}
                  </ul>

                  {userRole === role ? (
                    <Link href="/dashboard">
                      <Button className="w-full bg-teal-600 hover:bg-teal-700">
                        <i className="fas fa-tachometer-alt mr-2"></i>
                        Go to Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <div className="space-y-2">
                      {role === 'admin' ? (
                        <Button disabled className="w-full" variant="outline">
                          <i className="fas fa-lock mr-2"></i>
                          Admin Only
                        </Button>
                      ) : (
                        <>
                          <Link href="/auth">
                            <Button className={`w-full bg-gradient-to-r ${feature.color} hover:opacity-90`}>
                              <i className="fas fa-user-plus mr-2"></i>
                              Join as {role.charAt(0).toUpperCase() + role.slice(1)}
                            </Button>
                          </Link>
                          <p className="text-xs text-slate-500 text-center">
                            Create your account to get started
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </CardContent>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              All Roles Include
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center space-x-3">
                <i className="fas fa-robot text-teal-600 text-xl"></i>
                <span className="text-slate-700 font-medium">AI Travel Assistant</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <i className="fas fa-shield-alt text-emerald-600 text-xl"></i>
                <span className="text-slate-700 font-medium">24/7 Safety Alerts</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <i className="fas fa-users text-orange-600 text-xl"></i>
                <span className="text-slate-700 font-medium">Community Access</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
