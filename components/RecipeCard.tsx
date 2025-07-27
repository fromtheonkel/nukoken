import { Recipe } from '@/lib/types'
import { Clock, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { categories } from '@/lib/constants'

interface RecipeCardProps {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const category = categories.find(c => c.name === recipe.category)
  
  return (
    <Link href={`/recepten/${recipe.slug}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden">
          <Image 
            src={recipe.image_url} 
            alt={recipe.title}
            fill
            className="object-cover hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${category?.color}`}>
              {category?.icon} {recipe.category}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 text-gray-800">{recipe.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {recipe.prep_time + recipe.cook_time} min
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {recipe.servings} pers
              </span>
            </div>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {recipe.difficulty}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
