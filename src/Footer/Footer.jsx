// Footer.jsx
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
import FooterTop from "./FooterTop";
import FooterMiddle from "./FooterMiddle";
import FooterBottom from "./FooterBottom";

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

    const handleScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const footerLinks = [
    {
      title: "Company",
      icon: <Sparkles size={16} />,
      links: [
        { text: "Home", href: "/", icon: <Leaf size={14} /> },
        { text: "About Us", href: "/about", icon: <Heart size={14} /> },
        { text: "Contact", href: "/contact", icon: <Mail size={14} /> },
        { text: "Careers", href: "/careers", icon: <Zap size={14} /> },
        { text: "Blog", href: "/blog", icon: <Coffee size={14} /> },
      ],
    },
    {
      title: "Services",
      icon: <Star size={16} />,
      links: [
        { text: "Plant Care", href: "/services/plant-care" },
        { text: "Interior Design", href: "/services/interior-design" },
        { text: "Corporate Gifting", href: "/services/gifting" },
        { text: "Workshops", href: "/services/workshops" },
        { text: "Consultation", href: "/services/consultation" },
      ],
    },
    {
      title: "Account",
      icon: <Shield size={16} />,
      links: [
        { text: "My Profile", href: "/account/profile" },
        { text: "Order History", href: "/account/orders" },
        { text: "Wishlist", href: "/account/wishlist" },
        { text: "Addresses", href: "/account/addresses" },
        { text: "Support", href: "/support" },
      ],
    },
    {
      title: "Learn",
      icon: <Globe size={16} />,
      links: [
        { text: "Plant Guide", href: "/learn/guide" },
        { text: "Care Tips", href: "/learn/tips" },
        { text: "Sustainability", href: "/learn/sustainability" },
        { text: "FAQ", href: "/faq" },
        { text: "Video Tutorials", href: "/learn/videos" },
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
            viewport={{ once: true, amount: 0.5 }}
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

          {/* FooterTop রেন্ডার */}
          <FooterTop
            email={email}
            setEmail={setEmail}
            handleSubscribe={handleSubscribe}
            isSubmitting={isSubmitting}
            socialLinks={socialLinks}
            certifications={certifications}
          />

          {/* FooterMiddle রেন্ডার */}
          <FooterMiddle
            footerLinks={footerLinks}
            openSection={openSection}
            setOpenSection={setOpenSection}
            quickInfo={quickInfo}
          />

          {/* FooterBottom রেন্ডার */}
          <FooterBottom currentYear={currentYear} />
        </div>
      </footer>
    </>
  );
};

export default Footer;
