/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Rss,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MapPin,
  Globe,
  Shield,
  Truck,
  RefreshCw,
  Headphones,
  ArrowUp,
  MessageCircle,
  Download,
  Award,
  Languages,
  DollarSign,
  Leaf,
  Heart,
  Sparkles,
  Zap,
  Star,
  Coffee,
  Sun,
  Moon,
  Send,
  CheckCircle,
  AlertCircle,
  Copy,
  ExternalLink,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [openSection, setOpenSection] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDark);
  }, []);

  const footerLinks = [
    {
      title: "Company",
      icon: <Sparkles size={16} />,
      links: [
        { text: "Home", href: "/", icon: <Leaf size={14} /> },
        { text: "About Us", icon: <Heart size={14} /> },
        { text: "Contact", icon: <Mail size={14} /> },
        { text: "Careers", icon: <Zap size={14} /> },
        { text: "Blog", icon: <Coffee size={14} /> },
      ],
    },
    {
      title: "Services",
      icon: <Star size={16} />,
      links: [
        { text: "Plant Care" },
        { text: "Interior Design" },
        { text: "Corporate Gifting" },
        { text: "Workshops" },
        { text: "Consultation" },
      ],
    },
    {
      title: "Account",
      icon: <Shield size={16} />,
      links: [
        { text: "My Profile" },
        { text: "Order History" },
        { text: "Wishlist" },
        { text: "Addresses" },
        { text: "Support" },
      ],
    },
    {
      title: "Learn",
      icon: <Globe size={16} />,
      links: [
        { text: "Plant Guide" },
        { text: "Care Tips" },
        { text: "Sustainability" },
        { text: "FAQ" },
        { text: "Video Tutorials" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com",
      label: "Facebook",
      color: "bg-blue-600",
    },
    {
      icon: Twitter,
      href: "https://twitter.com",
      label: "Twitter",
      color: "bg-sky-500",
    },
    {
      icon: Instagram,
      href: "https://instagram.com",
      label: "Instagram",
      color: "bg-pink-600",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com",
      label: "LinkedIn",
      color: "bg-blue-800",
    },
    {
      icon: Youtube,
      href: "https://youtube.com",
      label: "YouTube",
      color: "bg-red-600",
    },
  ];

  const quickInfo = [
    {
      icon: Phone,
      text: "+880 123 456 789",
      label: "Call Us",
      href: "tel:+880123456789",
    },
    {
      icon: Mail,
      text: "hello@greennest.com",
      label: "Email Us",
      href: "mailto:hello@greennest.com",
    },
    {
      icon: MapPin,
      text: "Dhaka, Bangladesh",
      label: "Visit Us",
      href: "https://maps.google.com",
    },
  ];

  const certifications = [
    { icon: Shield, text: "100% Organic" },
    { icon: Award, text: "Eco Certified" },
    { icon: Truck, text: "Free Delivery" },
    { icon: RefreshCw, text: "Easy Returns" },
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email!", { icon: <AlertCircle /> });
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success(`Welcome to GreenNest, ${email.split("@")[0]}!`, {
      icon: <CheckCircle className="text-green-500" />,
      duration: 4000,
    });
    setEmail("");
    setIsSubmitting(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!", { icon: <Copy size={16} /> });
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{ className: "font-medium" }}
      />

      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-green-500 to-emerald-600 text-white p-3 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all"
            aria-label="Back to top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-20 right-6 z-50 bg-gradient-to-br from-teal-500 to-cyan-600 text-white p-3 rounded-full shadow-2xl hover:shadow-teal-500/50 transition-all"
        aria-label="Live Chat"
      >
        <MessageCircle size={24} />
      </motion.button>

      <footer
        className={`bg-gradient-to-b from-[#0f172a] via-[#1a1c2e] to-[#24263b] text-white pt-16 pb-8 ${
          darkMode ? "dark" : ""
        }`}
        id="footer"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4 rounded-2xl mb-12 text-center shadow-lg"
          >
            <p className="text-sm font-bold">
              Limited Time: Get <span className="text-yellow-300">20% OFF</span>{" "}
              on First Order! Use Code:{" "}
              <span className="font-mono bg-black/30 px-2 py-1 rounded">
                SDEP
              </span>
            </p>
          </motion.div>

          <div className="pb-10 border-b border-[#3c3e59] flex flex-col lg:flex-row justify-between items-start gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-14 h-14 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl"
              >
                SD
              </motion.div>
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  Social Development
                </h1>
                <p className="text-xs text-green-300">Your Indoor Oasis</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex flex-wrap gap-3"
            >
              {socialLinks.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative w-12 h-12 flex items-center justify-center rounded-full ${item.color} transition-all hover:scale-110 hover:rotate-12 shadow-xl`}
                    aria-label={item.label}
                    whileHover={{ y: -4 }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {item.label}
                    </span>
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 py-12">
            {footerLinks.map((column, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="col-span-1"
              >
                <div className="md:hidden">
                  <button
                    onClick={() => setOpenSection(openSection === i ? null : i)}
                    className="flex justify-between items-center w-full text-left font-bold text-green-400 pb-2 border-b border-gray-700"
                  >
                    <span className="flex items-center gap-2">
                      {column.icon} {column.title}
                    </span>
                    {openSection === i ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>
                  <AnimatePresence>
                    {openSection === i && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-3"
                      >
                        {column.links.map((link, j) => (
                          <motion.li
                            key={j}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.05 }}
                          >
                            <a
                              href={link.href}
                              className="flex items-center gap-2 py-2 text-sm text-gray-300 hover:text-green-400 transition-all"
                            >
                              {link.icon && <span>{link.icon}</span>}
                              {link.text}
                            </a>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>

                <div className="hidden md:block">
                  <h4 className="text-lg font-bold text-green-400 border-b-2 border-green-500 pb-1 mb-4 inline-block flex items-center gap-2">
                    {column.icon} {column.title}
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {column.links.map((link, j) => (
                      <motion.li
                        key={j}
                        whileHover={{ x: 8 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <a
                          href={link.href}
                          className="text-gray-300 hover:text-green-400 transition-all duration-300 flex items-center gap-2 group"
                        >
                          <span className="inline-block w-0 group-hover:w-3 transition-all duration-300 text-green-400">
                            →
                          </span>
                          {link.icon && (
                            <span className="text-green-500">{link.icon}</span>
                          )}
                          {link.text}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="col-span-2 lg:col-span-2"
            >
              <h4 className="text-lg font-bold text-green-400 border-b-2 border-green-500 pb-1 mb-4 inline-block">
                SDEP
              </h4>
              <p className="text-sm text-gray-400 mb-4">
                Get exclusive plant care tips, new arrivals, and{" "}
                <strong className="text-green-300">10% off</strong> your first
                order!
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative group">
                  <Mail className="absolute left-3 top-3.5 text-gray-500 w-5 h-5 group-focus-within:text-green-400 transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gradient-to-r from-[#2d2f45] to-[#3c3e59] border border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all"
                    aria-label="Email for newsletter"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-500 via-emerald-600 to-teal-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-green-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <motion.div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Subscribing...
                    </motion.div>
                  ) : (
                    <>
                      <span>Join the SDEP</span>
                      <Send size={18} />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="flex flex-wrap gap-3 mt-6">
                {certifications.map((cert, i) => {
                  const Icon = cert.icon;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-2 text-xs text-gray-300 bg-gradient-to-r from-gray-800 to-gray-900 px-3 py-1.5 rounded-full border border-gray-700"
                    >
                      <Icon size={14} className="text-green-400" />
                      <span>{cert.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-[#3c3e59]"
          >
            {quickInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={i}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    info.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="flex items-center gap-3 text-sm group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="text-green-400" size={18} />
                  </div>
                  <div>
                    <p className="text-gray-400">{info.label}</p>
                    <p className="text-white font-medium group-hover:text-green-400 transition-colors">
                      {info.text}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>

          <div className="border-t border-[#3c3e59] pt-6 flex flex-col lg:flex-row justify-between items-center text-xs text-gray-400 gap-4">
            <p className="text-center lg:text-left">
              © {currentYear}{" "}
              <span className="text-green-400 font-bold">SDEP</span>. All rights
              reserved.
              <br className="lg:hidden" />
              <span className="hidden lg:inline"> • </span>
              Made with <span className="text-red-500">♥</span> for SDEP lovers
              by <em className="text-green-400 font-medium">Tufayel</em>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Privacy Policy",
                "Terms & Conditions",
                "Shipping Info",
                "Returns",
                "Accessibility",
              ].map((item) => (
                <a
                  key={item}
                  href={`/${item
                    .toLowerCase()
                    .replace(/ & /g, "-")
                    .replace(/\s+/g, "-")}`}
                  className="hover:text-green-400 transition-colors flex items-center gap-1"
                >
                  {item}
                  <ExternalLink
                    size={10}
                    className="opacity-0 group-hover:opacity-100"
                  />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-xs hover:text-green-400 transition-colors">
                <Languages size={14} />
                <span>EN</span>
              </button>
              <button className="flex items-center gap-1 text-xs hover:text-green-400 transition-colors">
                <DollarSign size={14} />
                <span>USD</span>
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mt-10 text-green-400 font-medium italic text-lg"
          >
            "Your Indoor Oasis. Shop, Care, Thrive."
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
