"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Recipe } from "@/data/recipes";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export function RecipeCard({
  recipe,
  isFavorite,
  onToggleFavorite,
}: RecipeCardProps) {
  const router = useRouter();
  const [isTapped, setIsTapped] = useState(false);

  const handleClick = () => {
    router.push(`/recipe/${recipe.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTapped(true);
    onToggleFavorite(recipe.id);
    setTimeout(() => setIsTapped(false), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 cursor-pointer border-0">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-[20px]" onClick={handleClick}>
        <Image
          src={recipe.image}
          alt={recipe.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <motion.button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full p-2.5 shadow-subtle hover:shadow-md z-10"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
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
                "h-5 w-5 transition-colors",
                isFavorite ? "fill-secondary text-secondary" : "text-foreground"
              )}
            />
          </motion.div>
        </motion.button>
      </div>
      <CardContent className="p-5 sm:p-6" onClick={handleClick}>
        <h3 className="font-semibold text-lg sm:text-xl mb-3 text-foreground">{recipe.name}</h3>
        <div className="flex items-center justify-between text-sm sm:text-base text-muted-foreground flex-wrap gap-3">
          <span>{recipe.calories} cal</span>
          <span>{recipe.prepTime} min</span>
          <span className="px-3 py-1.5 bg-accent text-accent-foreground rounded-full text-xs font-medium shadow-subtle">
            {recipe.difficulty}
          </span>
        </div>
      </CardContent>
    </Card>
    </motion.div>
  );
}

