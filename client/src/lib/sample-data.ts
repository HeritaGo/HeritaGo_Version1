export const SAMPLE_ACCOUNTS = {
  tourist: {
    email: 'tourist@heritago.lk',
    password: 'tourist123',
    username: 'tourist_demo',
    fullName: 'John Smith',
    role: 'tourist',
  },
  guide: {
    email: 'guide@heritago.lk',
    password: 'guide123',
    username: 'guide_demo',
    fullName: 'Samanthi Fernando',
    role: 'guide',
  },
  vendor: {
    email: 'vendor@heritago.lk',
    password: 'vendor123',
    username: 'vendor_demo',
    fullName: 'Adventure Gear Lanka',
    role: 'vendor',
  },
  admin: {
    email: 'admin@heritago.lk',
    password: 'admin123',
    username: 'admin_demo',
    fullName: 'System Administrator',
    role: 'admin',
  },
} as const;

export const HERO_STATS = [
  { value: '25K+', label: 'Happy Travelers' },
  { value: '200+', label: 'Destinations' },
  { value: '150+', label: 'Expert Guides' },
  { value: '24/7', label: 'AI Assistant' },
] as const;

export const DESTINATION_HIGHLIGHTS = [
  {
    title: 'Ancient Heritage',
    description: 'Explore 2,500 years of history',
    locations: 'Anuradhapura • Polonnaruwa • Sigiriya',
    category: 'heritage',
    imageAlt: 'Ancient heritage site with carved stone pillars',
  },
  {
    title: 'Tropical Beaches',
    description: 'Paradise awaits your arrival',
    locations: 'Unawatuna • Mirissa • Arugam Bay',
    category: 'beach',
    imageAlt: 'Pristine tropical beach with turquoise water and palm trees',
  },
  {
    title: 'Hill Country',
    description: 'Misty mountains & tea gardens',
    locations: 'Ella • Nuwara Eliya • Kandy',
    category: 'mountain',
    imageAlt: 'Terraced tea plantation with lush green hills',
  },
  {
    title: 'Wildlife Safari',
    description: 'Encounter majestic creatures',
    locations: 'Yala • Udawalawe • Minneriya',
    category: 'wildlife',
    imageAlt: 'Majestic elephant in Sri Lankan wilderness',
  },
  {
    title: 'Cultural Cities',
    description: 'Living heritage & traditions',
    locations: 'Kandy • Galle • Colombo',
    category: 'cultural',
    imageAlt: 'Traditional Buddhist temple with ornate golden architecture',
  },
  {
    title: 'Adventure Sports',
    description: 'Thrill seekers paradise',
    locations: 'Kitulgala • Ella • Negombo',
    category: 'adventure',
    imageAlt: 'Dramatic mountain landscape perfect for adventure sports',
  },
] as const;

export const ROLE_FEATURES = {
  tourist: {
    title: 'Tourist Dashboard',
    description: 'Plan your perfect Sri Lankan adventure with AI assistance',
    features: ['AI Travel Planner', 'Interactive Maps', 'Quest Mode Gaming'],
    color: 'from-blue-500 to-blue-600',
    icon: 'fas fa-user-friends',
  },
  guide: {
    title: 'Guide Dashboard',
    description: 'Share your expertise and earn by guiding travelers',
    features: ['Manage Tours', 'Earnings Dashboard', 'Client Reviews'],
    color: 'from-green-500 to-green-600',
    icon: 'fas fa-route',
  },
  vendor: {
    title: 'Vendor Dashboard',
    description: 'Rent equipment to travelers exploring Sri Lanka',
    features: ['Inventory Management', 'Booking System', 'Revenue Analytics'],
    color: 'from-orange-500 to-orange-600',
    icon: 'fas fa-store',
  },
  admin: {
    title: 'Admin Dashboard',
    description: 'Manage the platform with comprehensive analytics',
    features: ['User Management', 'Analytics Dashboard', 'Content Moderation'],
    color: 'from-slate-600 to-slate-700',
    icon: 'fas fa-cog',
  },
} as const;

export const WEATHER_MOCK_DATA = {
  colombo: { temperature: 28, condition: 'Partly Cloudy', humidity: 75, icon: 'fas fa-cloud-sun' },
  kandy: { temperature: 24, condition: 'Light Rain', humidity: 80, icon: 'fas fa-cloud-rain' },
  galle: { temperature: 29, condition: 'Sunny', humidity: 70, icon: 'fas fa-sun' },
  ella: { temperature: 22, condition: 'Misty', humidity: 85, icon: 'fas fa-cloud' },
  anuradhapura: { temperature: 30, condition: 'Hot', humidity: 65, icon: 'fas fa-thermometer-full' },
} as const;

export const QUICK_CHAT_ACTIONS = [
  'Plan a 3-day trip',
  'Find hotels',
  'Weather updates',
  'Emergency info',
  'Rent gear',
  'Book tours',
] as const;

export const COMMUNITY_GUIDELINES = [
  'Be respectful to all community members',
  'Share authentic experiences and advice',
  'No spam or promotional content',
  'Help others discover Sri Lanka responsibly',
  'Report inappropriate content',
] as const;

export const TRENDING_TOPICS = [
  { tag: '#SriLankaTravel', posts: 245 },
  { tag: '#Sigiriya', posts: 189 },
  { tag: '#BeachHoliday', posts: 156 },
  { tag: '#CulturalTour', posts: 134 },
  { tag: '#TeaCountry', posts: 98 },
  { tag: '#WildlifeSafari', posts: 87 },
] as const;

export const MAP_PINS_SAMPLE = [
  {
    id: 'sigiriya',
    name: 'Sigiriya Rock',
    lat: 7.9570,
    lng: 80.7603,
    category: 'heritage',
    color: 'teal',
  },
  {
    id: 'unawatuna',
    name: 'Unawatuna Beach',
    lat: 6.0108,
    lng: 80.2486,
    category: 'beach',
    color: 'orange',
  },
  {
    id: 'ella',
    name: 'Ella Nine Arch',
    lat: 6.8721,
    lng: 81.0461,
    category: 'mountain',
    color: 'emerald',
  },
] as const;

export const AI_CHATBOT_RESPONSES = {
  greeting: "Ayubowan! Welcome to HeritaGo! I'm your AI travel assistant, ready to help you explore the beautiful island of Sri Lanka. How can I assist you today?",
  destinations: "Sri Lanka offers incredible diversity - from ancient heritage sites like Sigiriya and Anuradhapura, to pristine beaches in Unawatuna and Mirissa, to the lush tea plantations of Nuwara Eliya. What type of destination interests you most?",
  weather: "Sri Lanka has a tropical climate with two monsoon seasons. The best time to visit depends on your destination - the west and south coasts are ideal from December to March, while the east coast is perfect from April to September.",
  culture: "Sri Lankan culture is a beautiful blend of Sinhalese, Tamil, Muslim, and Burgher traditions. Don't miss trying authentic rice and curry, visiting ancient temples, and experiencing traditional dance performances.",
  transport: "Getting around Sri Lanka is an adventure itself! Consider the scenic train journey to Ella, tuk-tuk rides for short distances, or hiring a driver for longer trips. Each mode offers a unique perspective of the island.",
  safety: "Sri Lanka is generally very safe for tourists. The locals are incredibly welcoming and helpful. Always respect religious sites by dressing modestly, and be mindful of wildlife in national parks.",
  budget: "Sri Lanka offers great value for travelers! Budget accommodations start from $10-20 per night, while luxury resorts can be $100-300+. Local food is very affordable, and entrance fees to attractions are reasonable.",
  default: "I'd love to help you discover Sri Lanka's wonders! You can ask me about destinations, weather, culture, transport, accommodation, or any other travel-related questions about the Pearl of the Indian Ocean."
} as const;
