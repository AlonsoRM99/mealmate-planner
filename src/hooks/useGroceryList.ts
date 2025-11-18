import { useState, useEffect } from "react";

export interface GroceryItem {
  id: string;
  name: string;
  checked: boolean;
}

export const useGroceryList = () => {
  const [groceryList, setGroceryList] = useState<GroceryItem[]>(() => {
    const stored = localStorage.getItem("mealmate-grocery-list");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("mealmate-grocery-list", JSON.stringify(groceryList));
  }, [groceryList]);

  const addItem = (name: string) => {
    const id = Date.now().toString();
    setGroceryList((prev) => [...prev, { id, name, checked: false }]);
  };

  const toggleItem = (id: string) => {
    setGroceryList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setGroceryList((prev) => prev.filter((item) => item.id !== id));
  };

  const clearChecked = () => {
    setGroceryList((prev) => prev.filter((item) => !item.checked));
  };

  const generateFromRecipes = (ingredients: string[]) => {
    const newItems = ingredients.map((ingredient) => ({
      id: Date.now().toString() + Math.random(),
      name: ingredient,
      checked: false,
    }));
    setGroceryList((prev) => [...prev, ...newItems]);
  };

  return {
    groceryList,
    addItem,
    toggleItem,
    removeItem,
    clearChecked,
    generateFromRecipes,
  };
};
