/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import toast, { Toaster } from "react-hot-toast";
import QRCode from "qrcode";
import { auth, onAuthStateChanged } from "../firebase/FirebaseConfig";
import {
  Loader2,
  MessageCircle,
  QrCode,
  Copy,
  Calendar,
  MapPin,
  Clock,
  User,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const API_URL = "https://social-development-events-platform-brown.vercel.app";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState(null);

  const eventUrl = `${window.location.origin}/event/${id}`;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login", { replace: true });
      } else {
        setUser(currentUser);
        setInitialLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/events/${id}`);
        const data = await res.json();

        if (res.ok) {
          setEvent(data);
          setAlreadyJoined(data.joinedUsers?.includes(user.email));
          QRCode.toDataURL(eventUrl, { width: 300, margin: 2 }).then(setQrCode);
        } else {
          toast.error("ইভেন্ট পাওয়া যায়নি");
          navigate("/upcomingEvents");
        }
      } catch (err) {
        toast.error("সার্ভারে সমস্যা");
        navigate("/upcomingEvents");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, user, navigate]);

  const handleJoin = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setJoining(true);
    try {
      const res = await fetch(`${API_URL}/api/events/${id}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: user.email }),
      });

      const data = await res.json();
      if (res.ok) {
        setAlreadyJoined(true);
        toast.success("সফলভাবে জয়েন করেছো!");
      } else {
        toast.error(data.error || "জয়েন করা যায়নি");
      }
    } catch (err) {
      toast.error("জয়েন করতে সমস্যা হয়েছে");
    } finally {
      setJoining(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(eventUrl);
    setCopied(true);
    toast.success("লিংক কপি হয়েছে!");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        event?.title + " - " + eventUrl
      )}`
    );
  };

  const daysLeft = event
    ? Math.ceil(
        (new Date(event.eventDate) - new Date()) / (1000 * 60 * 60 * 24)
      )
    : 0;

  if (initialLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-base-200">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-20 h-20 text-primary" />
          </motion.div>
          <p className="mt-6 text-2xl font-bold text-primary">
            ইভেন্ট লোড হচ্ছে...
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="card bg-base-100 shadow-2xl overflow-hidden animate-pulse">
            <div className="h-96 bg-base-300"></div>
            <div className="p-8 space-y-8">
              <div className="h-12 bg-base-300 rounded w-3/4"></div>
              <div className="h-32 bg-base-300 rounded"></div>
              <div className="grid grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-28 bg-base-300 rounded-2xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <p className="text-4xl font-bold text-error mb-6">
            ইভেন্ট পাওয়া যায়নি
          </p>
          <button
            onClick={() => navigate("/upcomingEvents")}
            className="btn btn-primary btn-lg"
          >
            আসন্ন ইভেন্টে ফিরে যান
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-16 px-4">
      <Toaster position="top-center" />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-base-100 shadow-2xl overflow-hidden"
        >
          {/* Hero Image */}
          <div className="relative">
            <motion.img
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              src={event.thumbnail || "https://i.imgur.com/6b4Xb.jpg"}
              alt={event.title}
              className="w-full h-96 md:h-[520px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            {/* Badges */}
            <div className="absolute top-6 left-6 flex gap-3 flex-wrap">
              <div className="badge badge-primary badge-lg font-bold">
                {event.eventType}
              </div>
              {daysLeft > 0 && daysLeft <= 3 && (
                <div className="badge badge-error badge-lg font-bold animate-pulse">
                  {daysLeft} দিন বাকি
                </div>
              )}
            </div>

            {/* Share Buttons */}
            <div className="absolute top-6 right-6 flex gap-2">
              <button
                onClick={copyLink}
                className="btn btn-ghost btn-circle"
                title="লিংক কপি"
              >
                {copied ? (
                  <Copy className="w-5 h-5 text-success" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={shareWhatsApp}
                className="btn btn-ghost btn-circle"
                title="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-success" />
              </button>
              <button
                onClick={() => setShowQR(true)}
                className="btn btn-ghost btn-circle"
                title="QR কোড"
              >
                <QrCode className="w-5 h-5 text-info" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="card-body p-8 md:p-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-title text-4xl md:text-6xl text-primary mb-6"
            >
              {event.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-base-content/80 mb-10 leading-relaxed"
            >
              {event.description}
            </motion.p>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: MapPin, label: "স্থান", value: event.location },
                {
                  icon: Calendar,
                  label: "তারিখ",
                  value: format(new Date(event.eventDate), "dd MMMM, yyyy", {
                    locale: bn,
                  }),
                },
                {
                  icon: Clock,
                  label: "সময়",
                  value: format(new Date(event.eventDate), "hh:mm a"),
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="card bg-base-200 shadow-xl p-6 text-center"
                >
                  <item.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-bold text-base-content/70">
                    {item.label}
                  </p>
                  <p className="text-xl font-extrabold text-primary">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Creator Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center p-6 bg-base-200 rounded-2xl mb-12"
            >
              <div className="avatar">
                <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={event.creatorPhoto || "https://i.imgur.com/6b4Xb.jpg"}
                    alt="Creator"
                  />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-base-content/70">ইভ, তৈরি করেছেন</p>
                <p className="text-xl font-bold text-base-content">
                  {event.creatorName}
                </p>
                <p className="text-primary">{event.creatorEmail}</p>
              </div>
            </motion.div>

            {/* Join Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              {alreadyJoined ? (
                <div className="inline-block px-12 py-6 bg-success text-success-content text-2xl font-bold rounded-2xl">
                  Already Joined
                </div>
              ) : (
                <button
                  onClick={handleJoin}
                  disabled={joining}
                  className={`btn btn-primary btn-lg ${
                    joining ? "loading" : ""
                  }`}
                >
                  {joining ? "জয়েন হচ্ছে..." : "Join This Event"}
                </button>
              )}
            </motion.div>

            {/* Back Link */}
            <div className="text-center mt-8">
              <button
                onClick={() => navigate("/upcomingEvents")}
                className="link link-primary text-lg font-bold"
              >
                Back to Events
              </button>
            </div>
          </div>
        </motion.div>

        {/* QR Modal */}
        <AnimatePresence>
          {showQR && (
            <div className="modal modal-open">
              <div className="modal-box bg-base-100">
                <h3 className="text-2xl font-bold text-center mb-6">
                  ইভেন্ট QR কোড
                </h3>
                <img
                  src={qrCode}
                  alt="QR"
                  className="mx-auto rounded-2xl shadow-2xl w-64 h-64"
                />
                <div className="modal-action">
                  <button
                    onClick={() => setShowQR(false)}
                    className="btn btn-primary w-full"
                  >
                    বন্ধ করুন
                  </button>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EventDetails;
