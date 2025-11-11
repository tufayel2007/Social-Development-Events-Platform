/* eslint-disable no-unused-vars */

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import useMeasure from "react-use-measure";
import Swal from "sweetalert2";
import { auth } from "../firebase/FirebaseConfig";
import EventCard from "../components/EventCard";
// ইম্পোর্ট করা হলো নতুন কম্পোনেন্টটি
import EventCardWithAnimation from "../Dropdown/EventCardWithAnimation";

// --- React Icons ইম্পোর্ট করা হয়েছে ---
import { FaSearch, FaFilter } from "react-icons/fa";

const API_URL = "https://social-development-events-platform-brown.vercel.app";

// --- আগের SVG আইকন ফাংশনগুলো সরিয়ে দেওয়া হয়েছে ---

const JoinedEvents = () => {
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const user = auth.currentUser;
  const pullRef = useRef(null);
  const [pullY, setPullY] = useState(0);

  const [measureRef, bounds] = useMeasure();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const fetchJoinedEvents = useCallback(
    async (isRefresh = false) => {
      if (!user) return;
      try {
        !isRefresh && setLoading(true);
        isRefresh && setRefreshing(true);

        const userEmail = user.email;
        const res = await fetch(
          `${API_URL}/api/events/joined?email=${userEmail}`
        );
        const data = await res.json();

        if (res.ok) {
          setJoinedEvents(data);
        } else {
          Swal.fire({
            icon: "error",
            title: "ডাটা লোড সমস্যা",
            text: data.error || "জয়েন করা ইভেন্ট লোড করা যায়নি।",
          });
          setJoinedEvents([]);
        }
      } catch (err) {
        console.error("Fetch Joined Events Error:", err);
        Swal.fire({
          icon: "error",
          title: "সার্ভারে সমস্যা",
          text: "ইভেন্টগুলো লোড করতে সমস্যা হচ্ছে।",
        });
        setJoinedEvents([]);
      } finally {
        setLoading(false);
        setRefreshing(false);
        setPullY(0);
      }
    },
    [user]
  );

  useEffect(() => {
    if (user) fetchJoinedEvents();
    else setLoading(false);
  }, [user, fetchJoinedEvents]);

  const handlePull = useCallback(
    (e) => {
      if (!pullRef.current || refreshing || loading) return;
      const touchY = e.touches[0].clientY;
      const pullDistance = touchY - bounds.top;
      if (pullDistance > 0 && window.scrollY === 0) {
        setPullY(Math.min(pullDistance / 3, 120));
      }
    },
    [refreshing, loading, bounds]
  );

  const handlePullEnd = useCallback(() => {
    if (pullY > 80) {
      fetchJoinedEvents(true);
    }
    setPullY(0);
  }, [pullY, fetchJoinedEvents]);

  const filteredEvents = useMemo(() => {
    return joinedEvents.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        filterCategory === "all" || event.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [joinedEvents, searchTerm, filterCategory]);

  const categories = useMemo(() => {
    const cats = ["all", ...new Set(joinedEvents.map((e) => e.category))];
    return cats;
  }, [joinedEvents]);

  const SkeletonCard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-pulse"
    >
      <div className="bg-gray-300 dark:bg-gray-700 h-48 rounded-xl mb-4"></div>
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
    </motion.div>
  );

  const EmptyState = () => (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center p-20 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-6xl mb-4"
      >
        😢
      </motion.div>
      <p className="text-2xl font-medium text-gray-700 dark:text-gray-300">
        আপনি এখনো কোনো ইভেন্টে জয়েন করেননি!
      </p>
      <p className="text-lg text-gray-500 dark:text-gray-400 mt-3">
        Upcoming Events থেকে আপনার পছন্দের ইভেন্ট খুঁজে নিন।
      </p>
    </motion.div>
  );

  if (loading && !refreshing) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-10"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-6xl mb-4"
          >
            🔒
          </motion.div>
          <h2 className="text-3xl font-bold text-red-600 dark:text-red-400">
            এই পেইজটি সুরক্ষিত
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            আপনার জয়েন করা ইভেন্ট দেখতে অনুগ্রহ করে লগইন করুন।
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gray-50 dark:bg-gray-900 py-16 transition-colors duration-300`}
      onTouchMove={handlePull}
      onTouchEnd={handlePullEnd}
      ref={measureRef}
    >
      <AnimatePresence>
        {pullY > 0 && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: pullY }}
            exit={{ height: 0 }}
            className="fixed top-0 left-0 right-0 bg-emerald-500 z-50 flex items-center justify-center overflow-hidden"
          >
            <motion.div
              animate={{ rotate: refreshing ? 360 : 0 }}
              transition={{
                duration: 1,
                repeat: refreshing ? Infinity : 0,
                ease: "linear",
              }}
              className="text-white"
            >
              {refreshing ? "রিফ্রেশ হচ্ছে..." : "আরেকটু টানুন..."}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4"
        >
          <h1 className="text-4xl font-extrabold text-green-700 dark:text-emerald-400 text-center sm:text-left">
            আপনার জয়েন করা ইভেন্টগুলো
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-10 flex flex-col sm:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="ইভেন্ট খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            {/* সার্চ আইকন */}
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500"
          >
            {/* এখানে ফিল্টার আইকনের ব্যবহার নেই, তবে এটি প্রয়োজন হলে ব্যবহার করা যেতে পারে */}
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "সব ক্যাটাগরি" : cat}
              </option>
            ))}
          </select>
        </motion.div>

        <AnimatePresence>
          {filteredEvents.length === 0 ? (
            <EmptyState />
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredEvents.map((event, index) => (
                <EventCardWithAnimation
                  key={event._id}
                  event={event}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JoinedEvents;
