"use client";

import { useState, useEffect, useCallback } from "react";

export interface GroceryItem {
  id: string;
  name: string;
  checked: boolean;
  recipeId?: string; // Optional: recipe ID if grouped by recipe
  recipeName?: string; // Optional: recipe name if grouped by recipe
}

export type GroceryListViewMode = "grouped" | "merged";

export function useGroceryList() {
  const [groceryList, setGroceryList] = useState<GroceryItem[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("mealmate-grocery-list");
    return stored ? (JSON.parse(stored) as GroceryItem[]) : [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mealmate-grocery-list", JSON.stringify(groceryList));
    }
  }, [groceryList]);

  const addItem = (name: string): void => {
    const id = Date.now().toString();
    setGroceryList((prev) => [...prev, { id, name, checked: false }]);
  };

  const toggleItem = (id: string): void => {
    setGroceryList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const removeItem = (id: string): void => {
    setGroceryList((prev) => prev.filter((item) => item.id !== id));
  };

  const clearChecked = (): void => {
    setGroceryList((prev) => prev.filter((item) => !item.checked));
  };

  const generateFromRecipes = (ingredients: readonly string[]): void => {
    const newItems: GroceryItem[] = ingredients.map((ingredient) => ({
      id: `${Date.now()}-${Math.random()}`,
      name: ingredient,
      checked: false,
    }));
    setGroceryList((prev) => [...prev, ...newItems]);
  };

  /**
   * Normalize ingredient name for comparison (lowercase, trim, remove extra spaces)
   */
  const normalizeIngredient = (ingredient: string): string => {
    return ingredient
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ")
      .replace(/[()]/g, ""); // Remove parentheses for better matching
  };

  /**
   * Check if two ingredients are similar (for merging)
   */
  const areSimilarIngredients = (ing1: string, ing2: string): boolean => {
    const norm1 = normalizeIngredient(ing1);
    const norm2 = normalizeIngredient(ing2);
    
    // Exact match after normalization
    if (norm1 === norm2) return true;
    
    // Check if one contains the other (e.g., "olive oil" and "extra virgin olive oil")
    if (norm1.includes(norm2) || norm2.includes(norm1)) {
      // But not too different in length (avoid matching "oil" with "olive oil")
      const lengthDiff = Math.abs(norm1.length - norm2.length);
      return lengthDiff < Math.max(norm1.length, norm2.length) * 0.5;
    }
    
    return false;
  };

  /**
   * Generate grocery list from favorite recipes
   * @param favoriteRecipes - Array of recipe objects with id, name, and ingredients
   * @param viewMode - "grouped" to group by recipe, "merged" to merge similar items
   */
  const generateFromFavorites = useCallback(
    (
      favoriteRecipes: Array<{ id: string; name: string; ingredients: readonly string[] }>,
      viewMode: GroceryListViewMode = "merged"
    ): void => {
      if (viewMode === "grouped") {
        // Group by recipe - keep recipe information
        const newItems: GroceryItem[] = [];
        favoriteRecipes.forEach((recipe) => {
          recipe.ingredients.forEach((ingredient) => {
            newItems.push({
              id: `${recipe.id}-${ingredient}-${Date.now()}-${Math.random()}`,
              name: ingredient,
              checked: false,
              recipeId: recipe.id,
              recipeName: recipe.name,
            });
          });
        });
        setGroceryList((prev) => [...prev, ...newItems]);
      } else {
        // Merged mode - deduplicate similar ingredients
        const allIngredients: Array<{ name: string; recipeId: string; recipeName: string }> = [];
        
        favoriteRecipes.forEach((recipe) => {
          recipe.ingredients.forEach((ingredient) => {
            allIngredients.push({
              name: ingredient,
              recipeId: recipe.id,
              recipeName: recipe.name,
            });
          });
        });

        // Deduplicate: merge similar ingredients
        const merged: GroceryItem[] = [];
        const processed = new Set<string>();

        allIngredients.forEach((ing) => {
          // Check if we've already processed a similar ingredient
          const alreadyProcessed = Array.from(processed).some((processedName) =>
            areSimilarIngredients(processedName, ing.name)
          );

          if (!alreadyProcessed) {
            // Find all similar ingredients to merge
            const similar = allIngredients.filter((other) =>
              areSimilarIngredients(ing.name, other.name)
            );

            // Use the longest/most descriptive name
            const bestName = similar.reduce((best, current) =>
              current.name.length > best.length ? current.name : best
            );

            merged.push({
              id: `merged-${normalizeIngredient(bestName)}-${Date.now()}-${Math.random()}`,
              name: bestName,
              checked: false,
            });

            // Mark all similar ingredients as processed
            similar.forEach((s) => processed.add(s.name));
          }
        });

        setGroceryList((prev) => [...prev, ...merged]);
      }
    },
    []
  );

  /**
   * Clear all items from the grocery list
   */
  const clearAll = useCallback((): void => {
    setGroceryList([]);
  }, []);

  return {
    groceryList,
    addItem,
    toggleItem,
    removeItem,
    clearChecked,
    clearAll,
    generateFromRecipes,
    generateFromFavorites,
  };
}

