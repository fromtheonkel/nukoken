// src/components/SearchAndFilters.tsx
'use client'

import { useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import RecipeCard from './RecipeCard'
import { Recipe } from '@/types/recipe'
import { categories, difficulties } from '@/lib/constants'

interface SearchParams {
  search?: string
  category?: string
  difficulty?: string
  tag?: string
  ingredient?: string
  sort?: string
  servings?: string
  maxTime?: string
}

interface SearchAndFiltersProps {
  recipes: Recipe[]
  searchParams: SearchParams
}

export default function SearchAndFilters({ recipes, searchParams }: SearchAndFiltersProps) {
  const router = useRouter()
  
  // State voor filters
  const [searchTerm, setSearchTerm] = useState(searchParams.search || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.category || '')
  const [selectedDifficulty, setSelectedDifficulty] = useState(searchParams.difficulty || '')
  const [selectedTag, setSelectedTag] = useState(searchParams.tag || '')
  const [selectedIngredient, setSelectedIngredient] = useState(searchParams.ingredient || '')
  const [maxServings, setMaxServings] = useState(searchParams.servings || '')
  const [maxTime, setMaxTime] = useState(searchParams.maxTime || '')
  const [sortBy, setSortBy] = useState(searchParams.sort || 'newest')
  const [showFilters, setShowFilters] = useState(false)

  // Extract alle unieke tags en ingrediënten
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    recipes.forEach(recipe => {
      if (recipe.tags) {
        recipe.tags.split(',').forEach(tag => tags.add(tag.trim().toLowerCase()))
      }
    })
    return Array.from(tags).sort()
  }, [recipes])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const allIngredients = useMemo(() => {
    const ingredients = new Set<string>()
    recipes.forEach(recipe => {
      if (recipe.ingredients) {
        recipe.ingredients.split('\n').forEach(ingredient => {
          // Extract ingredient name (before first comma/space)
          const ingredientName = ingredient.trim().split(/[\d\s]/)[0].toLowerCase()
          if (ingredientName.length > 2) {
            ingredients.add(ingredientName)
          }
        })
      }
    })
    return Array.from(ingredients).sort()
  }, [recipes])

  // Gefilterde en gesorteerde recepten
  const filteredRecipes = useMemo(() => {
    const filtered = recipes.filter(recipe => {
      // Search term filter
      if (searchTerm) {
        const search = searchTerm.toLowerCase()
        const matchesTitle = recipe.title.toLowerCase().includes(search)
        const matchesDescription = recipe.description.toLowerCase().includes(search)
        const matchesTags = recipe.tags?.toLowerCase().includes(search)
        const matchesIngredients = recipe.ingredients?.toLowerCase().includes(search)
        
        if (!matchesTitle && !matchesDescription && !matchesTags && !matchesIngredients) {
          return false
        }
      }

      // Category filter
      if (selectedCategory && recipe.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false
      }

      // Difficulty filter
      if (selectedDifficulty && recipe.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
        return false
      }

      // Tag filter
      if (selectedTag && !recipe.tags?.toLowerCase().includes(selectedTag.toLowerCase())) {
        return false
      }

      // Ingredient filter
      if (selectedIngredient && !recipe.ingredients?.toLowerCase().includes(selectedIngredient.toLowerCase())) {
        return false
      }

      // Servings filter
      if (maxServings && recipe.servings > parseInt(maxServings)) {
        return false
      }

      // Time filter
      if (maxTime) {
        const totalTime = recipe.prep_time + recipe.cook_time
        if (totalTime > parseInt(maxTime)) {
          return false
        }
      }

      return true
    })

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        case 'time-asc':
          return (a.prep_time + a.cook_time) - (b.prep_time + b.cook_time)
        case 'time-desc':
          return (b.prep_time + b.cook_time) - (a.prep_time + a.cook_time)
        case 'servings-asc':
          return a.servings - b.servings
        case 'servings-desc':
          return b.servings - a.servings
        case 'alphabetical':
          return a.title.localeCompare(b.title)
        case 'popular':
          return (b.is_popular ? 1 : 0) - (a.is_popular ? 1 : 0)
        default:
          return 0
      }
    })

    return filtered
  }, [recipes, searchTerm, selectedCategory, selectedDifficulty, selectedTag, selectedIngredient, maxServings, maxTime, sortBy])

  // Update URL parameters
  const updateURL = useCallback(() => {
    const params = new URLSearchParams()
    
    if (searchTerm) params.set('search', searchTerm)
    if (selectedCategory) params.set('category', selectedCategory)
    if (selectedDifficulty) params.set('difficulty', selectedDifficulty)
    if (selectedTag) params.set('tag', selectedTag)
    if (selectedIngredient) params.set('ingredient', selectedIngredient)
    if (maxServings) params.set('servings', maxServings)
    if (maxTime) params.set('maxTime', maxTime)
    if (sortBy !== 'newest') params.set('sort', sortBy)

    const newURL = params.toString() ? `?${params.toString()}` : '/recepten'
    router.push(newURL, { scroll: false })
  }, [searchTerm, selectedCategory, selectedDifficulty, selectedTag, selectedIngredient, maxServings, maxTime, sortBy, router])

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setSelectedDifficulty('')
    setSelectedTag('')
    setSelectedIngredient('')
    setMaxServings('')
    setMaxTime('')
    setSortBy('newest')
    router.push('/recepten')
  }

  const hasActiveFilters = searchTerm || selectedCategory || selectedDifficulty || selectedTag || selectedIngredient || maxServings || maxTime

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Zoek recepten, ingrediënten, tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && updateURL()}
            className="w-full px-6 py-4 text-lg border border-gray-300 rounded-full focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 shadow-sm"
          />
          <button
            onClick={updateURL}
            className="absolute right-2 top-2 bottom-2 px-6 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
          >
            🔍
          </button>
        </div>
      </div>

      {/* Filter Toggle Button (Mobile) */}
      <div className="mb-6 text-center md:hidden">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-6 py-2 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
        >
          {showFilters ? 'Verberg Filters' : 'Toon Filters'} ({filteredRecipes.length})
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden'} lg:block`}>
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-orange-600 hover:text-orange-700"
                >
                  Wis alles
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categorie
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
              >
                <option value="">Alle categorieën</option>
                {categories.map(category => (
                  <option key={category.name} value={category.name}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Moeilijkheid
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
              >
                <option value="">Alle niveaus</option>
                {difficulties.map(difficulty => (
                  <option key={difficulty.name} value={difficulty.name}>
                    {difficulty.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max. tijd (minuten)
              </label>
              <select
                value={maxTime}
                onChange={(e) => setMaxTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
              >
                <option value="">Geen limiet</option>
                <option value="15">Tot 15 min</option>
                <option value="30">Tot 30 min</option>
                <option value="45">Tot 45 min</option>
                <option value="60">Tot 1 uur</option>
                <option value="120">Tot 2 uur</option>
              </select>
            </div>

            {/* Servings Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max. personen
              </label>
              <select
                value={maxServings}
                onChange={(e) => setMaxServings(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
              >
                <option value="">Alle</option>
                <option value="2">Tot 2 personen</option>
                <option value="4">Tot 4 personen</option>
                <option value="6">Tot 6 personen</option>
                <option value="8">Tot 8 personen</option>
              </select>
            </div>

            {/* Tag Filter */}
            {allTags.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                >
                  <option value="">Alle tags</option>
                  {allTags.slice(0, 20).map(tag => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Quick Filters */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Snelle filters
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setSelectedTag('vegetarisch')
                    updateURL()
                  }}
                  className="block w-full text-left px-3 py-2 text-sm bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition"
                >
                  🌱 Vegetarisch
                </button>
                <button
                  onClick={() => {
                    setSelectedTag('gezond')
                    updateURL()
                  }}
                  className="block w-full text-left px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition"
                >
                  💪 Gezond
                </button>
                <button
                  onClick={() => {
                    setMaxTime('30')
                    updateURL()
                  }}
                  className="block w-full text-left px-3 py-2 text-sm bg-orange-50 text-orange-700 rounded-md hover:bg-orange-100 transition"
                >
                  ⚡ Snel klaar
                </button>
              </div>
            </div>

            <button
              onClick={updateURL}
              className="w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition font-medium"
            >
              Filters toepassen
            </button>
          </div>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-3">
          {/* Sort and Results Count */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <div className="text-gray-600">
              <span className="font-medium">{filteredRecipes.length}</span> recepten gevonden
              {searchTerm && (
                <span> voor &quot;{searchTerm}&quot;</span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-gray-600">
                Sorteer op:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-orange-500"
              >
                <option value="newest">Nieuwste eerst</option>
                <option value="oldest">Oudste eerst</option>
                <option value="popular">Populairst</option>
                <option value="alphabetical">Alfabetisch</option>
                <option value="time-asc">Snelste eerst</option>
                <option value="time-desc">Langste eerst</option>
                <option value="servings-asc">Minste personen</option>
                <option value="servings-desc">Meeste personen</option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
                    Zoek: &quot;{searchTerm}&quot;
                    <button
                      onClick={() => setSearchTerm('')}
                      className="ml-2 hover:text-orange-900"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    {categories.find(c => c.name === selectedCategory)?.icon} {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory('')}
                      className="ml-2 hover:text-blue-900"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedDifficulty && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                    {selectedDifficulty}
                    <button
                      onClick={() => setSelectedDifficulty('')}
                      className="ml-2 hover:text-yellow-900"
                    >
                      ×
                    </button>
                  </span>
                )}
                {maxTime && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    Max {maxTime} min
                    <button
                      onClick={() => setMaxTime('')}
                      className="ml-2 hover:text-green-900"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Results Grid */}
          {filteredRecipes.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Geen recepten gevonden
              </h3>
              <p className="text-gray-600 mb-6">
                Probeer je zoekterm aan te passen of verwijder enkele filters.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
              >
                Alle filters wissen
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}

          {/* Back to top */}
          {filteredRecipes.length > 9 && (
            <div className="text-center mt-12">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                ↑ Terug naar boven
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}