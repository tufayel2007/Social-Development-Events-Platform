/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

import FullPageLoader from "../UpcomingEvents/FullPageLoader";
import EventFilters from "./EventFilters";
import EventGrid from "./EventGrid";
import { useEvents } from "../UpcomingEvents/useEvents";

const UpcomingEvents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  const debouncedSearch = useMemo(() => {
    let timeout;
    return (value) => {
      clearTimeout(timeout);
      setCurrentPage(1);
      timeout = setTimeout(() => setSearchTerm(value), 400);
    };
  }, []);

  const { allEvents, loading, initialLoad, totalPages, getPaginatedEvents } =
    useEvents(searchTerm, selectedType);
  const paginatedEvents = getPaginatedEvents(currentPage);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleTypeChange = (value) => {
    setSelectedType(value);
    setCurrentPage(1);
  };

  return (
    <>
      <AnimatePresence>{initialLoad && <FullPageLoader />}</AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900 py-16 px-4">
        <Toaster position="top-right" />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              আসন্ন সামাজিক ইভেন্টসমূহ
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              একসাথে মিলে সমাজের জন্য কিছু করি।
            </p>
          </motion.div>

          <EventFilters
            searchTerm={searchTerm}
            setSearchTerm={debouncedSearch}
            selectedType={selectedType}
            setSelectedType={handleTypeChange}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          <EventGrid
            events={paginatedEvents}
            loading={loading && !initialLoad}
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default UpcomingEvents;
