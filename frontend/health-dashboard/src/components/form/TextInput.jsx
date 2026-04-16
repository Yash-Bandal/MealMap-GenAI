// const TextInput = ({ label, register, name, placeholder }) => {
//     return (
//       <div>
//         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//           {label}
//         </label>
//         <input
//           {...register(name)}
//           type="text"
//           placeholder={placeholder}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0c0d0f] text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
//         />
//       </div>
//     );
//   };
  

const TextInput = ({ label, register, name, placeholder }) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
        <input
          {...register(name)}
          type="text"
          placeholder={placeholder}
          className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:border-gray-300 focus:ring-2 focus:ring-[#FF5E57]/30 dark:border-white/10 dark:bg-black/30 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white/20"
        />
      </div>
    );
  };

  
  export default TextInput;
  