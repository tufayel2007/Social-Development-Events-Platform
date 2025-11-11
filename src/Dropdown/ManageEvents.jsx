/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import { toast, Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { useInView } from "react-intersection-observer";

import { FiEdit3, FiEye, FiTrash2, FiRefreshCw, FiPlus } from "react-icons/fi";

const API_URL = "https://social-development-events-platform-brown.vercel.app";

const ManageEvents = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filterType, setFilterType] = useState("");

  const userEmail = user?.email || user?.providerData?.[0]?.email || null;

  useEffect(() => {
    if (location.state?.refresh && userEmail) {
      queryClient.invalidateQueries(["myEvents", userEmail]);
      navigate("/ManageEvents", { replace: true });
    }
  }, [location.state, queryClient, userEmail, navigate]);

  const {
    data: events = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myEvents", userEmail],
    queryFn: async () => {
      if (!userEmail) throw new Error("ইমেইল পাওয়া যায়নি");
      const res = await fetch(
        `${API_URL}/api/events/my?email=${encodeURIComponent(userEmail)}`
      );
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP ${res.status}`);
      }
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    },
    enabled: !!userEmail,
    retry: 2,
    staleTime: 1000 * 10,
  });

  const deleteMutation = useMutation({
    mutationFn: async (eventId) => {
      const res = await fetch(
        `${API_URL}/api/events/${eventId}?creatorEmail=${encodeURIComponent(
          userEmail
        )}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "ডিলিট করা যায়নি");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myEvents", userEmail]);
      toast.success("ইভেন্ট মুছে ফেলা হয়েছে!", { icon: "Trash" });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleDelete = (id, title) => {
    Swal.fire({
      title: `আপনি কি "${title}" মুছে ফেলতে চান?`,
      text: "এটা আর ফিরে পাবেন না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "হ্যাঁ, মুছে ফেলো!",
      cancelButtonText: "না",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const filteredEvents = events
    .filter(
      (e) =>
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!filterType || e.eventType === filterType)
    )
    .sort((a, b) => {
      if (sortBy === "date")
        return new Date(b.eventDate) - new Date(a.eventDate);
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "type") return a.eventType.localeCompare(b.eventType);
      return 0;
    });

  if (authLoading || isLoading) return <SkeletonGrid />;
  if (!user || !userEmail) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900 py-16 px-4 transition-colors">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-green-700 dark:text-green-400 mb-4">
            আমার তৈরি করা ইভেন্টসমূহ
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            আপনার সৃষ্টি পরিচালনা করুন
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="text"
              placeholder="ইভেন্টের নাম দিয়ে খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-96 px-6 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-green-500 dark:bg-gray-800 dark:text-white transition-all shadow-sm hover:shadow-md"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-48 px-6 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-green-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="date">তারিখ অনুযায়ী</option>
              <option value="title">নাম অনুযায়ী</option>
              <option value="type">ধরন অনুযায়ী</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {["", "Cleanup", "Plantation", "Donation", "Education"].map(
              (type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                    filterType === type
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-gray-200 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900"
                  }`}
                >
                  {type || "সব"}
                </button>
              )
            )}
            <button
              onClick={() => refetch()}
              className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FiRefreshCw /> Refresh
            </button>
            <button
              onClick={() => navigate("/CreateEvent")}
              className="px-6 py-2 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FiPlus /> New Event
            </button>
          </div>
        </motion.div>

        {isError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-6 py-4 rounded-2xl mb-8 text-center shadow-lg"
          >
            <strong>এরর:</strong> {error?.message}
          </motion.div>
        )}

        {filteredEvents.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <img
              src="https://i.ibb.co.com/0jZ8g7h/empty-events.png"
              alt="No events"
              className="mx-auto w-64 mb-8 opacity-80"
            />
            <p className="text-3xl font-bold text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm || filterType
                ? "কোনো মিল পাওয়া যায়নি"
                : "আপনি এখনো কোনো ইভেন্ট তৈরি করেননি"}
            </p>
            <button
              onClick={() => navigate("/CreateEvent")}
              className="px-10 py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition transform hover:scale-110 shadow-xl flex items-center gap-2 mx-auto"
            >
              <FiPlus /> First Event
            </button>
          </motion.div>
        )}

        <AnimatePresence>
          {filteredEvents.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredEvents.map((event, index) => (
                <EventCard
                  key={event._id}
                  event={event}
                  index={index}
                  onDelete={handleDelete}
                  isDeleting={deleteMutation.isPending}
                  navigate={navigate}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 p-4 bg-green-600 text-white rounded-full shadow-2xl z-50 hover:scale-110 transition"
      >
        Up
      </button>
    </div>
  );
};

const EventCard = React.memo(
  ({ event, index, onDelete, isDeleting, navigate }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const daysLeft = Math.ceil(
      (new Date(event.eventDate) - new Date()) / (1000 * 60 * 60 * 24)
    );

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        whileHover={{ y: -8, scale: 1.03 }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
      >
        <div className="relative overflow-hidden">
          <img
            src={
              event.thumbnail ||
              "https://via.placeholder.com/300x200?text=No+Image"
            }
            alt={event.title}
            loading="lazy"
            className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-bold">
              {event.eventType}
            </span>
            {daysLeft > 0 && daysLeft <= 7 && (
              <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-bold animate-pulse">
                {daysLeft} দিন
              </span>
            )}
          </div>
        </div>

        <div className="p-5 space-y-3">
          <h3 className="text-lg font-bold text-green-700 dark:text-green-400 line-clamp-1">
            {event.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
            {event.description}
          </p>

          <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
            <p>Location: {event.location}</p>
            <p>
              Date:{" "}
              {format(new Date(event.eventDate), "dd MMM, yyyy", {
                locale: bn,
              })}
            </p>
            <p className="text-green-600 dark:text-green-400 font-medium">
              {event.joinedUsers?.length || 0} জন
            </p>
          </div>

          <div className="flex gap-2 pt-3">
            <button
              disabled
              onClick={() => window.open(`/event/${event._id}`, "_blank")}
              className="flex-1 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-1 group"
              title="ইভেন্ট দেখুন"
            >
              <FiEye className="group-hover:scale-110 transition" /> View
            </button>

            <button
              onClick={() => navigate(`/updateEvent/${event._id}`)}
              className="flex-1 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition flex items-center justify-center gap-1 group shadow-md hover:shadow-lg"
              title="ইভেন্ট আপডেট করুন"
            >
              <FiEdit3 className="group-hover:rotate-12 transition" /> Edit
            </button>

            {/* Delete */}
            <button
              onClick={() => onDelete(event._id, event.title)}
              disabled={isDeleting}
              className="px-3 py-2.5 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-700 disabled:opacity-50 transition flex items-center justify-center group"
              title="ইভেন্ট মুছে ফেলুন"
            >
              <FiTrash2 className="group-hover:scale-110 transition" />
              {isDeleting ? "..." : ""}
            </button>
          </div>
        </div>
      </motion.div>
    );
  }
);

const SkeletonGrid = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-900 dark:to-teal-900 flex items-center justify-center p-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-white/80 dark:bg-gray-800/80 rounded-3xl shadow-xl animate-pulse"
        >
          <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-t-3xl"></div>
          <div className="p-5 space-y-3">
            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="flex gap-2">
              <div className="flex-1 h-9 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="flex-1 h-9 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="w-12 h-9 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ManageEvents;
