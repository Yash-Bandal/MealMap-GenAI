// const Card = ({ title, items, icon, variant = "default" }) => {
//     const isHighlight = variant === "highlight";

//     return (
//         <div
//             // className={`w-full ${isHighlight ? "bg-gradient-to-r from-coralStart to-coralEnd text-white" : "sm:w-[350px] bg-white dark:bg-[#0c0d0f] text-gray-900 dark:text-white"
//             className={`w-full ${isHighlight ? "bg-gradient-to-r from-coralStart to-coralEnd text-white dark:from-[#4282f8] dark:to-[#1cb4f5] " : "sm:w-[350px] bg-white dark:bg-[#0c0d0f] text-gray-900 dark:text-white"
//                 } flex-1 rounded-2xl shadow-md px-8 py-12 transition-colors`}
//         >
            // {/* Icon */}
            // {icon && (
            //     <div
            //         className={`w-12 h-12 flex justify-center items-center rounded-full ${isHighlight ? "bg-white bg-opacity-20 " : "bg-[#FF5E57] dark:bg-[#1cb4f5]"
            //             }`}
            //     >
            //         <img
            //             src={icon}
            //             alt={title}
            //             className="w-6 h-6 object-contain"
            //         />
            //     </div>
            // )}

//             {/* Title */}
//             <h3
//                 className={`mt-4 text-xl font-semibold ${isHighlight ? "text-white font-bold dark:text-black" : "text-gray-900 dark:text-white"
//                     }`}
//             >
//                 {title}
//             </h3>

//             {/* Items */}
//             <ul
//                 className={`mt-3 space-y-2 text-sm list-disc list-inside ${isHighlight
//                     ? "text-white text-[16px] dark:text-black dark:text-[16px]"
//                         : "text-gray-700 dark:text-gray-300"
//                     }`}
//             >
//                 {items?.map((item, idx) => (
//                     <li key={idx} className="leading-relaxed">
//                         {item.replace(/^\*?\d*\.?\s*/, '')}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

const Card = ({ title, items, icon, variant = "default" }) => {
    const isHighlight = variant === "highlight";

    return (
        <div
            className={`w-full h-full rounded-2xl transition-all duration-300 
      ${isHighlight
                    ? "bg-gradient-to-br from-coralStart to-coralEnd text-white dark:from-[#4282f8] dark:to-[#1cb4f5]"
                    : "bg-white/80 dark:bg-[#0c0d0f]/80 backdrop-blur border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
                }
      p-6 shadow-sm hover:shadow-lg hover:-translate-y-1`}
        >
            {/* Top Section */}
            <div className="flex items-center gap-3 mb-4">
                {/* Icon */}
                {icon && (
                    <div
                        className={`w-10 h-10 flex justify-center items-center rounded-full ${isHighlight ? "bg-white bg-opacity-20 " : "bg-[#FF5E57] dark:bg-[#1cb4f5]"
                            }`}
                    >
                        <img
                            src={icon}
                            alt={title}
                            className="w-5 h-5 object-contain"
                        />
                    </div>
                )}

                <h3 className="text-lg font-semibold tracking-tight">
                    {title}
                </h3>
            </div>

            {/* Content */}
            <ul className="space-y-3 text-xs leading-relaxed">
                {items?.slice(0, 5).map((item, idx) => (
                // {items?.map((item, idx) => (
                    <li
                        key={idx}
                        className="relative pl-4 text-gray-700 dark:text-gray-300"
                    >
                        {/* custom bullet */}
                        <span className="absolute left-0 top-[7px] w-1.5 h-1.5 rounded-full bg-gray-400"></span>

                        {item.replace(/^\*?\d*\.?\s*/, "")}
                    </li>
                ))}
            </ul>

            {/* Subtle fade indicator */}
            {/* {items?.length > 4 && (
                <p className="mt-4 text-xs text-gray-400">
                    + {items.length - 4} more recommendations
                </p>
            )} */}
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
