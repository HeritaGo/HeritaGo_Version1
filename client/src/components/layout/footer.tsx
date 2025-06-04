import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Footer() {
  const footerSections = [
    {
      title: "Destinations",
      links: [
        { name: "Sigiriya Rock", href: "/destinations/sigiriya" },
        { name: "Galle Fort", href: "/destinations/galle" },
        { name: "Ella Nine Arch", href: "/destinations/ella" },
        { name: "Yala National Park", href: "/destinations/yala" },
        { name: "Kandy Temple", href: "/destinations/kandy" },
      ]
    },
    {
      title: "Services",
      links: [
        { name: "AI Travel Planner", href: "/planner" },
        { name: "Hotel Booking", href: "/hotels" },
        { name: "Gear Rental", href: "/gear-hub" },
        { name: "Local Guides", href: "/guides" },
        { name: "Emergency Alerts", href: "/alerts" },
      ]
    },
    {
      title: "Community",
      links: [
        { name: "Travel Forum", href: "/community" },
        { name: "Photo Sharing", href: "/gallery" },
        { name: "Travel Groups", href: "/groups" },
        { name: "Reviews", href: "/reviews" },
        { name: "Blog", href: "/blog" },
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "Contact Us", href: "/contact" },
        { name: "Safety Guidelines", href: "/safety" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "fab fa-facebook", href: "#", color: "hover:text-blue-500" },
    { name: "Instagram", icon: "fab fa-instagram", href: "#", color: "hover:text-pink-500" },
    { name: "Twitter", icon: "fab fa-twitter", href: "#", color: "hover:text-blue-400" },
    { name: "YouTube", icon: "fab fa-youtube", href: "#", color: "hover:text-red-500" },
    { name: "TikTok", icon: "fab fa-tiktok", href: "#", color: "hover:text-gray-800" },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <i className="fas fa-mountain text-white text-xl"></i>
                  </div>
                  <span className="text-2xl font-bold font-display">HeritaGo</span>
                </div>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Discover Sri Lanka like never before with AI-powered travel planning, 
                  local expertise, and unforgettable adventures across the Pearl of the Indian Ocean.
                </p>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      className={`w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 transition-all duration-200 ${social.color}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <i className={`${social.icon} text-lg`}></i>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-6 font-display">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href}>
                        <motion.span 
                          className="text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer"
                          whileHover={{ x: 5 }}
                        >
                          {link.name}
                        </motion.span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-8 border-t border-slate-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-slate-400">Get the latest travel tips and destination updates from Sri Lanka.</p>
            </div>
            <div className="flex space-x-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <motion.button
                className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-slate-400">
              <span>© 2025 HeritaGo. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center">
                <span className="mr-2">🇱🇰</span>
                Made with ❤️ for Sri Lanka
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 text-slate-400">
                <i className="fas fa-shield-alt text-green-500"></i>
                <span>Sri Lanka Tourism Board Certified</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <i className="fas fa-headset text-teal-500"></i>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-4 border-t border-slate-800"
        >
          <div className="text-center">
            <p className="text-sm text-slate-400 mb-2">
              <i className="fas fa-exclamation-triangle text-red-500 mr-2"></i>
              Emergency Contacts in Sri Lanka
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
              <span>Police: 119</span>
              <span>Fire: 110</span>
              <span>Ambulance: 108</span>
              <span>Tourist Hotline: 1912</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
