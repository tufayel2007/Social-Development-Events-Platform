/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import {
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  Clock,
  Users,
  Shield,
  Zap,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { auth, onAuthStateChanged } from "../firebase/FirebaseConfig";
import { useTheme } from "../context/ThemeContext";

// --- 3D Tilt Effect Hook ---
const useTilt = (intensity = 15) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-intensity, intensity]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { rotateX, rotateY, handleMouseMove, handleMouseLeave };
};

// --- Protected Link Component (Unchanged Logic) ---
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
      toast.error("ইভেন্ট দেখতে লগইন করুন!", {
        icon: "🔐",
        style: {
          background: "#fef2f2",
          color: "#dc2626",
          borderRadius: "12px",
        },
      });
      navigate("/login");
    } else {
      navigate(`/event/${eventId}`);
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer inline-block w-full">
      {children}
    </div>
  );
};

// --- Main Event Card (WOW + Future-Proof + Mobile Responsive) ---
const EventCardUpcaming = React.memo(({ event, index }) => {
  const { mode } = useTheme();
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt(8);

  // Memoized Date
  const formattedDate = useMemo(() => {
    if (!event?.eventDate) return "তারিখ নেই";
    return format(new Date(event.eventDate), "dd MMMM, yyyy - EEEE", {
      locale: bn,
    });
  }, [event?.eventDate]);

  // Fallback Image
  const handleImageError = (e) => {
    e.target.src = `https://via.placeholder.com/600x400/1e1b4b/94a3b8?text=${encodeURIComponent(
      event.title || "ইভেন্ট"
    )}`;
  };

  if (!event) return null;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative p-2 md:p-3"
    >
      {/* Glassmorphism Card */}
      <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-500 group-hover:border-primary/50">
        {/* Animated Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          animate={{
            background: [
              "conic-gradient(from 0deg at 50% 50%, transparent, #8b5cf6, #3b82f6, #10b981, transparent)",
              "conic-gradient(from 120deg at 50% 50%, transparent, #ec4899, #f59e0b, #8b5cf6, transparent)",
              "conic-gradient(from 240deg at 50% 50%, transparent, #14b8a6, #8b5cf6, #f43f5e, transparent)",
              "conic-gradient(from 360deg at 50% 50%, transparent, #8b5cf6, #3b82f6, #10b981, transparent)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ filter: "blur(1px)", mixBlendMode: "screen" }}
        />

        {/* Thumbnail */}
        <figure className="relative h-56 md:h-64 overflow-hidden rounded-t-3xl">
          {event.thumbnail ? (
            <img
              src={event.thumbnail}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              loading="lazy"
              onError={handleImageError}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-600/30 via-blue-600/30 to-emerald-600/30 backdrop-blur-md">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-24 w-24 text-white/70" />
              </motion.div>
            </div>
          )}

          {/* Floating Badge - Event Type */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-4 right-4 z-10"
          >
            <div
              className="badge badge-lg font-bold text-white shadow-2xl backdrop-blur-md border border-white/30 flex items-center gap-1.5 px-4 py-2 rounded-full"
              style={{
                background:
                  "linear-gradient(135deg, rgba(139,92,246,0.8), rgba(59,130,246,0.8))",
              }}
            >
              {event.eventType === "workshop" && (
                <Zap className="w-5 h-5 animate-pulse" />
              )}
              {event.eventType === "seminar" && <Users className="w-5 h-5" />}
              {event.eventType === "meetup" && <Shield className="w-5 h-5" />}
              <span className="capitalize text-sm">
                {event.eventType || "ইভেন্ট"}
              </span>
            </div>
          </motion.div>

          {/* Time Badge */}
          {event.eventTime && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-4 left-4 z-10"
            >
              <div className="badge badge-sm text-white bg-black/60 backdrop-blur-md border border-white/30 flex items-center gap-1 px-3 py-1.5 rounded-full">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">{event.eventTime}</span>
              </div>
            </motion.div>
          )}
        </figure>

        {/* Card Body */}
        <div className="p-5 md:p-7 space-y-5 relative z-10">
          {/* Title with Gradient */}
          <h3 className="text-xl md:text-2xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent animate-gradient-x">
              {event.title || "শিরোনাম নেই"}
            </span>
          </h3>

          {/* Description */}
          <p className="text-sm md:text-base text-base-content/80 leading-relaxed line-clamp-3">
            {event.description ||
              "বিবরণ নেই। বিস্তারিত জানতে বাটনে ক্লিক করুন।"}
          </p>

          {/* Meta Info */}
          <div className="space-y-3 text-sm md:text-base">
            <div className="flex items-center gap-2.5 text-base-content/90">
              <div className="p-1.5 bg-primary/20 rounded-lg">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <span className="font-medium truncate">
                {event.location || "স্থান নেই"}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-base-content/90">
              <div className="p-1.5 bg-success/20 rounded-lg">
                <Calendar className="w-4 h-4 text-success" />
              </div>
              <span className="font-medium">{formattedDate}</span>
            </div>
          </div>

          {/* CTA Button with Pulse */}
          <ProtectedEventLink eventId={event._id}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-gradient btn-block mt-6 text-white font-bold rounded-full shadow-xl border-0 overflow-hidden relative group/btn"
              style={{
                background:
                  "linear-gradient(135deg, #8b5cf6, #3b82f6, #10b981)",
                boxShadow: "0 8px 32px rgba(139,92,246,0.4)",
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                বিস্তারিত দেখুন
                <motion.div
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </ProtectedEventLink>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-white/40 rounded-full"
              initial={{
                x: Math.random() * 100 + "%",
                y: "100%",
              }}
              animate={{
                y: ["100%", "-20%"],
                x: [null, (Math.random() - 0.5) * 80 + "px"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Hover Stars */}
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: [0, 1.5, 1], rotate: [0, 180, 360] }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="inline-block"
            >
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 drop-shadow-glow" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

EventCardUpcaming.displayName = "EventCardUpcaming";

export default EventCardUpcaming;
