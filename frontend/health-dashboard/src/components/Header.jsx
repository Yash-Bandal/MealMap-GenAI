// import React from 'react';
// import { Sun, Moon } from 'lucide-react';
// import { useTheme } from '../hooks/useTheme';
// import { useLocation } from 'react-router-dom';

// const Header = () => {
//     const { theme, toggleTheme } = useTheme();
//     const location = useLocation();

//     const titleMap = {
//         "/": "Dashboard",
//         "/diets": "Diets",
//         "/recipes": "Recipes",
//         "/ingredients": "Ingredients",
//         "/workouts": "Workouts",
//         "/exercises": "Exercises",
//         "/settings": "Settings",
//     };

//     const title = titleMap[location.pathname] || "Meal Map";

//     return (
//         // <header className="w-full px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
//         <header className="w-full px-6 py-4 bg-white dark:bg-[#252628] border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
//             <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h1>
//             <button
//                 onClick={toggleTheme}
//                 className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:scale-105 transition"
//             >
//                 {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-800" />}
//             </button>
//         </header>
//     );
// };

// export default Header;

import React, { useState, useEffect } from "react";
import { Sun, Moon, ChevronDown, User } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useLocation } from "react-router-dom";
import { Github } from "lucide-react";
const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    const [time, setTime] = useState(new Date());
    const [openProfile, setOpenProfile] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const titleMap = {
        "/": "Dashboard",
        "/diets": "Diets",
        "/recipes": "Recipes",
        "/ingredients": "Ingredients",
        "/workouts": "Workouts",
        "/exercises": "Exercises",
        "/settings": "Settings",
        "/developers": "Developer",
    };

    const title = titleMap[location.pathname] || "Meal Map";

    const formattedTime = time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    const formattedDate = time.toLocaleDateString(undefined, {
        weekday: "short",
        day: "numeric",
        month: "short",
    });

    return (
        <header className="sticky top-0 z-20 w-full border-b border-black/5 dark:border-white/10 bg-white dark:bg-[#202125] ">

            <div className="flex items-center justify-between px-6 py-4">

                {/* LEFT */}
                <div>
                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {title}
                    </h1>

                    {/* TIME BELOW TITLE */}
                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>{formattedDate}</span>
                        <span>•</span>
                        <span className="font-medium text-gray-700 dark:text-gray-200">
                            {formattedTime}
                        </span>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3">

                    {/* CLEAN THEME TOGGLE */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition dark:bg-white/10 dark:hover:bg-white/20"
                    >
                        {theme === "dark" ? (
                            <Sun className="h-4 w-4 text-yellow-400" />
                        ) : (
                            <Moon className="h-4 w-4 text-gray-700" />
                        )}
                    </button>

                    {/* PROFILE */}
                    <div className="relative">
                        <button
                            onClick={() => setOpenProfile(!openProfile)}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition"
                        >
                            <div className="h-7 w-7 rounded-lg bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-xs font-medium dark:text-white">
                                YB
                            </div>
                            <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        </button>

                        {openProfile && (
                            <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-black/5 bg-white shadow-lg  dark:bg-black backdrop-blur p-2">

                                <button className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-gray-100 dark:hover:bg-white/10 dark:text-white flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Profile
                                </button>

                                <a
                                    href="https://github.com/yash-bandal"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-gray-100 dark:hover:bg-white/10 dark:text-white flex items-center gap-2"
                                >
                                    <Github className="h-4 w-4" />
                                    GitHub
                                </a>

                                <button className="w-full text-left px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 ">
                                    Logout
                                </button>

                            </div>
                        )}
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;