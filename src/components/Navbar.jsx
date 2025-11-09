// src/components/Navbar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import { FaUserCircle, FaMoon, FaSun } from "react-icons/fa";
import logoIMG from "../assets/Profile.png"; // তোমার লোগো

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") || "light"
  );

  // Firebase থেকে ইউজার চেক
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // থিম টগল
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // লগআউট
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // ন্যাভ লিঙ্ক (অ্যাসাইনমেন্ট অনুযায়ী)
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-primary text-primary-content font-bold rounded-md px-3 py-2"
              : "hover:bg-gray-200 rounded-md px-3 py-2"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/upcomingEvents"
          className={({ isActive }) =>
            isActive
              ? "bg-primary text-primary-content font-bold rounded-md px-3 py-2"
              : "hover:bg-gray-200 rounded-md px-3 py-2"
          }
        >
          Upcoming Events
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 sticky top-0 z-50">
      {/* ====== লোগো + নাম ====== */}
      <div className="navbar-start">
        {/* মোবাইল মেনু */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>

        {/* লোগো */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src={logoIMG}
            alt="GreenNest Logo"
            className="w-9 h-9 rounded-full object-cover border"
          />
          <span className="hidden md:inline-flex font-bold text-xl text-primary">
            Social Development Events Platform
          </span>
          <span className="md:hidden font-bold text-lg text-primary">SDEP</span>
        </NavLink>
      </div>

      {/* ====== ডেস্কটপ মেনু ====== */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-3">{navLinks}</ul>
      </div>

      {/* ====== রাইট সাইড ====== */}
      <div className="navbar-end flex items-center gap-3">
        {/* থিম টগল */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="btn btn-ghost btn-circle"
          aria-label="Toggle Theme"
        >
          {theme === "light" ? (
            <FaMoon className="text-lg" />
          ) : (
            <FaSun className="text-lg text-yellow-400" />
          )}
        </button>

        {/* লগইন না থাকলে */}
        {!user ? (
          <NavLink
            to="/login"
            className="btn btn-primary btn-sm md:btn-md font-bold text-white"
          >
            Login
          </NavLink>
        ) : (
          /* প্রোফাইল ড্রপডাউন */
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar group"
              title={user.displayName || "User"}
            >
              <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = logoIMG;
                    }}
                  />
                ) : (
                  <FaUserCircle className="w-full h-full text-gray-400" />
                )}
              </div>

              {/* হোভারে নাম */}
              <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 -left-6 top-12 whitespace-nowrap z-10">
                {user.displayName}
              </div>
            </label>

            {/* ড্রপডাউন মেনু */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-56 border"
            >
              <li className="menu-title text-center pb-2 border-b">
                <span className="font-bold">{user.displayName}</span>
              </li>
              <li>
                <NavLink to="/CreateEvent" className="justify-between">
                  Create Event
                  <span className="badge badge-primary badge-sm">New</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/ManageEvents">Manage Events</NavLink>
              </li>
              <li>
                <NavLink to="/JoinedEvents">Joined Events</NavLink>
              </li>
              <li className="border-t mt-2 pt-2">
                <button
                  onClick={handleLogout}
                  className="text-error hover:bg-error hover:text-white w-full text-left"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
