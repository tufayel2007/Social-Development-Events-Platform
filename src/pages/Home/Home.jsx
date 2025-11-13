/* eslint-disable no-unused-vars */
/* src/components/home/Home.jsx */
import React, { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import HeroSection from "../HeroSection";
import StatsSection from "../StatsSection";
import FeaturesSection from "../FeaturesSection";
import GallerySection from "../GallerySection";
import TestimonialSection from "../TestimonialSection";
import FAQSection from "../FAQSection";
import NewsletterSection from "../NewsletterSection";
const Home = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const eventDate = new Date("2025-11-29T10:00:00");
    const timer = setInterval(() => {
      const now = new Date();
      const diff = eventDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-base-200">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Sections */}
      <HeroSection timeLeft={timeLeft} scrollYProgress={scrollYProgress} />
      <StatsSection />
      <FeaturesSection />
      <GallerySection />
      <TestimonialSection />
      <FAQSection />
      <NewsletterSection />
      {/* Marquee Animation (global for Hero ticker) */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Home;
