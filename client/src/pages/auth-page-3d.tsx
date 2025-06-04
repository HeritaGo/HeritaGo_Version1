import { useAuth } from "@/hooks/use-auth";
import { Redirect, Link } from "wouter";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { SAMPLE_ACCOUNTS } from "@/lib/sample-data";
import { ArrowLeft, Mountain, Users, Compass, Shield, Loader2 } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const signupSchema = insertUserSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginForm = z.infer<typeof loginSchema>;
type SignupForm = z.infer<typeof signupSchema>;

export default function AuthPage3D() {
  const { user, loginMutation, registerMutation } = useAuth();

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      fullName: "",
      role: "tourist",
      phoneNumber: "",
    },
  });

  // Redirect if already logged in
  if (user) {
    return <Redirect to="/dashboard" />;
  }

  const onLogin = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  const onSignup = (data: SignupForm) => {
    const { confirmPassword, ...userData } = data;
    registerMutation.mutate(userData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50 relative overflow-hidden">
      {/* Background 3D Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-r from-teal-400/20 to-orange-400/20 rounded-xl"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'rotateX(45deg) rotateY(45deg)'
          }}
        />
        
        <motion.div
          animate={{ 
            y: [0, 40, 0],
            rotate: [0, -180, -360],
            scale: [1, 0.8, 1]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
          className="absolute top-40 right-32 w-16 h-16 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'rotateX(60deg) rotateZ(30deg)'
          }}
        />

        <motion.div
          animate={{ 
            y: [0, -25, 0],
            x: [0, 15, 0],
            rotate: [0, 90, 180]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute bottom-32 left-32 w-12 h-12 bg-gradient-to-r from-teal-300/30 to-emerald-300/30"
          style={{ 
            transformStyle: 'preserve-3d',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }}
        />
      </div>

      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-6 left-6 z-10"
      >
        <Link href="/">
          <Button variant="ghost" className="text-teal-600 hover:bg-teal-50">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </motion.div>

      <div className="flex min-h-screen">
        {/* Left side - 3D Animated Form */}
        <div className="flex-1 flex items-center justify-center p-8 relative">
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: -30 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full max-w-md relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* 3D Card Shadow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-orange-600/20 rounded-2xl blur-xl transform translate-x-4 translate-y-4 -z-10"
              style={{ transform: 'translateZ(-20px) rotateX(45deg)' }}
            />

            <motion.div
              whileHover={{ 
                scale: 1.02,
                rotateX: 5,
                rotateY: 5,
                z: 20
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <CardHeader className="text-center pb-6">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
                    >
                      <CardTitle className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-orange-600 bg-clip-text text-transparent mb-2">
                        Welcome to HeritaGo
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Your gateway to Sri Lankan adventures
                      </CardDescription>
                    </motion.div>
                  </CardHeader>
                </motion.div>

                <CardContent>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    <Tabs defaultValue="login" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="login" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-teal-700">
                          Sign In
                        </TabsTrigger>
                        <TabsTrigger value="signup" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600">
                          Sign Up
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="login" className="space-y-4">
                        <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="space-y-2"
                          >
                            <Label htmlFor="username">Username</Label>
                            <Input
                              id="username"
                              {...loginForm.register("username")}
                              placeholder="Enter your username"
                              className="transition-all duration-300 focus:scale-105 focus:shadow-lg"
                            />
                            {loginForm.formState.errors.username && (
                              <p className="text-red-500 text-sm">{loginForm.formState.errors.username.message}</p>
                            )}
                          </motion.div>
                          
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.9, duration: 0.5 }}
                            className="space-y-2"
                          >
                            <Label htmlFor="password">Password</Label>
                            <Input
                              id="password"
                              type="password"
                              {...loginForm.register("password")}
                              placeholder="Enter your password"
                              className="transition-all duration-300 focus:scale-105 focus:shadow-lg"
                            />
                            {loginForm.formState.errors.password && (
                              <p className="text-red-500 text-sm">{loginForm.formState.errors.password.message}</p>
                            )}
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button 
                              type="submit" 
                              className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 shadow-lg hover:shadow-xl transition-all duration-300"
                              disabled={loginMutation.isPending}
                            >
                              {loginMutation.isPending ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="inline-block"
                                >
                                  <Loader2 className="h-4 w-4 mr-2" />
                                </motion.div>
                              ) : null}
                              {loginMutation.isPending ? "Signing in..." : "Sign In"}
                            </Button>
                          </motion.div>
                        </form>

                        {/* Sample Accounts */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.1, duration: 0.5 }}
                          className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-orange-50 rounded-lg border"
                        >
                          <p className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Demo Accounts:
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {Object.entries(SAMPLE_ACCOUNTS).map(([role, account], index) => (
                              <motion.div
                                key={role}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.2 + index * 0.1, duration: 0.3 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    loginForm.setValue("username", account.username);
                                    loginForm.setValue("password", account.password);
                                  }}
                                  className="text-left justify-start w-full hover:bg-white hover:shadow-md transition-all duration-200"
                                >
                                  {role.charAt(0).toUpperCase() + role.slice(1)}
                                </Button>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </TabsContent>

                      <TabsContent value="signup" className="space-y-4">
                        <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="grid grid-cols-2 gap-4"
                          >
                            <div className="space-y-2">
                              <Label htmlFor="fullName">Full Name</Label>
                              <Input
                                id="fullName"
                                {...signupForm.register("fullName")}
                                placeholder="Your name"
                                className="transition-all duration-300 focus:scale-105 focus:shadow-lg"
                              />
                              {signupForm.formState.errors.fullName && (
                                <p className="text-red-500 text-sm">{signupForm.formState.errors.fullName.message}</p>
                              )}
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="username">Username</Label>
                              <Input
                                id="username"
                                {...signupForm.register("username")}
                                placeholder="Username"
                                className="transition-all duration-300 focus:scale-105 focus:shadow-lg"
                              />
                              {signupForm.formState.errors.username && (
                                <p className="text-red-500 text-sm">{signupForm.formState.errors.username.message}</p>
                              )}
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-2"
                          >
                            <Label htmlFor="signupEmail">Email</Label>
                            <Input
                              id="signupEmail"
                              type="email"
                              {...signupForm.register("email")}
                              placeholder="Enter your email"
                              className="transition-all duration-300 focus:scale-105 focus:shadow-lg"
                            />
                            {signupForm.formState.errors.email && (
                              <p className="text-red-500 text-sm">{signupForm.formState.errors.email.message}</p>
                            )}
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-2"
                          >
                            <Label htmlFor="role">Role</Label>
                            <Select onValueChange={(value) => signupForm.setValue("role", value)}>
                              <SelectTrigger className="transition-all duration-300 focus:scale-105 focus:shadow-lg">
                                <SelectValue placeholder="Select your role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="tourist">Tourist</SelectItem>
                                <SelectItem value="guide">Tour Guide</SelectItem>
                                <SelectItem value="vendor">Gear Vendor</SelectItem>
                              </SelectContent>
                            </Select>
                            {signupForm.formState.errors.role && (
                              <p className="text-red-500 text-sm">{signupForm.formState.errors.role.message}</p>
                            )}
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="space-y-2"
                          >
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input
                              id="phoneNumber"
                              {...signupForm.register("phoneNumber")}
                              placeholder="+94 XX XXX XXXX"
                              className="transition-all duration-300 focus:scale-105 focus:shadow-lg"
                            />
                            {signupForm.formState.errors.phoneNumber && (
                              <p className="text-red-500 text-sm">{signupForm.formState.errors.phoneNumber.message}</p>
                            )}
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="grid grid-cols-2 gap-4"
                          >
                            <div className="space-y-2">
                              <Label htmlFor="signupPassword">Password</Label>
                              <Input
                                id="signupPassword"
                                type="password"
                                {...signupForm.register("password")}
                                placeholder="Create password"
                                className="transition-all duration-300 focus:scale-105 focus:shadow-lg"
                              />
                              {signupForm.formState.errors.password && (
                                <p className="text-red-500 text-sm">{signupForm.formState.errors.password.message}</p>
                              )}
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="confirmPassword">Confirm Password</Label>
                              <Input
                                id="confirmPassword"
                                type="password"
                                {...signupForm.register("confirmPassword")}
                                placeholder="Confirm password"
                                className="transition-all duration-300 focus:scale-105 focus:shadow-lg"
                              />
                              {signupForm.formState.errors.confirmPassword && (
                                <p className="text-red-500 text-sm">{signupForm.formState.errors.confirmPassword.message}</p>
                              )}
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button 
                              type="submit" 
                              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300"
                              disabled={registerMutation.isPending}
                            >
                              {registerMutation.isPending ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="inline-block"
                                >
                                  <Loader2 className="h-4 w-4 mr-2" />
                                </motion.div>
                              ) : null}
                              {registerMutation.isPending ? "Creating account..." : "Create Account"}
                            </Button>
                          </motion.div>
                        </form>
                      </TabsContent>
                    </Tabs>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Right side - 3D Hero Section */}
        <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-orange-600">
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: 30 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="absolute inset-0 flex flex-col justify-center items-center text-white p-12"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
              className="text-5xl font-bold mb-6 text-center"
            >
              Discover Ceylon's Wonders
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-xl text-center mb-8 max-w-md leading-relaxed"
            >
              Join thousands of travelers exploring Sri Lanka's ancient heritage, pristine beaches, and majestic mountains
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
              className="grid grid-cols-2 gap-6 w-full max-w-md"
            >
              {[
                { value: "25K+", label: "Happy Travelers", delay: 0 },
                { value: "200+", label: "Destinations", delay: 0.1 },
                { value: "150+", label: "Expert Guides", delay: 0.2 },
                { value: "24/7", label: "AI Assistant", delay: 0.3 }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, rotateX: -30 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    delay: 1.4 + stat.delay,
                    duration: 0.6,
                    type: "spring"
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    rotateY: 10,
                    z: 20
                  }}
                  className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div 
                    className="text-3xl font-bold"
                    animate={{ 
                      textShadow: ["0 0 0px rgba(255,255,255,0.5)", "0 0 20px rgba(255,255,255,0.8)", "0 0 0px rgba(255,255,255,0.5)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* 3D Decorative elements */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotateY: [0, 180, 360],
              rotateX: [0, 15, 0]
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-10 right-10 text-white/20"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Mountain size={120} />
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [0, 15, 0],
              rotateZ: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-20 left-10 text-white/20"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Compass size={80} />
          </motion.div>

          <motion.div
            animate={{ 
              x: [0, 20, 0],
              y: [0, -10, 0],
              rotateY: [0, 45, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute top-1/2 right-20 text-white/15"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Users size={60} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}