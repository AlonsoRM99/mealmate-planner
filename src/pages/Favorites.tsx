import { recipes } from "@/data/recipes";
import { RecipeCard } from "@/components/RecipeCard";
import { useFavorites } from "@/hooks/useFavorites";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

const Favorites = () => {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id));

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
            <Heart className="h-8 w-8 fill-primary" />
            Favorites
          </h1>
          <p className="text-muted-foreground mt-1">
            {favoriteRecipes.length} saved {favoriteRecipes.length === 1 ? "recipe" : "recipes"}
          </p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {favoriteRecipes.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground">
              Start adding recipes to your favorites by tapping the heart icon
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {favoriteRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={isFavorite(recipe.id)}
                onToggleFavorite={toggleFavorite}
                onClick={() => navigate(`/recipe/${recipe.id}`)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;
