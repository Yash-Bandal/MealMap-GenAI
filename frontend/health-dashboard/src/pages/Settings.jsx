import { Github, Linkedin } from "lucide-react";

const Developers = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-6">

      <div className="text-center space-y-6">

        {/* Name */}
        <h1 className="text-4xl sm:text-5xl font-semibold font-roboto tracking-tight text-gray-900 dark:text-white">
          YB Studios™
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Developer
        </p>

        {/* Divider */}
        <div className="w-16 h-px bg-gray-300 dark:bg-white/10 mx-auto" />

        {/* Links (optional minimal presence) */}
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/Yash-Bandal"
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition dark:bg-white/10 dark:hover:bg-white/20"
          >
            <Github className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          </a>

          <a
            href="https://www.linkedin.com/in/yash-bandal"
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition dark:bg-white/10 dark:hover:bg-white/20"
          >
            <Linkedin className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          </a>
        </div>

      </div>
    </div>
  );
};

export default Developers;
