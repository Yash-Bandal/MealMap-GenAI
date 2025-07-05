import Card from "./Card";
import {
    dietIcon,
    workoutIcon,
    breakfastIcon,
    dinnerIcon,
    tipsIcon
} from "../assets/icons";

const iconMap = {
    "Diet Recommendations": dietIcon,
    "Workout Plan": workoutIcon,
    "Breakfast Suggestions": breakfastIcon,
    "Dinner Plan": dinnerIcon,
    "Lifestyle Tips": tipsIcon
};

const RecommendationsSection = ({ recommendations }) => {
    if (!recommendations) return null;

    return (
        <section>
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                Your Personalized Plan
            </h2>
            {/* First 4 cards in a grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                <Card
                    title="Diet Recommendations"
                    items={recommendations.diet_types}
                    icon={iconMap["Diet Recommendations"]}
                />
                <Card
                    title="Workout Plan"
                    items={recommendations.workouts}
                    icon={iconMap["Workout Plan"]}
                />
                <Card
                    title="Breakfast Suggestions"
                    items={recommendations.breakfasts}
                    icon={iconMap["Breakfast Suggestions"]}
                />
                <Card
                    title="Dinner Plan"
                    items={recommendations.dinners}
                    icon={iconMap["Dinner Plan"]}
                />
            </div>

            {/* Lifestyle Tips - full width with special style */}
            <div className="mt-8">
                <Card
                    title="Lifestyle Tips"
                    items={recommendations.additional_tips}
                    icon={iconMap["Lifestyle Tips"]}
                    variant="highlight"
                />
            </div>


        </section>
    );
};

export default RecommendationsSection;



