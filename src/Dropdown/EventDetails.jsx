/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import { toast, Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import QRCode from "qrcode";
import { auth, onAuthStateChanged } from "../firebase/FirebaseConfig";
import { Loader2, LogIn } from "lucide-react";
import { MessageCircle, QrCode, Copy } from "lucide-react";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
        const res = await fetch(`/api/events/${id}`);
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
      const res = await fetch(`/api/events/${id}/join`, {
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
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-20 h-20 text-green-600 dark:text-green-400" />
          </motion.div>
          <p className="mt-6 text-2xl font-bold text-green-700 dark:text-green-300">
            ইভেন্ট লোড হচ্ছে...
          </p>
        </div>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-900 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden animate-pulse">
            <div className="h-96 bg-gray-300 dark:bg-gray-700"></div>
            <div className="p-16 space-y-8">
              <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="grid grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-28 bg-gray-200 dark:bg-gray-700 rounded-2xl"
                  ></div>
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-900 flex items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <p className="text-4xl font-bold text-red-600 mb-6">
            ইভেন্ট পাওয়া যায়নি
          </p>
          <button
            onClick={() => navigate("/upcomingEvents")}
            className="px-10 py-4 bg-green-600 text-white text-xl rounded-xl hover:bg-green-700 transition"
          >
            আসন্ন ইভেন্টে ফিরে যান
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900 py-16 px-4 transition-all duration-500">
      <Toaster position="top-center" />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-green-100 dark:border-gray-700"
        >
          <div className="relative">
            <motion.img
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              src={event.thumbnail1 || "https://i.imgur.com/6b4Xb.jpg"}
              alt={event.title}
              className="w-full h-96 md:h-[520px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            <div className="absolute top-6 left-6 flex gap-4">
              <span className="px-6 py-3 bg-green-600 text-white rounded-full text-lg font-bold shadow-2xl backdrop-blur-md">
                {event.eventType}
              </span>
              {daysLeft > 0 && daysLeft <= 3 && (
                <span className="px-6 py-3 bg-red-600 text-white rounded-full text-lg font-bold shadow-2xl animate-pulse">
                  {daysLeft} দিন বাকি
                </span>
              )}
            </div>

            <div className="absolute top-6 right-6 flex gap-3">
              <button
                onClick={copyLink}
                className="p-4 
             bg-white/90 dark:bg-gray-800/90 
             text-gray-800 dark:text-gray-100 
             backdrop-blur-md rounded-full shadow-xl 
             hover:scale-110 transition"
              >
                {copied ? "Copied" : "Copy"}
              </button>

              <button
                onClick={shareWhatsApp}
                className="p-4 flex items-center gap-2 
             bg-white/90 dark:bg-gray-800/90 
             text-gray-800 dark:text-gray-100 
             backdrop-blur-md rounded-full shadow-xl 
             hover:scale-110 transition"
              >
                <MessageCircle className="w-5 h-5 text-green-500" />
                WhatsApp
              </button>

              <button
                onClick={() => setShowQR(true)}
                className="p-4 flex items-center gap-2 
             bg-white/90 dark:bg-gray-800/90 
             text-gray-800 dark:text-gray-100 
             backdrop-blur-md rounded-full shadow-xl 
             hover:scale-110 transition"
              >
                <QrCode className="w-5 h-5 text-blue-500" />
                QR
              </button>
            </div>
          </div>

          <div className="p-8 md:p-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold text-green-700 dark:text-green-400 mb-6"
            >
              {event.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 leading-relaxed"
            >
              {event.description}
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { label: "স্থান", value: event.location },
                {
                  label: "তারিখ",
                  value: format(new Date(event.eventDate), "dd MMMM, yyyy", {
                    locale: bn,
                  }),
                },
                {
                  label: "সময়",
                  value: format(new Date(event.eventDate), "hh:mm a"),
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-3xl shadow-xl text-center"
                >
                  <p className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {item.label}
                  </p>
                  <p className="text-2xl font-extrabold text-green-600 dark:text-green-400">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center p-8 bg-gradient-to-r from-emerald-50 to-green—themed-50 dark:from-gray-700 dark:to-gray-800 rounded-3xl mb-12"
            >
              <img
                src={event.creatorPhoto || "https://i.imgur.com/6b4Xb.jpg"}
                alt="Creator"
                className="w-24 h-24 rounded-full border-4 border-green-500 shadow-2xl"
              />
              <div className="ml-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ইভেন্ট তৈরি করেছেন
                </p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {event.creatorName}
                </p>
                <p className="text-green-600 dark:text-green-400">
                  {event.creatorEmail}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              {alreadyJoined ? (
                <div className="inline-block px-20 py-8 bg-emerald-600 text-white text-3xl font-bold rounded-3xl shadow-2xl">
                  Already Joined
                </div>
              ) : (
                <button
                  onClick={handleJoin}
                  disabled={joining}
                  className={`px-20 py-8 text-white text-3xl font-bold rounded-3xl transition-all transform hover:scale-105 shadow-2xl ${
                    joining
                      ? "bg-gray-500"
                      : "bg-gradient-to-r from-green-600 to-emerald-600"
                  }`}
                >
                  {joining ? "জয়েন হচ্ছে..." : "Join This Event"}
                </button>
              )}
            </motion.div>

            <div className="text-center mt-12">
              <button
                onClick={() => navigate("/upcomingEvents")}
                className="text-green-600 dark:text-green-400 hover:underline text-xl font-bold flex items-center mx-auto gap-2"
              >
                Back to Events
              </button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {showQR && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
              onClick={() => setShowQR(false)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-3xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
                  ইভেন্ট QR কোড
                </h3>
                <img
                  src={qrCode}
                  alt="QR"
                  className="mx-auto rounded-2xl shadow-2xl"
                />
                <button
                  onClick={() => setShowQR(false)}
                  className="mt-8 w-full py-4 bg-green-600 text-white text-xl rounded-xl font-bold"
                >
                  বন্ধ করুন
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EventDetails;
