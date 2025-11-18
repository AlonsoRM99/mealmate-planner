import { ShoppingCart, Trash2 } from "lucide-react";
import { useGroceryList } from "@/hooks/useGroceryList";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const GroceryList = () => {
  const { groceryList, toggleItem, removeItem, clearChecked } = useGroceryList();

  const handleClearChecked = () => {
    clearChecked();
    toast.success("Checked items removed");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
            <ShoppingCart className="h-8 w-8" />
            Grocery List
          </h1>
          <p className="text-muted-foreground mt-1">
            {groceryList.length} {groceryList.length === 1 ? "item" : "items"}
          </p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {groceryList.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your list is empty</h2>
            <p className="text-muted-foreground">
              Add ingredients from recipes to build your grocery list
            </p>
          </div>
        ) : (
          <>
            {groceryList.some((item) => item.checked) && (
              <div className="mb-4">
                <Button
                  onClick={handleClearChecked}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Clear Checked Items
                </Button>
              </div>
            )}

            <div className="space-y-2">
              {groceryList.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border"
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
                    className="text-destructive hover:scale-110 transition-transform"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default GroceryList;
