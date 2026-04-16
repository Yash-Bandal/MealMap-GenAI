// src/components/Layout.jsx
import { useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // This app scrolls inside the main content container (not the window),
    // so we explicitly reset that scroll position on navigation.
    scrollContainerRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });

    // Safety: if a page uses window scrolling, reset that too.
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f4f0] dark:bg-[#0f1316]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">

        {/* Header */}
        <Header />

        {/* Page content */}
        <div className="p-4">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default Layout;
