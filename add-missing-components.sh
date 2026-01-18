#!/bin/bash

# 🔧 Add All Missing Components to NuKoken
# Run this script in your nukoken-website directory

echo "🔧 Adding all missing components and pages..."

# 1. Fix next.config.js first
echo "📝 Fixing Next.js config..."
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  }
}

module.exports = nextConfig
EOF

# 2. Add RecipeGrid component
echo "📦 Adding RecipeGrid component..."
cat > components/RecipeGrid.tsx << 'EOF'
'use client'
import { useState, useMemo } from 'react'
import { Recipe } from '@/lib/types'
import { categories } from '@/lib/constants'
import RecipeCard from './RecipeCard'

interface RecipeGridProps {
  recipes: Recipe[]
  showFilters?: boolean
}

export default function RecipeGrid({ recipes, showFilters = true }: RecipeGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch = searchTerm === '' || 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === '' || recipe.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [recipes, searchTerm, selectedCategory])

  return (
    <div>
      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow mb-8">
          <div className="flex flex-wrap gap-4">
            <select
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Alle categorieën</option>
              {categories.map(cat => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            
            <input
              type="text"
              placeholder="Zoek in recepten..."
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 flex-1 min-w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          Geen recepten gevonden. Probeer een andere zoekterm of categorie.
        </p>
      )}
    </div>
  )
}
EOF

# 3. Add AddRecipeForm component
echo "📦 Adding AddRecipeForm component..."
cat > components/AddRecipeForm.tsx << 'EOF'
'use client'
import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import { categories } from '@/lib/constants'
import { RecipeFormData } from '@/lib/types'

interface AddRecipeFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (recipe: RecipeFormData) => Promise<void>
}

export default function AddRecipeForm({ isOpen, onClose, onSubmit }: AddRecipeFormProps) {
  const [newRecipe, setNewRecipe] = useState<RecipeFormData>({
    title: '',
    description: '',
    image_url: '',
    category: 'hoofdgerecht',
    tags: [],
    prep_time: 15,
    cook_time: 30,
    servings: 4,
    difficulty: 'makkelijk',
    ingredients: [],
    instructions: []
  })

  const [tagsInput, setTagsInput] = useState('')
  const [ingredientsInput, setIngredientsInput] = useState('')
  const [instructionsInput, setInstructionsInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async () => {
    if (!newRecipe.title || !newRecipe.description || !newRecipe.image_url) {
      alert('Vul alstublieft alle verplichte velden in')
      return
    }

    setIsSubmitting(true)
    
    try {
      const recipeData = {
        ...newRecipe,
        tags: tagsInput.split(',').map(tag => tag.trim()).filter(Boolean),
        ingredients: ingredientsInput.split('\n').map(i => i.trim()).filter(Boolean),
        instructions: instructionsInput.split('\n').map(i => i.trim()).filter(Boolean)
      }
      
      await onSubmit(recipeData)
      
      // Reset form
      setNewRecipe({
        title: '',
        description: '',
        image_url: '',
        category: 'hoofdgerecht',
        tags: [],
        prep_time: 15,
        cook_time: 30,
        servings: 4,
        difficulty: 'makkelijk',
        ingredients: [],
        instructions: []
      })
      setTagsInput('')
      setIngredientsInput('')
      setInstructionsInput('')
      
      onClose()
    } catch (error) {
      console.error('Error submitting recipe:', error)
      alert('Er is een fout opgetreden bij het toevoegen van het recept')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Nieuw Recept Toevoegen</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Titel*</label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
              value={newRecipe.title}
              onChange={(e) => setNewRecipe({...newRecipe, title: e.target.value})}
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Beschrijving*</label>
            <textarea
              className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
              rows={2}
              value={newRecipe.description}
              onChange={(e) => setNewRecipe({...newRecipe, description: e.target.value})}
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Afbeelding URL*</label>
            <input
              type="url"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
              value={newRecipe.image_url}
              onChange={(e) => setNewRecipe({...newRecipe, image_url: e.target.value})}
              placeholder="https://images.unsplash.com/..."
              disabled={isSubmitting}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Categorie</label>
              <select
                className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                value={newRecipe.category}
                onChange={(e) => setNewRecipe({...newRecipe, category: e.target.value})}
                disabled={isSubmitting}
              >
                {categories.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Moeilijkheid</label>
              <select
                className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                value={newRecipe.difficulty}
                onChange={(e) => setNewRecipe({...newRecipe, difficulty: e.target.value})}
                disabled={isSubmitting}
              >
                <option value="makkelijk">Makkelijk</option>
                <option value="gemiddeld">Gemiddeld</option>
                <option value="moeilijk">Moeilijk</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Tags (gescheiden door komma's)</label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="pasta, italiaans, comfort food"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Voorbereidingstijd (min)</label>
              <input
                type="number"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                value={newRecipe.prep_time}
                onChange={(e) => setNewRecipe({...newRecipe, prep_time: parseInt(e.target.value) || 0})}
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Kooktijd (min)</label>
              <input
                type="number"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                value={newRecipe.cook_time}
                onChange={(e) => setNewRecipe({...newRecipe, cook_time: parseInt(e.target.value) || 0})}
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Porties</label>
              <input
                type="number"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                value={newRecipe.servings}
                onChange={(e) => setNewRecipe({...newRecipe, servings: parseInt(e.target.value) || 1})}
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Ingrediënten (één per regel)</label>
            <textarea
              className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
              rows={5}
              value={ingredientsInput}
              onChange={(e) => setIngredientsInput(e.target.value)}
              placeholder="400g pasta&#10;200g kaas&#10;4 eieren"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Instructies (één stap per regel)</label>
            <textarea
              className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
              rows={5}
              value={instructionsInput}
              onChange={(e) => setInstructionsInput(e.target.value)}
              placeholder="Kook de pasta&#10;Meng de ingrediënten&#10;Serveer warm"
              disabled={isSubmitting}
            />
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              'Toevoegen...'
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Recept Toevoegen
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
EOF

# 4. Add Recepten page
echo "📄 Adding Recepten page..."
cat > app/recepten/page.tsx << 'EOF'
import { getAllRecipes, getRecipesByCategory } from '@/lib/database'
import RecipeGrid from '@/components/RecipeGrid'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface PageProps {
  searchParams: { category?: string }
}

export default async function ReceptenPage({ searchParams }: PageProps) {
  const recipes = searchParams.category 
    ? await getRecipesByCategory(searchParams.category)
    : await getAllRecipes()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          {searchParams.category 
            ? `${searchParams.category.charAt(0).toUpperCase() + searchParams.category.slice(1)} Recepten`
            : 'Alle Recepten'
          }
        </h1>
        
        <RecipeGrid recipes={recipes} />
      </main>

      <Footer />
    </div>
  )
}
EOF

# 5. Add individual recipe page
echo "📄 Adding individual recipe page..."
cat > app/recepten/[slug]/page.tsx << 'EOF'
import { getRecipeBySlug, getAllRecipes } from '@/lib/database'
import { categories } from '@/lib/constants'
import { Clock, Users, ChefHat } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { notFound } from 'next/navigation'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const recipes = await getAllRecipes()
  return recipes.slice(0, 10).map((recipe) => ({
    slug: recipe.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const recipe = await getRecipeBySlug(params.slug)
  
  if (!recipe) {
    return {
      title: 'Recept niet gevonden - NuKoken'
    }
  }

  return {
    title: `${recipe.title} - NuKoken`,
    description: recipe.description,
  }
}

export default async function ReceptPage({ params }: PageProps) {
  const recipe = await getRecipeBySlug(params.slug)

  if (!recipe) {
    notFound()
  }

  const category = categories.find(c => c.name === recipe.category)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/recepten"
            className="mb-4 text-orange-500 hover:text-orange-600 flex items-center gap-2 inline-flex"
          >
            ← Terug naar overzicht
          </Link>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-96">
              <Image 
                src={recipe.image_url} 
                alt={recipe.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">{recipe.title}</h1>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${category?.color}`}>
                  {category?.icon} {recipe.category}
                </span>
              </div>
              
              <p className="text-gray-600 mb-6">{recipe.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {recipe.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-8 bg-gray-50 p-4 rounded">
                <div className="text-center">
                  <Clock className="w-6 h-6 mx-auto mb-1 text-orange-500" />
                  <p className="text-sm text-gray-600">Bereidingstijd</p>
                  <p className="font-semibold">{recipe.prep_time + recipe.cook_time} min</p>
                </div>
                <div className="text-center">
                  <Users className="w-6 h-6 mx-auto mb-1 text-orange-500" />
                  <p className="text-sm text-gray-600">Porties</p>
                  <p className="font-semibold">{recipe.servings} personen</p>
                </div>
                <div className="text-center">
                  <ChefHat className="w-6 h-6 mx-auto mb-1 text-orange-500" />
                  <p className="text-sm text-gray-600">Moeilijkheid</p>
                  <p className="font-semibold">{recipe.difficulty}</p>
                </div>
              </div>
              
              {recipe.ingredients.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Ingrediënten</h2>
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></span>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {recipe.instructions.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Bereiding</h2>
                  <ol className="space-y-3">
                    {recipe.instructions.map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold">
                          {index + 1}
                        </span>
                        <span className="pt-1">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
EOF

# 6. Add About page
echo "📄 Adding About page..."
cat > app/about/page.tsx << 'EOF'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Over NuKoken - Onze Missie',
  description: 'Leer meer over NuKoken en onze missie om koken leuk en toegankelijk te maken voor iedereen.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Over NuKoken</h1>
          <div className="bg-white rounded-lg shadow p-8">
            <p className="mb-4">
              Welkom bij NuKoken.nl, dé plek voor heerlijke en toegankelijke recepten! 
              Of je nu een doorgewinterde chef bent of net begint met koken, hier vind je 
              inspiratie voor elke maaltijd.
            </p>
            <p className="mb-4">
              Onze missie is simpel: koken leuk en lekker maken voor iedereen. 
              Met duidelijke instructies, handige tips en eerlijke bereidingstijden 
              helpen we je om met vertrouwen de keuken in te stappen.
            </p>
            <p className="mb-6">
              Heb je zelf een favoriet recept? Deel het met onze community! 
              Samen maken we van NuKoken een plek vol culinaire inspiratie.
            </p>
            
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Wat maakt ons bijzonder?</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Geteste recepten met eerlijke bereidingstijden
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Duidelijke stap-voor-stap instructies
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Recepten voor alle niveaus en diëten
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Community van kookliefhebbers
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
EOF

# 7. Add Contact page
echo "📄 Adding Contact page..."
cat > app/contact/page.tsx << 'EOF'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Mail } from 'lucide-react'

export const metadata = {
  title: 'Contact - NuKoken',
  description: 'Neem contact op met het NuKoken team voor vragen, suggesties of om je recept te delen.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Contact</h1>
          <div className="bg-white rounded-lg shadow p-8">
            <p className="mb-6">
              Heb je vragen, suggesties of wil je je recept met ons delen? 
              Neem gerust contact op!
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">info@nukoken.nl</p>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">Veelgestelde vragen</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-orange-600 mb-1">Kan ik mijn eigen recept insturen?</h3>
                    <p className="text-gray-600 text-sm">
                      Ja! Stuur je recept naar ons emailadres met een foto en duidelijke instructies.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-orange-600 mb-1">Hoe kan ik recepten opslaan?</h3>
                    <p className="text-gray-600 text-sm">
                      Je kunt recepten bookmarken in je browser of de link delen met vrienden.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-orange-600 mb-1">Zijn alle recepten getest?</h3>
                    <p className="text-gray-600 text-sm">
                      Ja, alle recepten worden door ons team getest voordat ze online komen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
EOF

# 8. Add Admin page
echo "📄 Adding Admin page..."
cat > app/admin/page.tsx << 'EOF'
'use client'
import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AddRecipeForm from '@/components/AddRecipeForm'
import { Recipe, RecipeFormData } from '@/lib/types'

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  const [showAddRecipe, setShowAddRecipe] = useState(false)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecipes()
  }, [])

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/api/recipes')
      const data = await response.json()
      setRecipes(data)
    } catch (error) {
      console.error('Error fetching recipes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = () => {
    if (adminPassword === 'nukoken2025') {
      setIsAdmin(true)
      setAdminPassword('')
    } else {
      alert('Onjuist wachtwoord')
      setAdminPassword('')
    }
  }

  const handleAddRecipe = async (recipeData: RecipeFormData) => {
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      })

      if (response.ok) {
        const newRecipe = await response.json()
        setRecipes(prev => [newRecipe, ...prev])
        alert('Recept succesvol toegevoegd!')
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create recipe')
      }
    } catch (error) {
      console.error('Error creating recipe:', error)
      throw error
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          
          {!isAdmin ? (
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Wachtwoord</label>
                  <input
                    type="password"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Voer admin wachtwoord in"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleLogin()
                      }
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Hint: Standaard wachtwoord is nukoken2025
                  </p>
                </div>
                <button
                  onClick={handleLogin}
                  className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
                >
                  Inloggen
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Admin Functies</h2>
                  <button
                    onClick={() => setIsAdmin(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Uitloggen
                  </button>
                </div>
                
                <div className="space-y-4">
                  <button
                    onClick={() => setShowAddRecipe(true)}
                    className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" /> Nieuw Recept Toevoegen
                  </button>
                  
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-2">Statistieken</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-600">Totaal recepten</p>
                        <p className="text-2xl font-bold text-orange-500">
                          {loading ? '...' : recipes.length}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-600">Populaire recepten</p>
                        <p className="text-2xl font-bold text-orange-500">
                          {loading ? '...' : recipes.filter(r => r.is_popular).length}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-2">Recent toegevoegde recepten</h3>
                    <div className="space-y-2">
                      {loading ? (
                        <p className="text-gray-500">Laden...</p>
                      ) : recipes.length === 0 ? (
                        <p className="text-gray-500">Nog geen recepten. Voeg er een toe!</p>
                      ) : (
                        recipes
                          .slice(0, 5)
                          .map(recipe => (
                            <div key={recipe.id} className="flex justify-between items-center py-2 border-b">
                              <span>{recipe.title}</span>
                              <span className="text-sm text-gray-500">
                                {new Date(recipe.created_at).toLocaleDateString('nl-NL')}
                              </span>
                            </div>
                          ))
                      )}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-2">Handige links</h3>
                    <div className="space-y-2 text-sm">
                      <a 
                        href="/recepten" 
                        className="text-orange-500 hover:text-orange-600 block"
                        target="_blank"
                      >
                        → Bekijk alle recepten
                      </a>
                      <a 
                        href="/" 
                        className="text-orange-500 hover:text-orange-600 block"
                        target="_blank"
                      >
                        → Homepage bekijken
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <AddRecipeForm
        isOpen={showAddRecipe}
        onClose={() => setShowAddRecipe(false)}
        onSubmit={handleAddRecipe}
      />
    </div>
  )
}
EOF

# 9. Add individual recipe API route
echo "🔌 Adding individual recipe API route..."
cat > app/api/recipes/[id]/route.ts << 'EOF'
import { NextRequest, NextResponse } from 'next/server'
import { updateRecipe, deleteRecipe } from '@/lib/database'
import { sql } from '@vercel/postgres'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid recipe ID' },
        { status: 400 }
      )
    }

    const { rows } = await sql`
      SELECT * FROM recipes 
      WHERE id = ${id}
      LIMIT 1
    `
    
    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Recipe not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('Error fetching recipe:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recipe' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid recipe ID' },
        { status: 400 }
      )
    }

    const recipe = await updateRecipe(id, body)
    
    if (!recipe) {
      return NextResponse.json(
        { error: 'Recipe not found or update failed' },
        { status: 404 }
      )
    }

    return NextResponse.json(recipe)
  } catch (error) {
    console.error('Error updating recipe:', error)
    return NextResponse.json(
      { error: 'Failed to update recipe' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid recipe ID' },
        { status: 400 }
      )
    }

    const success = await deleteRecipe(id)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Recipe not found or delete failed' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Recipe deleted successfully' })
  } catch (error) {
    console.error('Error deleting recipe:', error)
    return NextResponse.json(
      { error: 'Failed to delete recipe' },
      { status: 500 }
    )
  }
}
EOF

# 10. Add 404 page
echo "📄 Adding 404 page..."
cat > app/not-found.tsx << 'EOF'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow p-8">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-4">Pagina niet gevonden</h2>
            <p className="text-gray-600 mb-6">
              Sorry, de pagina die je zoekt bestaat niet of is verplaatst. 
              Misschien vind je wat je zoekt op onze homepage?
            </p>
            <div className="space-y-4">
              <Link 
                href="/"
                className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition inline-block"
              >
                Terug naar home
              </Link>
              <div className="text-sm text-gray-500">
                <Link href="/recepten" className="text-orange-500 hover:text-orange-600">
                  Of bekijk alle recepten →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
EOF

echo ""
echo "🎉 All missing components added!"
echo "✅ Next.js config fixed"
echo "✅ RecipeGrid component"
echo "✅ AddRecipeForm component"
echo "✅ All pages (recepten, [slug], about, contact, admin)"
echo "✅ Individual recipe API route"
echo "✅ 404 page"
echo ""
echo "🔄 Restart your development server:"
echo "   Ctrl+C in terminal, then:"
echo "   npm run dev"
echo ""
echo "🎯 Your website should now be fully functional!"