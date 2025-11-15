/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ChevronDown,
  Search,
  Copy,
  Check,
  Clock,
  Sparkles,
  Calendar,
  Users,
  Heart,
  DollarSign,
  MessageCircle, // নতুন আইকন যোগাযোগের জন্য
  FileText, // রিসোর্সের জন্য নতুন আইকন
} from "lucide-react";
// import { Link } from "react-router-dom"; // Link কম্পোনেন্ট ব্যবহার না করার কারণে এটি সরিয়ে দেওয়া হয়েছে

// স্ট্যাটিক ডেটা (পরিবর্তিত হয়নি)
const faqs = [
  {
    q: "কিভাবে ইভেন্ট তৈরি করব?",
    a: "প্রথমে লগইন করুন → প্রোফাইলে যান → 'নতুন ইভেন্ট' ক্লিক করুন → বিস্তারিত পূরণ করুন।",
    category: "event",
    readTime: "১ মিনিট",
  },
  {
    q: "ইভেন্টে জয়েন করতে কি লাগবে?",
    a: "শুধু একটি অ্যাকাউন্ট এবং ইচ্ছা! কোনো ফি নেই।",
    category: "join",
    readTime: "৩০ সেকেন্ড",
  },
  {
    q: "এটা কি ফ্রি?",
    a: "হ্যাঁ, সম্পূর্ণ ফ্রি। কোনো লুকানো চার্জ নেই।",
    category: "pricing",
    readTime: "১৫ সেকেন্ড",
  },
  {
    q: "আমি কিভাবে স্বেচ্ছাসেবী হব?",
    a: "প্রোফাইলে 'Volunteer' বাটন → আগ্রহের ক্ষেত্র সিলেক্ট → আবেদন করুন।",
    category: "volunteer",
    readTime: "১ মিনিট",
  },
  {
    q: "ইভেন্টের ছবি কিভাবে আপলোড করব?",
    a: "ইভেন্ট তৈরির সময় 'Add Photo' বাটনে ক্লিক করে গ্যালারি থেকে নির্বাচন করুন।",
    category: "event",
    readTime: "৪৫ সেকেন্ড",
  },
];

const categories = [
  { id: "all", label: "সব", icon: Sparkles },
  { id: "event", label: "ইভেন্ট", icon: Calendar },
  { id: "join", label: "জয়েন", icon: Users },
  { id: "volunteer", label: "ভলান্টিয়ার", icon: Heart },
  { id: "pricing", label: "মূল্য", icon: DollarSign },
];

// --- এনিমেশন ভ্যারিয়েন্ট ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 150, damping: 20 },
  },
};

// --- নতুন, কেন্দ্রীয় CTA সেকশন (যোগাযোগ করুন সেকশনের আপডেট) ---
const HelpCTA = ({ inView }) => {
  // Animation for the entire section
  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.2 },
    },
  };

  return (
    <motion.div
      variants={ctaVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      // ডিজাইন আপডেট: গাঢ় ব্যাকগ্রাউন্ড, গোলাকার কোণা এবং হালকা বর্ডার
      className="mt-16 md:mt-24 p-8 sm:p-12 text-center rounded-[2rem] shadow-2xl shadow-emerald-900/40 dark:shadow-emerald-900/60 bg-gray-900 dark:bg-gray-800 border-4 border-emerald-500/30"
    >
      {/* শিরোনাম */}
      <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
        এখনও কি সাহায্য দরকার?
      </h3>
      {/* বর্ণনা */}
      <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
        আমরা সবসময় আপনার পাশে আছি। আমাদের সাথে সরাসরি যোগাযোগ করুন অথবা অন্যান্য
        গুরুত্বপূর্ণ রিসোর্সগুলো দেখুন।
      </p>

      {/* অ্যাকশন বাটন */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {/* Contact Button */}
        <motion.a
          href="/helpDesk" // href ব্যবহার করা হয়েছে
          className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-full shadow-lg shadow-emerald-500/50 hover:bg-emerald-700 transition duration-300 flex items-center justify-center gap-2 text-base"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 15px rgba(16, 185, 129, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="w-5 h-5" />
          সরাসরি যোগাযোগ করুন
        </motion.a>

        {/* Documentation/Other Help Button */}
        <motion.a
          href="/upcomingEvents" // href ব্যবহার করা হয়েছে
          className="px-8 py-3 bg-gray-700 text-white font-semibold rounded-full shadow-lg hover:bg-gray-600 transition duration-300 flex items-center justify-center gap-2 text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FileText className="w-5 h-5" />
          অন্যান্য রিসোর্স দেখুন
        </motion.a>
      </div>
    </motion.div>
  );
};

// --- মূল FAQ কম্পোনেন্ট ---
const FAQSection = () => {
  // `useInView` দিয়ে স্ক্রল অ্যানিমেশন ট্রিগার করা
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // FAQ ডেটা ফিল্টার এবং মেমোাইজ করা
  const filteredFAQs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        faq.q.toLowerCase().includes(search.toLowerCase()) ||
        faq.a.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  // উত্তরের টেক্সট কপি করার ফাংশন
  const handleCopy = useCallback((text, index) => {
    // navigator.clipboard.writeText ব্যবহার করা হয়
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .catch((err) => console.error("Failed to copy text: ", err));
    } else {
      console.warn("Clipboard API not available.");
    }
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  // FAQ টগল করার ফাংশন
  const toggleFAQ = useCallback((index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  return (
    <section
      ref={ref}
      // DaisyUI/Tailwind দ্বারা ডার্ক/লাইট মোড এবং রেসপনসিভনেস নিশ্চিত করা
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-base-100 min-h-screen relative font-inter"
    >
      <div className="max-w-5xl mx-auto">
        {/* --- হেডার সেকশন অ্যানিমেশন --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          {/* ব্যাজ অ্যানিমেশন */}
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-700 dark:text-emerald-300 text-sm font-semibold mb-4"
          >
            <Sparkles className="w-4 h-4 " />
            সাহায্য কেন্দ্র
          </motion.div>

          {/* প্রধান শিরোনাম অ্যানিমেশন */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 dark:text-white"
          >
            <motion.span
              // গ্র্যাডিয়েন্ট টেক্সটকে ক্রমাগত অ্যানিমেট করা
              animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r 
              from-emerald-600 via-teal-600 to-emerald-600 
              dark:from-emerald-400 dark:via-teal-400 dark:to-emerald-400 
              bg-[length:200%_200%]"
              style={{
                backgroundSize: "200% 200%",
                backgroundPosition: "0% 50%",
              }}
            >
              প্রশ্ন আছে? উত্তর এখানে
            </motion.span>
          </motion.h2>

          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            আপনার সব জিজ্ঞাসাগুলির দ্রুত এবং সহজ সমাধান খুঁজে নিন।
          </p>
        </motion.div>

        {/* --- সার্চ এবং ক্যাটাগরি ফিল্টার অ্যানিমেশন --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-10 p-6 bg-base-200 dark:bg-gray-900 rounded-3xl shadow-xl"
        >
          {/* সার্চ ইনপুট */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="প্রশ্ন খুঁজুন..."
              className="w-full pl-12 pr-6 py-4 rounded-xl bg-white dark:bg-gray-800 border-none focus:outline-none focus:ring-4 focus:ring-emerald-500/50 dark:focus:ring-emerald-600/50 transition-all shadow-md text-gray-800 dark:text-gray-100"
            />
          </div>

          {/* ক্যাটাগরি বাটন */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-emerald-500/50 dark:shadow-emerald-700/50"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 hover:text-emerald-600"
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* --- FAQ লিস্ট অ্যানিমেশন --- */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <AnimatePresence>
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, i) => {
                const isItemOpen = openIndex === i;
                return (
                  <motion.div
                    key={i}
                    layout // লেআউট অ্যানিমেশন সক্রিয়
                    variants={itemVariants}
                    className="group"
                  >
                    <div
                      onClick={() => toggleFAQ(i)}
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-600"
                    >
                      <div className="flex justify-between items-center p-5">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-emerald-600 dark:text-emerald-400 flex items-center gap-3">
                            {/* ড্রপডাউন আইকন অ্যানিমেশন */}
                            <motion.div
                              animate={{ rotate: isItemOpen ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-gray-500 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                            >
                              <ChevronDown className="w-5 h-5" />
                            </motion.div>
                            {faq.q}
                          </h3>
                          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400 ml-8">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              সময় লাগবে: {faq.readTime}
                            </span>
                            <span className="badge badge-outline text-xs capitalize text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-600">
                              {faq.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* উত্তর কন্টেন্ট অ্যানিমেশন */}
                      <AnimatePresence>
                        {isItemOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-4 border-t border-gray-100 dark:border-gray-700 bg-base-50 dark:bg-gray-900/50">
                              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                                {faq.a}
                              </p>
                              <motion.button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopy(faq.a, i);
                                }}
                                className={`mt-4 flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-colors ${
                                  copiedIndex === i
                                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                    : "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-700"
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {copiedIndex === i ? (
                                  <>
                                    <Check className="w-4 h-4" />
                                    কপি হয়েছে!
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-4 h-4" />
                                    উত্তর কপি করুন
                                  </>
                                )}
                              </motion.button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-500 dark:text-gray-400 py-8 text-lg"
              >
                দুঃখিত, আপনার খোঁজা কোনো প্রশ্ন পাওয়া যায়নি।
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* --- কেন্দ্রীয় যোগাযোগ বাটন ইন্টিগ্রেশন (HelpCTA) --- */}
        <HelpCTA inView={inView} />

        {/* পূর্বের ফুটার লিংক সেকশন এবং ভাসমান বাটন সরিয়ে দেওয়া হয়েছে */}
      </div>
    </section>
  );
};

export default FAQSection;
