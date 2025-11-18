"use client";

import { recipes } from "@/data/recipes";
import { RecipeCard } from "@/components/ui/recipe-card";
import { useFavorites } from "@/hooks/useFavorites";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PageTransition } from "@/components/ui/page-transition";
import { motion, AnimatePresence } from "framer-motion";

export default function Favorites() {
  const { favorites, isFavorite, toggleFavorite, clearFavorites } = useFavorites();

  const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id));

  const handleClearAll = () => {
    if (favoriteRecipes.length === 0) return;
    
    clearFavorites();
    toast.success("All favorites cleared");
  };

  return (
    <PageTransition>
      <header className="bg-card border-b border-border sticky top-0 z-40 shadow-subtle">
        <div className="max-w-md mx-auto px-5 sm:px-6 py-5 sm:py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary flex items-center gap-2 mb-1">
            <Heart className="h-6 w-6 sm:h-8 sm:w-8 fill-primary" />
            Favorites
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {favoriteRecipes.length} saved {favoriteRecipes.length === 1 ? "recipe" : "recipes"}
          </p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-5 sm:px-6 py-6 sm:py-8">
        {favoriteRecipes.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-5" />
            <h2 className="text-xl font-semibold mb-3">No favorites yet</h2>
            <p className="text-muted-foreground text-base">
              Start adding recipes to your favorites by tapping the heart icon
            </p>
          </div>
        ) : (
          <>
            {favoriteRecipes.length > 0 && (
              <div className="mb-5">
                <Button
                  onClick={handleClearAll}
                  variant="outline"
                  size="sm"
                  className="w-full shadow-subtle"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Favorites
                </Button>
              </div>
            )}
            <motion.div
              className="grid grid-cols-1 gap-5 sm:gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <AnimatePresence mode="popLayout">
                {favoriteRecipes.map((recipe, index) => (
                  <motion.div
                    key={recipe.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                      delay: index * 0.05,
                    }}
                  >
                    <RecipeCard
                      recipe={recipe}
                      isFavorite={isFavorite(recipe.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </main>
    </PageTransition>
  );
}

