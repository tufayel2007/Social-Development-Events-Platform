/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import { toast, Toaster } from "react-hot-toast";
import {
  Search,
  Filter,
  X,
  Moon,
  Sun,
  Calendar,
  MapPin,
  Sparkles,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { auth, onAuthStateChanged } from "../firebase/FirebaseConfig";

const eventTypes = [
  { value: "", label: "সব ধরন" },
  { value: "Education", label: "শিক্ষা" },
  { value: "Cleanup", label: "পরিচ্ছন্নতা" },
  { value: "Plantation", label: "গাছ লাগানো" },
  { value: "Donation", label: "দান সংগ্রহ" },
];
const API_URL = "https://social-development-events-platform-brown.vercel.app";
const EVENTS_PER_PAGE = 6;

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

const ShimmerLoader = () => (
  <div className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-gray-800/90 shadow-xl border border-gray-200 dark:border-gray-700">
    <div className="h-64 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 animate-shimmer"></div>
    <div className="p-6 space-y-4">
      <div className="flex justify-between">
        <div className="h-7 w-48 bg-gray-200 dark:bg-gray-700 rounded-full animate-shimmer"></div>
        <div className="h-7 w-20 bg-emerald-200 dark:bg-emerald-800 rounded-full animate-shimmer"></div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-shimmer"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-shimmer"></div>
      </div>
      <div className="h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl animate-shimmer"></div>
    </div>
  </div>
);

const ProtectedEventLink = ({ eventId, children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("ইভেন্ট দেখতে লগইন করুন!", {
        icon: "🔒",
        duration: 3000,
        style: { background: "#ef4444", color: "white" },
      });
      navigate("/login");
    } else {
      navigate(`/event/${eventId}`);
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {children}
    </div>
  );
};

const EventCard = React.memo(({ event, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -10, scale: 1.03 }}
      className="group relative bg-white dark:bg-gray-800 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

      <div className="relative">
        <img
          src={`${event.thumbnail}?v=${event._id}`}
          alt={event.title}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          key={event._id}
        />
        <div className="absolute top-4 right-4 z-20">
          <span className="px-4 py-2 bg-white/95 dark:bg-black/90 backdrop-blur-md text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-bold shadow-lg flex items-center gap-1 border border-emerald-200 dark:border-emerald-800">
            <Sparkles className="w-4 h-4" />
            {event.eventType}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-4 relative z-20">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
          {event.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="font-medium">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>
              {format(new Date(event.eventDate), "dd MMMM, yyyy", {
                locale: bn,
              })}
            </span>
          </div>
        </div>

        <ProtectedEventLink eventId={event._id}>
          <div className="block text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2">
            বিস্তারিত দেখুন
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </ProtectedEventLink>
      </div>
    </motion.div>
  );
});

const UpcomingEvents = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const debouncedSearch = useMemo(() => {
    let timeout;
    return (value) => {
      clearTimeout(timeout);

      setCurrentPage(1);
      timeout = setTimeout(() => setSearchTerm(value), 400);
    };
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (searchTerm) query.append("search", searchTerm);
        if (selectedType) query.append("type", selectedType);

        const res = await fetch(`${API_URL}/api/events/upcoming?${query}`);
        const data = await res.json();

        if (res.ok) {
          setAllEvents(data);
          setCurrentPage(1);
        } else {
          toast.error("ইভেন্ট লোড করতে সমস্যা হয়েছে");
        }
      } catch (err) {
        toast.error("সার্ভারের সাথে সংযোগ নেই");
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    fetchEvents();
  }, [searchTerm, selectedType]);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(allEvents.length / EVENTS_PER_PAGE);

  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
    const endIndex = startIndex + EVENTS_PER_PAGE;
    return allEvents.slice(startIndex, endIndex);
  }, [allEvents, currentPage]);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <>
      <AnimatePresence>{initialLoad && <FullPageLoader />}</AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900 py-16 px-4 transition-all duration-500">
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
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              একসাথে মিলে সমাজের জন্য কিছু করি। আজই যোগ দিন!
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 w-6 h-6" />
                  <input
                    type="text"
                    placeholder="ইভেন্টের নাম খুঁজুন..."
                    onChange={(e) => debouncedSearch(e.target.value)}
                    className="w-full pl-14 pr-12 py-5 text-lg rounded-2xl border-2 border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 outline-none transition-all bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => debouncedSearch("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-red-500 transition"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  )}
                </div>

                <div className="relative">
                  <Filter className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 w-6 h-6" />
                  <select
                    value={selectedType}
                    onChange={handleTypeChange}
                    className="pl-14 pr-10 py-5 text-lg rounded-2xl border-2 border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 appearance-none cursor-pointer"
                  >
                    {eventTypes.map((t) => (
                      <option
                        key={t.value}
                        value={t.value}
                        className="bg-white dark:bg-gray-800"
                      >
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-5 bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-purple-600 dark:to-pink-600 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
                >
                  {darkMode ? (
                    <Sun className="w-7 h-7 text-yellow-200" />
                  ) : (
                    <Moon className="w-7 h-7 text-gray-800" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          {loading && !initialLoad ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(EVENTS_PER_PAGE)].map((_, i) => (
                <ShimmerLoader key={i} />
              ))}
            </div>
          ) : allEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-32"
            >
              <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-3xl w-48 h-48 mx-auto mb-8 flex items-center justify-center">
                <Search className="w-20 h-20 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-3xl font-bold text-gray-700 dark:text-gray-300">
                কোনো ইভেন্ট পাওয়া যায়নি
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                নতুন ইভেন্ট তৈরি করুন বা ফিল্টার পরিবর্তন করুন
              </p>
            </motion.div>
          ) : (
            <>
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence mode="wait">
                  {paginatedEvents.map((event, i) => (
                    <EventCard key={event._id} event={event} index={i} />
                  ))}
                </AnimatePresence>
              </motion.div>

              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center items-center space-x-2 mt-16"
                >
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-3 rounded-full transition-all duration-300 ${
                      currentPage === 1
                        ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        : "bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 shadow-md hover:bg-green-100 dark:hover:bg-gray-700 hover:shadow-lg"
                    }`}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPage}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="flex space-x-2"
                    >
                      {renderPageNumbers().map((page) => (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`px-4 py-2 rounded-xl text-lg font-bold transition-all duration-300 shadow-md ${
                            page === currentPage
                              ? "bg-green-600 text-white dark:bg-green-500 dark:text-gray-900 shadow-green-400/50 dark:shadow-green-700/50 transform scale-105"
                              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          {page.toLocaleString("bn-BD")}
                        </button>
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  {/* N-B*/}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-3 rounded-full transition-all duration-300 ${
                      currentPage === totalPages
                        ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        : "bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 shadow-md hover:bg-green-100 dark:hover:bg-gray-700 hover:shadow-lg"
                    }`}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>

      {/*  Animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -468px 0;
          }
          100% {
            background-position: 468px 0;
          }
        }
        .animate-shimmer {
          background: linear-gradient(
            to right,
            transparent 0%,
            #e0e0e0 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  );
};

export default UpcomingEvents;
