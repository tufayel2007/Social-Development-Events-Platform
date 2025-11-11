/* eslint-disable no-unused-vars */
/* src/components/home/NewsletterSection.jsx */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Mail,
  Loader2,
  CheckCircle,
  XCircle,
  Sparkles,
  Star,
  Zap,
  Trophy,
  Send,
} from "lucide-react";
import Confetti from "react-confetti";

const NewsletterSection = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, typing, loading, success, error
  const [showConfetti, setShowConfetti] = useState(false);
  const [reward, setReward] = useState(null);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const rewards = [
    { icon: Trophy, text: "আপনি ১ম ১০০ সাবস্ক্রাইবার!" },
    { icon: Star, text: "ফ্রি ই-বুক পেয়েছেন!" },
    { icon: Zap, text: "প্রাইভেট ইভেন্টে আমন্ত্রণ!" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setShowConfetti(true);
      setReward(rewards[Math.floor(Math.random() * rewards.length)]);

      setTimeout(() => {
        setShowConfetti(false);
        setEmail("");
        setStatus("idle");
        setReward(null);
      }, 5000);
    }, 1500);
  };

  // Typing animation
  useEffect(() => {
    if (email.length > 0 && status === "idle") {
      setStatus("typing");
    } else if (email.length === 0 && status === "typing") {
      setStatus("idle");
    }
  }, [email, status]);

  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      <section
        ref={ref}
        className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 20% 80%, rgba(52, 211, 153, 0.4) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(45, 212, 191, 0.4) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.4) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600" />
        </div>

        <div className="max-w-5xl mx-auto text-center">
          {/* Floating Orbs */}
          {inView && (
            <>
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-400/30 rounded-full blur-3xl"
              />
              <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, -180, -360] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-400/30 rounded-full blur-3xl"
              />
            </>
          )}

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-5 py-3 bg-white/20 backdrop-blur-md rounded-full text-white font-bold text-sm mb-6 border border-white/30"
            >
              <Sparkles className="w-5 h-5" />
              এক্সক্লুসিভ আপডেট
            </motion.div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              প্রথম জানুন,{" "}
              <motion.span
                animate={{ backgroundPosition: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 bg-size-200"
                style={{ backgroundSize: "200%" }}
              >
                প্রথম অংশগ্রহণ করুন
              </motion.span>
            </h2>

            <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto mb-10">
              নতুন ইভেন্ট, টিপস, গিভঅ্যাওয়ে — সবার আগে আপনার ইনবক্সে!
            </p>
          </motion.div>

          {/* Interactive Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="relative max-w-xl mx-auto"
          >
            <div className="relative group">
              {/* Email Input */}
              <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30">
                <div className="relative flex-1">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-white/70 group-focus-within:text-yellow-400 transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="আপনার ইমেইল দিন..."
                    className={`w-full pl-14 pr-6 py-5 rounded-2xl bg-transparent text-white placeholder-white/60 text-lg focus:outline-none transition-all ${
                      status === "error" ? "ring-2 ring-red-400" : ""
                    }`}
                  />
                  {/* Typing Indicator */}
                  <AnimatePresence>
                    {status === "typing" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1"
                      >
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: 0,
                          }}
                          className="w-1 h-1 bg-white rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: 0.1,
                          }}
                          className="w-1 h-1 bg-white rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: 0.2,
                          }}
                          className="w-1 h-1 bg-white rounded-full"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={status === "loading"}
                  className="px-8 py-5 bg-gradient-to-r from-yellow-400 to-pink-500 text-emerald-900 font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 transition-all"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      পাঠানো হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      সাবস্ক্রাইব করুন
                    </>
                  )}
                </motion.button>
              </div>

              {/* Floating Reward Badge */}
              <AnimatePresence>
                {status === "success" && reward && (
                  <motion.div
                    initial={{ scale: 0, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white text-emerald-600 px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 font-bold text-sm whitespace-nowrap"
                  >
                    <reward.icon className="w-5 h-5 text-yellow-500" />
                    {reward.text}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Status Messages */}
            <AnimatePresence>
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-300 mt-4 flex items-center justify-center gap-1"
                >
                  <XCircle className="w-5 h-5" />
                  সঠিক ইমেইল দিন
                </motion.p>
              )}
              {status === "success" && !reward && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-emerald-100 mt-4 flex items-center justify-center gap-1"
                >
                  <CheckCircle className="w-5 h-5" />
                  সফলভাবে সাবস্ক্রাইব!
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-6 mt-10 text-white/70 text-sm"
          >
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-emerald-300" />
              স্প্যাম নয়
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-emerald-300" />১ ক্লিকে
              আনসাবস্ক্রাইব
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-emerald-300" />
              ১০,০০০+ সাবস্ক্রাইবার
            </span>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default NewsletterSection;
