/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Users, Calendar, TreePine, Heart } from "lucide-react";

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
  const [startCount, setStartCount] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
        } else {
          setStartCount(false);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
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
    <section
      ref={sectionRef}
      className="py-16 md:py-24 px-6 bg-base-100 text-base-content"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={startCount ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 text-center"
        >
          {" "}
          <motion.span
            animate={
              startCount ? { backgroundPosition: ["0% 50%", "100% 50%"] } : {}
            }
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="inline-block text-transparent bg-clip-text bg-gradient-to-r 
               from-yellow-600 via-pink-600 to-cyan-600 
               dark:from-yellow-400 dark:via-pink-400 dark:to-cyan-400 
               bg-[length:200%_200%]"
            style={{
              backgroundSize: "200% 200%",
              backgroundPosition: "0% 50%",
            }}
          >
            আমাদের সাফল্য এক নজরে
          </motion.span>{" "}
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  startCount
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
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
                    {startCount ? (
                      <CountUp
                        start={0}
                        end={stat.end}
                        duration={2.5}
                        suffix={stat.suffix}
                        useEasing={true}
                      />
                    ) : (
                      <span>0{stat.suffix}</span>
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
