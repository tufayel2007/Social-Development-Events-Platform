/* eslint-disable no-unused-vars */
// src/pages/UpcomingEvents/components/FullPageLoader.jsx
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const FullPageLoader = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900"
  >
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="mb-8"
      >
        <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
          <Sparkles className="w-12 h-12 text-white animate-pulse" />
        </div>
      </motion.div>
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold text-green-700 dark:text-green-400"
      >
        ইভেন্ট লোড হচ্ছে...
      </motion.h2>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-600 dark:text-gray-300 mt-4"
      >
        একটু অপেক্ষা করুন
      </motion.p>
    </div>
  </motion.div>
);

export default FullPageLoader;
