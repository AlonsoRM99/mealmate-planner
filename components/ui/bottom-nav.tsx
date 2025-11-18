"use client";

import { Home, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/favorites", icon: Heart, label: "Favorites" },
    { href: "/grocery-list", icon: ShoppingCart, label: "Grocery" },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-area-inset-bottom shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
      <div className="flex justify-around items-center h-16 sm:h-20 max-w-md mx-auto px-2 sm:px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 py-2 text-muted-foreground transition-all duration-200 hover:text-primary rounded-[20px]",
                isActive && "text-primary"
              )}
            >
              <item.icon
                className={cn("h-5 w-5 sm:h-6 sm:w-6 mb-1 transition-all duration-200", isActive && "fill-primary")}
              />
              <span className="text-[10px] sm:text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

