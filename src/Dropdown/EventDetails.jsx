/* eslint-disable no-unused-vars */
// src/pages/EventDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import { toast, Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import QRCode from "qrcode";
import { auth } from "../firebase/FirebaseConfig";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);

  const eventUrl = `${window.location.origin}/event/${id}`;

  // Fetch single event
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${id}`);
        const data = await res.json();

        if (res.ok) {
          setEvent(data);
          if (
            auth.currentUser &&
            data.joinedUsers?.includes(auth.currentUser.email)
          ) {
            setAlreadyJoined(true);
          }
          // Generate QR
          QRCode.toDataURL(eventUrl, { width: 300, margin: 2 }).then(setQrCode);
        } else {
          toast.error("ইভেন্ট পাওয়া যায়নি");
          navigate("/upcomingEvents");
        }
      } catch (err) {
        toast.error("সার্ভারে সমস্যা");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, navigate]);

  // Join Event Function (লজিক একই)
  const handleJoin = async () => {
    if (!auth.currentUser) {
      Swal.fire({
        icon: "warning",
        title: "লগইন করুন",
        text: "ইভেন্টে জয়েন করতে আগে লগইন করতে হবে।",
        confirmButtonText: "লগইন করুন",
      }).then(() => navigate("/login"));
      return;
    }

    setJoining(true);
    try {
      const res = await fetch(`/api/events/${id}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: auth.currentUser.email }),
      });

      const data = await res.json();

      if (res.ok) {
        setAlreadyJoined(true);
        setEvent({
          ...event,
          joinedUsers: [...(event.joinedUsers || []), auth.currentUser.email],
        });
        toast.success("সফলভাবে জয়েন করেছো!", { icon: "Celebration" });
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error(err.message || "জয়েন করা যায়নি");
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
        event.title + " - " + eventUrl
      )}`
    );
  };

  const daysLeft = event
    ? Math.ceil(
        (new Date(event.eventDate) - new Date()) / (1000 * 60 * 60 * 24)
      )
    : 0;

  // Loading Skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center p-4">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-full max-w-4xl"
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="h-96 bg-gray-300 animate-pulse"></div>
            <div className="p-10 space-y-6">
              <div className="h-12 bg-gray-300 rounded w-3/4"></div>
              <div className="h-24 bg-gray-300 rounded"></div>
              <div className="grid grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-24 bg-gray-200 rounded-2xl animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <p className="text-4xl font-bold text-red-600 mb-4">
            ইভেন্ট পাওয়া যায়নি
          </p>
          <button
            onClick={() => navigate("/upcomingEvents")}
            className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            Upcoming Events
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-16 px-4">
      <Toaster position="top-center" />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Hero Image */}
          <div className="relative overflow-hidden">
            <motion.img
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              src={event.thumbnail1 || "https://i.imgur.com/6b4Xb.jpg"}
              alt={event.title}
              className="w-full h-96 md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Floating Badges */}
            <div className="absolute top-6 left-6 flex gap-3">
              <span className="px-5 py-2 bg-green-600 text-white rounded-full text-lg font-bold shadow-lg backdrop-blur-sm">
                {event.eventType}
              </span>
              {daysLeft > 0 && daysLeft <= 3 && (
                <span className="px-5 py-2 bg-red-500 text-white rounded-full text-lg font-bold shadow-lg animate-pulse">
                  {daysLeft} দিন বাকি
                </span>
              )}
            </div>

            {/* Share Buttons */}
            <div className="absolute top-6 right-6 flex gap-3">
              <button
                onClick={copyLink}
                className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition"
              >
                {copied ? "Check" : "Copy"}
              </button>
              <button
                onClick={shareWhatsApp}
                className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition"
              >
                WhatsApp
              </button>
              <button
                onClick={() => setShowQR(true)}
                className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition"
              >
                QR
              </button>
            </div>
          </div>

          <div className="p-8 md:p-16">
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-green-700 mb-6 leading-tight"
            >
              {event.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed"
            >
              {event.description}
            </motion.p>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: "Location", label: "স্থান", value: event.location },
                {
                  icon: "Calendar",
                  label: "তারিখ",
                  value: format(new Date(event.eventDate), "dd MMMM, yyyy", {
                    locale: bn,
                  }),
                },
                {
                  icon: "Clock",
                  label: "সময়",
                  value: format(new Date(event.eventDate), "hh:mm a"),
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {item.label}
                  </h3>
                  <p className="text-lg text-green-600 font-medium">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Creator Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl mb-12"
            >
              <img
                src={event.creatorPhoto || "https://i.imgur.com/6b4Xb.jpg"}
                alt="Creator"
                className="w-20 h-20 rounded-full mr-6 border-4 border-green-500 shadow-lg"
              />
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  ইভেন্ট তৈরি করেছেন
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {event.creatorName || "অজানা"}
                </p>
                <p className="text-green-600">{event.creatorEmail}</p>
              </div>
            </motion.div>

            {/* Join Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center"
            >
              {alreadyJoined ? (
                <div className="inline-block px-16 py-6 bg-emerald-600 text-white text-2xl font-bold rounded-2xl shadow-lg">
                  Already Joined
                </div>
              ) : (
                <button
                  onClick={handleJoin}
                  disabled={joining}
                  className={`px-16 py-6 text-white text-2xl font-bold rounded-2xl transition-all transform hover:scale-105 shadow-2xl ${
                    joining
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  }`}
                >
                  {joining ? "জয়েন হচ্ছে..." : "Join This Event"}
                </button>
              )}
            </motion.div>

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-12"
            >
              <button
                onClick={() => navigate("/upcomingEvents")}
                className="text-green-600 hover:text-green-800 font-bold text-xl underline flex items-center mx-auto gap-2"
              >
                Back to Events
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* QR Modal */}
        <AnimatePresence>
          {showQR && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowQR(false)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-center mb-6">
                  ইভেন্ট QR কোড
                </h3>
                {qrCode ? (
                  <img
                    src={qrCode}
                    alt="QR"
                    className="mx-auto rounded-xl shadow-lg"
                  />
                ) : (
                  <div className="w-64 h-64 mx-auto bg-gray-200 animate-pulse rounded-xl"></div>
                )}
                <p className="text-center mt-4 text-gray-600">
                  স্ক্যান করে যোগ দিন
                </p>
                <button
                  onClick={() => setShowQR(false)}
                  className="mt-6 w-full py-3 bg-green-600 text-white rounded-xl font-bold"
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
