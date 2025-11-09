import React from "react";
import { Link } from "react-router-dom";

// EventCard কম্পোনেন্টটি event prop হিসাবে একটি ইভেন্ট অবজেক্ট পাবে।
const EventCard = ({ event }) => {
  return (
    <div
      key={event._id}
      className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-3"
    >
      {/* 💡 থাম্বনেইল প্রদর্শন: Event Data-তে থাকা 'thumbnail1' ফিল্ডটি ব্যবহার করা হচ্ছে */}
      {/* যদি thumbnail1 না থাকে, তাহলে একটি ডিফল্ট ইমেজ দেখানো হবে, যেমনটা UpcomingEvents-এ ছিল। */}
      <img
        src={event.thumbnail1 || "https://i.imgur.com/6b4Xb.jpg"}
        alt={event.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-8">
        <h3 className="text-2xl font-bold text-green-700 mb-3 line-clamp-1">
          {event.title}
        </h3>
        <p className="text-gray-600 mb-6 line-clamp-2">{event.description}</p>

        <div className="space-y-3 text-sm">
          <p className="flex items-center text-gray-700">
            <span className="font-bold text-green-600">Location:</span>{" "}
            {event.location}
          </p>
          <p className="flex items-center">
            <span className="font-bold text-green-600">Type:</span>
            <span className="ml-2 px-4 py-1 bg-green-100 text-green-800 rounded-full font-medium">
              {event.eventType}
            </span>
          </p>
          <p className="flex items-center text-gray-700">
            <span className="font-bold text-green-600">Date:</span>
            {new Date(event.eventDate).toLocaleDateString("bn-BD", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <Link
          to={`/event/${event._id}`}
          className="mt-8 block w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl text-center font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition shadow-lg"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
