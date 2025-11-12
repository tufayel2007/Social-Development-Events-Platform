/* eslint-disable no-unused-vars */

import { motion, AnimatePresence } from "framer-motion";

import EventCardUpcaming from "./EventCardUpcaming";
import ShimmerLoader from "./ShimmerLoader";

import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, goToPage }) => {
  const pages = [];

  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center items-center gap-2 mt-12"
    >
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2.5 rounded-full transition-all duration-300 ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-white dark:bg-gray-800 text-emerald-600 shadow-md hover:bg-emerald-50 dark:hover:bg-gray-700"
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`px-4 py-2 rounded-xl font-bold transition-all ${
            page === currentPage
              ? "bg-emerald-600 text-white shadow-lg scale-105"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 hover:bg-emerald-50 dark:hover:bg-gray-700"
          }`}
        >
          {page.toLocaleString("bn-BD")}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2.5 rounded-full transition-all duration-300 ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-white dark:bg-gray-800 text-emerald-600 shadow-md hover:bg-emerald-50 dark:hover:bg-gray-700"
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
};

const EventGrid = ({ events, loading, currentPage, totalPages, goToPage }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <ShimmerLoader key={i} />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-32"
      >
        <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed rounded-3xl w-48 h-48 mx-auto mb-8 flex items-center justify-center">
          <Search className="w-20 h-20 text-gray-400 dark:text-gray-500" />
        </div>
        <p className="text-3xl font-bold text-gray-700 dark:text-gray-300">
          কোনো ইভেন্ট পাওয়া যায়নি
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        key={currentPage}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="wait">
          {events.map((event, i) => (
            <EventCardUpcaming key={event._id} event={event} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      )}
    </>
  );
};

export default EventGrid;
