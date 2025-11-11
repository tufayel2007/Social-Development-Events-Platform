/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// নিশ্চিত করুন যে এই পাথটি আপনার EventCard কম্পোনেন্টের সঠিক লোকেশন দেখাচ্ছে।
import EventCard from "../components/EventCard";

const EventCardWithAnimation = React.memo(({ event, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        y: -10,
        scale: 1.03,
        transition: { duration: 0.3 },
      }}
      className="relative"
    >
      {/* EventCard কম্পোনেন্টটি অপরিবর্তিত রাখা হয়েছে */}
      <EventCard event={event} />
    </motion.div>
  );
});

export default EventCardWithAnimation;
