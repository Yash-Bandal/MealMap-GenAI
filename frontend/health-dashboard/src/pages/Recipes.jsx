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
  // --- ORIGINAL 8 RECIPES (100% Plant-Based) ---
  {
    id: "tofu-tikka-masala",
    title: "Vegan Tofu Tikka Masala",
    description: "Firm tofu cubes marinated and grilled, served in a creamy tomato gravy made with cashew cream.",
    youtube: "https://www.youtube.com/results?search_query=vegan+tofu+tikka+masala+recipe", 
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
    youtube: "https://www.youtube.com/results?search_query=vegan+dal+makhani+recipe",
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
    youtube: "https://www.youtube.com/results?search_query=vegan+palak+paneer+tofu",
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
    youtube: "https://www.youtube.com/results?search_query=authentic+vegan+chana+masala",
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
    youtube: "https://www.youtube.com/results?search_query=vegan+vegetable+dum+biryani",
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
    youtube: "https://www.youtube.com/results?search_query=vegan+moong+dal+cheela",
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
    youtube: "https://www.youtube.com/results?search_query=traditional+aloo+gobi+vegan",
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
    youtube: "https://www.youtube.com/results?search_query=smoky+baingan+bharta+recipe",
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

  // --- NEW RECIPES (KETO, HIGH PROTEIN, ETC.) ---
  {
    id: "keto-zucchini-noodles-pesto",
    title: "Keto Zucchini Noodles with Avocado Pesto",
    description: "Low-carb zucchini noodles tossed in a rich, dairy-free avocado and walnut pesto.",
    youtube: "https://www.youtube.com/results?search_query=vegan+keto+zucchini+noodles+avocado+pesto",
    tags: ["Keto", "Vegan", "Raw", "Low Carb"],
    timeMinutes: 15,
    difficulty: "Easy",
    calories: 320,
    proteinGrams: 6,
    ingredients: [
      "2 large zucchinis (spiralized into noodles)",
      "1 ripe avocado",
      "1 cup fresh basil leaves",
      "1/4 cup walnuts or pine nuts",
      "2 cloves garlic",
      "2 tbsp olive oil",
      "1 tbsp lemon juice",
      "Salt and pepper to taste"
    ],
    steps: [
      "In a food processor, blend avocado, basil, walnuts, garlic, olive oil, lemon juice, salt, and pepper until smooth.",
      "Spiralize the zucchinis into noodles.",
      "Gently toss the raw zucchini noodles with the avocado pesto.",
      "Serve immediately (do not heat to prevent avocado from turning bitter)."
    ]
  },
  {
    id: "keto-cauliflower-fried-rice",
    title: "Vegan Keto Cauliflower Fried Rice",
    description: "A low-carb, plant-based twist on a takeout classic using riced cauliflower and scrambled tofu.",
    youtube: "https://www.youtube.com/results?search_query=vegan+keto+cauliflower+fried+rice",
    tags: ["Keto", "Vegan", "Low Carb", "Asian Inspired"],
    timeMinutes: 20,
    difficulty: "Easy",
    calories: 250,
    proteinGrams: 15,
    ingredients: [
      "3 cups cauliflower rice",
      "150g firm tofu (crumbled)",
      "1/2 cup mixed keto-friendly veggies (bell peppers, green beans)",
      "2 tbsp soy sauce or tamari",
      "1 tbsp sesame oil",
      "1 tsp ginger (minced)",
      "2 cloves garlic (minced)",
      "Green onions for garnish"
    ],
    steps: [
      "Heat sesame oil in a wok. Sauté garlic and ginger until fragrant.",
      "Add crumbled tofu (acting as 'egg') and cook until slightly browned.",
      "Add keto-friendly veggies and sauté for 3 minutes.",
      "Add cauliflower rice and soy sauce. Stir-fry for another 5 minutes until tender.",
      "Garnish with green onions and serve hot."
    ]
  },
  {
    id: "rajma-masala",
    title: "Punjabi Rajma Masala",
    description: "Hearty red kidney beans simmered in a robust, spiced tomato and onion gravy.",
    youtube: "https://www.youtube.com/results?search_query=vegan+punjabi+rajma+masala",
    tags: ["North Indian", "High Fiber", "Vegan", "High Protein"],
    timeMinutes: 40,
    difficulty: "Medium",
    calories: 380,
    proteinGrams: 16,
    ingredients: [
      "1.5 cups kidney beans (soaked overnight and boiled)",
      "2 onions (finely chopped)",
      "3 tomatoes (pureed)",
      "1 tbsp ginger-garlic paste",
      "2 tsp rajma masala",
      "1 tsp cumin seeds",
      "2 tbsp oil",
      "Fresh coriander leaves"
    ],
    steps: [
      "Heat oil, crackle cumin seeds, and sauté onions until deep brown.",
      "Add ginger-garlic paste and tomato puree. Cook until oil separates.",
      "Add rajma masala and a splash of water, cooking the spices.",
      "Add boiled kidney beans along with some of their cooking water.",
      "Simmer for 15-20 minutes to let flavors meld. Garnish with coriander."
    ]
  },
  {
    id: "keto-coconut-curry-tofu",
    title: "Keto Coconut Curry Tofu",
    description: "A rich, low-carb Thai-inspired curry made with full-fat coconut milk and protein-packed tofu.",
    youtube: "https://www.youtube.com/results?search_query=vegan+keto+coconut+curry+tofu",
    tags: ["Keto", "Vegan", "Gluten-Free", "High Fat"],
    timeMinutes: 25,
    difficulty: "Easy",
    calories: 410,
    proteinGrams: 18,
    ingredients: [
      "200g firm tofu (cubed)",
      "1 cup full-fat coconut milk",
      "1 tbsp red curry paste (ensure no shrimp paste)",
      "1 cup broccoli florets",
      "1/2 cup sliced zucchini",
      "1 tbsp coconut oil",
      "Fresh basil leaves"
    ],
    steps: [
      "Heat coconut oil in a pan and pan-fry tofu cubes until golden. Remove and set aside.",
      "In the same pan, cook the red curry paste for 1 minute until fragrant.",
      "Stir in coconut milk and bring to a gentle simmer.",
      "Add broccoli and zucchini, cooking until just tender (about 5 mins).",
      "Return tofu to the pan, garnish with fresh basil, and serve."
    ]
  },
  {
    id: "quinoa-upma",
    title: "Quinoa Upma",
    description: "A healthy, protein-rich twist on the classic South Indian breakfast dish using quinoa instead of semolina.",
    youtube: "https://www.youtube.com/results?search_query=vegan+quinoa+upma+recipe",
    tags: ["Breakfast", "Gluten-Free", "Vegan", "High Protein"],
    timeMinutes: 25,
    difficulty: "Easy",
    calories: 280,
    proteinGrams: 9,
    ingredients: [
      "1 cup quinoa (rinsed well)",
      "1 onion (chopped)",
      "1/2 cup mixed veggies (peas, carrots)",
      "1 tsp mustard seeds",
      "1 tsp urad dal (split black lentils)",
      "10-12 curry leaves",
      "1-2 green chilies",
      "2 tbsp oil",
      "Lemon juice"
    ],
    steps: [
      "Boil quinoa with 2 cups of water until cooked and fluffy. Set aside.",
      "Heat oil in a pan, add mustard seeds and let them splutter. Add urad dal and fry until golden.",
      "Add curry leaves, green chilies, and onions. Sauté until onions are translucent.",
      "Add mixed veggies, a pinch of turmeric, and salt. Cook until tender.",
      "Mix in the cooked quinoa, squeeze lemon juice on top, and serve."
    ]
  },
  {
    id: "keto-broccoli-almond-soup",
    title: "Vegan Keto Broccoli Almond Soup",
    description: "A creamy, dairy-free, and low-carb soup perfect for cold days, thickened with almonds.",
    youtube: "https://www.youtube.com/results?search_query=vegan+keto+broccoli+almond+soup",
    tags: ["Keto", "Vegan", "Soup", "Low Carb"],
    timeMinutes: 20,
    difficulty: "Easy",
    calories: 220,
    proteinGrams: 8,
    ingredients: [
      "2 cups broccoli florets",
      "1/4 cup almonds (soaked and peeled)",
      "1 onion (chopped)",
      "2 cloves garlic",
      "2 cups vegetable broth",
      "1 tbsp olive oil",
      "Salt and black pepper to taste"
    ],
    steps: [
      "Heat olive oil in a pot. Sauté garlic and onions until soft.",
      "Add broccoli and vegetable broth. Boil until broccoli is tender (about 10 mins).",
      "Add the soaked almonds into the pot.",
      "Use an immersion blender (or transfer to a standard blender) to blend until completely smooth and creamy.",
      "Season with salt and black pepper. Serve hot."
    ]
  },
  {
    id: "masoor-dal",
    title: "Masoor Dal (Red Lentil Curry)",
    description: "A quick-cooking, protein-packed red lentil soup tempered with garlic and cumin.",
    youtube: "https://www.youtube.com/results?search_query=vegan+masoor+dal+tadka",
    tags: ["High Protein", "Vegan", "Gluten-Free", "Comfort Food"],
    timeMinutes: 25,
    difficulty: "Easy",
    calories: 310,
    proteinGrams: 18,
    ingredients: [
      "1 cup split red lentils (masoor dal), washed",
      "1 tomato (chopped)",
      "1 tsp turmeric powder",
      "3 cloves garlic (minced)",
      "1 tsp cumin seeds",
      "1-2 dried red chilies",
      "2 tbsp oil or vegan butter",
      "Fresh coriander"
    ],
    steps: [
      "Boil the washed lentils with turmeric, tomato, and salt in 3 cups of water until soft and mushy.",
      "In a small pan, heat oil/vegan butter for the tadka (tempering).",
      "Add cumin seeds, dried red chilies, and minced garlic. Sauté until garlic is golden brown.",
      "Pour the hot oil mixture immediately over the cooked dal.",
      "Garnish with coriander and serve with rice or roti."
    ]
  },
  {
    id: "bhindi-masala",
    title: "Bhindi Masala (Spiced Okra)",
    description: "Stir-fried okra with onions, tomatoes, and tangy spices. Naturally low-carb.",
    youtube: "https://www.youtube.com/results?search_query=vegan+bhindi+masala+recipe",
    tags: ["Keto Friendly", "Vegan", "Side Dish", "Low Carb"],
    timeMinutes: 25,
    difficulty: "Easy",
    calories: 180,
    proteinGrams: 4,
    ingredients: [
      "250g okra (bhindi), washed, dried completely, and chopped",
      "1 large onion (sliced)",
      "1 tomato (chopped)",
      "1 tsp coriander powder",
      "1/2 tsp turmeric powder",
      "1/2 tsp amchur (dry mango powder)",
      "2 tbsp cooking oil"
    ],
    steps: [
      "Heat 1 tbsp oil in a pan and fry the chopped okra until it's no longer slimy. Remove and set aside.",
      "In the same pan, add remaining oil and sauté sliced onions until golden.",
      "Add tomatoes, turmeric, and coriander powder. Cook until tomatoes soften.",
      "Add the fried okra back in, along with salt and amchur powder.",
      "Stir gently and cook for another 5 minutes uncovered. Serve hot."
    ]
  },
  {
    id: "tofu-bhurji",
    title: "Vegan Tofu Bhurji (Scramble)",
    description: "An Indian-spiced scrambled tofu that mimics scrambled eggs or paneer bhurji. High protein and keto-friendly.",
    youtube: "https://www.youtube.com/results?search_query=vegan+tofu+bhurji+scramble",
    tags: ["Keto", "High Protein", "Breakfast", "Vegan"],
    timeMinutes: 15,
    difficulty: "Easy",
    calories: 240,
    proteinGrams: 20,
    ingredients: [
      "200g firm tofu (crumbled)",
      "1 onion (finely chopped)",
      "1 tomato (finely chopped)",
      "1 green chili (chopped)",
      "1/2 tsp turmeric",
      "1/2 tsp cumin seeds",
      "1 tbsp oil",
      "Fresh coriander"
    ],
    steps: [
      "Heat oil in a pan and add cumin seeds. Let them splutter.",
      "Add onions and green chili, sautéing until onions are translucent.",
      "Add tomatoes and turmeric, cooking until the tomatoes soften.",
      "Stir in the crumbled tofu and salt. Cook for 5-7 minutes, letting the tofu absorb the flavors.",
      "Garnish with fresh coriander. Great on toast or wrapped in a keto tortilla."
    ]
  },
  {
    id: "soya-chunks-curry",
    title: "Soya Chunks Curry",
    description: "A highly nutritious, protein-dense curry made with textured vegetable protein (TVP/soya chunks).",
    youtube: "https://www.youtube.com/results?search_query=vegan+soya+chunks+curry",
    tags: ["High Protein", "Vegan", "Main Course"],
    timeMinutes: 35,
    difficulty: "Medium",
    calories: 320,
    proteinGrams: 28,
    ingredients: [
      "1 cup soya chunks (TVP)",
      "2 onions (pureed or finely chopped)",
      "2 tomatoes (pureed)",
      "1 tbsp ginger-garlic paste",
      "1 tsp garam masala",
      "1/2 tsp red chili powder",
      "2 tbsp oil",
      "Salt to taste"
    ],
    steps: [
      "Boil soya chunks in salted water for 10 minutes until soft. Squeeze out all excess water and set aside.",
      "Heat oil, add onion puree, and sauté until lightly browned.",
      "Add ginger-garlic paste and tomato puree. Cook until oil separates from the edges.",
      "Add spices (garam masala, chili powder) and a little water to form a gravy.",
      "Toss in the boiled soya chunks, cover, and simmer for 10 minutes so they soak up the gravy."
    ]
  },
  {
    id: "keto-cabbage-wraps",
    title: "Keto Vegan Cabbage Wraps",
    description: "Crispy cabbage leaves stuffed with a savory mixture of mushrooms, tofu, and soy sauce.",
    youtube: "https://www.youtube.com/results?search_query=keto+vegan+cabbage+wraps",
    tags: ["Keto", "Vegan", "Low Carb", "Appetizer"],
    timeMinutes: 20,
    difficulty: "Medium",
    calories: 190,
    proteinGrams: 10,
    ingredients: [
      "6 large cabbage leaves (blanched to soften)",
      "100g firm tofu (crumbled)",
      "1 cup mushrooms (finely chopped)",
      "2 spring onions (chopped)",
      "2 tbsp soy sauce or coconut aminos",
      "1 tbsp sesame oil",
      "1 tsp minced garlic"
    ],
    steps: [
      "Carefully peel and blanch the cabbage leaves in boiling water for 2 minutes. Pat dry.",
      "Heat sesame oil in a skillet. Add garlic, mushrooms, and tofu. Stir-fry until moisture evaporates.",
      "Add soy sauce and spring onions. Cook for another 2 minutes. Let the filling cool slightly.",
      "Place a scoop of the filling into the center of each blanched cabbage leaf.",
      "Roll them up like a burrito. Serve with a low-carb dipping sauce."
    ]
  },
  {
    id: "chia-seed-pudding",
    title: "Keto Coconut Chia Pudding",
    description: "A super-easy, high-fiber, low-carb breakfast or dessert made with chia seeds and coconut milk.",
    youtube: "https://www.youtube.com/results?search_query=keto+vegan+chia+pudding",
    tags: ["Keto", "Vegan", "Breakfast", "No Cook"],
    timeMinutes: 5,
    difficulty: "Easy",
    calories: 210,
    proteinGrams: 6,
    ingredients: [
      "3 tbsp chia seeds",
      "1 cup unsweetened coconut milk (from a carton or can)",
      "1/2 tsp vanilla extract",
      "1-2 drops liquid stevia or monk fruit sweetener (optional)",
      "A few raspberries for topping (keto-friendly)"
    ],
    steps: [
      "In a jar or bowl, whisk together the chia seeds, coconut milk, vanilla, and sweetener.",
      "Let it sit for 5 minutes, then whisk again to prevent clumping.",
      "Cover and refrigerate for at least 2 hours, or overnight for best results.",
      "Top with a few fresh raspberries before serving."
    ]
  },
  {
    id: "spinach-mushroom-stir-fry",
    title: "Vegan Keto Spinach & Mushroom Stir-fry",
    description: "A lightning-fast, ultra-low-carb side dish packed with vitamins and savory umami flavor.",
    youtube: "https://www.youtube.com/results?search_query=vegan+keto+spinach+mushroom+stir+fry",
    tags: ["Keto", "Vegan", "Low Carb", "Side Dish"],
    timeMinutes: 10,
    difficulty: "Easy",
    calories: 140,
    proteinGrams: 5,
    ingredients: [
      "2 cups fresh spinach",
      "1.5 cups button mushrooms (sliced)",
      "2 cloves garlic (minced)",
      "1 tbsp olive oil",
      "1 tbsp soy sauce or coconut aminos",
      "Sesame seeds for garnish"
    ],
    steps: [
      "Heat olive oil in a large pan over medium-high heat.",
      "Add minced garlic and sliced mushrooms. Sauté until mushrooms are browned.",
      "Pour in the soy sauce/coconut aminos and stir well.",
      "Add fresh spinach and toss continuously for about 1-2 minutes until just wilted.",
      "Remove from heat, garnish with sesame seeds, and serve immediately."
    ]
  },
  {
    id: "roasted-chickpea-salad",
    title: "Crispy Roasted Chickpea Salad",
    description: "A refreshing and crunchy salad loaded with protein-rich roasted chickpeas and a lemon-tahini dressing.",
    youtube: "https://www.youtube.com/results?search_query=vegan+roasted+chickpea+salad",
    tags: ["Salad", "Vegan", "High Protein", "Gluten-Free"],
    timeMinutes: 30,
    difficulty: "Easy",
    calories: 340,
    proteinGrams: 14,
    ingredients: [
      "1 can (400g) chickpeas, rinsed and thoroughly dried",
      "1 tbsp olive oil + 1 tsp paprika (for roasting)",
      "2 cups mixed salad greens (lettuce, spinach, arugula)",
      "1 cucumber (diced)",
      "1 cup cherry tomatoes (halved)",
      "2 tbsp tahini",
      "1 tbsp lemon juice",
      "Water to thin dressing"
    ],
    steps: [
      "Toss dried chickpeas with 1 tbsp olive oil, paprika, and salt. Roast in the oven at 200°C (400°F) for 20-25 mins until crispy.",
      "While chickpeas roast, assemble greens, cucumber, and tomatoes in a large bowl.",
      "In a small bowl, whisk tahini, lemon juice, salt, and a splash of water until a pourable dressing forms.",
      "Top the salad with warm crispy chickpeas and drizzle the tahini dressing over the top."
    ]
  }
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
  
  const [showAll, setShowAll] = useState(false);
  
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


  const visibleRecipes = showAll ? filtered : filtered.slice(0, 6);

  
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
        {visibleRecipes.map((r) => {
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

      {filtered.length > 6 && (
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="px-6 py-2 rounded-xl bg-[#FF5E57] text-white text-sm font-semibold hover:bg-[#ff4b43] transition"
        >
          {showAll ? "Show Less" : "View More"}
        </button>
      </div>
    )}

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
