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
import { useTheme } from "../context/ThemeContext";

const API_URL = "https://social-development-events-platform-brown.vercel.app";

const ManageEvents = () => {
  const { user, loading: authLoading } = useAuth();
  const { mode } = useTheme();
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
    staleTime: 10000,
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
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3b82f6",
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
    <div className="min-h-screen bg-base-100 py-16 px-4">
      <Toaster
        position="top-right"
        toastOptions={{ className: "font-medium" }}
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
            আমার তৈরি করা ইভেন্টসমূহ
          </h1>
          <p className="text-xl text-base-content/70">
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
              className="input input-bordered w-full md:w-96 text-lg"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select select-bordered w-full md:w-48 text-lg"
            >
              <option value="date">তারিখ অনুযায়ী</option>
              <option value="title">নাম অনুযায়ী</option>
              <option value="type">ধরন অনুযায়ী</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {["", "Cleanup", "Plantation", "Donation", "Education"].map(
              (type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`badge badge-lg ${
                    filterType === type ? "badge-primary" : "badge-ghost"
                  }`}
                >
                  {type || "সব"}
                </button>
              )
            )}

            <button
              onClick={() => refetch()}
              className="btn btn-outline btn-sm gap-1"
            >
              <FiRefreshCw /> Refresh
            </button>

            <button
              onClick={() => navigate("/CreateEvent")}
              className="btn btn-primary btn-sm gap-1"
            >
              <FiPlus /> New Event
            </button>
          </div>
        </motion.div>

        {isError && (
          <div className="alert alert-error shadow-lg mb-8">
            <div>
              <strong>এরর:</strong> {error?.message}
            </div>
          </div>
        )}

        {/*  State */}
        {filteredEvents.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <img
              src="https://i.ibb.co.com/0jZ8g7h/empty-events.png"
              alt="No events"
              className="mx-auto w-64 mb-8 opacity-70"
            />
            <p className="text-3xl font-bold text-base-content/70 mb-6">
              {searchTerm || filterType
                ? "কোনো মিল পাওয়া যায়নি"
                : "আপনি এখনো কোনো ইভেন্ট তৈরি করেননি"}
            </p>
            <button
              onClick={() => navigate("/CreateEvent")}
              className="btn btn-primary gap-2"
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
        className="fixed bottom-8 right-8 btn btn-circle btn-primary shadow-2xl z-50"
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
        className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
      >
        <figure className="relative overflow-hidden">
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
            <div className="badge badge-primary">{event.eventType}</div>
            {daysLeft > 0 && daysLeft <= 7 && (
              <div className="badge badge-error animate-pulse">
                {daysLeft} দিন
              </div>
            )}
          </div>
        </figure>

        <div className="card-body p-5 space-y-3">
          <h3 className="card-title text-primary line-clamp-1">
            {event.title}
          </h3>
          <p className="text-base-content/70 text-sm line-clamp-2">
            {event.description}
          </p>

          <div className="text-xs text-base-content/60 space-y-1">
            <p>Location: {event.location}</p>
            <p>
              Date:{" "}
              {format(new Date(event.eventDate), "dd MMM, yyyy", {
                locale: bn,
              })}
            </p>
            <p className="text-success font-medium">
              {event.joinedUsers?.length || 0} জন
            </p>
          </div>

          <div className="card-actions justify-between pt-3">
            <button
              onClick={() => window.open(`/event/${event._id}`, "_blank")}
              className="btn btn-info btn-sm gap-1"
              title="ইভেন্ট দেখুন"
            >
              <FiEye /> View
            </button>

            <button
              onClick={() => navigate(`/updateEvent/${event._id}`)}
              className="btn btn-success btn-sm gap-1"
              title="ইভেন্ট আপডেট করুন"
            >
              <FiEdit3 /> Edit
            </button>

            <button
              onClick={() => onDelete(event._id, event.title)}
              disabled={isDeleting}
              className="btn btn-error btn-sm"
              title="ইভেন্ট মুছে ফেলুন"
            >
              <FiTrash2 />
              {isDeleting && (
                <span className="loading loading-spinner loading-xs"></span>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    );
  }
);

const SkeletonGrid = () => (
  <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="card bg-base-200 shadow-xl animate-pulse">
          <div className="h-48 bg-base-300 rounded-t-xl"></div>
          <div className="card-body p-5 space-y-3">
            <div className="h-5 bg-base-300 rounded w-3/4"></div>
            <div className="h-4 bg-base-300 rounded w-full"></div>
            <div className="h-4 bg-base-300 rounded w-5/6"></div>
            <div className="flex gap-2">
              <div className="flex-1 h-9 bg-base-300 rounded"></div>
              <div className="flex-1 h-9 bg-base-300 rounded"></div>
              <div className="w-12 h-9 bg-base-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ManageEvents;
