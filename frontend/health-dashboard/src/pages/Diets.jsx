import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowRight,
  BadgeCheck,
  Drumstick,
  Fish,
  Flame,
  Leaf,
  Salad,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { Fragment, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const dietCategories = [
  {
    id: "keto",
    title: "Keto",
    Icon: Flame,
    gradient: "from-orange-500 via-rose-500 to-fuchsia-500",
    description:
      "Very low-carb, high-fat approach that can help with appetite control and steady energy.",
    suitableFor: "Weight loss, blood sugar control",
    keyFoods: "Avocado, eggs, fatty fish, nuts, olive oil",
    pros: "Fast early results, reduced cravings",
    cons: "Adjustment phase, can feel restrictive",
  },
  {
    id: "vegan",
    title: "Vegan",
    Icon: Leaf,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    description:
      "Plant-based eating that excludes animal products, often high in fiber and micronutrients.",
    suitableFor: "Ethics, heart health, weight management",
    keyFoods: "Legumes, tofu, nuts, seeds, leafy greens, fruits",
    pros: "High fiber, diverse plant nutrients",
    cons: "Plan for B12, iron, and protein",
  },
  {
    id: "vegetarian",
    title: "Vegetarian",
    Icon: Salad,
    gradient: "from-lime-500 via-green-500 to-emerald-500",
    description:
      "Plant-forward eating that may include dairy and eggs; flexible and easy to sustain.",
    suitableFor: "General health, reducing meat intake",
    keyFoods: "Dairy, eggs, beans, lentils, vegetables",
    pros: "Flexible, nutrient-rich",
    cons: "Protein planning still matters",
  },
  {
    id: "mediterranean",
    title: "Mediterranean",
    Icon: Fish,
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
    description:
      "A balanced pattern built around olive oil, veggies, legumes, seafood, and whole grains.",
    suitableFor: "Heart health, longevity",
    keyFoods: "Olive oil, fish, vegetables, whole grains, nuts",
    pros: "Sustainable, well-studied",
    cons: "Seafood/quality oils may cost more",
  },
  {
    id: "paleo",
    title: "Paleo",
    Icon: Drumstick,
    gradient: "from-amber-500 via-yellow-500 to-orange-500",
    description:
      "Emphasizes minimally processed foods; often reduces ultra-processed snacks and sugars.",
    suitableFor: "Weight loss, reducing inflammation",
    keyFoods: "Meat, fish, fruits, vegetables, nuts, seeds",
    pros: "Cuts processed foods",
    cons: "Excludes grains and dairy",
  },
  {
    id: "lowcarb",
    title: "Low-Carb",
    Icon: BadgeCheck,
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    description:
      "Reduces carbs while leaning on protein and healthy fats; can support glucose control.",
    suitableFor: "Weight loss, diabetes management",
    keyFoods: "Meat, eggs, non-starchy vegetables, cheese",
    pros: "Stable energy, quick progress",
    cons: "Harder to sustain for some",
  },
];

const Diets = () => {
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredDiets = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return dietCategories;

    return dietCategories.filter((diet) => {
      const haystack = [
        diet.title,
        diet.description,
        diet.suitableFor,
        diet.keyFoods,
        diet.pros,
        diet.cons,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [searchTerm]);

  const goToDashboardWithDiet = (dietTitle) => {
    // Dashboard route is "/". We pass a query param so it's bookmarkable/shareable.
    navigate(`/?diet=${encodeURIComponent(dietTitle)}`);
  };

  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"> */}
        <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#0c0d0f]/70 sm:p-10">
          
          <div className="hidden dark:block">

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-28 h-64 w-64 rounded-full bg-gradient-to-br from-[#FF5E57]/35 to-transparent blur-2xl" />
            <div className="absolute -right-24 -bottom-28 h-64 w-64 rounded-full bg-gradient-to-br from-sky-500/25 to-transparent blur-2xl" />
          </div>
          </div>

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm dark:border-white/10 dark:bg-black/30 dark:text-gray-200">
                <Sparkles className="h-4 w-4" />
                Choose a diet style, then generate a plan on the dashboard
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Explore Diets
              </h1>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-300 sm:text-lg">
                Pick a pattern that matches your lifestyle. We’ll pre-fill the
                Dashboard so you can generate a tailored plan fast.
              </p>
            </div>

            <div className="w-full sm:max-w-sm">
              <label className="sr-only" htmlFor="dietSearch">
                Search diets
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  id="dietSearch"
                  type="text"
                  placeholder="Search diets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-12 py-3 text-sm text-gray-900 shadow-sm outline-none ring-0 placeholder:text-gray-400 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5E57]/30 dark:border-white/10 dark:bg-black/30 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white/20"
                />
                {searchTerm.trim().length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-gray-500 hover:bg-black/5 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-white/10"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDiets.map((diet) => {
            const Icon = diet.Icon;
            return (
              <div
                key={diet.id}
                onClick={() => setSelectedDiet(diet)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSelectedDiet(diet);
                }}
                role="button"
                tabIndex={0}
                className="group relative cursor-pointer select-none overflow-hidden rounded-3xl border border-black/5 bg-white/70 p-6 text-left shadow-sm backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#FF5E57]/30 dark:border-white/10 dark:bg-[#0c0d0f]/70"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${diet.gradient}`}
                />

                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${diet.gradient} text-white shadow-sm`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                        {diet.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                        Best for: {diet.suitableFor}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="mt-1 h-5 w-5 text-gray-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-gray-400 dark:text-white/20 dark:group-hover:text-white/30" />
                </div>

                <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {diet.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-black/5 bg-black/5 px-3 py-1 text-[11px] font-medium text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-200">
                    Key foods
                  </span>
                  <span className="line-clamp-1 text-[11px] text-gray-500 dark:text-gray-400">
                    {diet.keyFoods}
                  </span>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Learn more
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToDashboardWithDiet(diet.title);
                    }}
                    className="rounded-full bg-[#FF5E57]/10 px-3 py-1 text-xs font-semibold text-[#FF5E57] hover:bg-[#FF5E57]/15 dark:bg-[#FF5E57]/15 dark:hover:bg-[#FF5E57]/20"
                  >
                    Generate Plan
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredDiets.length === 0 && (
          <div className="mt-10 rounded-3xl border border-black/5 bg-white/70 p-10 text-center shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#0c0d0f]/70">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              No diets found
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Try searching for "keto", "vegan", or "mediterranean".
            </p>
          </div>
        )}

        <p className="mt-10 text-center text-xs text-gray-500 dark:text-gray-400">
          These are general overviews. Always consult a healthcare professional
          before starting a new diet.
        </p>
      </div>

      <Transition appear show={!!selectedDiet} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setSelectedDiet(null)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto p-4 sm:p-6">
            <div className="flex min-h-full items-center justify-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 translate-y-2 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-2 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl overflow-hidden rounded-3xl border border-black/5 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0c0d0f]">
                  {selectedDiet && (
                    <>
                      <div
                        className={`relative p-8 sm:p-10 ${selectedDiet.gradient}`}
                        // className={`relative bg-gradient-to-br p-8 sm:p-10 ${selectedDiet.gradient}`}
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedDiet(null)}
                          className="absolute right-4 top-4 rounded-full bg-white/15 p-2 text-white hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/40"
                          aria-label="Close dialog"
                        >
                          <X className="h-5 w-5" />
                        </button>

                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl  bg-black/15 dark:bg-white/15 text-black dark:text-white">
                            <selectedDiet.Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <Dialog.Title className="text-2xl font-semibold tracking-tight text-black  dark:text-white sm:text-3xl">
                              {selectedDiet.title}
                            </Dialog.Title>
                            <p className="mt-1 text-sm text-black dark:text-white/85">
                              {selectedDiet.suitableFor}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-8 sm:p-10">
                        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-200">
                          {selectedDiet.description}
                        </p>

                        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                          <div className="rounded-2xl border border-black/5 bg-black/5 p-5 dark:border-white/10 dark:bg-white/5">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                              Pros
                            </p>
                            <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                              {selectedDiet.pros}
                            </p>
                          </div>
                          <div className="rounded-2xl border border-black/5 bg-black/5 p-5 dark:border-white/10 dark:bg-white/5">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                              Cons
                            </p>
                            <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                              {selectedDiet.cons}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 rounded-2xl border border-black/5 bg-white p-5 dark:border-white/10 dark:bg-black/20">
                          <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                            Key foods
                          </p>
                          <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                            {selectedDiet.keyFoods}
                          </p>
                        </div>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                          <button
                            type="button"
                            onClick={() => setSelectedDiet(null)}
                            className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 dark:border-white/10 dark:bg-black/20 dark:text-white dark:hover:bg-white/10"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              goToDashboardWithDiet(selectedDiet.title)
                            }
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#FF5E57] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#ff4b43] focus:outline-none focus:ring-2 focus:ring-[#FF5E57]/30"
                          >
                            Generate Plan
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Diets;
