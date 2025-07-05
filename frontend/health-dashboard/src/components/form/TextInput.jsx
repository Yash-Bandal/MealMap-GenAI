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
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0c0d0f] text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>
    );
  };
  
  export default TextInput;
  