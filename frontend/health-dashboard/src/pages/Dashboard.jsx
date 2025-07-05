// src/pages/Dashboard.jsx
import { useForm } from "react-hook-form";

import { useState } from "react";


//Load components
import FormSection from "../components/FormSection";
import StatusBanner from "../components/StatusBanner";
import ErrorBanner from "../components/ErrorBanner";
import LoadingSpinner from "../components/LoadingSpinner";
import RecommendationsSection from "../components/RecommendationsSection";
// import Card from "../components/Card";

const Dashboard = () => {

  //Form and backend
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    watch,
    setValue // <-- add this
  } = useForm();

  const dietaryPref = watch("dietary_preferences");  //for disable feature...disable submit until the first 4 field are filled
  const fitnessGoals = watch("fitness_goals");
  const lifestyle = watch("lifestyle_factors");
  const restrictions = watch("dietary_restrictions");

  const isDisabled = isSubmitting || !dietaryPref || !fitnessGoals || !lifestyle || !restrictions;


  const [recommendations, setRecommendations] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    setError(null);
    setRecommendations(null);
    setFormValues(data);

    try {
      const res = await fetch("http://127.0.0.1:5000/recommendations", {
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
    <div className="space-y-10 p-6">

      {/* Status Banner */}
      <StatusBanner isSubmitting={isSubmitting} formValues={formValues} />

      {/* Error Display */}
      {error && (
        <ErrorBanner error={error} />
      )}

      <FormSection
        register={register}
        handleSubmit={handleSubmit}
        watch={watch}
        setValue={setValue}
        onSubmit={onSubmit}
        isDisabled={isDisabled}
        isSubmitting={isSubmitting}
      />


      {/* Loading Spinner */}
      {isSubmitting && <LoadingSpinner />}

      {/* Cards Section */}
      {recommendations && !isSubmitting && (
        <RecommendationsSection recommendations={recommendations} />
      )}
    </div>
  );
};

// // Card Component is inside RecommendationsSection
// <Card title={title} items={items }/>

export default Dashboard;
