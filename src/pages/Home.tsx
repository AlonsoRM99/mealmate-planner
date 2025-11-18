import { recipes } from "@/data/recipes";
import { RecipeCard } from "@/components/RecipeCard";
import { useFavorites } from "@/hooks/useFavorites";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-primary">MealMate</h1>
          <p className="text-muted-foreground mt-1">Healthy recipes for every day</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-4">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={isFavorite(recipe.id)}
              onToggleFavorite={toggleFavorite}
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
