import Link from 'next/link'
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
    <Link href={`/recepten/${recipe.slug}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="relative h-48">
          <Image
            src={recipe.image_url || '/placeholder-recipe.jpg'}
            alt={recipe.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 right-3">
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(recipe.category)}`}>
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
            <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(recipe.difficulty)}`}>
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
}