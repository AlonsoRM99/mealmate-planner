import { Heart } from "lucide-react";
import { Recipe } from "@/data/recipes";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: () => void;
}

export const RecipeCard = ({ recipe, isFavorite, onToggleFavorite, onClick }: RecipeCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative" onClick={onClick}>
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(recipe.id);
          }}
          className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full p-2 hover:scale-110 transition-transform"
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-colors",
              isFavorite ? "fill-secondary text-secondary" : "text-foreground"
            )}
          />
        </button>
      </div>
      <CardContent className="p-4" onClick={onClick}>
        <h3 className="font-semibold text-lg mb-2">{recipe.name}</h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{recipe.calories} cal</span>
          <span>{recipe.prepTime} min</span>
          <span className="px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
            {recipe.difficulty}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
