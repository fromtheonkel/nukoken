import Link from 'next/link'
import Image from 'next/image'
import { Recipe } from '@/types/recipe'
import { categories } from '@/lib/constants'

interface RecipeCardProps {
  recipe: Recipe
}

function getCategoryIcon(categoryName: string): string {
  const category = categories.find(c => c.name.toLowerCase() === categoryName.toLowerCase())
  return category?.icon || '🍽️'
}

function getCategoryColor(categoryName: string): string {
  const colorMap: Record<string, string> = {
    'pasta': 'bg-yellow-100 text-yellow-800',
    'ovenschotel': 'bg-orange-100 text-orange-800',
    'rijst': 'bg-amber-100 text-amber-800',
    'aardappel': 'bg-yellow-100 text-yellow-800',
    'groenten': 'bg-green-100 text-green-800',
    'eigerechten': 'bg-yellow-100 text-yellow-800',
    'salades': 'bg-emerald-100 text-emerald-800',
    'sauzen': 'bg-red-100 text-red-800',
    'soep': 'bg-orange-100 text-orange-800',
    'taarten & cakes': 'bg-pink-100 text-pink-800',
    'koekjes': 'bg-amber-100 text-amber-800',
    'drankjes': 'bg-cyan-100 text-cyan-800',
    'brood': 'bg-amber-100 text-amber-800',
    'zoete snacks': 'bg-pink-100 text-pink-800',
    'hartige snacks': 'bg-orange-100 text-orange-800',
  }
  return colorMap[categoryName.toLowerCase()] || 'bg-gray-100 text-gray-800'
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const totalTime = recipe.prep_time + recipe.cook_time

  // Get the first category to display on the card
  const primaryCategory = recipe.categories?.[0] || 'Overig'

  return (
    <Link href={`/recepten/${recipe.slug}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="relative h-48">
          <Image
            src={recipe.image_url || '/placeholder-recipe.jpg'}
            alt={recipe.title}
            fill
            className="object-cover"
            unoptimized={recipe.image_url?.startsWith('http')}
          />
          <div className="absolute top-3 right-3 flex flex-wrap gap-1 max-w-[80%] justify-end">
            {recipe.categories?.slice(0, 2).map((cat, index) => (
              <span
                key={index}
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(cat)}`}
              >
                {getCategoryIcon(cat)} {cat}
              </span>
            ))}
            {recipe.categories && recipe.categories.length > 2 && (
              <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                +{recipe.categories.length - 2}
              </span>
            )}
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
          </div>

          <div className="text-orange-600 font-medium text-sm hover:underline">
            Lees meer →
          </div>
        </div>
      </div>
    </Link>
  )
}
