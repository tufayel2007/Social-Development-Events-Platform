/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import { MapPin, Calendar, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { auth, onAuthStateChanged } from "../firebase/FirebaseConfig"; // onAuthStateChanged যোগ করা হয়েছে

// ProtectedEventLink কম্পোনেন্ট যা Auth স্ট্যাটাস চেক করবে
const ProtectedEventLink = ({ eventId, children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined); // undefined দিয়ে শুরু করুন

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (user === undefined) return; // Auth স্টেট চেক না হওয়া পর্যন্ত অপেক্ষা করুন

    if (!user) {
      toast.error("ইভেন্ট দেখতে লগইন করুন!", { icon: "🔒" });
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

const EventCardUpcaming = React.memo(({ event, index }) => {
  if (!event) {
    console.warn("Event is missing:", event);
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }} // Exit animation যোগ করা হয়েছে
      whileHover={{ y: -12, scale: 1.04 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

      <div className="relative">
        {event.thumbnail ? (
          <img
            src={event.thumbnail}
            alt={event.title || "ইভেন্ট"}
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
        ) : (
          <div className="h-64 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900 rounded-t-3xl flex items-center justify-center">
            <Sparkles className="w-16 h-16 text-emerald-500 dark:text-emerald-400 animate-pulse" />
          </div>
        )}

        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1.5 bg-white/95 dark:bg-black/90 backdrop-blur-md text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            {event.eventType || "ইভেন্ট"}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-3 relative z-20">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {event.title || "শিরোনাম নেই"}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 leading-relaxed">
          {event.description || "বিবরণ নেই"}
        </p>

        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{event.location || "স্থান নেই"}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>
              {event.eventDate
                ? format(new Date(event.eventDate), "dd MMMM, yyyy", {
                    locale: bn,
                  })
                : "তারিখ নেই"}
            </span>
          </div>
        </div>

        <ProtectedEventLink eventId={event._id}>
          <div className="mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 rounded-2xl font-bold text-center hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-1.5 text-sm">
            বিস্তারিত
            <svg
              className="w-4 h-4"
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

export default EventCardUpcaming;
