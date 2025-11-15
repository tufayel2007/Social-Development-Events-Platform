/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";

// Avatar Imports
import avatar1 from "../assets/Rahim.png";
import avatar2 from "../assets/Fatema.png";
import avatar3 from "../assets/Kamrool.png";

const testimonials = [
  {
    name: "রহিম আহমেদ",
    role: "স্বেচ্ছাসেবী",
    text: "এই প্ল্যাটফর্ম আমার জীবন বদলে দিয়েছে। প্রতি সপ্তাহে নতুন কাজ করার সুযোগ পাই।",
    avatar: avatar1,
    rating: 5,
  },
  {
    name: "ফাতেমা খাতুন",
    role: "ইভেন্ট অর্গানাইজার",
    text: "এক ক্লিকে ১০০+ মানুষ জয়েন করেছে! এটা অবিশ্বাস্য।",
    avatar: avatar2,
    rating: 5,
  },
  {
    name: "কামরুল ইসলাম",
    role: "সদস্য",
    text: "প্রতি সপ্তাহেই নতুন কিছু করার সুযোগ পাই। আমি গর্বিত।",
    avatar: avatar3,
    rating: 5,
  },
];

// ==========================
// 🔥 WaveText FIXED Version
// ==========================
const WaveText = ({ text }) => {
  const segmenter = new Intl.Segmenter("bn", { granularity: "grapheme" });
  const characters = [...segmenter.segment(text)].map((c) => c.segment);

  return (
    <span className="inline-block leading-normal">
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: 0 }}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            delay: i * 0.045,
            ease: "easeInOut",
          }}
          className="inline-block"
          style={{ whiteSpace: "pre", display: "inline-block" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

const TestimonialSection = () => {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // Auto Slide Progress
  useEffect(() => {
    if (inView && !isPaused) {
      const duration = 6000;
      let startTime = Date.now();

      const tick = () => {
        const elapsed = Date.now() - startTime;
        const prog = (elapsed / duration) * 100;

        if (prog >= 100) {
          setIndex((prev) => (prev + 1) % testimonials.length);
          setProgress(0);
          startTime = Date.now();
        } else {
          setProgress(prog);
          requestAnimationFrame(tick);
        }
      };

      const anim = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(anim);
    }
  }, [index, inView, isPaused]);

  // Keyboard Control
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

      if (e.key === "ArrowRight")
        setIndex((i) => (i + 1) % testimonials.length);

      if (e.key === " ") setIsPaused((p) => !p);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const goToSlide = (i) => {
    setIndex(i);
    if (!isPaused) setProgress(0);
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-base-200"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 opacity-20 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-base-200/50 to-secondary/10" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          >
            তারা কী বলছে?
          </motion.h2>
          <p className="mt-4 text-base-content/70 text-lg">
            আমাদের সদস্যদের মতামত
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, rotateY: 10, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, rotateY: 0, x: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: -10, x: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              className="bg-base-100/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl shadow-primary/20 border border-primary/10"
            >
              {/* Quote Icon */}
              <motion.div
                animate={{ scale: [1, 1.06, 1], y: [0, -2, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-16 h-16 mx-auto mb-6 text-primary/30"
              >
                <Quote className="w-full h-full" />
              </motion.div>

              {/* TEXT */}
              <motion.p className="text-xl md:text-2xl text-base-content font-medium italic mb-8 text-center leading-relaxed tracking-tight">
                <WaveText text={`"${testimonials[index].text}"`} />
              </motion.p>

              {/* Avatar */}
              <div className="flex flex-col items-center justify-center gap-3">
                <motion.div whileHover={{ scale: 1.05 }} className="relative">
                  <img
                    src={testimonials[index].avatar}
                    alt={testimonials[index].name}
                    className="w-20 h-20 rounded-full ring-4 ring-primary/40 shadow-xl object-cover"
                  />

                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-primary blur-md opacity-40"
                  />
                </motion.div>

                <div className="text-center mt-2">
                  <p className="font-bold text-lg text-base-content">
                    {testimonials[index].name}
                  </p>
                  <p className="text-sm text-primary/80 font-semibold">
                    {testimonials[index].role}
                  </p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1 mt-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < testimonials[index].rating
                        ? "fill-yellow-400 text-yellow-400 drop-shadow-md"
                        : "fill-gray-300 text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Bar */}
          <div className="mt-6 h-1 bg-base-300/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>

          {/* Left Button */}
          <motion.button
            onClick={() =>
              goToSlide((index - 1 + testimonials.length) % testimonials.length)
            }
            whileHover={{ scale: 1.1, x: -10 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-4 bg-primary/80 rounded-full text-white shadow-xl"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {/* Right Button */}
          <motion.button
            onClick={() => goToSlide((index + 1) % testimonials.length)}
            whileHover={{ scale: 1.1, x: 10 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-4 bg-primary/80 rounded-full text-white shadow-xl"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Pause / Play */}
          <motion.button
            onClick={() => setIsPaused(!isPaused)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 p-3 bg-base-content/10 backdrop-blur rounded-full"
          >
            {isPaused ? (
              <Play className="w-5 h-5 text-base-content/80" />
            ) : (
              <Pause className="w-5 h-5 text-base-content/80" />
            )}
          </motion.button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => goToSlide(i)}
                whileHover={{ scale: 1.2 }}
                className={`h-3 rounded-full transition-all ${
                  i === index
                    ? "bg-primary w-8 shadow-md"
                    : "bg-base-300 w-3 hover:bg-primary/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
