import { sql } from '@vercel/postgres'
import { Recipe, RecipeFormData } from './types'

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim()
}

export async function getAllRecipes(): Promise<Recipe[]> {
  try {
    const { rows } = await sql`
      SELECT * FROM recipes 
      ORDER BY created_at DESC
    `
    return rows as Recipe[]
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return []
  }
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  try {
    const { rows } = await sql`
      SELECT * FROM recipes 
      WHERE slug = ${slug}
      LIMIT 1
    `
    return rows[0] as Recipe || null
  } catch (error) {
    console.error('Error fetching recipe:', error)
    return null
  }
}

export async function getPopularRecipes(): Promise<Recipe[]> {
  try {
    const { rows } = await sql`
      SELECT * FROM recipes 
      WHERE is_popular = true 
      ORDER BY created_at DESC
      LIMIT 6
    `
    return rows as Recipe[]
  } catch (error) {
    console.error('Error fetching popular recipes:', error)
    return []
  }
}

export async function getRecipesByCategory(category: string): Promise<Recipe[]> {
  try {
    const { rows } = await sql`
      SELECT * FROM recipes 
      WHERE category = ${category}
      ORDER BY created_at DESC
    `
    return rows as Recipe[]
  } catch (error) {
    console.error('Error fetching recipes by category:', error)
    return []
  }
}

export async function searchRecipes(searchTerm: string): Promise<Recipe[]> {
  try {
    const { rows } = await sql`
      SELECT * FROM recipes 
      WHERE 
        title ILIKE ${`%${searchTerm}%`} OR 
        description ILIKE ${`%${searchTerm}%`} OR
        ${searchTerm} = ANY(tags)
      ORDER BY created_at DESC
    `
    return rows as Recipe[]
  } catch (error) {
    console.error('Error searching recipes:', error)
    return []
  }
}

export async function createRecipe(recipe: RecipeFormData): Promise<Recipe | null> {
  try {
    const slug = generateSlug(recipe.title)
    const { rows } = await sql`
      INSERT INTO recipes (
        title, slug, description, image_url, category, tags,
        prep_time, cook_time, servings, difficulty, 
        ingredients, instructions, is_popular
      ) VALUES (
        ${recipe.title}, ${slug}, ${recipe.description}, 
        ${recipe.image_url}, ${recipe.category}, ${recipe.tags},
        ${recipe.prep_time}, ${recipe.cook_time}, ${recipe.servings}, 
        ${recipe.difficulty}, ${recipe.ingredients}, ${recipe.instructions}, 
        false
      )
      RETURNING *
    `
    return rows[0] as Recipe
  } catch (error) {
    console.error('Error creating recipe:', error)
    return null
  }
}

export async function updateRecipe(id: number, recipe: Partial<RecipeFormData>): Promise<Recipe | null> {
  try {
    const { rows } = await sql`
      UPDATE recipes 
      SET 
        title = COALESCE(${recipe.title}, title),
        description = COALESCE(${recipe.description}, description),
        image_url = COALESCE(${recipe.image_url}, image_url),
        category = COALESCE(${recipe.category}, category),
        tags = COALESCE(${recipe.tags}, tags),
        prep_time = COALESCE(${recipe.prep_time}, prep_time),
        cook_time = COALESCE(${recipe.cook_time}, cook_time),
        servings = COALESCE(${recipe.servings}, servings),
        difficulty = COALESCE(${recipe.difficulty}, difficulty),
        ingredients = COALESCE(${recipe.ingredients}, ingredients),
        instructions = COALESCE(${recipe.instructions}, instructions),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `
    return rows[0] as Recipe || null
  } catch (error) {
    console.error('Error updating recipe:', error)
    return null
  }
}

export async function deleteRecipe(id: number): Promise<boolean> {
  try {
    await sql`DELETE FROM recipes WHERE id = ${id}`
    return true
  } catch (error) {
    console.error('Error deleting recipe:', error)
    return false
  }
}
