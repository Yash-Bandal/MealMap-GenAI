// src/App.jsx
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LoadingSpinner from "./components/LoadingSpinner";
import mloc from "./assets/micon.png";
import mlocw from "./assets/micon-white.webp";

// Importing pages
import Dashboard from "./pages/Dashboard";
import Diets from "./pages/Diets";
import Recipes from "./pages/Recipes";
import Ingredients from "./pages/Ingredients";
import Workouts from "./pages/Workouts";
import Exercises from "./pages/Exercises";
import Settings from "./pages/Settings";


const App = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsInitialLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/diets" element={<Diets />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
      {isInitialLoading && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f5f4f0] dark:bg-[#0f1316]"
          role="status"
          aria-live="polite"
        >
          <div className="flex flex-col items-center gap-5 text-center">
            <img
              src={mloc}
              alt="MealMap"
              className="h-14 w-auto dark:hidden"
            />
            <img
              src={mlocw}
              alt="MealMap"
              className="hidden h-14 w-auto dark:block"
            />
            <LoadingSpinner />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Preparing your app
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Your MealMap is getting ready.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
