/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Search, Filter, X, Sun, Moon } from "lucide-react";

const eventTypes = [
  { value: "", label: "সব ধরন" },
  { value: "Education", label: "শিক্ষা" },
  { value: "Cleanup", label: "পরিচ্ছন্নতা" },
  { value: "Plantation", label: "গাছ লাগানো" },
  { value: "Donation", label: "দান সংগ্রহ" },
];

const EventFilters = ({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  darkMode,
  setDarkMode,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-10"
    >
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl p-5 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="ইভেন্ট খুঁজুন..."
              // এখানে setSearchTerm ফাংশনটি prop থেকে আসছে (যা Debounced)
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-10 py-4 text-base rounded-2xl border-2 border-gray-300 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-400 outline-none transition-all bg-transparent text-gray-800 dark:text-gray-100"
            />
            {/* আপনার আগের কোডটিতে searchTerm prop ব্যবহার করা হয়নি, তাই X বাটনটি কাজ করছিল না।
                এখানে আমি সহজ করার জন্য value prop টি বাদ দিলাম, কারণ setSearchTerm prop টি debounced.
                যদি আপনি value prop ব্যবহার করতে চান, তবে আপনাকে এটি UpcomingEvents.jsx এ state হিসেবে রাখতে হবে। */}
          </div>

          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="pl-12 pr-10 py-4 text-base rounded-2xl border-2 border-gray-300 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-400 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 appearance-none cursor-pointer"
            >
              {eventTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-4 bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-purple-600 dark:to-pink-600 rounded-2xl shadow-lg hover:shadow-xl transition-transform hover:scale-110"
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-yellow-200" />
            ) : (
              <Moon className="w-6 h-6 text-gray-800" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EventFilters;
