/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

import EventCardUpcaming from "./EventCardUpcaming";
import ShimmerLoader from "./ShimmerLoader";

/**
 Props:
 - events: array
 - loading: boolean
 - currentPage: number
 - totalPages: number
 - goToPage: function(newPage)
 
 Notes:
 - EventCardUpcaming is wrapped with motion.div for stagger.
 - This file is self-contained; tweak durations / styles as you like.
*/

// ---------- Helpers ----------
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/** Build pages array with dots (returns array with numbers and "..." strings) */
function buildPages(current, total, maxVisible) {
  const pages = [];

  // if total small, return all
  if (total <= maxVisible) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }

  const half = Math.floor(maxVisible / 2);
  let start = current - half;
  let end = current + half;

  if (start < 1) {
    start = 1;
    end = maxVisible;
  } else if (end > total) {
    end = total;
    start = total - maxVisible + 1;
  }

  // always include 1 and total; we'll add dots if gap exists
  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push("left-ellipsis");
    else if (start === 2) pages.push(2);
  }

  for (let i = start; i <= end; i++) {
    if (i !== 1 && i !== total) pages.push(i);
  }

  if (end < total) {
    if (end < total - 1) pages.push("right-ellipsis");
    else if (end === total - 1) pages.push(total - 1);
    pages.push(total);
  }

  // remove duplicates & maintain order
  return [...new Set(pages)];
}

// ---------- Motion variants ----------
const gridVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 60 : -60,
  }),
  center: { opacity: 1, x: 0 },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -60 : 60,
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

// ---------- Pagination Component ----------
const Pagination = ({
  currentPage,
  totalPages,
  goToPage,
  maxVisiblePages,
  small, // compact mode
}) => {
  const [clickedRipple, setClickedRipple] = useState(null); // {key, id} to trigger ripple animation
  const pages = buildPages(currentPage, totalPages, maxVisiblePages);

  // ripple trigger: set id and clear after animation
  const triggerRipple = (id) => {
    setClickedRipple(id);
    window.setTimeout(() => setClickedRipple(null), 380);
  };

  return (
    <div className="flex flex-col items-center gap-2 mt-8">
      <div className="flex items-center gap-2">
        {/* Prev */}
        <motion.button
          whileHover={currentPage > 1 ? { x: -4 } : {}}
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            if (currentPage > 1) {
              triggerRipple("prev");
              goToPage(currentPage - 1);
            }
          }}
          disabled={currentPage === 1}
          className={`relative btn btn-circle btn-sm ${
            currentPage === 1 ? "btn-disabled" : "btn-ghost"
          }`}
        >
          <ChevronLeft size={18} />
          {/* ripple element */}
          <AnimatePresence>
            {clickedRipple === "prev" && (
              <motion.span
                initial={{ opacity: 0.4, scale: 0 }}
                animate={{ opacity: 0.12, scale: 8 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.36 }}
                className="absolute inset-0 rounded-full bg-base-content/30 pointer-events-none"
              />
            )}
          </AnimatePresence>
        </motion.button>

        {/* Page items */}
        <AnimatePresence mode="wait">
          {pages.map((p, idx) => {
            if (typeof p === "number") {
              const isActive = p === currentPage;
              return (
                <motion.button
                  key={p}
                  onClick={() => {
                    triggerRipple(p);
                    if (p !== currentPage) goToPage(p);
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.18 }}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.94 }}
                  className={`relative overflow-hidden btn btn-sm ${
                    isActive ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  <span className="relative z-10">
                    {p.toLocaleString("bn-BD")}
                  </span>

                  {/* Animated underline indicator (only for active) */}
                  <motion.span
                    layoutId="pagination-underline"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    className={`absolute left-1/2 transform -translate-x-1/2 -bottom-1 w-0 h-0.5 bg-transparent`}
                    style={
                      isActive ? { width: "60%", background: undefined } : {}
                    }
                    // We'll style actual underline below via a conditional element
                  />

                  {/* Active underline element */}
                  {isActive && (
                    <motion.div
                      layoutId="active-underline"
                      initial={{ width: 0 }}
                      animate={{ width: "60%" }}
                      exit={{ width: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-primary"
                    />
                  )}

                  {/* ripple element */}
                  <AnimatePresence>
                    {clickedRipple === p && (
                      <motion.span
                        initial={{ opacity: 0.45, scale: 0 }}
                        animate={{ opacity: 0.12, scale: 8 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.36 }}
                        className="absolute inset-0 rounded-full bg-base-content/30 pointer-events-none"
                      />
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            }

            // ellipsis
            if (p === "left-ellipsis" || p === "right-ellipsis") {
              const key = `${p}-${idx}`;
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.18 }}
                  className="btn btn-ghost btn-sm cursor-default"
                >
                  ...
                </motion.div>
              );
            }

            return null;
          })}
        </AnimatePresence>

        {/* Next */}
        <motion.button
          whileHover={currentPage < totalPages ? { x: 4 } : {}}
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            if (currentPage < totalPages) {
              triggerRipple("next");
              goToPage(currentPage + 1);
            }
          }}
          disabled={currentPage === totalPages}
          className={`relative btn btn-circle btn-sm ${
            currentPage === totalPages ? "btn-disabled" : "btn-ghost"
          }`}
        >
          <ChevronRight size={18} />
          <AnimatePresence>
            {clickedRipple === "next" && (
              <motion.span
                initial={{ opacity: 0.4, scale: 0 }}
                animate={{ opacity: 0.12, scale: 8 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.36 }}
                className="absolute inset-0 rounded-full bg-base-content/30 pointer-events-none"
              />
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Page X of Y label */}
      <motion.div
        key={`label-${currentPage}`}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18 }}
        className="text-sm text-muted mt-1"
      >
        পৃষ্ঠা:{" "}
        <span className="font-medium">
          {currentPage.toLocaleString("bn-BD")}
        </span>{" "}
        / {totalPages.toLocaleString("bn-BD")}
      </motion.div>
    </div>
  );
};

// ---------- EventGrid (with everything) ----------
const EventGrid = ({ events, loading, currentPage, totalPages, goToPage }) => {
  const gridRef = useRef(null);
  const directionRef = useRef(1); // +1 for next (forward), -1 for prev (back)
  const prevPageRef = useRef(currentPage);
  const [maxVisiblePages, setMaxVisiblePages] = useState(5);

  // detect direction: update directionRef before rendering grid
  useEffect(() => {
    const prev = prevPageRef.current;
    directionRef.current = currentPage > prev ? 1 : currentPage < prev ? -1 : 0;
    prevPageRef.current = currentPage;
  }, [currentPage]);

  // responsive maxVisiblePages based on window width
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      // mobile: 3, tablet: 5, desktop: 7
      if (w < 640) setMaxVisiblePages(3);
      else if (w < 1024) setMaxVisiblePages(5);
      else setMaxVisiblePages(7);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // auto scroll to top of grid on page change
  useEffect(() => {
    if (gridRef.current) {
      // use smooth behaviour and offset a bit
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <ShimmerLoader key={i} />
        ))}
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-28"
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

  return (
    <>
      {/* grid wrapper to scrollIntoView */}
      <div ref={gridRef} />

      <AnimatePresence custom={directionRef.current} mode="wait">
        <motion.div
          key={`page-${currentPage}`} // switching key triggers exit/enter
          custom={directionRef.current}
          variants={gridVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.36, ease: "easeInOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {events.map((event, i) => (
            <motion.div
              key={event._id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{
                duration: 0.36,
                ease: "easeOut",
                delay: i * 0.04, // small stagger
              }}
            >
              {/* wrap card so it receives animations */}
              <EventCardUpcaming event={event} index={i} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={goToPage}
            maxVisiblePages={maxVisiblePages}
          />
        </div>
      )}
    </>
  );
};

export default EventGrid;
