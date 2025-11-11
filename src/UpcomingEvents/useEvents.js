/* eslint-disable no-unused-vars */
// src/pages/UpcomingEvents/hooks/useEvents.js
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const API_URL = "https://social-development-events-platform-brown.vercel.app";
const EVENTS_PER_PAGE = 6;

export const useEvents = (searchTerm, selectedType) => {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      // যদি প্রথম লোড না হয়, তবে লোডিং দেখান
      if (!initialLoad) {
        setLoading(true);
      }
      try {
        const query = new URLSearchParams();
        if (searchTerm) query.append("search", searchTerm);
        if (selectedType) query.append("type", selectedType);

        const res = await fetch(`${API_URL}/api/events/upcoming?${query}`);
        const data = await res.json();

        if (res.ok) {
          setAllEvents(data);
        } else {
          toast.error("ইভেন্ট লোড করতে সমস্যা হয়েছে");
        }
      } catch (err) {
        toast.error("সার্ভারের সাথে সংযোগ নেই");
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    // ডেটা লোড শুরু করার আগে একটি ছোট ডিলে যোগ করলে
    // debounced search-এর ক্ষেত্রে UI লোডিং এ ভালো অভিজ্ঞতা পাওয়া যায় (ঐচ্ছিক)
    // const delay = setTimeout(() => {
    fetchEvents();
    // }, 100);

    // return () => clearTimeout(delay);
  }, [searchTerm, selectedType]);

  const totalPages = Math.ceil(allEvents.length / EVENTS_PER_PAGE);

  const getPaginatedEvents = (page) => {
    const start = (page - 1) * EVENTS_PER_PAGE;
    const end = start + EVENTS_PER_PAGE;
    return allEvents.slice(start, end);
  };

  return { allEvents, loading, initialLoad, totalPages, getPaginatedEvents };
};
