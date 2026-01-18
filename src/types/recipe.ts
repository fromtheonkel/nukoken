export interface Recipe {
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
}