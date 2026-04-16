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
        <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#0c0d0f]/70 sm:p-8">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                        Recommendation form
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        The more specific you are, the more useful the plan gets.
                    </p>
                </div>
                <div className="hidden rounded-2xl border border-black/5 bg-white/80 px-3 py-2 text-xs font-medium text-gray-700 shadow-sm dark:border-white/10 dark:bg-black/30 dark:text-gray-200 sm:block">
                    GenAI
                </div>
            </div>




                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
                    >
                        {/* Dietary Preferences */}
                        <div>
                    <Dropdown
                        label="Dietary Preferences"
                        options={[
                            "Vegetarian",
                            "Vegan",
                            "Keto",
                            "Mediterranean",
                            "Paleo",
                            "Low-Carb",
                            "High Protein"
                        ]}
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
