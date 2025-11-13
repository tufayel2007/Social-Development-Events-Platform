/* eslint-disable no-unused-vars */
// src/pages/UpcomingEvents/components/FullPageLoader.jsx
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const FullPageLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-base-100/90 backdrop-blur-sm"
    >
      <div className="text-center">
        {/* Rotating Icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto bg-primary rounded-full flex items-center justify-center shadow-2xl">
            <Sparkles className="w-12 h-12 text-primary-content animate-pulse" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-primary"
        >
          ইভেন্ট লোড হচ্ছে...
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-base-content/70 mt-4"
        >
          একটু অপেক্ষা করুন
        </motion.p>
      </div>
    </motion.div>
  );
};

export default FullPageLoader;
