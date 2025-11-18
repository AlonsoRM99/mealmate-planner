import { useParams, useNavigate } from "react-router-dom";
import { recipes } from "@/data/recipes";
import { ArrowLeft, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { useGroceryList } from "@/hooks/useGroceryList";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { generateFromRecipes } = useGroceryList();

  const recipe = recipes.find((r) => r.id === id);

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

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-64 object-cover"
        />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-full p-2 hover:scale-110 transition-transform"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => toggleFavorite(recipe.id)}
          className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-full p-2 hover:scale-110 transition-transform"
        >
          <Heart
            className={cn(
              "h-6 w-6 transition-colors",
              isFavorite(recipe.id) ? "fill-secondary text-secondary" : "text-foreground"
            )}
          />
        </button>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{recipe.name}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {recipe.prepTime} min
            </span>
            <span>{recipe.calories} cal</span>
            <span className="px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
              {recipe.difficulty}
            </span>
          </div>
        </div>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Ingredients</h2>
            <Button onClick={handleAddToGroceryList} variant="outline" size="sm">
              Add to List
            </Button>
          </div>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <ol className="space-y-4">
            {recipe.steps.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                  {index + 1}
                </span>
                <p className="pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
};

export default RecipeDetail;
