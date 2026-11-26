
import { NavLink } from "react-router-dom";
import {
    FaUtensils,
    FaCog,
    FaHome,
    FaSignOutAlt,
    FaListUl,
    FaBars,
} from "react-icons/fa";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Sidebar = () => {
    const [expanded, setExpanded] = useState(false);

    const navItems = [
        { to: "/", label: "Dashboard", icon: <FaHome /> },
        { to: "/diets", label: "Diets", icon: <FaListUl /> },
        { to: "/recipes", label: "Recipes", icon: <FaUtensils /> },
        { to: "/settings", label: "Settings", icon: <FaCog /> },
    ];

    return (
        <div
            className={`
                h-screen flex-shrink-0
                ${expanded ? "w-64" : "w-20"}
                flex flex-col
                bg-[#101322] text-white
                dark:bg-[#0c0d0f]
                transition-[width] duration-[350ms] ease-in-out
                overflow-hidden
            `}
        >
            {/* HEADER */}
            <div className="
                relative flex items-center justify-center
                h-24 px-4
                border-b border-white/10
                flex-shrink-0
            ">
                <div className="flex items-center justify-center w-full overflow-hidden">
                    <h2
                        className={`
                            whitespace-nowrap text-xl font-bold tracking-tight
                            transition-opacity duration-300
                            ${expanded ? "opacity-100" : "opacity-0"}
                        `}
                    >
                        MealMap <span className="text-green-500">AI</span>
                    </h2>
                </div>

                <button
                    onClick={() => setExpanded(prev => !prev)}
                    aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
                    className="
                        absolute right-2
                        p-2 rounded-md
                        hover:bg-white/10
                        transition-colors
                    "
                >
                    {expanded
                        ? <ChevronLeft size={18} />
                        : <ChevronRight size={18} />
                    }
                </button>
            </div>

            {/* NAVIGATION */}
            <div className="flex flex-col flex-1 overflow-hidden">

                <nav className="
                    flex-1 pt-6 px-3
                    space-y-2
                    overflow-y-auto overflow-x-hidden
                ">
                    {navItems.map(({ to, label, icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            title={!expanded ? label : undefined}
                            className={({ isActive }) => `
                                flex items-center gap-4
                                py-3.5 px-4
                                rounded-lg
                                whitespace-nowrap
                                transition-colors duration-200
                                ${
                                    isActive
                                        ? "bg-white/10 text-green-400 font-semibold"
                                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                                }
                            `}
                        >
                            <span className="
                                text-xl w-7 flex-shrink-0
                                flex items-center justify-center
                            ">
                                {icon}
                            </span>

                            <span className={`
                                overflow-hidden
                                transition-opacity duration-200 delay-100
                                ${expanded ? "opacity-100" : "opacity-0"}
                            `}>
                                {label}
                            </span>
                        </NavLink>
                    ))}
                </nav>

                {/* LOGOUT */}
                <div className="px-3 pb-6 pt-4 border-t border-white/10 mt-auto">
                    <button
                        className="
                            flex items-center gap-4
                            py-3.5 px-4 w-full
                            rounded-lg whitespace-nowrap
                            text-gray-300
                            hover:bg-white/10 hover:text-red-400
                            transition-colors duration-200
                        "
                    >
                        <span className="
                            text-xl w-7 flex-shrink-0
                            flex items-center justify-center
                        ">
                            <FaSignOutAlt />
                        </span>

                        <span className={`
                            overflow-hidden
                            transition-opacity duration-200 delay-100
                            ${expanded ? "opacity-100" : "opacity-0"}
                        `}>
                            Logout
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
