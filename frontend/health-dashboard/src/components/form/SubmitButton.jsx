const SubmitButton = ({ isDisabled, isSubmitting }) => {
    return (
        <div className="md:col-span-2 flex justify-end">
            <button
                type="submit"
                disabled={isDisabled}
                className={`px-6 py-2 rounded-lg font-medium text-white transition-all duration-200 ${isDisabled ? "bg-blue-300 cursor-not-allowed" : "bg-[#ce132e] hover:bg-[#bb112b] dark:bg-[#4282f8] dark:hover:bg-[#226cf7]"
                    }`}
            >
                {isSubmitting ? "Generating a Plan..." : "Get Recommendations"}
            </button>
        </div>
    );
};

export default SubmitButton;
  