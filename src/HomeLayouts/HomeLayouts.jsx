import React from "react";

import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomeLayouts = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar />
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer></Footer>
    </div>
  );
};

export default HomeLayouts;
