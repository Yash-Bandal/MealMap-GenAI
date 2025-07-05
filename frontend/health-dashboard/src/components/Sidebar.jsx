// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import {
    FaUtensils,
    FaCarrot,
    FaDumbbell,
    FaRunning,
    FaCog,
    FaHome,
    FaSignOutAlt,
    FaListUl,
    FaBars,
} from "react-icons/fa";
import { useState } from "react";

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const navItems = [
        { to: "/", label: "Dashboard", icon: <FaHome /> },
        { to: "/diets", label: "Diets", icon: <FaListUl /> },
        { to: "/recipes", label: "Recipes", icon: <FaUtensils /> },
        { to: "/ingredients", label: "Ingredients", icon: <FaCarrot /> },
        { to: "/workouts", label: "Workouts", icon: <FaDumbbell /> },
        { to: "/exercises", label: "Exercises", icon: <FaRunning /> },
        { to: "/settings", label: "Settings", icon: <FaCog /> },
    ];

    return (
        <div className={`h-screen transition-all duration-300 ${collapsed ? "w-20" : "w-64"} bg-[#101322] text-white flex flex-col dark:bg-[#0c0d0f] `}>
        {/* <div className={`h-screen transition-all duration-300 ${collapsed ? "w-20" : "w-64"} bg-gradient-to-b from-purple-700 to-pink-500 text-white flex flex-col`}> */}

            {/* Header */}
            <div className="flex items-center justify-between p-4 font-bold text-lg tracking-widest uppercase">
                {!collapsed && <span>Meal Map</span>}
                <button onClick={() => setCollapsed(!collapsed)} className="text-white">
                    <FaBars />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 space-y-2">
                {navItems.map(({ to, label, icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-md hover:bg-white
                             hover:text-purple-700 transition 
                            ${isActive ? "bg-white dark:bg-[#252628] text-purple-700 font-semibold" : ""}
                             dark:text-white dark:hover:bg-[#2f3033]`
                        }
                    >
                        {icon}
                        {!collapsed && <span>{label}</span>}
                    </NavLink>
                ))}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-white/20">
                <button className="flex items-center gap-3 p-3 rounded-md w-full hover:bg-white hover:text-purple-700 transition">
                    <FaSignOutAlt />
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
