/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import { MapPin, Calendar, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { auth, onAuthStateChanged } from "../firebase/FirebaseConfig";
import { useTheme } from "../context/ThemeContext";

// Protected Link Component
const ProtectedEventLink = ({ eventId, children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (user === undefined) return;

    if (!user) {
      toast.error("ইভেন্ট দেখতে লগইন করুন!", { icon: "Lock" });
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

// Main Card Component
const EventCardUpcaming = React.memo(({ event, index }) => {
  const { mode } = useTheme();

  if (!event) {
    console.warn("Event is missing:", event);
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -12, scale: 1.04 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-500 border border-base-300 group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

      <figure className="relative">
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
          <div className="h-64 bg-gradient-to-br from-primary/20 to-success/20 rounded-t-3xl flex items-center justify-center">
            <Sparkles className="w-16 h-16 text-primary animate-pulse" />
          </div>
        )}

        <div className="absolute top-4 right-4 z-20">
          <div className="badge badge-primary gap-1">
            <Sparkles size={14} />
            {event.eventType || "ইভেন্ট"}
          </div>
        </div>
      </figure>

      <div className="card-body p-5 space-y-3 relative z-20">
        <h3 className="card-title text-base-content line-clamp-2 group-hover:text-primary transition-colors">
          {event.title || "শিরোনাম নেই"}
        </h3>

        <p className="text-base-content/70 text-sm line-clamp-2 leading-relaxed">
          {event.description || "বিবরণ নেই"}
        </p>

        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2 text-base-content/80">
            <MapPin size={16} className="text-primary" />
            <span>{event.location || "স্থান নেই"}</span>
          </div>
          <div className="flex items-center gap-2 text-base-content/80">
            <Calendar size={16} className="text-primary" />
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
          <div className="card-actions mt-4">
            <button className="btn btn-primary w-full gap-2">
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
            </button>
          </div>
        </ProtectedEventLink>
      </div>
    </motion.div>
  );
});

export default EventCardUpcaming;
