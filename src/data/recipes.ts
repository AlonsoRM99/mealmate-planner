import avocadoToast from "@/assets/recipe-avocado-toast.jpg";
import quinoaBowl from "@/assets/recipe-quinoa-bowl.jpg";
import greekSalad from "@/assets/recipe-greek-salad.jpg";
import salmon from "@/assets/recipe-salmon.jpg";
import smoothieBowl from "@/assets/recipe-smoothie-bowl.jpg";
import stirFry from "@/assets/recipe-stir-fry.jpg";

export interface Recipe {
  id: string;
  name: string;
  image: string;
  calories: number;
  prepTime: number;
  difficulty: string;
  ingredients: string[];
  steps: string[];
  category: string;
}

export const recipes: Recipe[] = [
  {
    id: "1",
    name: "Avocado Toast",
    image: avocadoToast,
    calories: 320,
    prepTime: 10,
    difficulty: "Easy",
    category: "Breakfast",
    ingredients: [
      "2 slices whole grain bread",
      "1 ripe avocado",
      "Cherry tomatoes",
      "Microgreens",
      "Salt and pepper",
      "Olive oil",
      "Lemon juice"
    ],
    steps: [
      "Toast the bread slices until golden brown",
      "Mash the avocado with lemon juice, salt, and pepper",
      "Spread the avocado mixture on the toast",
      "Top with halved cherry tomatoes and microgreens",
      "Drizzle with olive oil and serve immediately"
    ]
  },
  {
    id: "2",
    name: "Quinoa Buddha Bowl",
    image: quinoaBowl,
    calories: 420,
    prepTime: 30,
    difficulty: "Medium",
    category: "Lunch",
    ingredients: [
      "1 cup quinoa",
      "1 cup chickpeas",
      "Mixed vegetables (sweet potato, broccoli, carrots)",
      "Tahini",
      "Lemon",
      "Garlic",
      "Olive oil",
      "Spices (cumin, paprika)"
    ],
    steps: [
      "Cook quinoa according to package instructions",
      "Roast chickpeas and vegetables with olive oil and spices",
      "Make tahini dressing with tahini, lemon, garlic, and water",
      "Assemble bowl with quinoa, roasted vegetables, and chickpeas",
      "Drizzle with tahini dressing and serve"
    ]
  },
  {
    id: "3",
    name: "Greek Salad",
    image: greekSalad,
    calories: 280,
    prepTime: 15,
    difficulty: "Easy",
    category: "Lunch",
    ingredients: [
      "Cucumber",
      "Cherry tomatoes",
      "Red onion",
      "Feta cheese",
      "Kalamata olives",
      "Olive oil",
      "Red wine vinegar",
      "Oregano"
    ],
    steps: [
      "Chop cucumber, tomatoes, and red onion",
      "Combine vegetables in a large bowl",
      "Add crumbled feta cheese and olives",
      "Dress with olive oil, vinegar, and oregano",
      "Toss gently and serve chilled"
    ]
  },
  {
    id: "4",
    name: "Grilled Salmon",
    image: salmon,
    calories: 380,
    prepTime: 25,
    difficulty: "Medium",
    category: "Dinner",
    ingredients: [
      "2 salmon fillets",
      "Asparagus spears",
      "Fresh lemon",
      "Fresh herbs (dill, parsley)",
      "Garlic",
      "Olive oil",
      "Salt and pepper"
    ],
    steps: [
      "Season salmon with salt, pepper, and herbs",
      "Grill salmon for 4-5 minutes per side",
      "Sauté asparagus with garlic and olive oil",
      "Squeeze fresh lemon over cooked salmon",
      "Serve salmon on bed of asparagus"
    ]
  },
  {
    id: "5",
    name: "Green Smoothie Bowl",
    image: smoothieBowl,
    calories: 290,
    prepTime: 10,
    difficulty: "Easy",
    category: "Breakfast",
    ingredients: [
      "2 frozen bananas",
      "1 cup spinach",
      "1/2 avocado",
      "Almond milk",
      "Fresh berries",
      "Granola",
      "Chia seeds",
      "Honey"
    ],
    steps: [
      "Blend frozen bananas, spinach, avocado, and almond milk",
      "Pour into a bowl",
      "Top with fresh berries, sliced banana, and granola",
      "Sprinkle with chia seeds",
      "Drizzle with honey if desired"
    ]
  },
  {
    id: "6",
    name: "Chicken Stir-Fry",
    image: stirFry,
    calories: 440,
    prepTime: 25,
    difficulty: "Medium",
    category: "Dinner",
    ingredients: [
      "Chicken breast",
      "Bell peppers (mixed colors)",
      "Broccoli",
      "Carrots",
      "Snap peas",
      "Brown rice",
      "Soy sauce",
      "Ginger and garlic",
      "Sesame oil"
    ],
    steps: [
      "Cook brown rice according to package instructions",
      "Cut chicken and vegetables into bite-sized pieces",
      "Stir-fry chicken in sesame oil until cooked",
      "Add vegetables and stir-fry for 5-7 minutes",
      "Add soy sauce, ginger, and garlic",
      "Serve over brown rice"
    ]
  }
];
