/* eslint-disable no-unused-vars */
// src/pages/Register.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaSquareGithub, FaApple } from "react-icons/fa6";
import { Eye, EyeOff, Sparkles, User, Mail, Lock, Camera } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    photoURL: "",
  });
  const [passwordErrors, setPasswordErrors] = React.useState([]);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [focused, setFocused] = React.useState("");

  // লগইন থাকলে রিডাইরেক্ট
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/upcomingEvents");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      const errors = validatePassword(value);
      setPasswordErrors(errors);
    }
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) errors.push("Minimum 6 characters required.");
    if (!/[A-Z]/.test(password))
      errors.push("At least one uppercase letter required.");
    if (!/[a-z]/.test(password))
      errors.push("At least one lowercase letter required.");
    return errors;
  };

  // Email/Password Register
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword, photoURL } = formData;

    if (passwordErrors.length > 0) {
      toast.error("Fix password errors!", { icon: "Warning" });
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", { icon: "Warning" });
      return;
    }
    if (!fullName || !email) {
      toast.error("Name and Email are required!", { icon: "Warning" });
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: fullName,
        photoURL:
          photoURL ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            fullName
          )}&background=0D8ABC&color=fff`,
      });

      toast.success("Account Created!", {
        icon: <Sparkles className="text-yellow-400" />,
      });
      setTimeout(() => navigate("/upcomingEvents"), 1500);
    } catch (error) {
      const msg =
        error.code === "auth/email-already-in-use"
          ? "Email already registered!"
          : "Registration failed. Try again.";
      toast.error(msg, { icon: "Warning" });
    } finally {
      setLoading(false);
    }
  };

  // Google Register (same as login)
  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      toast.success("Welcome with Google!", {
        icon: <FcGoogle size={20} />,
      });
      setTimeout(() => navigate("/upcomingEvents"), 1500);
    } catch (error) {
      toast.error("Google login failed!", { icon: "Warning" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 overflow-hidden relative">
      <ToastContainer position="top-center" theme="light" autoClose={3000} />

      {/* Animated Background Blobs */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Register Card */}
      <div className="relative max-w-md w-full bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 z-10 transform transition-all duration-500 hover:scale-[1.01]">
        {/* Logo + Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg animate-pulse">
              <User className="text-white text-3xl" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Join us and explore events
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="relative">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              onFocus={() => setFocused("fullName")}
              onBlur={() => setFocused("")}
              className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 font-medium pl-12
                ${
                  focused === "fullName"
                    ? "border-emerald-500 ring-4 ring-emerald-100"
                    : "border-gray-200"
                }
                focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100
                bg-gradient-to-r from-white to-emerald-50/30`}
              required
            />
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 pointer-events-none" />
          </div>

          {/* Photo URL */}
          <div className="relative">
            <input
              type="url"
              name="photoURL"
              placeholder="Photo URL (Optional)"
              value={formData.photoURL}
              onChange={handleChange}
              onFocus={() => setFocused("photoURL")}
              onBlur={() => setFocused("")}
              className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 font-medium pl-12
                ${
                  focused === "photoURL"
                    ? "border-emerald-500 ring-4 ring-emerald-100"
                    : "border-gray-200"
                }
                focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100
                bg-gradient-to-r from-white to-emerald-50/30`}
            />
            <Camera className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 pointer-events-none" />
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused("")}
              className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 font-medium pl-12
                ${
                  focused === "email"
                    ? "border-emerald-500 ring-4 ring-emerald-100"
                    : "border-gray-200"
                }
                focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100
                bg-gradient-to-r from-white to-emerald-50/30`}
              required
            />
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 pointer-events-none" />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused("")}
              className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 font-medium pl-12 pr-14
                ${
                  focused === "password"
                    ? "border-emerald-500 ring-4 ring-emerald-100"
                    : "border-gray-200"
                }
                focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100
                bg-gradient-to-r from-white to-emerald-50/30`}
              required
            />
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 pointer-events-none" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600 hover:text-emerald-800"
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>

          {/* Password Strength */}
          {formData.password && (
            <ul className="text-xs space-y-1 pl-2">
              {passwordErrors.map((err, i) => (
                <li key={i} className="text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>{" "}
                  {err}
                </li>
              ))}
              {passwordErrors.length === 0 && (
                <li className="text-emerald-600 font-medium flex items-center gap-1">
                  <Sparkles size={14} /> Strong password!
                </li>
              )}
            </ul>
          )}

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onFocus={() => setFocused("confirmPassword")}
              onBlur={() => setFocused("")}
              className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 font-medium pl-12 pr-14
                ${
                  focused === "confirmPassword"
                    ? "border-emerald-500 ring-4 ring-emerald-100"
                    : "border-gray-200"
                }
                focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100
                bg-gradient-to-r from-white to-emerald-50/30`}
              required
            />
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 pointer-events-none" />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600 hover:text-emerald-800"
            >
              {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>

          {/* Confirm Match */}
          {formData.confirmPassword && (
            <p
              className={`text-sm font-medium flex items-center gap-1 ${
                formData.password === formData.confirmPassword
                  ? "text-emerald-600"
                  : "text-red-500"
              }`}
            >
              {formData.password === formData.confirmPassword ? (
                <>Passwords match!</>
              ) : (
                <>Passwords do not match.</>
              )}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={
              loading ||
              passwordErrors.length > 0 ||
              formData.password !== formData.confirmPassword
            }
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Creating...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Register Now
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <span className="px-4 text-sm text-gray-500 font-medium">
            Or continue with
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>

        {/* Social Logins - শুধু Google কাজ করে */}
        <div className="grid grid-cols-3 gap-3">
          {/* Google - কাজ করে */}
          <button
            onClick={handleGoogleRegister}
            disabled={loading}
            className="group p-3 rounded-2xl bg-white shadow-md hover:shadow-xl transform hover:scale-110 active:scale-95 transition606-all duration-300 border border-gray-200 flex items-center justify-center cursor-pointer"
            title="Continue with Google"
          >
            <FcGoogle size={24} className="group-hover:animate-pulse" />
          </button>

          {/* GitHub - কাজ করে না */}
          <button
            onClick={handleGoogleRegister}
            disabled
            className="group p-3 rounded-2xl bg-white shadow-md hover:shadow-xl transform hover:scale-110 active:scale-95 transition606-all duration-300 border border-gray-200 flex items-center justify-center cursor-pointer"
            title="Continue with Google"
          >
            <FaSquareGithub size={24} className="group-hover:animate-pulse" />
          </button>

          {/* Apple - কাজ করে না */}
          <button
            disabled
            onClick={handleGoogleRegister}
            className="group p-3 rounded-2xl bg-white shadow-md hover:shadow-xl transform hover:scale-110 active:scale-95 transition606-all duration-300 border border-gray-200 flex items-center justify-center cursor-pointer"
            title="Continue with Google"
          >
            <FaApple size={24} className="group-hover:animate-pulse" />
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center mt-8 text-gray-600">
          Have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-emerald-600 hover:text-emerald-800 hover:underline transition"
          >
            Login here
          </Link>
        </p>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Register;
