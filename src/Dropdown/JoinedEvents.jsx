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
import EventCardWithAnimation from "../Dropdown/EventCardWithAnimation";
import { FaSearch } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const API_URL = "https://social-development-events-platform-brown.vercel.app";

const JoinedEvents = () => {
  const { mode } = useTheme();
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const user = auth.currentUser;
  const pullRef = useRef(null);
  const [pullY, setPullY] = useState(0);
  const [measureRef, bounds] = useMeasure();

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
      if (!pullRef.current || refreshing || loading || window.scrollY > 0)
        return;
      const touchY = e.touches[0].clientY;
      const pullDistance = touchY - bounds.top;
      if (pullDistance > 0) {
        setPullY(Math.min(pullDistance / 3, 120));
      }
    },
    [refreshing, loading, bounds]
  );

  const handlePullEnd = useCallback(() => {
    if (pullY > 80) fetchJoinedEvents(true);
    setPullY(0);
  }, [pullY, fetchJoinedEvents]);

  const filteredEvents = useMemo(() => {
    return joinedEvents.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        filterCategory === "all" || event.eventType === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [joinedEvents, searchTerm, filterCategory]);

  const categories = useMemo(() => {
    const cats = ["all", ...new Set(joinedEvents.map((e) => e.eventType))];
    return cats;
  }, [joinedEvents]);

  const SkeletonCard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card bg-base-200 shadow-lg animate-pulse"
    >
      <div className="h-48 bg-base-300 rounded-t-xl"></div>
      <div className="card-body p-6 space-y-3">
        <div className="h-6 bg-base-300 rounded w-3/4"></div>
        <div className="h-4 bg-base-300 rounded w-full"></div>
        <div className="h-4 bg-base-300 rounded w-5/6"></div>
      </div>
    </motion.div>
  );

  const EmptyState = () => (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center p-20 card bg-base-200 shadow-2xl"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-6xl mb-4"
      >
        No Events
      </motion.div>
      <p className="text-2xl font-medium text-base-content">
        আপনি এখনো কোনো ইভেন্টে জয়েন করেননি!
      </p>
      <p className="text-lg text-base-content/70 mt-3">
        Upcoming Events থেকে আপনার পছন্দের ইভেন্ট খুঁজে নিন।
      </p>
    </motion.div>
  );

  if (loading && !refreshing) {
    return (
      <div className="min-h-screen bg-base-100 py-16">
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
        className="min-h-screen flex items-center justify-center bg-base-100 p-10"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-6xl mb-4"
          >
            Lock
          </motion.div>
          <h2 className="text-3xl font-bold text-error">এই পেইজটি সুরক্ষিত</h2>
          <p className="mt-4 text-base-content/70">
            আপনার জয়েন করা ইভেন্ট দেখতে অনুগ্রহ করে লগইন করুন।
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      className="min-h-screen bg-base-100 py-16 transition-colors duration-300"
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
            className="fixed top-0 left-0 right-0 bg-primary z-50 flex items-center justify-center overflow-hidden"
          >
            <motion.div
              animate={{ rotate: refreshing ? 360 : 0 }}
              transition={{
                duration: 1,
                repeat: refreshing ? Infinity : 0,
                ease: "linear",
              }}
              className="text-primary-content font-medium"
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
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-primary">
            আপনার জয়েন করা ইভেন্টগুলো
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-10 flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="ইভেন্ট খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-12 pr-4 py-3 text-base"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/50" />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="select select-bordered w-full sm:w-auto"
          >
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
