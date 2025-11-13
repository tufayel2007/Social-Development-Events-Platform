import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import { FaUserCircle, FaMoon, FaSun } from "react-icons/fa";
import logoIMG from "../assets/Profile.png";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const { theme, toggleTheme } = useTheme();

  // Firebase auth listener
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "btn btn-sm md:btn-md btn-primary text-primary-content font-bold"
              : "btn btn-sm md:btn-md btn-ghost hover:bg-base-200"
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
              ? "btn btn-sm md:btn-md btn-primary text-primary-content font-bold"
              : "btn btn-sm md:btn-md btn-ghost hover:bg-base-200"
          }
        >
          Upcoming Events
        </NavLink>
      </li>
    </>
  );

  if (loading) {
    return (
      <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 h-16 flex items-center justify-center">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="navbar bg-base-100 text-base-content shadow-md sticky top-0 z-50 transition-colors duration-300">
      {/* Left */}
      <div className="navbar-start">
        {/* Mobile dropdown */}
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
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src={logoIMG}
            alt="Logo"
            className="w-9 h-9 rounded-full object-cover border border-base-300"
          />
          <span className="hidden md:inline-flex font-bold text-xl text-primary">
            Social Development Events Platform
          </span>
          <span className="md:hidden font-bold text-lg text-primary">SDEP</span>
        </NavLink>
      </div>

      {/* Center nav */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
      </div>

      {/* Right */}
      <div className="navbar-end flex items-center gap-3">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          aria-label="Toggle Theme"
        >
          {theme === "light" ? (
            <FaMoon className="text-lg text-base-content/80" />
          ) : (
            <FaSun className="text-lg text-yellow-400" />
          )}
        </button>

        {/* User menu */}
        {!user ? (
          <NavLink
            to="/login"
            className="btn btn-primary btn-sm md:btn-md font-bold text-primary-content"
          >
            Login
          </NavLink>
        ) : (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar group"
            >
              <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="rounded-full object-cover"
                    onError={(e) => (e.target.src = logoIMG)}
                  />
                ) : (
                  <FaUserCircle className="w-full h-full text-base-content/40" />
                )}
              </div>
              <div className="absolute hidden group-hover:block bg-base-300 text-base-content text-xs rounded px-2 py-1 -left-6 top-12 whitespace-nowrap z-10 shadow">
                {user.displayName}
              </div>
            </label>

            <ul className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-56 border border-base-300">
              <li className="menu-title text-center pb-2 border-b border-base-300">
                <span className="font-bold">{user.displayName}</span>
              </li>
              <li>
                <NavLink to="/CreateEvent" className="justify-between">
                  Create Event{" "}
                  <span className="badge badge-primary badge-sm">New</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/ManageEvents">Manage Events</NavLink>
              </li>
              <li>
                <NavLink to="/JoinedEvents">Joined Events</NavLink>
              </li>
              <li className="border-t border-base-300 mt-2 pt-2">
                <button
                  onClick={handleLogout}
                  className="text-error hover:bg-error hover:text-error-content w-full text-left"
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
