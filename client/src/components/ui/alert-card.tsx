import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface EmergencyAlert {
  id: number;
  title: string;
  message: string;
  severity: string;
  category: string;
  location?: string;
  createdAt: string;
  expiresAt?: string;
  isActive: boolean;
}

interface AlertCardProps {
  alert: EmergencyAlert;
}

export default function AlertCard({ alert }: AlertCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return 'fas fa-exclamation-triangle';
      case 'high': return 'fas fa-exclamation-circle';
      case 'medium': return 'fas fa-info-circle';
      case 'low': return 'fas fa-info';
      default: return 'fas fa-bell';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'weather': return 'fas fa-cloud-rain';
      case 'safety': return 'fas fa-shield-alt';
      case 'traffic': return 'fas fa-car';
      case 'health': return 'fas fa-medkit';
      default: return 'fas fa-bell';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'weather': return 'bg-blue-100 text-blue-800';
      case 'safety': return 'bg-red-100 text-red-800';
      case 'traffic': return 'bg-orange-100 text-orange-800';
      case 'health': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isExpiringSoon = () => {
    if (!alert.expiresAt) return false;
    const now = new Date();
    const expires = new Date(alert.expiresAt);
    const timeDiff = expires.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);
    return hoursDiff <= 6 && hoursDiff > 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Card className={`overflow-hidden border-l-4 hover:shadow-lg transition-all duration-300 ${
        alert.severity === 'critical' ? 'border-l-red-500' :
        alert.severity === 'high' ? 'border-l-orange-500' :
        alert.severity === 'medium' ? 'border-l-yellow-500' :
        'border-l-blue-500'
      }`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                alert.severity === 'critical' ? 'bg-red-100' :
                alert.severity === 'high' ? 'bg-orange-100' :
                alert.severity === 'medium' ? 'bg-yellow-100' :
                'bg-blue-100'
              }`}>
                <i className={`${getSeverityIcon(alert.severity)} ${
                  alert.severity === 'critical' ? 'text-red-600' :
                  alert.severity === 'high' ? 'text-orange-600' :
                  alert.severity === 'medium' ? 'text-yellow-600' :
                  'text-blue-600'
                } text-lg ${alert.severity === 'critical' ? 'animate-pulse' : ''}`}></i>
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                  {alert.title}
                </CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={getCategoryColor(alert.category)}>
                    <i className={`${getCategoryIcon(alert.category)} mr-1 text-xs`}></i>
                    {alert.category.charAt(0).toUpperCase() + alert.category.slice(1)}
                  </Badge>
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>
            
            {/* Expiry Warning */}
            {isExpiringSoon() && (
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                <i className="fas fa-clock mr-1"></i>
                Expiring Soon
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-slate-700 leading-relaxed mb-4">
            {alert.message}
          </p>

          {/* Location */}
          {alert.location && (
            <div className="flex items-center text-sm text-slate-600 mb-4">
              <i className="fas fa-map-marker-alt text-red-500 mr-2"></i>
              <span className="font-medium">Location: {alert.location}</span>
            </div>
          )}

          {/* Timestamps */}
          <div className="flex flex-col space-y-2 text-xs text-slate-500">
            <div className="flex items-center">
              <i className="fas fa-calendar mr-2"></i>
              <span>Issued: {formatDate(alert.createdAt)}</span>
            </div>
            {alert.expiresAt && (
              <div className="flex items-center">
                <i className="fas fa-calendar-times mr-2"></i>
                <span>Expires: {formatDate(alert.expiresAt)}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 mt-4">
            <Button size="sm" variant="outline" className="text-xs">
              <i className="fas fa-share mr-1"></i>
              Share
            </Button>
            <Button size="sm" variant="outline" className="text-xs">
              <i className="fas fa-bookmark mr-1"></i>
              Save
            </Button>
            {alert.category === 'weather' && (
              <Button size="sm" variant="outline" className="text-xs">
                <i className="fas fa-cloud mr-1"></i>
                Weather Details
              </Button>
            )}
          </div>
        </CardContent>

        {/* Progress Bar for Time Remaining */}
        {alert.expiresAt && (
          <div className="relative">
            <div className="h-1 bg-gray-200">
              <motion.div
                className={`h-full ${
                  alert.severity === 'critical' ? 'bg-red-500' :
                  alert.severity === 'high' ? 'bg-orange-500' :
                  alert.severity === 'medium' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`}
                initial={{ width: '100%' }}
                animate={{ 
                  width: isExpiringSoon() ? '20%' : '60%'
                }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
