/* eslint-disable no-unused-vars */

import React from "react";
import { motion } from "framer-motion";
import { Languages, DollarSign, ExternalLink } from "lucide-react";

const FooterBottom = ({ currentYear }) => {
  const policyLinks = [
    "Privacy Policy",
    "Terms & Conditions",
    "Shipping Info",
    "Returns",
    "Accessibility",
  ];

  return (
    <>
      <div className="border-t border-[#3c3e59] pt-6 flex flex-col lg:flex-row justify-between items-center text-xs text-gray-400 gap-4">
        {/* কপিরাইট */}
        <p className="text-center lg:text-left">
          © {currentYear} <span className="text-green-400 font-bold">SDEP</span>
          . All rights reserved.
          <br className="lg:hidden" />
          <span className="hidden lg:inline"> • </span>
          Made with <span className="text-red-500">♥</span> for SDEP lovers by{" "}
          <em className="text-green-400 font-medium">Tufayel</em>
        </p>

        {/* পলিসি লিংকস */}
        <div className="flex flex-wrap justify-center gap-4">
          {policyLinks.map((item) => (
            <a
              key={item}
              href={`/${item
                .toLowerCase()
                .replace(/ & /g, "-")
                .replace(/\s+/g, "-")}`}
              className="hover:text-green-400 transition-colors flex items-center gap-1 group"
            >
              {item}
              <ExternalLink
                size={10}
                className="text-gray-500 group-hover:text-green-400 transition-colors"
              />
            </a>
          ))}
        </div>

        {/* ভাষা ও মুদ্রা নির্বাচক */}
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-1 text-xs hover:text-green-400 transition-colors"
            aria-label="Select Language"
          >
            <Languages size={14} />
            <span>EN</span>
          </button>
          <button
            className="flex items-center gap-1 text-xs hover:text-green-400 transition-colors"
            aria-label="Select Currency"
          >
            <DollarSign size={14} />
            <span>USD</span>
          </button>
        </div>
      </div>

      {/* স্লোগান */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-10 text-green-400 font-medium italic text-lg"
      >
        "Social Development Events Platform"
      </motion.div>
    </>
  );
};

export default FooterBottom;
