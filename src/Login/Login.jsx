/* eslint-disable no-unused-vars */

import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaSquareGithub, FaApple, FaLeaf } from "react-icons/fa6";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [focused, setFocused] = React.useState("");

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/upcomingEvents");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields!", { icon: "Warning" });
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await fetch(
        "https://social-development-events-platform-brown.vercel.app/api/LOGIN_USER/save-user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: user.uid,
            email: user.email,
            fullName: user.displayName || "N/A",
            photoURL: user.photoURL || "N/A",
          }),
        }
      );

      toast.success("Welcome back!", {
        icon: <Sparkles className="text-yellow-400" />,
      });
      setTimeout(() => navigate("/upcomingEvents"), 1500);
    } catch (error) {
      console.error("Firebase Login Error:", error.code, error.message);

      let msg = "Login failed! Please check your credentials.";
      if (error.code === "auth/user-not-found") {
        msg = "No account found. Please register first.";
      } else if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        msg = "Oops! Wrong password or invalid credentials.";
      }
      toast.error(msg, { icon: "Warning" });
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      // 1. Firebase Go
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await fetch(
        "https://social-development-events-platform-brown.vercel.app/api/LOGIN_USER/save-user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: user.uid,
            email: user.email,
            fullName: user.displayName || "N/A",
            photoURL: user.photoURL || "N/A",
          }),
        }
      );

      toast.success("Welcome with Google!", {
        icon: <FcGoogle size={20} />,
      });
      setTimeout(() => navigate("/upcomingEvents"), 1500);
    } catch (error) {
      console.error("Firebase Google Login Error:", error.code, error.message);
      toast.error("Google login failed. Try again!", { icon: "Warning" });
    } finally {
      setLoading(false);
    }
  };

  const handleUnavailable = (name) => {
    toast.info(`${name} login coming soon!`, {
      icon: <FaLeaf className="text-green-500" />,
      autoClose: 2500,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 overflow-hidden relative">
      <ToastContainer position="top-center" theme="light" autoClose={3000} />

      <div className="absolute top-10 left-10 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-md w-full bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 z-10 transform transition-all duration-500 hover:scale-[1.01]">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg animate-pulse">
              <FaLeaf className="text-white text-3xl" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Welcome Back!
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Login to join amazing events
          </p>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-5">
          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused("")}
              className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 font-medium
      ${
        focused === "email"
          ? "border-emerald-500 ring-4 ring-emerald-800"
          : "border-gray-200 dark:border-gray-600"
      }
      focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-800
      bg-gradient-to-r from-white to-emerald-50/30 dark:from-gray-900 dark:to-gray-800
      placeholder-gray-500 dark:placeholder-gray-400
      text-gray-800 dark:text-gray-100`}
              required
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"></div>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused("")}
              className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 font-medium pr-14
      ${
        focused === "password"
          ? "border-emerald-500 ring-4 ring-emerald-800"
          : "border-gray-300 dark:border-gray-600"
      }
      focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-800
      bg-gradient-to-r from-white to-emerald-50/30 dark:from-gray-900 dark:to-gray-800
      placeholder-gray-500 dark:placeholder-gray-400
      text-gray-800 dark:text-gray-100`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600 hover:text-emerald-800 transition"
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"></div>
          </div>

          <div className="text-right">
            <Link
              to="/ForgotPassword"
              className="text-sm text-emerald-600 hover:text-emerald-800 font-medium hover:underline transition"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Logging in...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Login Now
              </>
            )}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <span className="px-4 text-sm text-gray-500 font-medium">
            Or continue with
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="p-4 rounded-2xl bg-white shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-300 border border-gray-200 flex items-center justify-center"
          >
            <FcGoogle size={28} />
          </button>
          <button
            onClick={() => handleUnavailable("GitHub")}
            className="p-4 rounded-2xl bg-gradient-to-br from-gray-800 to-black text-white shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
          >
            <FaSquareGithub size={28} />
          </button>
          <button
            onClick={() => handleUnavailable("Apple")}
            className="p-4 rounded-2xl bg-black text-white shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
          >
            <FaApple size={28} />
          </button>
        </div>

        <p className="text-center mt-8 text-gray-600">
          New here?{" "}
          <Link
            to="/register"
            className="font-bold text-emerald-600 hover:text-emerald-800 hover:underline transition"
          >
            Create an account
          </Link>
        </p>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          Bra 33% {
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

export default Login;
