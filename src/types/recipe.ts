export interface Recipe {
  id: number
  title: string
  slug: string
  description: string
  image_url: string
  categories: string[] // Multi-select: Pasta, Ovenschotel, Rijst, etc.
  prep_time: number
  cook_time: number
  servings: number
  tags?: string
  ingredients?: string // Supports subgroups with [Subgroup Name] headers
  instructions?: string
  serving_suggestions?: string // Optional field for serving suggestions
  is_popular: boolean
  created_at: Date
  updated_at: Date
}

// For backwards compatibility during migration
export interface LegacyRecipe extends Omit<Recipe, 'categories'> {
  category: string
  difficulty: string
}

export interface RecipeCardProps {
  recipe: Recipe
}