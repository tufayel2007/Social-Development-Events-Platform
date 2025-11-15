/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  Lock,
  CalendarCheck,
  Zap,
  Mail,
  Sun,
  Moon,
  Sparkles,
  Send,
  X,
  CheckCircle,
  AlertCircle,
  Bot,
  Headphones,
  Info,
  ArrowRight,
  Trash2,
} from "lucide-react";
// Assuming you have a ThemeContext setup correctly
import { useTheme } from "../../context/ThemeContext";

// --- ENHANCED FAQ DATA ---
const faqData = [
  {
    category: "Authentication",
    label: "অ্যাকাউন্ট ও লগইন",
    icon: Lock,
    color: "from-violet-500 to-purple-600",
    count: 5,
    questions: [
      {
        q: "আমি কীভাবে একটি শক্তিশালী পাসওয়ার্ড তৈরি করব?",
        a: "আপনার পাসওয়ার্ডে কমপক্ষে ৮টি অক্ষর, একটি বড় হাতের অক্ষর, একটি ছোট হাতের অক্ষর, একটি সংখ্যা এবং একটি প্রতীক থাকতে হবে।",
      },
      {
        q: "লগইন করার পরেও আমি কেন ব্যক্তিগত পেজ দেখতে পাচ্ছি না?",
        a: "ব্রাউজারে কুকিজ বন্ধ থাকলে সমস্যা হতে পারে। কুকিজ চালু করুন এবং লগআউট করে পুনরায় লগইন করুন।",
      },
      {
        q: "টু-ফ্যাক্টর অথেনটিকেশন (2FA) কি?",
        a: "এটি আপনার অ্যাকাউন্টের জন্য একটি অতিরিক্ত নিরাপত্তা স্তর। লগইন করার সময় পাসওয়ার্ডের পাশাপাশি আপনার মোবাইলে একটি কোড পাঠায়।",
      },
    ],
  },
  {
    category: "EventCreation",
    label: "ইভেন্ট তৈরি ও সম্পাদনা",
    icon: CalendarCheck,
    color: "from-blue-500 to-cyan-600",
    count: 8,
    questions: [
      {
        q: "আমি কি পেছনের কোনো তারিখে ইভেন্ট তৈরি করতে পারব?",
        a: "না। শুধুমাত্র ভবিষ্যতের তারিখে ইভেন্ট তৈরি করা যায়।",
      },
      {
        q: "ইভেন্ট তৈরি করার জন্য কী কী তথ্য প্রয়োজন?",
        a: "শিরোনাম, বিবরণ, থাম্বনেইল, স্থান, তারিখ, এবং ইভেন্টের ধরন।",
      },
      {
        q: "ইভেন্টের তারিখ পরিবর্তন করতে পারছি না কেন?",
        a: "যদি ইভেন্টটি ইতিমধ্যেই পাবলিক করা হয় এবং এতে অংশগ্রহণকারী যুক্ত থাকে, তবে নিরাপত্তা জনিত কারণে তারিখ পরিবর্তন সীমিত করা থাকতে পারে।",
      },
    ],
  },
  {
    category: "Participation",
    label: "ইভেন্টে যোগদান ও পরিচালনা",
    icon: Zap,
    color: "from-amber-500 to-orange-600",
    count: 6,
    questions: [
      {
        q: "ইভেন্টের বিস্তারিত দেখতে কি লগইন করতে হবে?",
        a: "না। ডিটেইলস পাবলিক। কিন্তু জয়েন করতে লগইন লাগবে।",
      },
      {
        q: "আমি কি অন্য কারো তৈরি ইভেন্ট এডিট বা ডিলিট করতে পারি?",
        a: "না। শুধুমাত্র নিজের তৈরি ইভেন্ট এডিট করা যাবে।",
      },
      {
        q: "ইভেন্টে যোগদান করার পর যদি বাতিল করতে চাই?",
        a: "আপনি ইভেন্টের বিস্তারিত পেজে গিয়ে 'যোগদান বাতিল করুন' (Cancel Participation) বাটনে ক্লিক করতে পারেন।",
      },
    ],
  },
];

// --- Animated Accordion (unchanged core) ---
const AnimatedAccordion = ({ question, isOpen, onClick, index }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="overflow-hidden"
    >
      <div className="collapse collapse-arrow bg-base-100 rounded-2xl mb-4 shadow-xl hover:shadow-2xl transition-all border border-base-300">
        <input type="checkbox" checked={isOpen} onChange={onClick} />
        <div className="collapse-title text-lg font-semibold flex items-center justify-between pr-10 hover:bg-base-200/50 transition-colors rounded-t-2xl">
          <span className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: isOpen ? 360 : 0 }}
              transition={{ duration: 0.3 }}
              className="p-1 rounded-full"
            >
              {isOpen ? (
                <CheckCircle className="w-5 h-5 text-success" />
              ) : (
                <Info className="w-5 h-5 text-primary" />
              )}
            </motion.div>
            {question.q}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 text-base-content/60" />
          </motion.div>
        </div>
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="collapse-content overflow-hidden"
        >
          <div className="p-4 pt-0 bg-base-200/70 rounded-b-2xl">
            <p className="text-base text-base-content/80 leading-relaxed border-l-4 border-success pl-4 py-1">
              {question.a}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// --- Floating Contact Card (unchanged core, minor UI tweaks) ---
const FloatingContactCard = ({ onSubmit, isSubmitting, setIsSubmitted }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!form.name) err.name = "নাম প্রয়োজন";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
      err.email = "সঠিক ইমেইল দিন";
    if (!form.message) err.message = "বার্তা লিখুন";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={() => setIsSubmitted(false)}
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        initial={{ scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 40 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-success rounded-3xl blur-2xl opacity-30 animate-pulse"></div>

        <div className="relative card bg-base-100 shadow-2xl rounded-3xl p-6 border border-base-300">
          <button
            onClick={() => setIsSubmitted(false)}
            className="absolute top-4 right-4 btn btn-ghost btn-circle z-10"
            aria-label="Close contact"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary to-success rounded-full mb-3 shadow-lg">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold">সরাসরি যোগাযোগ</h3>
            <p className="text-sm text-base-content/70 mt-1">
              আপনার প্রশ্ন লিখুন — আমরা সাধারণত ২৪ ঘণ্টার মধ্যে উত্তর দিই।
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  placeholder="আপনার নাম"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`input input-bordered w-full ${
                    errors.name ? "input-error" : ""
                  }`}
                  aria-label="Name"
                />
                {errors.name && (
                  <p className="text-error text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="আপনার ইমেইল"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`input input-bordered w-full ${
                    errors.email ? "input-error" : ""
                  }`}
                  aria-label="Email"
                />
                {errors.email && (
                  <p className="text-error text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <textarea
              placeholder="আপনার বার্তা লিখুন..."
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`textarea textarea-bordered w-full resize-none ${
                errors.message ? "textarea-error" : ""
              }`}
              aria-label="Message"
            />
            {errors.message && (
              <p className="text-error text-xs -mt-2">{errors.message}</p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="btn w-full h-12 text-white font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-success border-0"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner text-white"></span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  বার্তা পাঠান
                </>
              )}
            </motion.button>
          </form>

          <div className="flex justify-center gap-6 mt-4 text-sm text-base-content/60 border-t border-base-300 pt-3">
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-primary" />
              <span>24/7 সাপোর্ট</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-success" />
              <span>গ্যারান্টেড রিপ্লাই</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- New: Animated/Floating Search Input with tags/suggestions ---
const AnimatedSearchInput = ({
  value,
  onChange,
  onClear,
  placeholder,
  onSubmit,
  popularTags = [],
}) => {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState(value || "");

  useEffect(() => setQuery(value || ""), [value]);

  const handleKey = (e) => {
    if (e.key === "Enter") {
      onSubmit && onSubmit(query);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`relative bg-base-100/60 backdrop-blur-sm border ${
          focused ? "border-primary shadow-lg" : "border-base-300"
        } rounded-full flex items-center px-4 py-2 transition-all`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-gradient-to-br from-primary/90 to-success/90 text-white shadow-md hidden sm:flex">
            <Search className="w-4 h-4" />
          </div>
        </div>

        <div className="flex-1 ml-2">
          <label
            className={`block text-xs transition-all select-none pointer-events-none ${
              focused || query
                ? "text-primary/80 -translate-y-4 text-[11px]"
                : "text-base-content/60"
            }`}
            aria-hidden
          >
            {placeholder}
          </label>
          <input
            aria-label="Search questions"
            className="bg-transparent outline-none w-full text-sm sm:text-base placeholder-transparent"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onChange && onChange(e.target.value);
            }}
            onKeyDown={handleKey}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
          />
        </div>

        <div className="flex items-center gap-2">
          {query ? (
            <button
              aria-label="Clear search"
              onClick={() => {
                setQuery("");
                onChange && onChange("");
                onClear && onClear();
              }}
              className="btn btn-ghost btn-sm btn-circle"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          ) : (
            <span className="hidden sm:inline text-xs text-base-content/60 px-2">
              Try: পাসওয়ার্ড, তারিখ, লগইন
            </span>
          )}

          <button
            onClick={() => onSubmit && onSubmit(query)}
            className="btn btn-sm btn-primary rounded-full ml-1"
            aria-label="Search"
          >
            খুঁজুন
          </button>
        </div>
      </div>

      {/* Popular tags: small quick-filters */}
      {popularTags && popularTags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {popularTags.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => {
                onChange(t);
                onSubmit && onSubmit(t);
              }}
              className="btn btn-xs btn-ghost rounded-full text-sm"
            >
              {t}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Top CTA Banner/Alert to entice users to contact ---
const ContactAlertBanner = ({
  onOpen,
  visible,
  dismissKey = "helpdsk_alert_v1",
}) => {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(dismissKey);
    if (stored === "dismissed") setDismissed(true);
  }, [dismissKey]);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem(dismissKey, "dismissed");
  };

  if (!visible || dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      className="max-w-7xl mx-auto mb-6 p-3 rounded-2xl overflow-hidden"
    >
      <div className="relative rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-success/80 mix-blend-overlay opacity-30 animate-pulse"></div>
        <div className="relative card bg-base-100 shadow-xl p-4 md:p-5 border border-base-300 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-success flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-base">তৎক্ষণাত সাহায্য চান?</p>
              <p className="text-sm text-base-content/70">
                আমাদের টিম সাধারণত ২৪ ঘণ্টার মধ্যে উত্তর দেয় — চ্যাট শুরু করুন
                বা মেসেজ পাঠান।
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpen}
              className="btn btn-sm bg-gradient-to-r from-primary to-success text-white border-0"
              aria-label="Open contact"
            >
              যোগাযোগ করুন
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>

            <button
              onClick={handleDismiss}
              className="btn btn-ghost btn-sm btn-circle"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- The Main HelpDsk Component ---
const HelpDsk = () => {
  const { mode, toggleTheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState(faqData[0].category);
  const [openQ, setOpenQ] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showContact, setShowContact] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [alertVisible, setAlertVisible] = useState(true);

  const selectedCategory = faqData.find((f) => f.category === activeCategory);

  // Filtering based on both question (q) and answer (a)
  const filteredQuestions = selectedCategory.questions.filter(
    (q) =>
      q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1400));
    console.log("Contact submitted:", data);
    setIsSubmitting(false);
    setShowContact(false);
    setToastMessage({
      type: "success",
      text: "আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে! ধন্যবাদ।",
    });
    setTimeout(() => setToastMessage(null), 4200);
  };

  useEffect(() => {
    setOpenQ(null);
  }, [activeCategory, searchTerm]);

  // Small micro-copy based suggestions for the search input
  const popular = ["পাসওয়ার্ড", "তারিখ", "লগইন", "ইভেন্ট তৈরি"];

  const Toast = ({ message }) => (
    <motion.div
      initial={{ x: 120, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 120, opacity: 0 }}
      className="toast toast-end z-50"
    >
      <div
        className={`alert ${
          message.type === "success" ? "alert-success" : "alert-error"
        } shadow-lg`}
      >
        {message.type === "success" ? <CheckCircle /> : <AlertCircle />}
        <span>{message.text}</span>
      </div>
    </motion.div>
  );

  return (
    <>
      <div className="min-h-screen bg-base-200 py-10 md:py-16 px-4 relative">
        <button
          onClick={toggleTheme}
          className="btn btn-circle btn-ghost absolute top-6 right-6 z-30 transition-all hover:scale-110"
          aria-label="Toggle Theme"
        >
          {mode === "dark" ? (
            <Sun className="w-6 h-6 text-warning" />
          ) : (
            <Moon className="w-6 h-6 text-blue-800" />
          )}
        </button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-6 md:mb-10">
            <motion.h1
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-primary via-success to-primary bg-clip-text text-transparent"
            >
              সহায়তা কেন্দ্র
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-base md:text-lg text-base-content/70 mt-2 max-w-2xl mx-auto"
            >
              আপনার সকল প্রশ্নের উত্তর এক ক্লিকে। আমরা আছি আপনার পাশে — সহজ,
              দ্রুত এবং মানবিক সমাধান সহ।
            </motion.p>
          </div>

          {/* CTA Alert */}
          <ContactAlertBanner
            visible={alertVisible}
            onOpen={() => {
              setShowContact(true);
              setAlertVisible(false);
            }}
          />

          {/* Search and categories */}
          <motion.div
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <AnimatedSearchInput
              value={searchTerm}
              onChange={(v) => setSearchTerm(v)}
              onClear={() => setSearchTerm("")}
              onSubmit={() => {}}
              placeholder="প্রশ্ন বা উত্তর খুঁজুন... (উদাহরণ: পাসওয়ার্ড)"
              popularTags={popular}
            />
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-8 p-3 bg-base-100 rounded-3xl shadow-xl border border-base-300">
            {faqData.map((item) => (
              <motion.button
                key={item.category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(item.category)}
                className={`btn btn-lg rounded-full flex items-center gap-2 transition-all font-semibold ${
                  activeCategory === item.category
                    ? "bg-gradient-to-r from-primary to-success text-white border-0 shadow-lg"
                    : "btn-ghost text-base-content/80 hover:bg-base-300"
                }`}
                aria-pressed={activeCategory === item.category}
              >
                <item.icon className="w-5 h-5" />
                <span className="hidden sm:inline">{item.label}</span>
                <span
                  className={`badge ${
                    activeCategory === item.category
                      ? "badge-ghost text-base-content"
                      : "badge-primary"
                  }`}
                >
                  {item.count}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="hidden lg:block">
              <div className="card bg-base-100 shadow-2xl p-6 sticky top-24 border border-base-300 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  বিষয়সমূহ
                </h3>
                <div className="space-y-2">
                  {faqData.map((item) => (
                    <motion.button
                      key={item.category}
                      whileHover={{ x: 5 }}
                      onClick={() => setActiveCategory(item.category)}
                      className={`btn btn-ghost w-full justify-start gap-3 transition-colors ${
                        activeCategory === item.category
                          ? "btn-primary font-bold text-base-content"
                          : "text-base-content/80 hover:bg-base-200"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color}`}
                      ></div>
                      {item.label} ({item.count})
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="card bg-base-100 shadow-2xl p-6 md:p-8 rounded-2xl border border-base-300"
              >
                <h3 className="text-2xl md:text-4xl font-extrabold mb-6 flex items-center gap-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${selectedCategory.color} rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    <selectedCategory.icon className="w-7 h-7 text-white" />
                  </div>
                  {selectedCategory.label}
                </h3>

                <div className="space-y-1">
                  {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((q, i) => (
                      <AnimatedAccordion
                        key={i}
                        question={q}
                        isOpen={openQ === i}
                        onClick={() => setOpenQ(openQ === i ? null : i)}
                        index={i}
                      />
                    ))
                  ) : (
                    <motion.div
                      initial={{ scale: 0.98 }}
                      animate={{ scale: 1 }}
                      className="alert alert-info shadow-md rounded-xl p-6 flex flex-col md:flex-row items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-6 h-6" />
                        <p className="font-semibold">
                          কোনো প্রশ্ন পাওয়া যায়নি।
                        </p>
                      </div>

                      <button
                        onClick={() => setShowContact(true)}
                        className="btn btn-sm btn-primary mt-3 md:mt-0"
                      >
                        সরাসরি জিজ্ঞেস করুন
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          <motion.button
            id="floating-contact-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowContact(true)}
            className="fixed bottom-6 right-6 btn btn-circle btn-lg shadow-2xl z-40 bg-gradient-to-br from-primary to-success text-white border-none transition-all"
            aria-label="Open Contact Form"
          >
            <Mail className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContact && (
          <FloatingContactCard
            onSubmit={handleContactSubmit}
            isSubmitting={isSubmitting}
            setIsSubmitted={setShowContact}
          />
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && <Toast message={toastMessage} />}
      </AnimatePresence>
    </>
  );
};

export default HelpDsk;
