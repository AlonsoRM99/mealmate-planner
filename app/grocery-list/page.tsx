"use client";

import { useState } from "react";
import { ShoppingCart, Trash2, List, Merge } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGroceryList, type GroceryListViewMode } from "@/hooks/useGroceryList";
import { useFavorites } from "@/hooks/useFavorites";
import { recipes } from "@/data/recipes";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { PageTransition } from "@/components/ui/page-transition";

export default function GroceryList() {
  const { groceryList, toggleItem, removeItem, clearChecked, generateFromFavorites, clearAll } = useGroceryList();
  const { favorites } = useFavorites();
  const [viewMode, setViewMode] = useState<GroceryListViewMode>("merged");

  const handleClearChecked = () => {
    clearChecked();
    toast.success("Checked items removed");
  };

  const handleGenerateFromFavorites = () => {
    const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id));
    
    if (favoriteRecipes.length === 0) {
      toast.error("No favorite recipes to generate from");
      return;
    }

    generateFromFavorites(
      favoriteRecipes.map((r) => ({
        id: r.id,
        name: r.name,
        ingredients: r.ingredients,
      })),
      viewMode
    );
    toast.success(`Generated grocery list from ${favoriteRecipes.length} favorite recipe${favoriteRecipes.length === 1 ? "" : "s"}`);
  };

  const handleClearAll = () => {
    clearAll();
    toast.success("Grocery list cleared");
  };

  // Group items by recipe if in grouped mode
  const groupedItems = viewMode === "grouped" 
    ? groceryList.reduce((acc, item) => {
        const recipeId = item.recipeId || "ungrouped";
        if (!acc[recipeId]) {
          acc[recipeId] = {
            recipeName: item.recipeName || "Other",
            items: [],
          };
        }
        acc[recipeId].items.push(item);
        return acc;
      }, {} as Record<string, { recipeName: string; items: typeof groceryList }>)
    : null;

  return (
    <PageTransition>
      <header className="bg-card border-b border-border sticky top-0 z-40 shadow-subtle">
        <div className="max-w-md mx-auto px-5 sm:px-6 py-5 sm:py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary flex items-center gap-2 mb-1">
            <ShoppingCart className="h-6 w-6 sm:h-8 sm:w-8" />
            Grocery List
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {groceryList.length} {groceryList.length === 1 ? "item" : "items"}
          </p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-5 sm:px-6 py-6 sm:py-8">
        {groceryList.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-5" />
            <h2 className="text-xl font-semibold mb-3">Your list is empty</h2>
            <p className="text-muted-foreground text-base mb-6">
              Add ingredients from recipes to build your grocery list
            </p>
            {favorites.length > 0 && (
              <Button
                onClick={handleGenerateFromFavorites}
                className="shadow-subtle"
              >
                Generate from Favorites
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* Controls */}
            <div className="mb-5 space-y-3">
              {/* View Mode Toggle */}
              <div className="flex items-center justify-between p-4 bg-card rounded-[20px] border border-border shadow-subtle">
                <div className="flex items-center gap-3">
                  {viewMode === "grouped" ? (
                    <List className="h-5 w-5 text-primary" />
                  ) : (
                    <Merge className="h-5 w-5 text-primary" />
                  )}
                  <div className="flex flex-col">
                    <Label htmlFor="view-mode" className="text-sm font-medium cursor-pointer">
                      {viewMode === "grouped" ? "Group by Recipe" : "Merge Similar Items"}
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      {viewMode === "grouped"
                        ? "See ingredients organized by recipe"
                        : "Combine similar ingredients together"}
                    </span>
                  </div>
                </div>
                <Switch
                  id="view-mode"
                  checked={viewMode === "merged"}
                  onCheckedChange={(checked) => setViewMode(checked ? "merged" : "grouped")}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {favorites.length > 0 && (
                  <Button
                    onClick={handleGenerateFromFavorites}
                    variant="outline"
                    size="sm"
                    className="flex-1 shadow-subtle"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add from Favorites
                  </Button>
                )}
                {groceryList.some((item) => item.checked) && (
                  <Button
                    onClick={handleClearChecked}
                    variant="outline"
                    size="sm"
                    className="flex-1 shadow-subtle"
                  >
                    Clear Checked
                  </Button>
                )}
                <Button
                  onClick={handleClearAll}
                  variant="outline"
                  size="sm"
                  className="shadow-subtle"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Grocery List Items */}
            {viewMode === "grouped" && groupedItems ? (
              <div className="space-y-6">
                {Object.entries(groupedItems).map(([recipeId, group]) => (
                  <div key={recipeId} className="space-y-3">
                    <h3 className="text-lg font-semibold text-primary px-2">
                      {group.recipeName}
                    </h3>
                    <div className="space-y-3">
                      {group.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-5 bg-card rounded-[20px] border border-border shadow-subtle hover:shadow-card transition-all duration-200"
                        >
                          <Checkbox
                            checked={item.checked}
                            onCheckedChange={() => toggleItem(item.id)}
                            className="flex-shrink-0"
                          />
                          <span
                            className={cn(
                              "flex-1",
                              item.checked && "line-through text-muted-foreground"
                            )}
                          >
                            {item.name}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:scale-110 transition-all duration-200 p-1 rounded-full hover:bg-destructive/10"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                className="space-y-3"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
              >
                <AnimatePresence mode="popLayout">
                  {groceryList.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, scale: 0.95 }}
                      transition={{
                        duration: 0.2,
                        ease: [0.22, 1, 0.36, 1],
                        delay: index * 0.03,
                      }}
                      className="flex items-center gap-4 p-5 bg-card rounded-[20px] border border-border shadow-subtle hover:shadow-card transition-all duration-200"
                    >
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => toggleItem(item.id)}
                      className="flex-shrink-0"
                    />
                    <span
                      className={cn(
                        "flex-1",
                        item.checked && "line-through text-muted-foreground"
                      )}
                    >
                      {item.name}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:scale-110 transition-all duration-200 p-1 rounded-full hover:bg-destructive/10"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </>
        )}
      </main>
    </PageTransition>
  );
}

