#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🍽️  NuKoken Website Setup Script');
console.log('================================\n');

// Backup belangrijke bestanden
const backupFiles = ['.env.local', '.env', 'package.json'];
const backups = {};

console.log('📦 Backing up important files...');
backupFiles.forEach(file => {
  if (fs.existsSync(file)) {
    backups[file] = fs.readFileSync(file, 'utf8');
    console.log(`✅ Backed up ${file}`);
  }
});

// Clean src directory
console.log('\n🗑️  Cleaning src directory...');
if (fs.existsSync('src')) {
  fs.rmSync('src', { recursive: true, force: true });
  console.log('✅ Cleaned src directory');
}

// Create directory structure
console.log('\n📁 Creating directory structure...');
const directories = [
  'src',
  'src/app',
  'src/app/recepten',
  'src/app/recepten/[slug]',
  'src/components',
  'src/lib',
  'src/types'
];

directories.forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
  console.log(`✅ Created ${dir}`);
});

// File contents
const files = {
  // Package.json
  'package.json': `{
  "name": "nukoken-website",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@vercel/postgres": "^0.5.1"
  },
  "devDependencies": {
    "@types/node": "^20.9.0",
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.53.0",
    "eslint-config-next": "14.0.3",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "typescript": "^5.2.2"
  }
}`,

  // Next.js config
  'next.config.js': `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
}

module.exports = nextConfig`,

  // Tailwind config
  'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`,

  // PostCSS config
  'postcss.config.js': `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`,

  // TypeScript config
  'tsconfig.json': `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`,

  // Types
  'src/types/recipe.ts': `export interface Recipe {
  id: number
  title: string
  slug: string
  description: string
  image_url: string
  category: string
  prep_time: number
  cook_time: number
  servings: number
  difficulty: string
  tags?: string
  ingredients?: string
  instructions?: string
  is_popular: boolean
  created_at: Date
  updated_at: Date
}

export interface RecipeCardProps {
  recipe: Recipe
}`,

  // Database
  'src/lib/database.ts': `import { sql } from '@vercel/postgres'
import { Recipe } from '@/types/recipe'

export async function getAllRecipes(): Promise<Recipe[]> {
  try {
    const { rows } = await sql\`
      SELECT * FROM recepten 
      ORDER BY created_at DESC
    \`
    return rows as Recipe[]
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return []
  }
}

export async function getPopularRecipes(): Promise<Recipe[]> {
  try {
    const { rows } = await sql\`
      SELECT * FROM recepten 
      WHERE is_popular = true 
      ORDER BY created_at DESC 
      LIMIT 6
    \`
    return rows as Recipe[]
  } catch (error) {
    console.error('Error fetching popular recipes:', error)
    return []
  }
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  try {
    const { rows } = await sql\`
      SELECT * FROM recepten 
      WHERE slug = \${slug} 
      LIMIT 1
    \`
    return rows[0] as Recipe || null
  } catch (error) {
    console.error('Error fetching recipe by slug:', error)
    return null
  }
}

export async function getRecipesByCategory(category: string): Promise<Recipe[]> {
  try {
    const { rows } = await sql\`
      SELECT * FROM recepten 
      WHERE LOWER(category) = LOWER(\${category})
      ORDER BY created_at DESC
    \`
    return rows as Recipe[]
  } catch (error) {
    console.error('Error fetching recipes by category:', error)
    return []
  }
}`,

  // Constants
  'src/lib/constants.ts': `export const categories = [
  { name: 'voorgerecht', icon: '🥗' },
  { name: 'hoofdgerecht', icon: '🍽️' },
  { name: 'bijgerecht', icon: '🥘' },
  { name: 'dessert', icon: '🍰' },
  { name: 'snack', icon: '🍪' },
  { name: 'drank', icon: '🥤' }
]

export const difficulties = [
  { name: 'makkelijk', color: 'green' },
  { name: 'gemiddeld', color: 'yellow' },
  { name: 'moeilijk', color: 'red' }
]`,

  // Global CSS
  'src/app/globals.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

@layer base {
  :focus {
    outline: 2px solid rgb(249 115 22);
    outline-offset: 2px;
  }
}

html {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}`,

  // Layout
  'src/app/layout.tsx': `import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NuKoken - Heerlijke Recepten',
  description: 'Ontdek heerlijke recepten voor elke gelegenheid',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className="antialiased bg-gray-50">
        {children}
      </body>
    </html>
  )
}`,

  // Header Component
  'src/components/Header.tsx': `import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold">🍽️</span>
          </div>
          <span className="text-xl font-bold text-gray-900">NuKoken</span>
        </Link>
        
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="text-orange-500 font-medium">
            Home
          </Link>
          <Link href="/recepten" className="text-gray-600 hover:text-orange-500">
            Recepten
          </Link>
          <Link href="/over" className="text-gray-600 hover:text-orange-500">
            Over
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-orange-500">
            Contact
          </Link>
        </div>

        <div className="flex items-center">
          <input
            type="search"
            placeholder="Zoek recepten..."
            className="hidden md:block px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
          />
        </div>
      </nav>
    </header>
  )
}`,

  // Footer Component
  'src/components/Footer.tsx': `export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">NuKoken</h3>
            <p className="text-gray-400">
              Jouw dagelijkse inspiratie voor heerlijke maaltijden.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Navigatie</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/recepten" className="hover:text-white">Recepten</a></li>
              <li><a href="/over" className="hover:text-white">Over</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Categorieën</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/recepten?category=voorgerecht" className="hover:text-white">Voorgerechten</a></li>
              <li><a href="/recepten?category=hoofdgerecht" className="hover:text-white">Hoofdgerechten</a></li>
              <li><a href="/recepten?category=dessert" className="hover:text-white">Desserts</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 NuKoken. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  )
}`,

  // Recipe Card Component
  'src/components/RecipeCard.tsx': `import Link from 'next/link'
import Image from 'next/image'
import { Recipe } from '@/types/recipe'

interface RecipeCardProps {
  recipe: Recipe
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty.toLowerCase()) {
    case 'makkelijk': return 'bg-green-100 text-green-800'
    case 'gemiddeld': return 'bg-yellow-100 text-yellow-800'
    case 'moeilijk': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

function getCategoryColor(category: string) {
  switch (category.toLowerCase()) {
    case 'voorgerecht': return 'bg-blue-100 text-blue-800'
    case 'hoofdgerecht': return 'bg-purple-100 text-purple-800'
    case 'bijgerecht': return 'bg-orange-100 text-orange-800'
    case 'dessert': return 'bg-pink-100 text-pink-800'
    case 'snack': return 'bg-yellow-100 text-yellow-800'
    case 'drank': return 'bg-cyan-100 text-cyan-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const totalTime = recipe.prep_time + recipe.cook_time

  return (
    <Link href={\`/recepten/\${recipe.slug}\`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="relative h-48">
          <Image
            src={recipe.image_url || '/placeholder-recipe.jpg'}
            alt={recipe.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 right-3">
            <span className={\`inline-block px-2 py-1 rounded-full text-xs font-medium \${getCategoryColor(recipe.category)}\`}>
              {recipe.category}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {recipe.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {recipe.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <span className="flex items-center">
              ⏱️ {totalTime} min
            </span>
            <span className="flex items-center">
              👥 {recipe.servings} pers
            </span>
            <span className={\`px-2 py-1 rounded-full text-xs \${getDifficultyColor(recipe.difficulty)}\`}>
              {recipe.difficulty}
            </span>
          </div>
          
          <div className="text-orange-600 font-medium text-sm hover:underline">
            Lees meer →
          </div>
        </div>
      </div>
    </Link>
  )
}`,

  // Homepage
  'src/app/page.tsx': `import { getAllRecipes, getPopularRecipes } from '@/lib/database'
import RecipeCard from '@/components/RecipeCard'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { categories } from '@/lib/constants'

export const revalidate = 3600

export default async function HomePage() {
  const [popularRecipes, allRecipes] = await Promise.all([
    getPopularRecipes(),
    getAllRecipes()
  ])
  
  const latestRecipes = allRecipes.slice(0, 6)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg p-8 mb-12">
          <h1 className="text-4xl font-bold mb-4">Welkom bij NuKoken</h1>
          <p className="text-xl mb-6">Ontdek heerlijke oosterse recepten voor elke gelegenheid</p>
          <Link 
            href="/recepten"
            className="bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Bekijk alle recepten
          </Link>
        </div>

        {/* Popular Recipes */}
        {popularRecipes.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Populaire Recepten</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularRecipes.slice(0, 3).map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        )}

        {/* Latest Recipes */}
        {latestRecipes.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Nieuwste Recepten</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestRecipes.slice(0, 3).map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        )}

        {/* Categories */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Ontdek per Categorie</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => (
              <Link
                key={category.name}
                href={\`/recepten?category=\${category.name}\`}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition text-center block"
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <p className="font-semibold capitalize">{category.name}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}`,

  // Recepten page
  'src/app/recepten/page.tsx': `import { getAllRecipes, getRecipesByCategory } from '@/lib/database'
import RecipeCard from '@/components/RecipeCard'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { categories } from '@/lib/constants'

export const revalidate = 3600

export const metadata = {
  title: 'Alle Recepten - NuKoken',
  description: 'Ontdek heerlijke recepten voor elke gelegenheid'
}

interface PageProps {
  searchParams: { category?: string }
}

export default async function ReceptenPage({ searchParams }: PageProps) {
  const selectedCategory = searchParams.category
  
  const recipes = selectedCategory 
    ? await getRecipesByCategory(selectedCategory)
    : await getAllRecipes()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-gray-900">
              {selectedCategory ? \`\${selectedCategory} Recepten\` : 'Alle Recepten'}
            </h1>
            <Link 
              href="/"
              className="text-orange-600 hover:text-orange-700 font-medium flex items-center"
            >
              ← Terug naar home
            </Link>
          </div>
          <p className="text-lg text-gray-600">
            {selectedCategory 
              ? \`Ontdek \${recipes.length} heerlijke \${selectedCategory} recepten\`
              : \`Ontdek \${recipes.length} heerlijke recepten voor elke gelegenheid\`
            }
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Filter op categorie:</h3>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/recepten"
              className={\`px-4 py-2 rounded-full text-sm transition \${
                !selectedCategory
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }\`}
            >
              Alle
            </Link>
            {categories.map(category => (
              <Link
                key={category.name}
                href={\`/recepten?category=\${category.name}\`}
                className={\`px-4 py-2 rounded-full text-sm transition \${
                  selectedCategory === category.name
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }\`}
              >
                {category.icon} {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Recipes Grid */}
        {recipes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Geen recepten gevonden
            </h3>
            <p className="text-gray-600 mb-6">
              {selectedCategory 
                ? \`Er zijn geen recepten in de categorie "\${selectedCategory}"\`
                : 'Er zijn nog geen recepten toegevoegd'
              }
            </p>
            {selectedCategory && (
              <Link
                href="/recepten"
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                Bekijk alle recepten →
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}`,

  // Recipe detail page
  'src/app/recepten/[slug]/page.tsx': `import { getRecipeBySlug, getAllRecipes } from '@/lib/database'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export const revalidate = 3600

export async function generateStaticParams() {
  const recipes = await getAllRecipes()
  return recipes.map(recipe => ({
    slug: recipe.slug
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const recipe = await getRecipeBySlug(params.slug)
  
  if (!recipe) {
    return {
      title: 'Recept niet gevonden - NuKoken'
    }
  }

  return {
    title: \`\${recipe.title} - NuKoken\`,
    description: recipe.description
  }
}

interface PageProps {
  params: { slug: string }
}

export default async function ReceptPage({ params }: PageProps) {
  const recipe = await getRecipeBySlug(params.slug)

  if (!recipe) {
    notFound()
  }

  const totalTime = recipe.prep_time + recipe.cook_time
  const ingredients = recipe.ingredients ? recipe.ingredients.split('\\n').filter(Boolean) : []
  const instructions = recipe.instructions ? recipe.instructions.split('\\n').filter(Boolean) : []

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            href="/recepten"
            className="text-orange-600 hover:text-orange-700 font-medium flex items-center"
          >
            ← Terug naar recepten
          </Link>
        </div>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Recipe Header */}
          <div className="relative h-96">
            <Image
              src={recipe.image_url || '/placeholder-recipe.jpg'}
              alt={recipe.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="text-white p-8">
                <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
                <p className="text-xl mb-4">{recipe.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    ⏱️ {totalTime} min
                  </span>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    👥 {recipe.servings} personen
                  </span>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    📊 {recipe.difficulty}
                  </span>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    🏷️ {recipe.category}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Ingredients */}
              <div className="md:col-span-1">
                <h2 className="text-2xl font-bold mb-4">Ingrediënten</h2>
                {ingredients.length > 0 ? (
                  <ul className="space-y-2">
                    {ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">Geen ingrediënten beschikbaar</p>
                )}
              </div>

              {/* Instructions */}
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4">Bereidingswijze</h2>
                {instructions.length > 0 ? (
                  <ol className="space-y-4">
                    {instructions.map((instruction, index) => (
                      <li key={index} className="flex">
                        <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center mr-4 mt-1 text-sm font-semibold">
                          {index + 1}
                        </span>
                        <p className="text-gray-700 leading-relaxed">{instruction}</p>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-gray-500">Geen bereidingswijze beschikbaar</p>
                )}
              </div>
            </div>

            {/* Tags */}
            {recipe.tags && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.split(',').map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}`
};

// Create files
console.log('\n📄 Creating files...');
Object.entries(files).forEach(([filename, content]) => {
  // Only overwrite package.json if no backup exists
  if (filename === 'package.json' && backups['package.json']) {
    console.log('⏭️  Skipping package.json (backup exists)');
    return;
  }
  
  fs.writeFileSync(filename, content);
  console.log(`✅ Created ${filename}`);
});

// Restore backed up files
console.log('\n🔄 Restoring backed up files...');
Object.entries(backups).forEach(([filename, content]) => {
  if (filename !== 'package.json') { // We want the new package.json
    fs.writeFileSync(filename, content);
    console.log(`✅ Restored ${filename}`);
  }
});

// Create placeholder image
console.log('\n🖼️  Creating placeholder files...');
if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

// Create a simple gitignore
const gitignore = `# Dependencies
node_modules/
.npm
.pnpm-debug.log*

# Next.js
.next/
out/

# Environment
.env*.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db`;

fs.writeFileSync('.gitignore', gitignore);
console.log('✅ Created .gitignore');

console.log('\n🎉 Setup complete!');
console.log('\nNext steps:');
console.log('1. Add your database URL to .env.local:');
console.log('   POSTGRES_URL="your-neon-database-url"');
console.log('2. Install dependencies: npm install');
console.log('3. Start development server: npm run dev');
console.log('\n🚀 Happy coding!');