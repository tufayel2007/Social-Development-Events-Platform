// src/pages/UpcomingEvents/components/ShimmerLoader.jsx
import React from "react";

const ShimmerLoader = () => (
  <div className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-gray-800/90 shadow-xl border border-gray-200 dark:border-gray-700">
    <div className="h-64 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 animate-shimmer"></div>
    <div className="p-6 space-y-4">
      <div className="flex justify-between">
        <div className="h-7 w-48 bg-gray-200 dark:bg-gray-700 rounded-full animate-shimmer"></div>
        <div className="h-7 w-20 bg-emerald-200 dark:bg-emerald-800 rounded-full animate-shimmer"></div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-shimmer"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-shimmer"></div>
      </div>
      <div className="h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl animate-shimmer"></div>
    </div>
  </div>
);

export default ShimmerLoader;
