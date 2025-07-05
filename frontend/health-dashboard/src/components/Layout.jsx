// src/components/Layout.jsx
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f4f0] dark:bg-[#0f1316]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto">

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
