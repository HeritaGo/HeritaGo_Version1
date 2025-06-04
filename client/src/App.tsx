import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import NotFound from "@/pages/not-found";
import PublicLanding from "@/pages/public-landing";
import AuthPage3D from "@/pages/auth-page-3d";
import DashboardPage from "@/pages/dashboard-page";
import DestinationsPage from "@/pages/destinations-page";
import HotelsPage from "@/pages/hotels-page";
import GearHubPage from "@/pages/gear-hub-page";
import CommunityPage from "@/pages/community-page";
import AlertsPage from "@/pages/alerts-page";
import QuestPage from "@/pages/quest-page";

function Router() {
  return (
    <Switch>
      <Route path="/" component={PublicLanding} />
      <ProtectedRoute path="/dashboard" component={DashboardPage} />
      <ProtectedRoute path="/destinations" component={DestinationsPage} />
      <ProtectedRoute path="/hotels" component={HotelsPage} />
      <ProtectedRoute path="/gear-hub" component={GearHubPage} />
      <ProtectedRoute path="/community" component={CommunityPage} />
      <ProtectedRoute path="/alerts" component={AlertsPage} />
      <ProtectedRoute path="/quest" component={QuestPage} />
      <Route path="/auth" component={AuthPage3D} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
