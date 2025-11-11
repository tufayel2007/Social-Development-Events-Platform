/* eslint-disable no-unused-vars */
/* src/components/home/GallerySection.jsx */
import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useInView as useInViewObserver } from "react-intersection-observer";
import { ZoomIn, X, Sparkles } from "lucide-react";

import gallery1 from "../assets/Trre01.png";
import gallery2 from "../assets/Trre02.png";
import gallery3 from "../assets/Bloud01.png";
import gallery4 from "../assets/Dustiben.png";
import gallery5 from "../assets/Environment.png";
import gallery6 from "../assets/Madecaltem.png";
import gallery7 from "../assets/Bookk.png";
import gallery8 from "../assets/Food.png";

const GallerySection = () => {
  const [ref, inView] = useInViewObserver({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [selected, setSelected] = useState(null);

  const images = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
    gallery7,
    gallery8,
  ];

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-emerald-50 dark:from-gray-800 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-700 dark:text-emerald-300 text-sm font-semibold mb-4"
          >
            <Sparkles className="w-4 h-4" />
            স্মৃতির ঝলক
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 dark:text-white">
            আমাদের{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              স্মৃতিচারণ
            </span>
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 30 },
                visible: { opacity: 1, scale: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05, z: 10 }}
              onClick={() => setSelected(img)}
              className="group relative overflow-hidden rounded-2xl shadow-lg cursor-zoom-in"
            >
              <img
                src={img}
                alt={`Gallery ${i + 1}`}
                className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <ZoomIn className="w-6 h-6 text-white" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox */}
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={selected}
              alt="Zoomed"
              className="max-w-full max-h-full rounded-xl shadow-2xl"
            />
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 text-white hover:scale-110 transition-transform"
            >
              <X className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
