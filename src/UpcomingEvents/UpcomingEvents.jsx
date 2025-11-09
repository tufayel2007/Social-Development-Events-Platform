// src/pages/UpcomingEvents.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import { toast, Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import QRCode from "qrcode";
import { useInView } from "react-intersection-observer";

const eventTypes = [
  { value: "", label: "সব ধরন" },
  { value: "Education", label: "শিক্ষা" },
  { value: "Cleanup", label: "পরিচ্ছন্নতা" },
  { value: "Plantation", label: "গাছ লাগানো" },
  { value: "Donation", label: "দান সংগ্রহ" },
];

// Event Card
const EventCard = React.memo(({ event, index }) => {
  const [qrCode, setQrCode] = useState("");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const eventUrl = `${window.location.origin}/event/${event._id}`;

  useEffect(() => {
    if (inView) {
      QRCode.toDataURL(eventUrl, { width: 200 }).then(setQrCode);
    }
  }, [inView, eventUrl]);

  const copyLink = () => {
    navigator.clipboard.writeText(eventUrl);
    toast.success("লিংক কপি হয়েছে!");
  };

  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        event.title + " - " + eventUrl
      )}`
    );
  };

  const daysLeft = Math.ceil(
    (new Date(event.eventDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative">
        <img
          src={event.thumbnail1 || "https://i.imgur.com/6b4Xb.jpg"}
          alt={event.title}
          loading="lazy"
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={copyLink}
            className="p-2 bg-white/90 rounded-full shadow"
            aria-label="Copy"
          >
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
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
          <button
            onClick={shareWhatsApp}
            className="p-2 bg-white/90 rounded-full shadow"
            aria-label="WhatsApp"
          >
            <svg className="w-5 h-5" fill="#25D366" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 5.44h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.261c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.125" />
            </svg>
          </button>
        </div>
        {daysLeft > 0 && daysLeft <= 3 && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
            {daysLeft} দিন বাকি
          </span>
        )}
      </div>

      <div className="p-6 space-y-3">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold text-green-700 dark:text-green-400 line-clamp-1">
            {event.title}
          </h3>
          <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded-full text-xs">
            {event.eventType}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {event.location}
          </p>
          <p className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h.01a1 1 0 100-2H6zm2 0a1 1 0 000 2h.01a1 1 0 100-2H8zm2 0a1 1 0 000 2h.01a1 1 0 100-2H10zm2 0a1 1 0 000 2h.01a1 1 0 100-2H12z"
                clipRule="evenodd"
              />
            </svg>
            {format(new Date(event.eventDate), "dd MMMM, yyyy", { locale: bn })}
          </p>
          <p className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {event.participants?.length || 0} জন
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/event/${event._id}`}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl text-center font-bold text-sm hover:from-green-700 hover:to-emerald-700 transition"
          >
            বিস্তারিত
          </Link>
          <button
            onClick={() =>
              document.getElementById(`qr-${event._id}`).showModal()
            }
            className="px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm5 0a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H9a1 1 0 01-1-1V4zm5 0a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4zM3 11a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm5 0a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H9a1 1 0 01-1-1v-3zm5 0a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <dialog id={`qr-${event._id}`} className="modal">
          <div className="modal-box p-8 **bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100**">
            <h3 className="font-bold text-lg mb-4">QR কোড</h3>
            {qrCode ? (
              <img src={qrCode} alt="QR" className="mx-auto" />
            ) : (
              <div className="w-48 h-48 mx-auto bg-gray-200 animate-pulse rounded"></div>
            )}
            <p className="text-center mt-4 text-sm">স্ক্যান করে যোগ দিন</p>
            <form method="dialog" className="modal-backdrop">
              <button className="btn btn-primary mt-4">বন্ধ</button>
            </form>
          </div>
        </dialog>
      </div>
    </motion.div>
  );
});

// Skeleton
const SkeletonCard = () => (
  <div className="bg-white/80 dark:bg-gray-800/90 rounded-3xl shadow-xl animate-pulse">
    <div className="h-56 bg-gray-300 dark:bg-gray-700"></div>
    <div className="p-6 space-y-4">
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
      <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
  </div>
);

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {}, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedType]);

  // Fetch (লজিক একই)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const query = new URLSearchParams({
          search: searchTerm,
          type: selectedType,
        }).toString();
        const res = await fetch(`/api/events/upcoming?${query}`);
        const data = await res.json();

        if (res.ok) {
          setEvents(data);
          setFilteredEvents(data);
        } else {
          toast.error("ইভেন্ট লোড হয়নি");
        }
      } catch (err) {
        toast.error("সার্ভার সমস্যা");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [searchTerm, selectedType]);

  // Client Filter (একই)
  useEffect(() => {
    let filtered = events;
    if (searchTerm)
      filtered = filtered.filter((e) =>
        e.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    if (selectedType)
      filtered = filtered.filter((e) => e.eventType === selectedType);
    setFilteredEvents(filtered);
  }, [events, searchTerm, selectedType]);

  // Dark Mode
  useEffect(() => {
    // এখানে window.matchMedia ব্যবহার করে সিস্টেম প্রিফারেন্সও চেক করা যেতে পারে
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-900 dark:to-teal-900 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl px-4">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900 py-16 px-4 transition-colors`}
    >
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold text-center text-green-700 dark:text-green-400 mb-12"
        >
          আসন্ন সামাজিক ইভেন্ট
        </motion.h1>

        {/* Controls */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            {/* ১. সার্চ ইনপুট (পরিবর্তন করা হলো) */}
            <input
              type="text"
              placeholder="খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-96 px-6 py-4 text-lg border-2 rounded-2xl focus:border-green-500 outline-none transition-all **text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400**"
            />
            {/* ২. সিলেক্ট ফিল্ড (পরিবর্তন করা হলো) */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full md:w-64 px-6 py-4 text-lg border-2 rounded-2xl focus:border-green-500 outline-none **text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600**"
            >
              {eventTypes.map((t) => (
                <option
                  key={t.value}
                  value={t.value}
                  className="**dark:bg-gray-700**"
                >
                  {t.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 bg-gray-200 dark:bg-gray-700 **text-gray-800 dark:text-gray-200** rounded-xl"
            >
              {darkMode ? "Light" : "Dark"}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {eventTypes.slice(1).map((type) => (
              <button
                key={type.value}
                onClick={() =>
                  setSelectedType(selectedType === type.value ? "" : type.value)
                }
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedType === type.value
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 hover:bg-green-100 **text-gray-800 dark:text-gray-200**"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Events */}
        <AnimatePresence>
          {filteredEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24"
            >
              <p className="text-3xl font-bold text-gray-600 dark:text-gray-400">
                কোনো ইভেন্ট নেই
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, i) => (
                <EventCard key={event._id} event={event} index={i} />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 p-4 bg-green-600 text-white rounded-full shadow-2xl z-50"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
};

export default UpcomingEvents;
