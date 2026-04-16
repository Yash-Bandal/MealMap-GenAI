// src/pages/Recipes.jsx
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowRight,
  Bookmark,
  Clock,
  Flame,
  Search,
  Soup,
  X,
} from "lucide-react";
import { Fragment, useMemo, useState } from "react";

const RECIPES = [
  {
    id: "tofu-tikka-masala",
    title: "Vegan Tofu Tikka Masala",
    description: "Firm tofu cubes marinated and grilled, served in a creamy tomato gravy made with cashew cream.",
    youtube: "https://www.youtube.com/watch?v=fS3I_X8HwzM", // Note: A classic vegan adaptation by Vegan Richa
    tags: ["North Indian", "High Protein", "Vegan"],
    timeMinutes: 35,
    difficulty: "Medium",
    calories: 380,
    proteinGrams: 22,
    ingredients: [
      "250g firm tofu (pressed and cubed)",
      "1 cup soy or coconut yogurt (for marination)",
      "2 tbsp tikka masala spice mix",
      "1 large onion (finely chopped)",
      "3 tomatoes (pureed)",
      "1 tbsp ginger-garlic paste",
      "2 tbsp oil",
      "1/2 cup cashew cream (soaked and blended cashews)",
      "Salt to taste",
      "Fresh coriander for garnish",
    ],
    steps: [
      "Marinate tofu cubes in vegan yogurt, tikka masala, and salt for 20 minutes.",
      "Pan-fry the tofu until the edges are crisp. Set aside.",
      "Heat oil, sauté onion and ginger-garlic paste until golden.",
      "Add tomato puree and spices. Cook until fragrant.",
      "Stir in cashew cream and tofu. Simmer for 5 minutes.",
      "Garnish with coriander and serve.",
    ],
  },
  {
    id: "vegan-dal-makhani",
    title: "Vegan Dal Makhani",
    description: "Slow-cooked black lentils made creamy with coconut milk and vegan butter. Smoky and rich.",
    youtube: "https://www.youtube.com/watch?v=ytE3_S7fOTo",
    tags: ["Punjabi", "High Protein", "Vegan"],
    timeMinutes: 50,
    difficulty: "Medium",
    calories: 360,
    proteinGrams: 16,
    ingredients: [
      "1 cup whole black urad dal (soaked overnight)",
      "1/4 cup kidney beans",
      "2 tomatoes (pureed)",
      "1 tbsp ginger-garlic paste",
      "2 tbsp vegan butter or oil",
      "1/2 cup thick coconut milk",
      "1 tsp smoked paprika (for smoky flavor)",
      "Salt and garam masala to taste",
    ],
    steps: [
      "Pressure cook lentils and beans until completely soft.",
      "In a pot, heat vegan butter and sauté ginger-garlic paste and tomato puree.",
      "Add spices and cooked lentils; mash some lentils against the side to thicken.",
      "Stir in coconut milk and simmer on low for 20 minutes for depth of flavor.",
    ],
  },
  {
    id: "palak-tofu",
    title: "Palak Tofu (Vegan Palak Paneer)",
    description: "Nutritious spinach greens with pan-seared tofu cubes in a savory, dairy-free sauce.",
    youtube: "https://www.youtube.com/watch?v=9ZE2yNyG6is",
    tags: ["North Indian", "Vegan", "Iron Rich"],
    timeMinutes: 25,
    difficulty: "Easy",
    calories: 310,
    proteinGrams: 20,
    ingredients: [
      "300g spinach (blanched)",
      "200g tofu (cubed)",
      "1 onion (chopped)",
      "1 tbsp ginger-garlic paste",
      "1/2 tsp cumin seeds",
      "2 tbsp oil",
      "1 tbsp lemon juice",
      "Salt to taste",
    ],
    steps: [
      "Blend blanched spinach into a smooth puree.",
      "Sauté cumin, onions, and ginger-garlic paste in oil.",
      "Add spinach puree and tofu cubes. Simmer for 5 minutes.",
      "Finish with lemon juice to keep the green color vibrant.",
    ],
  },
  {
    id: "chana-masala",
    title: "Authentic Chana Masala",
    description: "Classic spicy chickpeas in a tangy gravy. Naturally vegan and packed with fiber.",
    youtube: "https://www.youtube.com/watch?v=TTuynri8jv8",
    tags: ["North Indian", "High Protein", "Vegan"],
    timeMinutes: 30,
    difficulty: "Easy",
    calories: 350,
    proteinGrams: 18,
    ingredients: [
      "2 cups chickpeas (boiled)",
      "2 onions (chopped)",
      "3 tomatoes (pureed)",
      "1 tbsp ginger-garlic paste",
      "2 tsp chana masala powder",
      "2 tbsp oil",
      "Lemon wedges and coriander",
    ],
    steps: [
      "Sauté onions until brown, add ginger-garlic paste and tomatoes.",
      "Add spices and chickpeas. Simmer for 10-15 minutes.",
      "Mash a few chickpeas to thicken the gravy. Garnish and serve.",
    ],
  },
  {
    id: "vegan-biryani",
    title: "Vegetable Dum Biryani",
    description: "Aromatic basmati rice and vegetables infused with saffron and whole spices.",
    youtube: "https://www.youtube.com/watch?v=HP2bVwNHJfM",
    tags: ["Main Course", "One Pot", "Vegan"],
    timeMinutes: 45,
    difficulty: "Medium",
    calories: 410,
    proteinGrams: 10,
    ingredients: [
      "2 cups basmati rice",
      "2 cups mixed veggies",
      "1 large onion (caramelized)",
      "1/2 cup vegan yogurt (coconut or almond)",
      "Whole spices (cinnamon, cardamom, cloves)",
      "Mint and coriander leaves",
    ],
    steps: [
      "Parboil rice with whole spices.",
      "Cook veggies with vegan yogurt and biryani masala.",
      "Layer rice over veggies, top with fried onions and herbs.",
      "Seal and cook on low heat (dum) for 15 minutes.",
    ],
  },
  {
    id: "moong-dal-cheela",
    title: "Moong Dal Cheela (No Paneer)",
    description: "Savory lentil pancakes stuffed with spiced vegetables and herbs.",
    youtube: "https://www.youtube.com/watch?v=tB5Ip1p4xpo",
    tags: ["High Protein", "Breakfast", "Vegan"],
    timeMinutes: 20,
    difficulty: "Easy",
    calories: 250,
    proteinGrams: 14,
    ingredients: [
      "1 cup yellow moong dal (soaked)",
      "1 cup finely chopped veggies (capsicum, carrots, onions)",
      "1 inch ginger",
      "1 green chili",
      "Salt and turmeric",
      "Oil for drizzling",
    ],
    steps: [
      "Grind dal, ginger, and chili into a smooth batter.",
      "Mix in salt and turmeric.",
      "Pour batter on a hot griddle, sprinkle mixed veggies on top.",
      "Cook until golden brown on both sides.",
    ],
  },
  {
    id: "aloo-gobi",
    title: "Aloo Gobi",
    description: "The quintessential Indian vegan comfort food: potatoes and cauliflower stir-fry.",
    youtube: "https://www.youtube.com/watch?v=KNpKoOpFALg",
    tags: ["Side Dish", "Vegan", "Classic"],
    timeMinutes: 25,
    difficulty: "Easy",
    calories: 210,
    proteinGrams: 5,
    ingredients: [
      "1 cauliflower head (florets)",
      "2 potatoes (cubed)",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric",
      "2 tbsp oil",
      "Fresh coriander",
    ],
    steps: [
      "Heat oil and crackle cumin seeds.",
      "Add potatoes and cauliflower with turmeric and salt.",
      "Cover and cook on low until tender. Sauté on high at the end for crispness.",
    ],
  },
  {
    id: "baingan-bharta",
    title: "Baingan Bharta",
    description: "Fire-roasted eggplant mashed with aromatics. Naturally vegan and smoky.",
    youtube: "https://www.youtube.com/watch?v=Hkl8Y_WHacQ",
    tags: ["North Indian", "Vegan", "Smoky"],
    timeMinutes: 30,
    difficulty: "Medium",
    calories: 190,
    proteinGrams: 4,
    ingredients: [
      "1 large eggplant",
      "2 onions (chopped)",
      "2 tomatoes (chopped)",
      "1 tbsp ginger-garlic paste",
      "2 tbsp oil",
      "Green peas (optional)",
    ],
    steps: [
      "Roast eggplant over flame, peel, and mash.",
      "Sauté onions, ginger-garlic, and tomatoes in oil.",
      "Mix in mashed eggplant and spices; cook for 10 minutes.",
    ],
  },
];



const TAG_STYLES = {
  Keto: "from-orange-500 via-rose-500 to-fuchsia-500",
  Vegan: "from-emerald-500 via-teal-500 to-cyan-500",
  Vegetarian: "from-lime-500 via-green-500 to-emerald-500",
  Mediterranean: "from-sky-500 via-blue-500 to-indigo-500",
  Paleo: "from-amber-500 via-yellow-500 to-orange-500",
  "Low-Carb": "from-violet-500 via-purple-500 to-fuchsia-500",
  "High Protein": "from-[#FF5E57] via-rose-500 to-indigo-500",
};

const chipClass =
  "inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-black/30 dark:text-gray-200 dark:hover:bg-white/10";

const Recipes = () => {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [selected, setSelected] = useState(null);
  const [saved, setSaved] = useState(() => new Set());

  const tags = useMemo(() => {
    const all = new Set();
    for (const r of RECIPES) for (const t of r.tags) all.add(t);
    return ["All", ...Array.from(all).sort((a, b) => a.localeCompare(b))];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RECIPES.filter((r) => {
      const matchesTag = activeTag === "All" || r.tags.includes(activeTag);
      if (!matchesTag) return false;

      if (!q) return true;
      const haystack = [
        r.title,
        r.description,
        r.tags.join(" "),
        r.ingredients.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [activeTag, query]);

  const toggleSaved = (id) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-8 p-6">
      <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#0c0d0f]/70 sm:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-28 h-64 w-64 rounded-full bg-gradient-to-br from-coralStart/25 to-transparent blur-2xl" />
          <div className="absolute -right-24 -bottom-28 h-64 w-64 rounded-full bg-gradient-to-br from-coralEnd/20 to-transparent blur-2xl" />
        </div>

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm dark:border-white/10 dark:bg-black/30 dark:text-gray-200">
              <Soup className="h-4 w-4" />
              Recipes library
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              Find a recipe that fits your plan
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 sm:text-base">
              Search by ingredient, filter by diet style, and save your favorites.
            </p>
          </div>

          <div className="w-full sm:max-w-sm">
            <label className="sr-only" htmlFor="recipeSearch">
              Search recipes
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="recipeSearch"
                type="text"
                placeholder='Search "chicken", "lentil", "spinach"...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-12 py-3 text-sm text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:border-gray-300 focus:ring-2 focus:ring-[#FF5E57]/30 dark:border-white/10 dark:bg-black/30 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white/20"
              />
              {query.trim().length > 0 && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-gray-500 hover:bg-black/5 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-white/10"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="relative mt-6 flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActiveTag(t)}
              className={`${chipClass} ${activeTag === t ? "ring-2 ring-[#FF5E57]/30" : ""}`}
            >
              <span className="truncate">{t}</span>
              {t !== "All" && (
                <span className="rounded-full bg-black/5 px-2 py-0.5 text-[11px] text-gray-600 dark:bg-white/10 dark:text-gray-300">
                  {RECIPES.filter((r) => r.tags.includes(t)).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((r) => {
          const accent = TAG_STYLES[r.tags[0]] || TAG_STYLES["High Protein"];
          const isSaved = saved.has(r.id);

          return (
            <div
              key={r.id}
              className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white/70 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-[#0c0d0f]/70"
            >
              {/* <div className={`h-2 w-full bg-gradient-to-r ${accent}`} /> */}

              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                      {r.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                      {r.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleSaved(r.id)}
                    className={`rounded-2xl border px-3 py-2 text-xs font-semibold shadow-sm transition ${isSaved
                      ? "border-[#FF5E57]/30 bg-[#FF5E57]/10 text-[#FF5E57] hover:bg-[#FF5E57]/15 dark:border-[#FF5E57]/30 dark:bg-[#FF5E57]/15"
                      : "border-black/5 bg-white/70 text-gray-700 hover:bg-white dark:border-white/10 dark:bg-black/30 dark:text-gray-200 dark:hover:bg-white/10"
                      }`}

                    aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
                  >
                    <span className="inline-flex items-center gap-2">
                      <Bookmark className="h-4 w-4" />
                      {isSaved ? "Saved" : "Save"}
                    </span>
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {r.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-black/5 bg-black/5 px-3 py-1 text-[11px] font-medium text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    {r.timeMinutes} min | {r.difficulty}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Flame className="h-4 w-4 text-gray-400" />
                    {r.calories} cal
                  </span>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Protein: {r.proteinGrams}g
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelected(r)}
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#FF5E57] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#ff4b43] focus:outline-none focus:ring-2 focus:ring-[#FF5E57]/30"
                  >
                    View
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-3xl border border-black/5 bg-white/70 p-10 text-center shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#0c0d0f]/70">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            No recipes found
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Try a different search term or clear filters.
          </p>
        </div>
      )}

      <Transition appear show={!!selected} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setSelected(null)}>
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
                  {selected && (
                    <>
                      <div className="relative p-8 sm:p-10">
                        {/* Close Button */}
                        <button
                          type="button"
                          onClick={() => setSelected(null)}
                          className="absolute right-4 top-4 rounded-full border border-black/5 bg-white/70 p-2 text-gray-700 shadow-sm hover:bg-white dark:border-white/10 dark:bg-black/30 dark:text-gray-200 dark:hover:bg-white/10"
                          aria-label="Close dialog"
                        >
                          <X className="h-5 w-5" />
                        </button>

                        {/* Title */}
                        <Dialog.Title className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                          {selected.title}
                        </Dialog.Title>

                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                          {selected.description}
                        </p>

                        {/* Tags */}
                        <div className="mt-5 flex flex-wrap gap-2">
                          {selected.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-black/5 bg-black/5 px-3 py-1 text-[11px] font-medium text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                          <div className="rounded-2xl border border-black/5 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                              Time
                            </p>
                            <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                              {selected.timeMinutes} min
                            </p>
                          </div>

                          <div className="rounded-2xl border border-black/5 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                              Calories
                            </p>
                            <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                              {selected.calories}
                            </p>
                          </div>

                          <div className="rounded-2xl border border-black/5 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                              Protein
                            </p>
                            <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                              {selected.proteinGrams}g
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Ingredients + Steps */}
                      <div className="border-t border-black/5 p-8 dark:border-white/10 sm:p-10">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">

                          {/* Ingredients */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                              Ingredients
                            </h4>
                            <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-200">
                              {selected.ingredients.map((ing) => (
                                <li key={ing} className="flex gap-2">
                                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-400" />
                                  <span className="flex-1">{ing}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Steps */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                              Steps
                            </h4>
                            <ol className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-200 list-decimal pl-5">
                              {selected.steps.map((s) => (
                                <li key={s}>{s}</li>
                              ))}
                            </ol>
                          </div>

                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="flex flex-col gap-3 border-t border-black/5 p-6 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between sm:p-8">

                        {/* Left Buttons */}
                        <div className="flex flex-col gap-3 sm:flex-row">

                          {/* Save */}
                          <button
                            type="button"
                            onClick={() => toggleSaved(selected.id)}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-black/5 bg-white/70 px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-white dark:border-white/10 dark:bg-black/30 dark:text-white dark:hover:bg-white/10"
                          >
                            <Bookmark className="h-4 w-4" />
                            {saved.has(selected.id) ? "Saved" : "Save"}
                          </button>

                          {/* YouTube */}
                          {selected.youtube && (
                            <a
                              href={selected.youtube}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-600 shadow-sm hover:bg-red-500/20"
                            >
                              Watch on YouTube
                            </a>
                          )}
                        </div>

                        {/* Done */}
                        <button
                          type="button"
                          onClick={() => setSelected(null)}
                          className="inline-flex items-center justify-center rounded-2xl bg-[#FF5E57] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#ff4b43] focus:outline-none focus:ring-2 focus:ring-[#FF5E57]/30"
                        >
                          Done
                        </button>
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

export default Recipes;
