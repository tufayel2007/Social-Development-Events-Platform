/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  Users,
  Calendar,
  TreePine,
  Heart,
  TrendingUp,
  Award,
  Zap,
} from "lucide-react";

const getStatClasses = (color) => {
  const map = {
    primary: "bg-primary text-primary-content",
    secondary: "bg-secondary text-secondary-content",
    success: "bg-success text-success-content",
    accent: "bg-accent text-accent-content",
  };
  return map[color] || "bg-base-300 text-base-content";
};

const StatsSection = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { end: 5000, label: "সদস্য", suffix: "+", icon: Users, color: "primary" },
    {
      end: 250,
      label: "ইভেন্ট",
      suffix: "+",
      icon: Calendar,
      color: "secondary",
    },
    {
      end: 12000,
      label: "গাছ লাগানো",
      suffix: "+",
      icon: TreePine,
      color: "success",
    },
    { end: 98, label: "সন্তুষ্টি", suffix: "%", icon: Heart, color: "accent" },
  ];

  return (
    <section className="py-16 md:py-24 px-6 bg-base-100 text-base-content transition-colors duration-500">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold mb-6"
        >
          আমাদের <span className="text-primary">সাফল্য</span> এক নজরে
        </motion.h2>
        <p className="text-base-content/70 mb-12 max-w-2xl mx-auto">
          প্রতিটি সংখ্যার পেছনে আছে একেকটি অনুপ্রেরণার গল্প
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="card bg-base-200 border border-base-300 shadow-xl hover:shadow-2xl transition-transform duration-300 hover:scale-105"
              >
                <div className="card-body items-center text-center">
                  <div
                    className={`p-4 rounded-full shadow-md mb-4 ${getStatClasses(
                      stat.color
                    )}`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-3xl font-extrabold">
                    {animated ? (
                      <CountUp
                        end={stat.end}
                        duration={2}
                        suffix={stat.suffix}
                      />
                    ) : (
                      <>
                        {stat.end}
                        {stat.suffix}
                      </>
                    )}
                  </h3>
                  <p className="font-semibold text-base-content/80">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
