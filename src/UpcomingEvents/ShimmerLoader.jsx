// src/pages/UpcomingEvents/components/ShimmerLoader.jsx
import React from "react";

const ShimmerLoader = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-base-200/80 shadow-xl border border-base-300">
      <div className="h-64 bg-gradient-to-r from-base-300 via-base-200 to-base-300 animate-shimmer"></div>

      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-7 w-48 bg-base-300 rounded-full animate-shimmer"></div>
          <div className="h-7 w-20 bg-primary/20 rounded-full animate-shimmer"></div>
        </div>

        <div className="space-y-3">
          <div className="h-4 bg-base-300 rounded animate-shimmer"></div>
          <div className="h-4 bg-base-300 rounded w-5/6 animate-shimmer"></div>
        </div>

        <div className="h-12 bg-primary rounded-xl animate-shimmer"></div>
      </div>
    </div>
  );
};

export default ShimmerLoader;
