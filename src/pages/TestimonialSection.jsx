/* eslint-disable no-unused-vars */
/* src/components/home/TestimonialSection.jsx */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

import avatar1 from "../assets/Rahim.png";
import avatar2 from "../assets/Fatema.png";
import avatar3 from "../assets/Kamrool.png";

const testimonials = [
  {
    name: "রহিম আহমেদ",
    role: "স্বেচ্ছাসেবী",
    text: "এই প্ল্যাটফর্ম আমার জীবন বদলে দিয়েছে।",
    avatar: avatar1,
    rating: 5,
  },
  {
    name: "ফাতেমা খাতুন",
    role: "ইভেন্ট অর্গানাইজার",
    text: "এক ক্লিকে ১০০+ মানুষ জয়েন করেছে!",
    avatar: avatar2,
    rating: 5,
  },
  {
    name: "কামরুল ইসলাম",
    role: "সদস্য",
    text: "প্রতি সপ্তাহে নতুন কিছু করার সুযোগ পাই।",
    avatar: avatar3,
    rating: 5,
  },
];

const TestimonialSection = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (inView) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [inView]);

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8
           bg-gradient-to-r from-base-300 to-base-100 text-base-content"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-12"
        >
          তারা কী বলছে
        </motion.h2>

        <div className="relative">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg 
                       p-8 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 
                       max-w-2xl mx-auto"
          >
            <Quote className="w-12 h-12 text-white/30 mx-auto mb-4" />
            <p className="text-lg md:text-xl text-emerald-50 dark:text-emerald-200 italic mb-6">
              "{testimonials[index].text}"
            </p>
            <div className="flex items-center justify-center gap-3">
              <img
                src={testimonials[index].avatar}
                alt={testimonials[index].name}
                className="w-14 h-14 rounded-full ring-4 ring-white/30 dark:ring-gray-600/50"
              />
              <div className="text-left">
                <p className="font-bold text-white dark:text-gray-100">
                  {testimonials[index].name}
                </p>
                <p className="text-sm text-emerald-200 dark:text-emerald-300">
                  {testimonials[index].role}
                </p>
              </div>
            </div>
            <div className="flex justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
          </motion.div>

          {/* Controls */}
          <button
            onClick={() =>
              setIndex(
                (prev) => (prev - 1 + testimonials.length) % testimonials.length
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 dark:bg-gray-700/30 
                       backdrop-blur rounded-full hover:bg-white/30 dark:hover:bg-gray-600/40 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => setIndex((prev) => (prev + 1) % testimonials.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 dark:bg-gray-700/30 
                       backdrop-blur rounded-full hover:bg-white/30 dark:hover:bg-gray-600/40 transition-all"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
