/* eslint-disable no-unused-vars */

import React, { useState, useMemo } from "react";
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
} from "lucide-react";
import { Link } from "react-router-dom";

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

const FAQSection = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

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

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-base-100"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-700 dark:text-emerald-300 text-sm font-semibold mb-4"
          >
            <Sparkles className="w-4 h-4" />
            সাহায্য কেন্দ্র
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 dark:text-white">
            প্রশ্ন আছে?{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              উত্তর এখানে
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            সবচেয়ে জিজ্ঞাসিত প্রশ্নের উত্তর এক ক্লিকে
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="প্রশ্ন খুঁজুন..."
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-600 transition-all shadow-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="space-y-4">
          <AnimatePresence>
            {filteredFAQs.map((faq, i) => (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.05 }}
                className="group"
              >
                <div
                  onClick={() => toggleFAQ(i)}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex justify-between items-center p-5">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: openIndex === i ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5" />
                        </motion.div>
                        {faq.q}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {faq.readTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-2 border-t border-gray-100 dark:border-gray-700">
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {faq.a}
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(faq.a, i);
                            }}
                            className="mt-3 flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
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
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredFAQs.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 dark:text-gray-400 py-8"
            >
              কোনো প্রশ্ন পাওয়া যায়নি।
            </motion.p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400">
            আরও সাহায্য লাগলে?{" "}
            <Link
              to="/helpDesk"
              className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
            >
              যোগাযোগ করুন
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
