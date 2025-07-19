export const CEYLON_COLORS = {
  teal: 'hsl(172, 66%, 50%)',
  emerald: 'hsl(160, 64%, 52%)',
  orange: 'hsl(24, 95%, 53%)',
  sunset: 'hsl(32, 95%, 59%)',
  ocean: 'hsl(197, 71%, 52%)',
} as const;

export const USER_ROLES = {
  TOURIST: 'tourist',
  GUIDE: 'guide',
  VENDOR: 'vendor',
  ADMIN: 'admin',
} as const;

export const DESTINATION_CATEGORIES = {
  HERITAGE: 'heritage',
  BEACH: 'beach',
  MOUNTAIN: 'mountain',
  WILDLIFE: 'wildlife',
  CULTURAL: 'cultural',
} as const;

export const GEAR_CATEGORIES = {
  CAMPING: 'camping',
  HIKING: 'hiking',
  PHOTOGRAPHY: 'photography',
  WATER_SPORTS: 'water-sports',
} as const;

export const ALERT_SEVERITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

export const ALERT_CATEGORIES = {
  WEATHER: 'weather',
  SAFETY: 'safety',
  TRAFFIC: 'traffic',
  HEALTH: 'health',
} as const;

export const BOOKING_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const;

export const SRI_LANKA_REGIONS = [
  'Western Province',
  'Central Province',
  'Southern Province',
  'Northern Province',
  'Eastern Province',
  'North Western Province',
  'North Central Province',
  'Uva Province',
  'Sabaragamuwa Province',
] as const;

export const POPULAR_CITIES = [
  'Colombo',
  'Kandy',
  'Galle',
  'Jaffna',
  'Trincomalee',
  'Anuradhapura',
  'Polonnaruwa',
  'Ella',
  'Nuwara Eliya',
  'Sigiriya',
  'Dambulla',
  'Bentota',
  'Unawatuna',
  'Mirissa',
  'Arugam Bay',
] as const;

export const EMERGENCY_CONTACTS = {
  POLICE: '119',
  FIRE: '110',
  AMBULANCE: '1990',
  TOURIST_HOTLINE: '1912',
} as const;

export const WEATHER_CONDITIONS = [
  'Sunny',
  'Partly Cloudy',
  'Cloudy',
  'Light Rain',
  'Heavy Rain',
  'Thunderstorm',
  'Misty',
  'Hot',
  'Cool',
] as const;

export const AMENITIES = [
  'WiFi',
  'Pool',
  'Restaurant',
  'Spa',
  'Gym',
  'Beach Access',
  'Mountain View',
  'Tea Tours',
  'Air Conditioning',
  'Parking',
  'Bar',
  'Room Service',
  'Conference Facilities',
  'Pet Friendly',
  'Airport Shuttle',
] as const;

export const QUEST_CATEGORIES = [
  'Heritage Explorer',
  'Beach Hopper',
  'Mountain Climber',
  'Wildlife Spotter',
  'Culture Enthusiast',
  'Food Explorer',
  'Adventure Seeker',
  'Photography Master',
] as const;

export const AI_CHATBOT_RESPONSES = {
  WELCOME: "Hello! I'm your AI travel assistant for Sri Lanka. How can I help you plan your perfect adventure today?",
  TRIP_PLANNING: "I can help you plan an amazing trip! What type of experience interests you - beaches, mountains, cultural sites, or wildlife?",
  WEATHER: "Sri Lanka has a tropical climate. The weather is generally warm year-round. Would you like specific weather information for a particular region?",
  EMERGENCY: "For emergencies in Sri Lanka: Police (119), Fire (110), Ambulance (1990). I can also provide current safety alerts for your location.",
  HOTELS: "I can suggest great hotels based on your preferences. Which region are you planning to visit?",
  GEAR: "We have various gear available for rent including camping equipment, hiking gear, cameras, and water sports equipment. What do you need?",
  DEFAULT: "Feel free to ask me about destinations, hotels, gear rentals, weather, emergency information, or trip planning!",
} as const;

export const ANIMATION_DURATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  SLOWER: 800,
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

export const DEFAULT_AVATAR_COLORS = [
  'bg-red-500',
  'bg-orange-500',
  'bg-amber-500',
  'bg-yellow-500',
  'bg-lime-500',
  'bg-green-500',
  'bg-emerald-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-sky-500',
  'bg-blue-500',
  'bg-indigo-500',
  'bg-violet-500',
  'bg-purple-500',
  'bg-fuchsia-500',
  'bg-pink-500',
  'bg-rose-500',
] as const;
