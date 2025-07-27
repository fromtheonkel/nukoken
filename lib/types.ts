export interface Recipe {
  id: number
  title: string
  slug: string
  description: string
  image_url: string
  category: string
  tags: string[]
  prep_time: number
  cook_time: number
  servings: number
  difficulty: string
  ingredients: string[]
  instructions: string[]
  is_popular: boolean
  created_at: Date
  updated_at: Date
}

export interface Category {
  name: string
  icon: string
  color: string
}

export interface RecipeFormData {
  title: string
  description: string
  image_url: string
  category: string
  tags: string[]
  prep_time: number
  cook_time: number
  servings: number
  difficulty: string
  ingredients: string[]
  instructions: string[]
}
