/* eslint-disable no-unused-vars */
/* src/components/home/StatsSection.jsx */
import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { useInView as useInViewObserver } from "react-intersection-observer";
import {
  Users,
  Calendar,
  Trees,
  Heart,
  TrendingUp,
  Award,
  Sparkles,
  Zap,
} from "lucide-react";

const StatsSection = () => {
  const [ref, inView] = useInViewObserver({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (inView && !animated) {
      setAnimated(true);
    }
  }, [inView, animated]);

  const stats = [
    {
      end: 5000,
      label: "সদস্য",
      suffix: "+",
      icon: Users,
      color: "emerald",
      delay: 0.1,
    },
    {
      end: 250,
      label: "ইভেন্ট",
      suffix: "+",
      icon: Calendar,
      color: "teal",
      delay: 0.2,
    },
    {
      end: 12000,
      label: "গাছ লাগানো",
      suffix: "+",
      icon: Trees,
      color: "lime",
      delay: 0.3,
    },
    {
      end: 98,
      label: "সন্তুষ্টি",
      suffix: "%",
      icon: Heart,
      color: "red",
      delay: 0.4,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
  };

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-700 dark:text-emerald-300 text-sm font-semibold mb-4"
          >
            <Sparkles className="w-4 h-4" />
            আমাদের প্রভাব
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 dark:text-white">
            এক নজরে{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              আমাদের সাফল্য
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            প্রতিটি সংখ্যার পিছনে আছে হাজারো মানুষের ভালোবাসা ও অংশগ্রহণ
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{
                  y: -12,
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 },
                }}
                className="group relative p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-emerald-100 dark:border-gray-700 overflow-hidden cursor-pointer"
              >
                {/* Animated Background Blob */}
                <motion.div
                  animate={{
                    scale: [1, 1.4, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5,
                  }}
                  className={`absolute -top-20 -left-20 w-40 h-40 sm:w-56 sm:h-56 bg-${stat.color}-400/20 rounded-full filter blur-3xl`}
                />

                {/* Icon with Pulse */}
                <motion.div
                  animate={inView ? { scale: [1, 1.2, 1] } : {}}
                  transition={{
                    delay: stat.delay,
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className={`inline-flex p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-50 dark:from-${stat.color}-900/50 dark:to-${stat.color}-800/30 mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon
                    className={`w-7 h-7 sm:w-8 sm:h-8 text-${stat.color}-600 dark:text-${stat.color}-400`}
                  />
                </motion.div>

                {/* Counter */}
                <div className="relative z-10 text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 dark:text-white font-mono">
                    {animated && (
                      <CountUp
                        end={stat.end}
                        duration={3}
                        suffix={stat.suffix}
                        separator=","
                        useEasing={true}
                      />
                    )}
                    {!animated && (
                      <span>
                        {stat.end.toLocaleString()}
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg font-semibold text-gray-700 dark:text-gray-200">
                    {stat.label}
                  </p>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-${stat.color}-400/0 to-${stat.color}-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
                />

                {/* Micro-interaction: Sparkle on hover */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute top-2 right-2"
                >
                  <Zap className="w-5 h-5 text-yellow-400" />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Accent */}
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: "100%" } : {}}
          transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
          className="mt-12 md:mt-16 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full"
        />

        {/* Floating Particles */}
        {inView && (
          <>
            <motion.div
              animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 left-10 text-emerald-400 opacity-30"
            >
              <Award className="w-8 h-8" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 30, 0], x: [0, -15, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-10 right-10 text-teal-400 opacity-30"
            >
              <TrendingUp className="w-10 h-10" />
            </motion.div>
          </>
        )}
      </div>

      {/* Responsive CSS */}
      <style jsx>{`
        @media (max-width: 640px) {
          .xs\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </section>
  );
};

export default StatsSection;
