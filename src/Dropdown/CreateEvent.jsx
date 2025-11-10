import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { auth } from "../firebase/FirebaseConfig";

const API_URL = "https://social-development-events-platform-brown.vercel.app";

const CreateEvent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "",
    thumbnail: "",
    location: "",
    eventDate: null,
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!auth.currentUser) {
        Swal.fire({
          icon: "warning",
          title: "লগইন করুন",
          text: "ইভেন্ট তৈরি করতে লগইন করতে হবে",
        }).then(() => navigate("/login"));
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      Swal.fire("Error", "লগইন করুন!", "error");
      navigate("/login");
      return;
    }

    let creatorEmail = auth.currentUser.email;
    if (!creatorEmail && auth.currentUser.providerData?.length > 0) {
      creatorEmail = auth.currentUser.providerData[0].email;
    }

    if (!creatorEmail) {
      Swal.fire("Error", "ইউজারের ইমেইল পাওয়া যায়নি!", "error");
      return;
    }

    const { title, description, eventType, thumbnail, location, eventDate } =
      formData;

    if (
      !title ||
      !description ||
      !eventType ||
      !thumbnail ||
      !location ||
      !eventDate
    ) {
      Swal.fire("Error", "সব ফিল্ড পূরণ করুন!", "error");
      return;
    }

    if (eventDate <= new Date()) {
      Swal.fire("Error", "ইভেন্টের তারিখ ভবিষ্যতে হতে হবে!", "error");
      return;
    }

    const eventData = {
      title: title.trim(),
      description: description.trim(),
      eventType,

      thumbnail: thumbnail.trim(),
      location: location.trim(),
      eventDate: eventDate.toISOString(),
      creatorEmail: creatorEmail,
    };

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "ইভেন্ট তৈরি করা যায়নি");

      await Swal.fire({
        icon: "success",
        title: "অভিনন্দন!",
        text: "ইভেন্ট সফলভাবে তৈরি হয়েছে!",
        timer: 1500,
      });

      //  ManageEvents
      setFormData({
        title: "",
        description: "",
        eventType: "",
        thumbnail: "",
        location: "",
        eventDate: null,
      });

      navigate("/ManageEvents", { state: { refresh: true } });
    } catch (err) {
      console.error("Event Creation Error:", err);
      Swal.fire("Error", `ইভেন্ট তৈরি ব্যর্থ: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 overflow-hidden relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-green-700 mb-4 dark:text-green-400">
            নতুন ইভেন্ট তৈরি করুন
          </h1>
          <p className="text-xl text-black dark:text-white">
            সমাজের জন্য একটি নতুন উদ্যোগ শুরু করুন
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-10 dark:bg-gray-800 dark:shadow-none dark:border dark:border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-8">
            <input
              type="text"
              placeholder="ইভেন্টের নাম *"
              value={formData.title}
              onChange={(e) => handleChange("title")(e.target.value)}
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none text-lg text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              required
            />

            <textarea
              placeholder="বিস্তারিত বিবরণ *"
              rows="5"
              value={formData.description}
              onChange={(e) => handleChange("description")(e.target.value)}
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none text-lg resize-none text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              required
            />

            <select
              value={formData.eventType}
              onChange={(e) => handleChange("eventType")(e.target.value)}
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none text-lg text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600"
              required
            >
              <option value="" className="dark:bg-gray-700">
                -- ইভেন্টের ধরন বাছাই করুন --
              </option>
              <option value="Education" className="dark:bg-gray-700">
                শিক্ষা
              </option>
              <option value="Cleanup" className="dark:bg-gray-700">
                পরিচ্ছন্নতা অভিযান
              </option>
              <option value="Plantation" className="dark:bg-gray-700">
                গাছ লাগানো
              </option>
              <option value="Donation" className="dark:bg-gray-700">
                দান সংগ্রহ
              </option>
            </select>

            <input
              type="url"
              placeholder="ছবির লিংক (ImgBB থেকে নিন) *"
              value={formData.thumbnail}
              onChange={(e) => handleChange("thumbnail")(e.target.value)}
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none text-lg text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              required
            />

            <input
              type="text"
              placeholder="স্থান (যেমন: মিরপুর ১০, ঢাকা) *"
              value={formData.location}
              onChange={(e) => handleChange("location")(e.target.value)}
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none text-lg text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              required
            />

            <DatePicker
              selected={formData.eventDate}
              onChange={(date) => handleChange("eventDate")(date)}
              showTimeSelect
              timeFormat="h:mm aa"
              dateFormat="dd MMMM, yyyy - h:mm aa"
              minDate={new Date()}
              placeholderText="তারিখ ও সময় বাছাই করুন *"
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none text-lg text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-6 py-4 bg-green-600 text-white text-lg font-bold rounded-xl hover:bg-green-700 transition transform hover:scale-105 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "তৈরি হচ্ছে..." : "ইভেন্ট তৈরি করুন"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
