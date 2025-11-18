"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "mealmate-favorites";

/**
 * Custom hook for managing favorite recipes with LocalStorage persistence
 * @returns Object containing favorites array, toggle function, check function, and clear function
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    // Initialize from LocalStorage on mount (client-side only)
    if (typeof window === "undefined") return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      
      const parsed = JSON.parse(stored) as unknown;
      
      // Validate that stored data is an array of strings
      if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) {
        return parsed;
      }
      
      // If invalid data, clear it and return empty array
      localStorage.removeItem(STORAGE_KEY);
      return [];
    } catch (error) {
      // If parsing fails, clear corrupted data and return empty array
      console.error("Error loading favorites from LocalStorage:", error);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Ignore errors when clearing
      }
      return [];
    }
  });

  // Save to LocalStorage whenever favorites change
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites to LocalStorage:", error);
      // Handle quota exceeded or other storage errors
      if (error instanceof DOMException && error.name === "QuotaExceededError") {
        console.warn("LocalStorage quota exceeded. Favorites may not be saved.");
      }
    }
  }, [favorites]);

  /**
   * Toggle a recipe's favorite status
   * @param recipeId - The ID of the recipe to toggle
   */
  const toggleFavorite = useCallback((recipeId: string): void => {
    if (!recipeId || typeof recipeId !== "string") {
      console.warn("Invalid recipeId provided to toggleFavorite");
      return;
    }

    setFavorites((prev) => {
      const wasFavorite = prev.includes(recipeId);
      if (wasFavorite) {
        // Remove from favorites
        return prev.filter((id) => id !== recipeId);
      } else {
        // Add to favorites
        return [...prev, recipeId];
      }
    });
  }, []);

  /**
   * Check if a recipe is favorited
   * @param recipeId - The ID of the recipe to check
   * @returns true if the recipe is favorited, false otherwise
   */
  const isFavorite = useCallback((recipeId: string): boolean => {
    if (!recipeId || typeof recipeId !== "string") return false;
    return favorites.includes(recipeId);
  }, [favorites]);

  /**
   * Clear all favorites
   */
  const clearFavorites = useCallback((): void => {
    setFavorites([]);
  }, []);

  /**
   * Add multiple recipes to favorites at once
   * @param recipeIds - Array of recipe IDs to add
   */
  const addFavorites = useCallback((recipeIds: string[]): void => {
    if (!Array.isArray(recipeIds)) {
      console.warn("Invalid recipeIds array provided to addFavorites");
      return;
    }

    setFavorites((prev) => {
      const newFavorites = [...prev];
      recipeIds.forEach((id) => {
        if (typeof id === "string" && !newFavorites.includes(id)) {
          newFavorites.push(id);
        }
      });
      return newFavorites;
    });
  }, []);

  /**
   * Remove multiple recipes from favorites at once
   * @param recipeIds - Array of recipe IDs to remove
   */
  const removeFavorites = useCallback((recipeIds: string[]): void => {
    if (!Array.isArray(recipeIds)) {
      console.warn("Invalid recipeIds array provided to removeFavorites");
      return;
    }

    setFavorites((prev) => prev.filter((id) => !recipeIds.includes(id)));
  }, []);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    addFavorites,
    removeFavorites,
  };
}

