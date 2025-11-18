"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { recipes } from "@/data/recipes";
import { ArrowLeft, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { useGroceryList } from "@/hooks/useGroceryList";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/ui/page-transition";

export default function RecipeDetail() {
  const params = useParams();
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { generateFromRecipes } = useGroceryList();
  const [isTapped, setIsTapped] = useState(false);

  const recipe = recipes.find((r) => r.id === params.id);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Recipe not found</p>
      </div>
    );
  }

  const handleAddToGroceryList = () => {
    generateFromRecipes(recipe.ingredients);
    toast.success("Ingredients added to grocery list!");
  };

  const handleFavoriteClick = () => {
    setIsTapped(true);
    toggleFavorite(recipe.id);
    setTimeout(() => setIsTapped(false), 300);
  };

  return (
    <PageTransition>
      <div className="relative w-full h-64 sm:h-80">
        <Image
          src={recipe.image}
          alt={recipe.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full p-2.5 hover:scale-110 transition-all duration-200 shadow-subtle hover:shadow-md"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <motion.button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full p-2.5 shadow-subtle hover:shadow-md z-10"
          aria-label={isFavorite(recipe.id) ? "Remove from favorites" : "Add to favorites"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={isTapped ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.div
            animate={isTapped ? { rotate: [0, -15, 15, -15, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <Heart
              className={cn(
                "h-6 w-6 transition-colors",
                isFavorite(recipe.id) ? "fill-secondary text-secondary" : "text-foreground"
              )}
            />
          </motion.div>
        </motion.button>
      </div>

      <div className="max-w-md mx-auto px-5 sm:px-6 py-6 sm:py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">{recipe.name}</h1>
          <div className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {recipe.prepTime} min
            </span>
            <span>{recipe.calories} cal</span>
            <span className="px-3 py-1.5 bg-accent text-accent-foreground rounded-full text-sm font-medium shadow-subtle">
              {recipe.difficulty}
            </span>
          </div>
        </div>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h2 className="text-xl sm:text-2xl font-semibold">Ingredients</h2>
            <Button onClick={handleAddToGroceryList} variant="outline" size="sm" className="shadow-subtle">
              Add to List
            </Button>
          </div>
          <ul className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-5">Instructions</h2>
          <ol className="space-y-5">
            {recipe.steps.map((step, index) => (
              <li key={index} className="flex gap-4">
                <span className="flex-shrink-0 w-9 h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm shadow-subtle">
                  {index + 1}
                </span>
                <p className="pt-1.5 text-base leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </PageTransition>
  );
}

