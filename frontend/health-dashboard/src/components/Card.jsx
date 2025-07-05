const Card = ({ title, items, icon, variant = "default" }) => {
    const isHighlight = variant === "highlight";

    return (
        <div
            // className={`w-full ${isHighlight ? "bg-gradient-to-r from-coralStart to-coralEnd text-white" : "sm:w-[350px] bg-white dark:bg-[#0c0d0f] text-gray-900 dark:text-white"
            className={`w-full ${isHighlight ? "bg-gradient-to-r from-coralStart to-coralEnd text-white dark:from-[#4282f8] dark:to-[#1cb4f5] " : "sm:w-[350px] bg-white dark:bg-[#0c0d0f] text-gray-900 dark:text-white"
                } flex-1 rounded-2xl shadow-md px-8 py-12 transition-colors`}
        >
            {/* Icon */}
            {icon && (
                <div
                    className={`w-12 h-12 flex justify-center items-center rounded-full ${isHighlight ? "bg-white bg-opacity-20 " : "bg-[#FF5E57] dark:bg-[#1cb4f5]"
                        }`}
                >
                    <img
                        src={icon}
                        alt={title}
                        className="w-6 h-6 object-contain"
                    />
                </div>
            )}

            {/* Title */}
            <h3
                className={`mt-4 text-xl font-semibold ${isHighlight ? "text-white font-bold dark:text-black" : "text-gray-900 dark:text-white"
                    }`}
            >
                {title}
            </h3>

            {/* Items */}
            <ul
                className={`mt-3 space-y-2 text-sm list-disc list-inside ${isHighlight
                    ? "text-white text-[16px] dark:text-black dark:text-[16px]"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
            >
                {items?.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                        {item.replace(/^\*?\d*\.?\s*/, '')}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Card;


// old
// const Card = ({ title, items, icon }) => (
//     <div className="flex-1 w-full sm:w-[350px] rounded-2xl shadow-md px-8 py-12 bg-white dark:bg-gray-900 transition-colors">

//         {/* Icon */}
//         {icon && (
//             <div className="w-12 h-12 flex justify-center items-center bg-[#FF5E57] rounded-full">
//                 <img src={icon} alt={title} className="w-6 h-6 object-contain" />
//             </div>
//         )}

//         {/* Title */}
//         <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
//             {title}
//         </h3>

//         {/* Items */}
//         <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300 list-disc list-inside">
//             {items?.map((item, idx) => (
//                 <li key={idx} className="leading-relaxed">
//                     {item.replace(/^\*?\d*\.?\s*/, '')}
//                 </li>
//             ))}
//         </ul>
//     </div>
// );

// export default Card;
