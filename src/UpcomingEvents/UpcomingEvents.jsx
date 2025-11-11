/* eslint-disable no-unused-vars */
// src/pages/UpcomingEvents/UpcomingEvents.jsx
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

// ✅ সব প্রয়োজনীয় কম্পোনেন্ট ইম্পোর্ট করুন
import FullPageLoader from "../UpcomingEvents/FullPageLoader"; // অথবা সঠিক পাথ অনুযায়ী
import EventFilters from "./EventFilters";
import EventGrid from "./EventGrid"; // ✅ সঠিক ইম্পোর্ট
import { useEvents } from "../UpcomingEvents/useEvents"; // ✅ সঠিক ইম্পোর্ট

const UpcomingEvents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  // Debounce logic যাতে টাইপ করার সময় কম API কল হয়
  const debouncedSearch = useMemo(() => {
    let timeout;
    return (value) => {
      clearTimeout(timeout);
      setCurrentPage(1); // সার্চ শুরু হলে প্রথম পেজে চলে যাবে
      timeout = setTimeout(() => setSearchTerm(value), 400);
    };
  }, []);

  // কাস্টম হুক ব্যবহার
  const { allEvents, loading, initialLoad, totalPages, getPaginatedEvents } =
    useEvents(searchTerm, selectedType);
  const paginatedEvents = getPaginatedEvents(currentPage);

  // ডার্ক মোড লজিক
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // যখন ফিল্টার (টাইপ) পরিবর্তন হবে, তখন প্রথম পেজে চলে যাবে
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
            searchTerm={searchTerm} // এখানেsearchTerm state না পাঠিয়ে, debounced function পাঠাচ্ছি
            setSearchTerm={debouncedSearch}
            selectedType={selectedType}
            setSelectedType={handleTypeChange} // নতুন হ্যান্ডলার ব্যবহার
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
