/* eslint-disable no-unused-vars */
import React, { useState } from "react";
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
} from "lucide-react";

// ডেমো FAQ ডেটা
const faqData = [
  {
    category: "Authentication",
    label: "অ্যাকাউন্ট ও লগইন",
    icon: Lock,
    questions: [
      {
        q: "আমি কীভাবে একটি শক্তিশালী পাসওয়ার্ড তৈরি করব?",
        a: "আপনার পাসওয়ার্ডে কমপক্ষে ৬টি অক্ষর, একটি বড় হাতের অক্ষর (Uppercase), একটি ছোট হাতের অক্ষর (Lowercase) এবং একটি সংখ্যা বা প্রতীক থাকতে হবে।",
      },
      {
        q: "লগইন করার পরেও আমি কেন ব্যক্তিগত পেজ দেখতে পাচ্ছি না?",
        a: "যদি লগইন করার পরেও সমস্যা হয়, তবে নিশ্চিত করুন আপনার ব্রাউজারে কুকিজ চালু আছে। সমস্যা চলতে থাকলে একবার লগআউট করে আবার লগইন করুন।",
      },
    ],
  },
  {
    category: "EventCreation",
    label: "ইভেন্ট তৈরি ও সম্পাদনা",
    icon: CalendarCheck,
    questions: [
      {
        q: "আমি কি পেছনের কোনো তারিখে ইভেন্ট তৈরি করতে পারব?",
        a: "না। আমাদের প্ল্যাটফর্ম শুধুমাত্র ভবিষ্যতের ইভেন্টগুলির জন্য। তারিখ নির্বাচনের সময় বর্তমান বা অতীত কোনো তারিখ নির্বাচন করা যাবে না।",
      },
      {
        q: "ইভেন্ট তৈরি করার জন্য কী কী তথ্য প্রয়োজন?",
        a: "শিরোনাম, বিবরণ, ইভেন্টের ধরন, থাম্বনেইল ইমেজ URL, স্থান এবং ভবিষ্যতের একটি তারিখ প্রয়োজন।",
      },
    ],
  },
  {
    category: "Participation",
    label: "ইভেন্টে যোগদান ও পরিচালনা",
    icon: Zap,
    questions: [
      {
        q: "ইভেন্টের বিস্তারিত দেখতে কি লগইন করতে হবে?",
        a: "না, ইভেন্টের বিস্তারিত (Details) পেজটি পাবলিক। কিন্তু ইভেন্টে 'Join' করতে হলে অবশ্যই আপনাকে লগইন করতে হবে।",
      },
      {
        q: "আমি কি অন্য কারো তৈরি ইভেন্ট এডিট বা ডিলিট করতে পারি?",
        a: "না। আপনি শুধুমাত্র আপনার নিজের তৈরি করা ইভেন্টগুলিই এডিট করতে পারবেন। এটি ব্যবহারকারীর ডেটার নিরাপত্তার জন্য করা হয়েছে।",
      },
    ],
  },
];

// ছোট কম্পোনেন্ট: প্রতিটি FAQ আইটেম
const AccordionItem = ({ question, isOpen, onClick }) => {
  return (
    <motion.div
      layout
      className="border-b border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <motion.button
        layout
        onClick={onClick}
        className="w-full text-left py-4 px-6 flex justify-between items-center transition-colors hover:bg-emerald-50 dark:hover:bg-gray-700/50"
      >
        <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {question.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="px-6 pb-4 text-gray-600 dark:text-gray-300"
          >
            <p className="border-l-4 border-emerald-500 pl-4 py-1 bg-emerald-50 dark:bg-gray-700/30 rounded-r-md">
              {question.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// কাস্টম অ্যানিমেটেড সাকসেস মডাল
const SuccessModal = ({ setIsSubmitted }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
  >
    {/* Backdrop */}
    <div
      className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      onClick={() => setIsSubmitted(false)}
    ></div>

    {/* Modal Content */}
    <motion.div
      initial={{ scale: 0.7, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.7, y: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-sm w-full relative transform overflow-hidden border-4 border-emerald-500 dark:border-emerald-400"
    >
      <div className="text-center">
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 10,
          }}
          className="mx-auto w-16 h-16 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mb-4"
        >
          <Zap className="w-8 h-8 text-emerald-600 dark:text-emerald-300" />
        </motion.div>

        {/* Text Content */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          সফলভাবে পাঠানো হয়েছে!
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          📩 আপনার বার্তা সফলভাবে পাঠানো হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ
          করব।
        </p>

        {/* Close Button */}
        <button
          onClick={() => setIsSubmitted(false)}
          className="w-full py-2 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
        >
          বন্ধ করুন
        </button>
      </div>
    </motion.div>
  </motion.div>
);

const HelpDsk = ({ darkMode, setDarkMode }) => {
  const [activeCategory, setActiveCategory] = useState(faqData[0].category);
  const [openQ, setOpenQ] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // Success Modal State

  const selectedCategory = faqData.find((f) => f.category === activeCategory);

  const filteredQuestions = selectedCategory
    ? selectedCategory.questions.filter((q) =>
        q.q.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setOpenQ(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // এখানে আপনি আপনার সার্ভার বা API এ ডেটা পাঠানোর লজিক যোগ করতে পারেন

    // সিমুলেটিং ফর্ম সাবমিশন এবং সফলতার বার্তা দেখানো
    console.log("Contact form submitted:", contactForm);

    // সফলতার পর মডাল দেখানোর জন্য স্টেট সেট করা
    setIsSubmitted(true);

    // ফর্ম রিসেট করা
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header Section - Same style as homepage main heading */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            সহায়তা কেন্দ্র
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            আমরা আপনাকে কীভাবে সাহায্য করতে পারি?
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-200 dark:border-gray-700">
          {/* Column 1: Side Navigation (Left) */}
          <div className="w-full lg:w-1/4">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 border-b pb-2 border-gray-200 dark:border-gray-700">
              বিষয়বস্তু
            </h3>
            <div className="space-y-2">
              {faqData.map((item) => (
                <motion.button
                  key={item.category}
                  onClick={() => handleCategoryClick(item.category)}
                  whileHover={{ x: 5 }}
                  className={`w-full text-left py-3 px-4 rounded-xl flex items-center gap-3 transition-all duration-300 ${
                    activeCategory === item.category
                      ? "bg-emerald-600 text-white shadow-lg font-bold"
                      : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-emerald-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Theme Toggle Button */}
            {setDarkMode && (
              <motion.button
                onClick={() => setDarkMode(!darkMode)}
                className="mt-6 w-full p-4 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-purple-600 dark:to-pink-600 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] text-white font-bold"
              >
                {darkMode ? (
                  <>
                    <Sun className="w-6 h-6 text-yellow-200" /> লাইট মোড
                  </>
                ) : (
                  <>
                    <Moon className="w-6 h-6 text-gray-800" /> ডার্ক মোড
                  </>
                )}
              </motion.button>
            )}
          </div>

          {/* Column 2: Search & FAQ Content (Right/Main) */}
          <motion.div
            key={activeCategory} // ক্যাটাগরি পরিবর্তন হলে অ্যানিমেশন ট্রিগার
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-3/4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6"
          >
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5" />
              <motion.input
                type="text"
                placeholder="সহায়তা সম্পর্কিত প্রশ্ন খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="w-full pl-12 pr-4 py-4 text-base rounded-xl border-2 border-gray-300 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-400 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              />
            </div>

            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <selectedCategory.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              {selectedCategory?.label} (FAQ)
            </h3>

            {/* Accordion List */}
            <div className="shadow-lg rounded-xl overflow-hidden bg-white dark:bg-gray-800">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((q, index) => (
                  <AccordionItem
                    key={index}
                    question={q}
                    isOpen={openQ === index}
                    onClick={() => setOpenQ(openQ === index ? null : index)}
                  />
                ))
              ) : (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  এই বিষয়ে কোনো প্রশ্ন পাওয়া যায়নি।
                </div>
              )}
            </div>

            {/* Contact Form Section */}
            <div className="mt-10 p-6 bg-emerald-50 dark:bg-gray-700 rounded-2xl shadow-inner border border-emerald-200 dark:border-gray-600">
              <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-3">
                <Mail className="w-5 h-5 text-emerald-700" /> সরাসরি যোগাযোগ
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                যদি আপনার সমস্যার সমাধান না হয়, তবে নিচের ফর্মটি পূরণ করে
                আমাদের জানান।
              </p>

              {/* Contact Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="আপনার নাম"
                  value={contactForm.name}
                  onChange={handleFormChange}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="ইমেইল অ্যাড্রেস"
                  value={contactForm.email}
                  onChange={handleFormChange}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  required
                />
                <textarea
                  name="message"
                  placeholder="বিস্তারিত বার্তা..."
                  rows="4"
                  value={contactForm.message}
                  onChange={handleFormChange}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg transition-all"
                >
                  বার্তা পাঠান
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated Success Modal */}
      <AnimatePresence>
        {isSubmitted && <SuccessModal setIsSubmitted={setIsSubmitted} />}
      </AnimatePresence>
    </div>
  );
};

export default HelpDsk;
