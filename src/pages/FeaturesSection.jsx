/* eslint-disable no-unused-vars */
/* src/components/home/FeaturesSection.jsx */
import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  TreePine,
  Heart,
  BookOpen,
  Droplets,
  Stethoscope,
  Shirt,
  Utensils,
  Backpack,
  Hammer,
  Users,
  Recycle,
  Trash2,
  Building2,
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Globe,
      title: "পরিবেশ পরিচ্ছন্নতা",
      desc: "এলাকা পরিষ্কার রাখুন",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: TreePine,
      title: "বৃক্ষরোপণ",
      desc: "প্রতি সপ্তাহে নতুন গাছ",
      gradient: "from-lime-500 to-green-600",
    },
    {
      icon: Heart,
      title: "রক্তদান",
      desc: "জীবন বাঁচান",
      gradient: "from-red-500 to-pink-600",
    },
    {
      icon: BookOpen,
      title: "শিক্ষা সহায়তা",
      desc: "গরিব শিশুদের পড়ান",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: Droplets,
      title: "পানি সরবরাহ",
      desc: "গ্রামে বিশুদ্ধ পানি",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      icon: Stethoscope,
      title: "স্বাস্থ্য ক্যাম্প",
      desc: "ফ্রি চেকআপ",
      gradient: "from-pink-500 to-rose-600",
    },
    {
      icon: Shirt,
      title: "কাপড় বিতরণ",
      desc: "শীতের কাপড়",
      gradient: "from-purple-500 to-violet-600",
    },
    {
      icon: Utensils,
      title: "খাদ্য সহায়তা",
      desc: "ক্ষুধার্তদের খাওয়ান",
      gradient: "from-orange-500 to-red-600",
    },
    {
      icon: Backpack,
      title: "স্কুল সামগ্রী",
      desc: "বই-খাতা বিতরণ",
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      icon: Hammer,
      title: "ইনফ্রাস্ট্রাকচার",
      desc: "রাস্তা মেরামত",
      gradient: "from-yellow-500 to-amber-600",
    },
    {
      icon: Users,
      title: "সম্প্রদায় গঠন",
      desc: "মিলনমেলা",
      gradient: "from-teal-500 to-cyan-600",
    },
    {
      icon: Globe,
      title: "জলবায়ু সচেতনতা",
      desc: "পরিবেশ শিক্ষা",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: Recycle,
      title: "রিসাইক্লিং",
      desc: "বর্জ্য পুনর্ব্যবহার",
      gradient: "from-gray-500 to-zinc-600",
    },
    {
      icon: Trash2,
      title: "ডাস্টবিন",
      desc: "পরিচ্ছন্নতা",
      gradient: "from-zinc-500 to-gray-600",
    },
    {
      icon: Building2,
      title: "পাবলিক টয়লেট",
      desc: "স্বাস্থ্যবিধি",
      gradient: "from-stone-500 to-gray-600",
    },
  ];

  return (
    <section id="features" className="py-24 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-4xl md:text-6xl font-extrabold text-center text-gray-800 dark:text-white mb-20"
        >
          আমাদের{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
            সেবাসমূহ
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                whileHover={{ y: -12, scale: 1.05 }}
                className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer"
              >
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50 mb-5"
                  >
                    <Icon className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                    {f.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>

                {/* Hover Glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-emerald-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
