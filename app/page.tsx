"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { recipes } from "@/data/recipes";
import { RecipeCard } from "@/components/ui/recipe-card";
import { useFavorites } from "@/hooks/useFavorites";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/ui/page-transition";

export default function Home() {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [calorieRange, setCalorieRange] = useState<string>("all");

  // Get unique categories from recipes
  const categories = useMemo(() => {
    const cats = Array.from(new Set(recipes.map((r) => r.category)));
    return cats.sort();
  }, []);

  // Filter recipes based on search, category, and calories
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      // Search filter - match recipe name (case-insensitive)
      const matchesSearch =
        searchQuery === "" ||
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategory === "all" || recipe.category === selectedCategory;

      // Calories filter
      let matchesCalories = true;
      if (calorieRange !== "all") {
        switch (calorieRange) {
          case "low":
            matchesCalories = recipe.calories < 300;
            break;
          case "medium":
            matchesCalories = recipe.calories >= 300 && recipe.calories < 400;
            break;
          case "high":
            matchesCalories = recipe.calories >= 400;
            break;
        }
      }

      return matchesSearch && matchesCategory && matchesCalories;
    });
  }, [searchQuery, selectedCategory, calorieRange]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setCalorieRange("all");
  };

  const hasActiveFilters =
    searchQuery !== "" || selectedCategory !== "all" || calorieRange !== "all";

  return (
    <PageTransition>
      <header className="bg-card border-b border-border sticky top-0 z-40 shadow-subtle">
        <div className="max-w-md mx-auto px-5 sm:px-6 py-5 sm:py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-1">MealMate</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Healthy recipes for every day</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-5 sm:px-6 py-6 sm:py-8">
        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 rounded-[20px] shadow-subtle"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 gap-3">
            {/* Meal Type Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="rounded-[20px] shadow-subtle">
                <SelectValue placeholder="Meal Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Meals</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Calories Filter */}
            <Select value={calorieRange} onValueChange={setCalorieRange}>
              <SelectTrigger className="rounded-[20px] shadow-subtle">
                <SelectValue placeholder="Calories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Calories</SelectItem>
                <SelectItem value="low">Low (&lt; 300)</SelectItem>
                <SelectItem value="medium">Medium (300-399)</SelectItem>
                <SelectItem value="high">High (400+)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <Button
              onClick={clearFilters}
              variant="outline"
              size="sm"
              className="w-full rounded-[20px] shadow-subtle"
            >
              <X className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          )}

          {/* Results Count */}
          {hasActiveFilters && (
            <p className="text-sm text-muted-foreground text-center">
              {filteredRecipes.length} {filteredRecipes.length === 1 ? "recipe" : "recipes"} found
            </p>
          )}
        </div>

        {/* Recipe Cards */}
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-5" />
            <h2 className="text-xl font-semibold mb-3">No recipes found</h2>
            <p className="text-muted-foreground text-base mb-5">
              Try adjusting your search or filters
            </p>
            {hasActiveFilters && (
              <Button
                onClick={clearFilters}
                variant="outline"
                className="shadow-subtle"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        ) : (
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
              {filteredRecipes.map((recipe, index) => (
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
        )}
      </main>
    </PageTransition>
  );
}

