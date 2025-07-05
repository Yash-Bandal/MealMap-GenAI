import { AlertCircle } from "lucide-react";

const ErrorBanner = ({ error }) => {
    if (!error) return null;

    return (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2 mb-4">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p>Error loading data: {error}</p>
        </div>
    );
};

export default ErrorBanner;
