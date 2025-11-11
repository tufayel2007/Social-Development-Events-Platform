/* eslint-disable no-unused-vars */
/* src/components/home/HeroSection.jsx */
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, Zap, Users, Leaf } from "lucide-react";
import bannerImg from "../assets/bannerImg.png";

const HeroSection = ({ timeLeft, scrollYProgress }) => {
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ scale: scaleProgress, opacity: opacityProgress }}
        className="absolute inset-0"
      >
        <img
          src={bannerImg}
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 text-emerald-400 opacity-20"
      >
        <Leaf className="w-16 h-16" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 right-12 text-teal-400 opacity-20"
      >
        <Users className="w-20 h-20" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-tight">
            একসাথে গড়ি{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              সুন্দর সমাজ
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 font-light max-w-3xl mx-auto leading-relaxed">
            পরিবেশ, শিক্ষা, স্বাস্থ্য — সবই এক ক্লিকে। আজই যোগ দিন!
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <Link
            to="/CreateEvent"
            className="group px-10 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 backdrop-blur-sm"
          >
            <Zap className="w-6 h-6 group-hover:animate-pulse" />
            আজই শুরু করুন
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </Link>
          <Link
            to="/upcomingEvents"
            className="px-10 py-5 bg-white/10 backdrop-blur-md text-white font-bold text-lg rounded-full border-2 border-white/30 hover:bg-white hover:text-emerald-700 transition-all duration-300"
          >
            আরও জানুন
          </Link>
        </motion.div>
      </div>

      {/* Live Ticker + Countdown */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-0 w-full bg-black/80 backdrop-blur-lg py-5 border-t border-white/10"
      >
        <div className="flex flex-col md:flex-row justify-between items-center px-6 text-emerald-300">
          <div className="flex-1 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap">
              <span className="mx-6 inline-flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                ধানমন্ডিতে পরিচ্ছন্নতা অভিযান শুরু
              </span>
              <span className="mx-6 inline-flex items-center gap-2">
                <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
                ৫০+ গাছ লাগানো হয়েছে
              </span>
              <span className="mx-6 inline-flex items-center gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
                রক্তদান ক্যাম্প: ২৯ নভেম্বর
              </span>
            </div>
          </div>
          <div className="mt-3 md:mt-0 text-center md:text-right">
            <p className="text-xs text-emerald-200 uppercase tracking-wider">
              আগামী ইভেন্ট
            </p>
            <p className="text-2xl font-bold text-white font-mono">
              {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m :{" "}
              {timeLeft.seconds}s
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
