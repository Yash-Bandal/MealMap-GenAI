import Dropdown from "./Dropdown";
import TextInput from "./form/TextInput";
import TextArea from "./form/TextArea";
import SubmitButton from "./form/SubmitButton";

const FormSection = ({
    register,
    handleSubmit,
    watch,
    setValue,
    onSubmit,
    isDisabled,
    isSubmitting
}) => {
    return (
        <section>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
                Recommendation Form
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                // className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-all duration-300"
                className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-[#0c0d0f] p-6 rounded-xl shadow-md transition-all duration-300"
            >
                {/* Dietary Preferences */}
                <div>
                    <Dropdown
                        label="Dietary Preferences"
                        options={["Vegetarian", "High Protein", "Keto", "Vegan"]}
                        value={watch("dietary_preferences")}
                        onChange={(val) => setValue("dietary_preferences", val)}
                    />
                </div>

                {/* Fitness Goals */}
                <div>
                    <Dropdown
                        label="Fitness Goals"
                        options={["Weight Loss", "Muscle Gain", "Endurance"]}
                        value={watch("fitness_goals")}
                        onChange={(val) => setValue("fitness_goals", val)}
                    />
                </div>

                {/* Lifestyle Factors */}
                <TextInput
                    label="Lifestyle Factors"
                    register={register}
                    name="lifestyle_factors"
                    placeholder="e.g. Sedentary, Active"
                />

                {/* Dietary Restrictions */}
                <TextInput
                    label="Dietary Restrictions"
                    register={register}
                    name="dietary_restrictions"
                    placeholder="e.g. Gluten-free, Nut allergy"
                />

                {/* Health Conditions */}
                <TextInput
                    label="Health Conditions"
                    register={register}
                    name="health_conditions"
                    placeholder="e.g. Diabetes, PCOS"
                />

                {/* Additional Query */}
                <TextArea
                    label="Additional Query (optional)"
                    register={register}
                    name="user_query"
                    placeholder="Describe any specific concerns..."
                />

                {/* Submit Button */}
                <SubmitButton isDisabled={isDisabled} isSubmitting={isSubmitting} />
            </form>
        </section>
    );
};

export default FormSection;
