// src/pages/Home/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

// Placeholder Images (আসল ছবি দিয়ে বদলাবে)
import bannerImg from "../../assets/bannerImg.png";
import gallery1 from "../../assets/bannerImg.png";
import gallery2 from "../../assets/bannerImg.png";
import gallery3 from "../../assets/bannerImg.png";
import gallery4 from "../../assets/bannerImg.png";
import gallery5 from "../../assets/bannerImg.png";
import gallery6 from "../../assets/bannerImg.png";
import avatar1 from "../../assets/bannerImg.png";
import avatar2 from "../../assets/bannerImg.png";
import avatar3 from "../../assets/bannerImg.png";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  // Dark Mode Toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Stats Counter with useInView
  const [statsRef, statsInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const stats = [
    { end: 5000, label: "সদস্য", suffix: "+" },
    { end: 250, label: "ইভেন্ট", suffix: "+" },
    { end: 12000, label: "গাছ লাগানো", suffix: "+" },
    { end: 98, label: "সন্তুষ্টি", suffix: "%" },
  ];

  // Features
  const features = [
    {
      icon: "Environment",
      title: "পরিবেশ পরিচ্ছন্নতা",
      desc: "আপনার এলাকা পরিষ্কার রাখুন",
      color: "emerald",
    },
    {
      icon: "Tree",
      title: "বৃক্ষরোপণ",
      desc: "প্রতি সপ্তাহে নতুন গাছ",
      color: "lime",
    },
    {
      icon: "Blood",
      title: "রক্তদান",
      desc: "জীবন বাঁচান, রক্ত দিন",
      color: "red",
    },
    {
      icon: "Book",
      title: "শিক্ষা সহায়তা",
      desc: "গরিব শিশুদের পড়ান",
      color: "blue",
    },
    {
      icon: "Water",
      title: "পানি সরবরাহ",
      desc: "গ্রামে বিশুদ্ধ পানি",
      color: "cyan",
    },
    {
      icon: "Hospital",
      title: "স্বাস্থ্য ক্যাম্প",
      desc: "ফ্রি চেকআপ ও ওষুধ",
      color: "pink",
    },
    {
      icon: "Clothes",
      title: "কাপড় বিতরণ",
      desc: "শীতের কাপড় দান",
      color: "purple",
    },
    {
      icon: "Food",
      title: "খাদ্য সহায়তা",
      desc: "ক্ষুধার্তদের খাওয়ান",
      color: "orange",
    },
    {
      icon: "Bag",
      title: "স্কুল সামগ্রী",
      desc: "বই-খাতা বিতরণ",
      color: "indigo",
    },
    {
      icon: "Tools",
      title: "ইনফ্রাস্ট্রাকচার",
      desc: "রাস্তা, পুল মেরামত",
      color: "yellow",
    },
    {
      icon: "Handshake",
      title: "সম্প্রদায় গঠন",
      desc: "মিলনমেলা আয়োজন",
      color: "teal",
    },
    {
      icon: "Globe",
      title: "জলবায়ু সচেতনতা",
      desc: "পরিবেশ শিক্ষা",
      color: "green",
    },
    {
      icon: "Recycle",
      title: "রিসাইক্লিং",
      desc: "বর্জ্য পুনর্ব্যবহার",
      color: "gray",
    },
    {
      icon: "Broom",
      title: "ডাস্টবিন স্থাপন",
      desc: "পরিচ্ছন্নতা উন্নয়ন",
      color: "zinc",
    },
    {
      icon: "Toilet",
      title: "পাবলিক টয়লেট",
      desc: "স্বাস্থ্যবিধি উন্নয়ন",
      color: "stone",
    },
  ];

  // Gallery
  const gallery = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
    gallery1,
    gallery2,
  ];

  // Testimonials
  const testimonials = [
    {
      name: "রহিম আহমেদ",
      role: "স্বেচ্ছাসেবী",
      text: "এই প্ল্যাটফর্ম আমার জীবন বদলে দিয়েছে।",
      avatar: avatar1,
    },
    {
      name: "ফাতেমা খাতুন",
      role: "ইভেন্ট অর্গানাইজার",
      text: "এক ক্লিকে ১০০+ মানুষ জয়েন করেছে!",
      avatar: avatar2,
    },
    {
      name: "কামরুল ইসলাম",
      role: "সদস্য",
      text: "প্রতি সপ্তাহে নতুন কিছু করার সুযোগ পাই।",
      avatar: avatar3,
    },
  ];

  // FAQ
  const faqs = [
    {
      q: "কিভাবে ইভেন্ট তৈরি করব?",
      a: "ড্যাশবোর্ডে গিয়ে 'নতুন ইভেন্ট' বাটনে ক্লিক করুন।",
    },
    { q: "ইভেন্টে জয়েন করতে কি লাগবে?", a: "শুধু একটি অ্যাকাউন্ট এবং ইচ্ছা!" },
    { q: "এটা কি ফ্রি?", a: "হ্যাঁ, সম্পূর্ণ ফ্রি।" },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "dark bg-gray-900"
          : "bg-gradient-to-b from-green-50 to-white"
      }`}
    >
      {/* Floating CTA */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Link
          to="/upcomingEvents"
          className="bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-700 transform hover:scale-110 transition-all flex items-center gap-2"
        >
          <span className="text-2xl">Join</span>
          <span className="font-bold">জয়েন করুন</span>
        </Link>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-600 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-6 right-6 z-50 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:scale-110 transition-all"
      >
        {darkMode ? "Sun" : "Moon"}
      </button>

      {/* 1. Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: scaleProgress, opacity: opacityProgress }}
          className="absolute inset-0"
        >
          <img
            src={bannerImg}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            একসাথে গড়ি <span className="text-emerald-400">সুন্দর সমাজ</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-emerald-100 mb-8"
          >
            স্থানীয় পরিবেশ, শিক্ষা, স্বাস্থ্য — সবই এক ক্লিকে!
          </motion.p>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/upcomingEvents"
              className="px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-full shadow-xl transform hover:scale-105 transition-all"
            >
              আজই শুরু করুন
            </Link>
            <Link
              to="/about"
              className="px-10 py-4 bg-white/20 backdrop-blur-sm text-white font-bold text-lg rounded-full border-2 border-white hover:bg-white hover:text-emerald-600 transition-all"
            >
              আরও জানুন
            </Link>
          </motion.div>
        </div>

        {/* Live Ticker */}
        <div className="absolute bottom-0 w-full bg-black/50 backdrop-blur-sm py-3 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap text-emerald-300 font-medium">
            <span className="mx-4">
              Green ১৫ মিনিট আগে: ধানমন্ডিতে পরিচ্ছন্নতা অভিযান শুরু
            </span>
            <span className="mx-4">
              Green ২ ঘণ্টা আগে: ৫০+ গাছ লাগানো হয়েছে
            </span>
            <span className="mx-4">
              Green নতুন ইভেন্ট: রক্তদান ক্যাম্প, ১২ নভেম্বর
            </span>
          </div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section
        ref={statsRef}
        className="py-20 px-6 bg-emerald-50 dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg"
            >
              <div className="text-4xl md:text-5xl font-bold text-emerald-600 dark:text-emerald-400">
                {statsInView && (
                  <CountUp end={stat.end} duration={2.5} suffix={stat.suffix} />
                )}
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-white mb-16"
          >
            আমাদের <span className="text-emerald-600">সেবাসমূহ</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-gray-100 dark:border-gray-700"
              >
                <div
                  className={`text-4xl mb-4 group-hover:scale-110 transition-transform`}
                >
                  {f.icon}
                </div>
                <h3
                  className={`text-xl font-bold text-${f.color}-600 dark:text-${f.color}-400 mb-2`}
                >
                  {f.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Gallery with Lightbox */}
      <section className="py-20 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-white mb-16"
          >
            আমাদের <span className="text-emerald-600">স্মৃতিচারণ</span>
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(img)}
                className="overflow-hidden rounded-xl shadow-md cursor-zoom-in"
              >
                <img src={img} alt="" className="w-full h-48 object-cover" />
              </motion.div>
            ))}
          </div>

          {/* Lightbox */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <img
                src={selectedImage}
                alt=""
                className="max-w-full max-h-full rounded-xl"
              />
              <button className="absolute top-6 right-6 text-white text-4xl">
                ×
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-20 px-6 bg-emerald-600">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
          >
            তারা কী বলছে
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-white"
              >
                <p className="italic mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-sm text-emerald-200">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-white mb-16"
          >
            প্রশ্নোত্তর
          </motion.h2>

          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="mb-4"
            >
              <details className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 cursor-pointer">
                <summary className="font-bold text-lg text-emerald-600 dark:text-emerald-400">
                  {faq.q}
                </summary>
                <p className="mt-3 text-gray-600 dark:text-gray-300">{faq.a}</p>
              </details>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. Newsletter */}
      <section className="py-20 px-6 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            নতুন ইভেন্টের খবর পান
          </motion.h2>
          <p className="text-xl text-emerald-100 mb-10">
            প্রতি সপ্তাহে আসন্ন ইভেন্টের আপডেট সরাসরি আপনার ইনবক্সে
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("সাবস্ক্রাইব সফল! Success");
              setEmail("");
            }}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="আপনার ইমেইল"
              className="flex-1 px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-emerald-300"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-full hover:bg-gray-100 transition-all shadow-lg"
            >
              সাবস্ক্রাইব
            </button>
          </form>
          <p className="text-sm text-emerald-200 mt-4">
            কোনো স্প্যাম নয়। যেকোনো সময় আনসাবস্ক্রাইব করতে পারবেন।
          </p>
        </div>
      </section>

      {/* Marquee Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
