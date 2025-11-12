/* eslint-disable no-unused-vars */
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
  UserCheck,
  LogOut,
} from "lucide-react";

const getInitialSubscriptionStatus = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    return !!localStorage.getItem("newsletter_email");
  }
  return false;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const NewsletterSection = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [isSubscribed, setIsSubscribed] = useState(
    getInitialSubscriptionStatus
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const [reward, setReward] = useState(null);
  const [unsubMessage, setUnsubMessage] = useState(false);

  const [subscriberCount, setSubscriberCount] = useState(() => {
    let initialCount = 10000 + Math.floor(Math.random() * 500);

    if (getInitialSubscriptionStatus()) {
      initialCount += 1;
    }
    return initialCount;
  });

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
      setIsSubscribed(true);

      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("newsletter_email", email);
      }

      setShowConfetti(true);
      setReward(rewards[Math.floor(Math.random() * rewards.length)]);

      setSubscriberCount((prev) => prev + 1);

      setTimeout(() => {
        setShowConfetti(false);
        setEmail("");

        setStatus("idle");
        setReward(null);
      }, 5000);
    }, 1500);
  };

  const handleUnsubscribe = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("newsletter_email");
    }
    setIsSubscribed(false);
    setSubscriberCount((prev) => Math.max(10000, prev - 1));
    setEmail("");
    setStatus("idle");
    setReward(null);
    setUnsubMessage(true);
    setTimeout(() => setUnsubMessage(false), 3000);
  };

  useEffect(() => {
    if (email.length > 0 && status === "idle" && !isSubscribed) {
      setStatus("typing");
    } else if (email.length === 0 && status === "typing") {
      setStatus("idle");
    }
  }, [email, status, isSubscribed]);

  const ConfettiParticles = ({ count = 100 }) => {
    const [particles] = useState(() => {
      const colors = ["#FFD700", "#FF69B4", "#00FFFF", "#32CD32", "#FFFFFF"];
      return Array.from({ length: count }, (_, i) => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.1;
        const duration = 2 + Math.random() * 3;
        const size = 5 + Math.random() * 8;

        return {
          key: i,
          x: x,
          y: y,
          duration: duration,
          size: size,
          color: colors[Math.floor(Math.random() * colors.length)],
        };
      });
    });

    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[99]">
        {particles.map((p) => (
          <motion.div
            key={p.key}
            initial={{
              x: p.x,
              y: p.y,
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            animate={{
              y: [p.y, window.innerHeight + 50],
              x: p.x + (Math.random() - 0.5) * 400,
              rotate: 360 * (Math.random() > 0.5 ? 1 : -1) * 3,
              opacity: [1, 1, 0.5, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: 0,
              ease: "linear",
            }}
            className="absolute rounded-full shadow-md"
            style={{
              backgroundColor: p.color,
              width: p.size,
              height: p.size,
              top: 0,
              left: 0,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      {showConfetti && <ConfettiParticles count={150} />}

      <section
        ref={ref}
        className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
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

          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-5 py-3 bg-white/20 backdrop-blur-md rounded-full text-white font-bold text-sm mb-6 border border-white/30"
            >
              <Sparkles className="w-5 h-5" />
              এক্সক্লুসিভ আপডেট
            </motion.div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              <motion.span variants={itemVariants} className="inline-block">
                প্রথম জানুন,{" "}
              </motion.span>
              <motion.span variants={itemVariants} className="inline-block">
                <motion.span
                  animate={{ backgroundPosition: ["0%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 bg-size-200"
                  style={{ backgroundSize: "200%" }}
                >
                  প্রথম অংশগ্রহণ করুন
                </motion.span>
              </motion.span>
            </h2>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto mb-10"
            >
              নতুন ইভেন্ট, টিপস, গিভঅ্যাওয়ে — সবার আগে আপনার ইনবক্সে!
            </motion.p>
          </motion.div>

          <AnimatePresence mode="wait">
            {isSubscribed && (
              <motion.div
                key="unsubscribe-banner"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="relative max-w-xl mx-auto p-4 sm:p-6 bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 text-white"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-8 h-8 text-yellow-300" />
                    <span className="text-lg font-bold">
                      আপনি ইতিমধ্যেই সাবস্ক্রাইব করেছেন!
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleUnsubscribe}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-semibold rounded-xl shadow-md hover:bg-red-600 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    আনসাবস্ক্রাইব করুন
                  </motion.button>
                </div>
              </motion.div>
            )}

            {!isSubscribed && (
              <motion.form
                key="subscribe-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.1 }}
                className="relative max-w-xl mx-auto"
              >
                <div className="relative group">
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
            )}
          </AnimatePresence>

          <AnimatePresence>
            {unsubMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-10"
              >
                <span className="font-semibold">
                  সফলভাবে আনসাবস্ক্রাইব করা হয়েছে!
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-y-2 gap-x-6 mt-10 text-white/70 text-sm"
          >
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-emerald-300" />
              স্প্যাম নয়
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-emerald-300" />১ ক্লিকে
              আনসাবস্ক্রাইব
            </span>
            <span className="flex items-center gap-1 font-bold text-white">
              <CheckCircle className="w-4 h-4 text-emerald-300" />
              {subscriberCount.toLocaleString("bn-BD")}+ সাবস্ক্রাইবার
            </span>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default NewsletterSection;
