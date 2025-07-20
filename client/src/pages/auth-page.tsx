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
import { ArrowLeft, Mountain, Users, Compass, Shield } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
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

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [activeTab, setActiveTab] = useState("login");

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      role: "tourist",
      phoneNumber: "",
    },
  });

  if (user) {
    return <Redirect to="/" />;
  }

  const onLogin = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  const onSignup = (data: SignupForm) => {
    const { confirmPassword, ...signupData } = data;
    registerMutation.mutate(signupData);
  };

  const quickLogin = (role: keyof typeof SAMPLE_ACCOUNTS) => {
    const account = SAMPLE_ACCOUNTS[role];
    loginForm.setValue("email", account.email);
    loginForm.setValue("password", account.password);
    loginMutation.mutate({
      email: account.email,
      password: account.password,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 via-teal-700 to-orange-600 flex">
      {/* Left side - Hero/Branding */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <i className="fas fa-mountain text-4xl"></i>
          </div>
          <h1 className="text-5xl font-bold mb-6">HeritaGo</h1>
          <p className="text-xl mb-8 opacity-90 max-w-md">
            Explore Ceylon like never before with AI-powered travel planning and local expertise.
          </p>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="text-2xl font-bold">25K+</div>
              <div className="text-sm opacity-80">Happy Travelers</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="text-2xl font-bold">200+</div>
              <div className="text-sm opacity-80">Destinations</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="text-2xl font-bold">150+</div>
              <div className="text-sm opacity-80">Expert Guides</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm opacity-80">AI Assistant</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <Card className="bg-white/95 shadow-2xl border-0">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-slate-800">
                Welcome to HeritaGo
              </CardTitle>
              <CardDescription className="text-slate-600">
                Sign in to continue your Sri Lankan adventure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        {...loginForm.register("email")}
                        className="h-11"
                      />
                      {loginForm.formState.errors.email && (
                        <p className="text-sm text-red-600">
                          {loginForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        {...loginForm.register("password")}
                        className="h-11"
                      />
                      {loginForm.formState.errors.password && (
                        <p className="text-sm text-red-600">
                          {loginForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-11 bg-teal-600 hover:bg-teal-700"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Signing in...</span>
                        </div>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>

                  {/* Quick Demo Login */}
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <p className="text-sm text-slate-600 text-center mb-4">
                      Quick Demo Access:
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => quickLogin("tourist")}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        Tourist Demo
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => quickLogin("guide")}
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        Guide Demo
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => quickLogin("vendor")}
                        className="text-orange-600 border-orange-200 hover:bg-orange-50"
                      >
                        Vendor Demo
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => quickLogin("admin")}
                        className="text-slate-600 border-slate-200 hover:bg-slate-50"
                      >
                        Admin Demo
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-fullName">Full Name</Label>
                      <Input
                        id="signup-fullName"
                        placeholder="Enter your full name"
                        {...signupForm.register("fullName")}
                        className="h-11"
                      />
                      {signupForm.formState.errors.fullName && (
                        <p className="text-sm text-red-600">
                          {signupForm.formState.errors.fullName.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-username">Username</Label>
                      <Input
                        id="signup-username"
                        placeholder="Choose a username"
                        {...signupForm.register("username")}
                        className="h-11"
                      />
                      {signupForm.formState.errors.username && (
                        <p className="text-sm text-red-600">
                          {signupForm.formState.errors.username.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        {...signupForm.register("email")}
                        className="h-11"
                      />
                      {signupForm.formState.errors.email && (
                        <p className="text-sm text-red-600">
                          {signupForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-role">Role</Label>
                      <Select onValueChange={(value) => signupForm.setValue("role", value)} defaultValue="tourist">
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tourist">Tourist</SelectItem>
                          <SelectItem value="guide">Local Guide</SelectItem>
                          <SelectItem value="vendor">Gear Vendor</SelectItem>
                        </SelectContent>
                      </Select>
                      {signupForm.formState.errors.role && (
                        <p className="text-sm text-red-600">
                          {signupForm.formState.errors.role.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-phone">Phone Number (Optional)</Label>
                      <Input
                        id="signup-phone"
                        placeholder="+94 XX XXX XXXX"
                        {...signupForm.register("phoneNumber")}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        {...signupForm.register("password")}
                        className="h-11"
                      />
                      {signupForm.formState.errors.password && (
                        <p className="text-sm text-red-600">
                          {signupForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirmPassword">Confirm Password</Label>
                      <Input
                        id="signup-confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        {...signupForm.register("confirmPassword")}
                        className="h-11"
                      />
                      {signupForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-red-600">
                          {signupForm.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-11 bg-teal-600 hover:bg-teal-700"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Creating account...</span>
                        </div>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </form>

                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-800">
                      <i className="fas fa-info-circle mr-2"></i>
                      Admin accounts can only be created by existing administrators.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
