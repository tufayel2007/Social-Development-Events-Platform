/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

import EventCardUpcaming from "./EventCardUpcaming";
import ShimmerLoader from "./ShimmerLoader";

// Pagination Component
const Pagination = ({ currentPage, totalPages, goToPage }) => {
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) pages.push(i);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center items-center gap-2 mt-12"
    >
      {/* Prev Button */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`btn btn-circle btn-sm ${
          currentPage === 1 ? "btn-disabled" : "btn-ghost"
        }`}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`btn btn-sm ${
            page === currentPage ? "btn-primary" : "btn-ghost"
          }`}
        >
          {page.toLocaleString("bn-BD")}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`btn btn-circle btn-sm ${
          currentPage === totalPages ? "btn-disabled" : "btn-ghost"
        }`}
      >
        <ChevronRight size={20} />
      </button>
    </motion.div>
  );
};

// Main EventGrid Component
const EventGrid = ({ events, loading, currentPage, totalPages, goToPage }) => {
  // Loading State
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <ShimmerLoader key={i} />
        ))}
      </div>
    );
  }

  // Empty State
  if (events.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-32"
      >
        <div className="bg-base-300 border-2 border-dashed rounded-3xl w-48 h-48 mx-auto mb-8 flex items-center justify-center">
          <Search className="w-20 h-20 text-base-content/40" />
        </div>
        <p className="text-3xl font-bold text-base-content">
          কোনো ইভেন্ট পাওয়া যায়নি
        </p>
      </motion.div>
    );
  }

  // Success State
  return (
    <>
      <motion.div
        key={currentPage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="wait">
          {events.map((event, i) => (
            <EventCardUpcaming key={event._id} event={event} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Pagination */}
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
