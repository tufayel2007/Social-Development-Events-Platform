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
import { useTheme } from "../../context/ThemeContext";

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

const AccordionItem = ({ question, isOpen, onClick }) => {
  return (
    <div className="collapse collapse-arrow border-b border-base-300">
      <input type="checkbox" checked={isOpen} onChange={onClick} />
      <div className="collapse-title text-lg font-medium flex items-center justify-between">
        <span>{question.q}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      <div className="collapse-content">
        <div className="alert alert-success p-3 rounded-lg mt-2">
          <p className="text-sm">{question.a}</p>
        </div>
      </div>
    </div>
  );
};

const SuccessModal = ({ setIsSubmitted }) => (
  <div className="modal modal-open">
    <div className="modal-box bg-base-100 border-4 border-success">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="flex justify-center mb-4"
      >
        <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center">
          <Zap className="w-8 h-8 text-success" />
        </div>
      </motion.div>
      <h3 className="text-2xl font-bold text-center">সফলভাবে পাঠানো হয়েছে!</h3>
      <p className="text-center mt-2 text-base-content/70">
        আপনার বার্তা সফলভাবে পাঠানো হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
      </p>
      <div className="modal-action">
        <button
          onClick={() => setIsSubmitted(false)}
          className="btn btn-success w-full"
        >
          বন্ধ করুন
        </button>
      </div>
    </div>
  </div>
);

const HelpDsk = () => {
  const { mode, toggleTheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState(faqData[0].category);
  const [openQ, setOpenQ] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedCategory = faqData.find((f) => f.category === activeCategory);
  const filteredQuestions = selectedCategory.questions.filter((q) =>
    q.q.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    console.log("Contact form submitted:", contactForm);
    setIsSubmitted(true);
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-base-200 py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
            সহায়তা কেন্দ্র
          </h1>
          <p className="text-xl text-base-content/70 mt-2">
            আমরা আপনাকে কীভাবে সাহায্য করতে পারি?
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl p-6">
              <h3 className="text-2xl font-bold mb-4">বিষয়বস্তু</h3>
              <div className="space-y-2">
                {faqData.map((item) => (
                  <button
                    key={item.category}
                    onClick={() => handleCategoryClick(item.category)}
                    className={`btn btn-ghost w-full justify-start gap-3 ${
                      activeCategory === item.category ? "btn-primary" : ""
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="card bg-base-100 shadow-xl p-6">
              <div className="form-control mb-6">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="সহায়তা সম্পর্কিত প্রশ্ন খুঁজুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-full"
                  />
                  <button className="btn btn-square btn-primary">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <selectedCategory.icon className="w-6 h-6 text-primary" />
                {selectedCategory.label} (FAQ)
              </h3>

              <div className="bg-base-200 rounded-xl p-4">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((q, i) => (
                    <AccordionItem
                      key={i}
                      question={q}
                      isOpen={openQ === i}
                      onClick={() => setOpenQ(openQ === i ? null : i)}
                    />
                  ))
                ) : (
                  <div className="alert alert-info">
                    <p>এই বিষয়ে কোনো প্রশ্ন পাওয়া যায়নি।</p>
                  </div>
                )}
              </div>

              <div className="mt-8 p-6 bg-base-200 rounded-xl">
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" /> সরাসরি যোগাযোগ
                </h4>
                <p className="text-base-content/70 mb-4">
                  যদি আপনার সমস্যার সমাধান না হয়, তবে নিচের ফর্মটি পূরণ করে
                  আমাদের জানান।
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="আপনার নাম"
                    value={contactForm.name}
                    onChange={handleFormChange}
                    className="input input-bordered w-full"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="ইমেইল অ্যাড্রেস"
                    value={contactForm.email}
                    onChange={handleFormChange}
                    className="input input-bordered w-full"
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="বিস্তারিত বার্তা..."
                    rows={4}
                    value={contactForm.message}
                    onChange={handleFormChange}
                    className="textarea textarea-bordered w-full"
                    required
                  />
                  <button type="submit" className="btn btn-primary w-full">
                    বার্তা পাঠান
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isSubmitted && <SuccessModal setIsSubmitted={setIsSubmitted} />}
      </AnimatePresence>
    </div>
  );
};

export default HelpDsk;
