/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Search, Filter, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

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
}) => {
  const { mode, toggle } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <div className="bg-base-200/95 backdrop-blur-xl rounded-3xl shadow-2xl p-5 border border-base-300">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          {/* Search Input */}{" "}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 w-5 h-5 pointer-events-none" />
            <input
              type="text"
              placeholder="ইভেন্ট খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-12 pr-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 w-5 h-5 pointer-events-none" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="select select-bordered w-full max-w-xs pl-12 pr-10 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
            >
              {eventTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={toggle}
            className="btn btn-circle btn-primary shadow-lg hover:shadow-xl transition-transform hover:scale-110"
            aria-label="Toggle theme"
          >
            {mode === "dark" ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EventFilters;
