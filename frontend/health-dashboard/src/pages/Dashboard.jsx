// src/pages/Dashboard.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useSearchParams } from "react-router-dom";

import ErrorBanner from "../components/ErrorBanner";
import FormSection from "../components/FormSection";
import LoadingSpinner from "../components/LoadingSpinner";
import RecommendationsSection from "../components/RecommendationsSection";
import StatusBanner from "../components/StatusBanner";
import useRecommendationStore from "../store/useRecommendationStore";

import MealMap from "../assets/mealmap2.png";
import mloc from "../assets/micon.png";
import mlocw from "../assets/micon-white.webp";

const Dashboard = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    watch,
    getValues,
    setValue,
  } = useForm();

  const [searchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const dietFromQuery = searchParams.get("diet");
    const dietFromState = location.state && location.state.diet;
    const diet = dietFromQuery || dietFromState;

    if (!diet) return;

    // Only auto-fill if the user hasn't already set a value.
    const existingDiet = getValues("dietary_preferences");
    if (!existingDiet) setValue("dietary_preferences", diet);

    const existingQuery = getValues("user_query");
    if (!existingQuery) {
      setValue(
        "user_query",
        `Generate a ${diet} meal and workout plan that fits my goals.`
      );
    }
  }, [getValues, location.key, searchParams, setValue]);

  const dietaryPref = watch("dietary_preferences");
  const fitnessGoals = watch("fitness_goals");
  const lifestyle = watch("lifestyle_factors");
  const restrictions = watch("dietary_restrictions");

  const isDisabled =
    isSubmitting || !dietaryPref || !fitnessGoals || !lifestyle || !restrictions;

  const {
    recommendations,
    formValues,
    error,
    setRecommendations,
    setFormValues,
    setError,
  } = useRecommendationStore();

  const onSubmit = async (data) => {
    setError(null);
    setRecommendations(null);
    setFormValues(data);

    try {
      // const res = await fetch("http://127.0.0.1:5000/recommendations", {
        const res = await fetch("https://mealmap-genai.onrender.com/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setRecommendations(result.recommendations);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recommendations.");
    }
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#0c0d0f]/70 sm:p-10">
        {/* <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-28 h-64 w-64 rounded-full bg-gradient-to-br from-coralStart/25 to-transparent blur-2xl" />
          <div className="absolute -right-24 -bottom-28 h-64 w-64 rounded-full bg-gradient-to-br from-coralEnd/20 to-transparent blur-2xl" />
        </div> */}

        <div className="relative flex items-start justify-between">

          {/* LEFT CONTENT */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm dark:border-white/10 dark:bg-black/30 dark:text-gray-200">
              Generate a meal + workout plan
            </div>

            <h2 className="font-roboto flex items-center gap-2 mt-4 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              <span >Let’s plan your meals right
                 {/* <span className="text-green-600">AI</span> */}
                 </span>
              <img src={mloc} alt="MealMap Logo" className="block dark:hidden h-[32px] w-auto" />
              <img src={mlocw} alt="MealMap Logo" className="hidden dark:block h-[32px] w-auto" />
            </h2>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 sm:text-base">
              Fill in the form below and we'll generate a concise plan you can follow.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <img
            src={MealMap}
            className="h-16 sm:h-32 object-contain ml-6"
          />

        </div>

      
      </div>

      <StatusBanner isSubmitting={isSubmitting} formValues={formValues} />
      {error && <ErrorBanner error={error} />}

      
      

      <FormSection
        register={register}
        handleSubmit={handleSubmit}
        watch={watch}
        setValue={setValue}
        onSubmit={onSubmit}
        isDisabled={isDisabled}
        isSubmitting={isSubmitting}
      />

      {isSubmitting && <LoadingSpinner />}

      {recommendations && !isSubmitting && (
        <RecommendationsSection recommendations={recommendations} />
      )}
    </div>
  );
};

export default Dashboard;
