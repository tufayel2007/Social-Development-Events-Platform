/* eslint-disable no-self-assign */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { auth } from "../firebase/FirebaseConfig";
import { useQuery } from "@tanstack/react-query";

const API_URL = "https://social-development-events-platform-brown.vercel.app";

const UpdateEvent = () => {
  const { id } = useParams();
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
  const [initialLoading, setInitialLoading] = useState(true);

  const { data: eventData, isLoading: queryLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      if (!id) throw new Error("ইভেন্ট ID পাওয়া যায়নি");
      const res = await fetch(`${API_URL}/api/events/${id}`);
      if (!res.ok) throw new Error("ইভেন্ট ডেটা ফেচ করা যায়নি");
      return res.json();
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (eventData && !queryLoading) {
      setFormData({
        title: eventData.title || "",
        description: eventData.description || "",
        eventType: eventData.eventType || "",
        thumbnail: eventData.thumbnail || "",
        location: eventData.location || "",
        eventDate: eventData.eventDate ? new Date(eventData.eventDate) : null,
      });
      setInitialLoading(false);
    }
  }, [eventData, queryLoading]);

  if (!auth.currentUser || initialLoading || queryLoading) {
    if (!auth.currentUser) {
      navigate("/login");
      return null;
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const creatorEmail =
    auth.currentUser.email || auth.currentUser.providerData?.[0]?.email;

  if (eventData.creatorEmail !== creatorEmail) {
    Swal.fire({
      icon: "error",
      title: "অনুমতি নেই",
      text: "আপনি শুধু নিজের ইভেন্ট আপডেট করতে পারবেন!",
    }).then(() => navigate("/ManageEvents"));
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
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

    const updatedData = {
      title: title.trim(),
      description: description.trim(),
      eventType,
      location: location.trim(),
      eventDate: eventDate.toISOString(),
      creatorEmail,
    };

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "ইভেন্ট আপডেট করা যায়নি");

      await Swal.fire({
        icon: "success",
        title: "আপডেট সফল!",
        text: "ইভেন্ট সফলভাবে আপডেট হয়েছে!",
        timer: 1500,
      });

      navigate("/ManageEvents", { state: { refresh: true } });
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-base-100 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">
            ইভেন্ট আপডেট করুন: {formData.title || "..."}
          </h1>
          <p className="text-xl text-base-content/70">
            আপনার উদ্যোগের বিবরণ পরিবর্তন করুন
          </p>
        </div>

        <div className="card bg-base-200 shadow-2xl p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <input
                type="text"
                placeholder="ইভেন্টের নাম *"
                value={formData.title}
                onChange={(e) => handleChange("title")(e.target.value)}
                className="input input-bordered w-full text-lg"
                required
              />
            </div>

            <div className="form-control">
              <textarea
                placeholder="বিস্তারিত বিবরণ *"
                rows={5}
                value={formData.description}
                onChange={(e) => handleChange("description")(e.target.value)}
                className="textarea textarea-bordered w-full text-lg resize-none"
                required
              />
            </div>

            <div className="form-control">
              <select
                value={formData.eventType}
                onChange={(e) => handleChange("eventType")(e.target.value)}
                className="select select-bordered w-full text-lg"
                required
              >
                <option value="" disabled>
                  -- ইভেন্টের ধরন বাছাই করুন --
                </option>
                <option value="Education">শিক্ষা</option>
                <option value="Cleanup">পরিচ্ছন্নতা অভিযান</option>
                <option value="Plantation">গাছ লাগানো</option>
                <option value="Donation">দান সংগ্রহ</option>
              </select>
            </div>

            <div className="form-control">
              <input
                type="url"
                placeholder="ছবির লিংক (ImgBB থেকে নিন) *"
                value={formData.thumbnail}
                onChange={(e) => handleChange("thumbnail")(e.target.value)}
                className="input input-bordered w-full text-lg"
                required
              />
            </div>

            <div className="form-control">
              <input
                type="text"
                placeholder="স্থান (যেমন: মিরপুর ১০, ঢাকা) *"
                value={formData.location}
                onChange={(e) => handleChange("location")(e.target.value)}
                className="input input-bordered w-full text-lg"
                required
              />
            </div>

            <div className="form-control">
              <DatePicker
                selected={formData.eventDate}
                onChange={(date) => handleChange("eventDate")(date)}
                showTimeSelect
                timeFormat="h:mm aa"
                dateFormat="dd MMMM, yyyy - h:mm aa"
                minDate={new Date()}
                placeholderText="তারিখ ও সময় বাছাই করুন *"
                className="input input-bordered w-full text-lg"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary w-full text-lg font-bold ${
                loading ? "loading" : ""
              }`}
            >
              {loading ? "আপডেট হচ্ছে..." : "ইভেন্ট আপডেট করুন"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEvent;
