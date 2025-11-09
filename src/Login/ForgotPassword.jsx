import React, { useState, useEffect } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { auth } from "../firebase/FirebaseConfig";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const auth = getAuth(auth);

    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
      toast.success("Password reset email sent successfully!");
      setCountdown(60);
    } catch (err) {
      console.error(err);
      if (err.code === "auth/user-not-found") {
        toast.error("No user found with this email.");
      } else if (err.code === "auth/invalid-email") {
        toast.error("Invalid email address.");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    let redirectTimer;
    if (sent) {
      redirectTimer = setTimeout(() => navigate("/login"), 5000);
    }
    return () => clearTimeout(redirectTimer);
  }, [sent, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100 p-4 dark:bg-gray-900">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 text-center">
        {!sent ? (
          <>
            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              Forgot Password?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              A password reset link will be sent to your registered email.
            </p>

            <form onSubmit={handleReset} className="space-y-5">
              <div className="relative">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  disabled={loading || countdown > 0}
                />
              </div>

              <button
                type="submit"
                disabled={loading || countdown > 0}
                className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" /> Sending...
                  </>
                ) : countdown > 0 ? (
                  `Wait ${countdown}s`
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            <p className="text-sm mt-6 text-gray-500 dark:text-gray-400">
              Remember?{" "}
              <Link
                to="/login"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <CheckCircle2 className="text-green-500 w-16 h-16 mb-4" />
            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
              Reset link sent!
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Check your email and follow the instructions. Redirecting to
              login...
            </p>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => navigate("/login")}
                className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-700 transition-all"
              >
                Back to Login
              </button>
              <Link
                to="/"
                className="bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-700 transition-all"
              >
                Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
