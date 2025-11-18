# MealMate Planner

A modern, mobile-first meal planning application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🍳 Browse healthy recipes
- ❤️ Save favorite recipes
- 🛒 Create and manage grocery lists
- 📱 Mobile-first responsive design
- 🎨 Beautiful UI with shadcn/ui components

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Hooks + LocalStorage
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with bottom navigation
│   ├── page.tsx            # Home page
│   ├── favorites/          # Favorites page
│   ├── grocery-list/       # Grocery list page
│   └── recipe/[id]/        # Recipe detail page
├── components/
│   └── ui/                 # Reusable UI components
│       ├── bottom-nav.tsx  # Bottom navigation bar
│       └── recipe-card.tsx # Recipe card component
├── data/
│   └── recipes.ts          # Mock recipe data
├── hooks/                  # Custom React hooks
│   ├── useFavorites.ts     # Favorites management
│   └── useGroceryList.ts   # Grocery list management
├── lib/
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

## Building for Production

```bash
npm run build
npm start
```

## Key Features

### TypeScript Strict Mode
The project uses TypeScript strict mode for maximum type safety.

### Mobile-First Design
All components are designed mobile-first with responsive breakpoints for larger screens.

### Shared Layout
The root layout includes a bottom navigation bar that persists across all pages.

### Component Organization
All reusable components are organized in `/components/ui/` for easy maintenance.

## License

MIT
