import { sql } from '@vercel/postgres'
import { Recipe } from '@/types/recipe'

// Helper functie om database rows te converteren naar Recipe objecten
// De database slaat categories op als JSON array string
function rowToRecipe(row: Record<string, unknown>): Recipe {
  return {
    ...row,
    // Parse categories van JSON string naar array, met fallback voor legacy data
    categories: typeof row.categories === 'string'
      ? JSON.parse(row.categories)
      : (row.categories as string[]) || (row.category ? [row.category as string] : [])
  } as Recipe
}

export async function getAllRecipes(): Promise<Recipe[]> {
  try {
    console.log('Fetching all recipes...')
    const { rows } = await sql`
      SELECT * FROM recepten_db_schema.recepten
      ORDER BY created_at DESC
    `
    console.log(`Found ${rows.length} recipes`)
    return rows.map(rowToRecipe)
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return []
  }
}

export async function getPopularRecipes(): Promise<Recipe[]> {
  try {
    console.log('Fetching popular recipes...')
    const { rows } = await sql`
      SELECT * FROM recepten_db_schema.recepten
      WHERE is_popular = true
      ORDER BY created_at DESC
      LIMIT 6
    `
    console.log(`Found ${rows.length} popular recipes`)
    return rows.map(rowToRecipe)
  } catch (error) {
    console.error('Error fetching popular recipes:', error)
    return []
  }
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  try {
    console.log(`Fetching recipe with slug: ${slug}`)
    const { rows } = await sql`
      SELECT * FROM recepten_db_schema.recepten
      WHERE slug = ${slug}
      LIMIT 1
    `
    console.log(`Found recipe: ${rows.length > 0 ? rows[0].title : 'none'}`)
    return rows[0] ? rowToRecipe(rows[0]) : null
  } catch (error) {
    console.error('Error fetching recipe by slug:', error)
    return null
  }
}

export async function getRecipesByCategory(category: string): Promise<Recipe[]> {
  try {
    console.log(`Fetching recipes for category: ${category}`)
    // Zoek in de categories JSON array
    const { rows } = await sql`
      SELECT * FROM recepten_db_schema.recepten
      WHERE categories::text ILIKE ${`%${category}%`}
      ORDER BY created_at DESC
    `
    console.log(`Found ${rows.length} recipes in category ${category}`)
    return rows.map(rowToRecipe)
  } catch (error) {
    console.error('Error fetching recipes by category:', error)
    return []
  }
}

export interface CreateRecipeInput {
  title: string
  description: string
  image_url: string
  categories: string[] // Multi-select categorieën
  prep_time: number
  cook_time: number
  servings: number
  tags?: string
  ingredients: string // Supports subgroups with [Subgroup Name] headers
  instructions: string
  serving_suggestions?: string // Optional serving suggestions
  is_popular?: boolean
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
}

export async function createRecipe(input: CreateRecipeInput): Promise<Recipe | null> {
  try {
    const slug = generateSlug(input.title)
    console.log(`Creating recipe: ${input.title} with slug: ${slug}`)

    // Converteer categories array naar JSON string voor opslag
    const categoriesJson = JSON.stringify(input.categories)

    const { rows } = await sql`
      INSERT INTO recepten_db_schema.recepten (
        title, slug, description, image_url, categories,
        prep_time, cook_time, servings,
        tags, ingredients, instructions, serving_suggestions, is_popular,
        created_at, updated_at
      ) VALUES (
        ${input.title},
        ${slug},
        ${input.description},
        ${input.image_url},
        ${categoriesJson},
        ${input.prep_time},
        ${input.cook_time},
        ${input.servings},
        ${input.tags || ''},
        ${input.ingredients},
        ${input.instructions},
        ${input.serving_suggestions || ''},
        ${input.is_popular || false},
        NOW(),
        NOW()
      )
      RETURNING *
    `

    console.log(`Recipe created successfully: ${rows[0].title}`)
    return rowToRecipe(rows[0])
  } catch (error) {
    console.error('Error creating recipe:', error)
    throw error
  }
}

export interface UpdateRecipeInput extends Partial<CreateRecipeInput> {
  id: number
}

export async function updateRecipe(input: UpdateRecipeInput): Promise<Recipe | null> {
  try {
    console.log(`Updating recipe with id: ${input.id}`)

    // Genereer nieuwe slug als titel is gewijzigd
    const slug = input.title ? generateSlug(input.title) : undefined

    // Converteer categories array naar JSON string als aanwezig
    const categoriesJson = input.categories ? JSON.stringify(input.categories) : undefined

    const { rows } = await sql`
      UPDATE recepten_db_schema.recepten
      SET
        title = COALESCE(${input.title}, title),
        slug = COALESCE(${slug}, slug),
        description = COALESCE(${input.description}, description),
        image_url = COALESCE(${input.image_url}, image_url),
        categories = COALESCE(${categoriesJson}, categories),
        prep_time = COALESCE(${input.prep_time}, prep_time),
        cook_time = COALESCE(${input.cook_time}, cook_time),
        servings = COALESCE(${input.servings}, servings),
        tags = COALESCE(${input.tags}, tags),
        ingredients = COALESCE(${input.ingredients}, ingredients),
        instructions = COALESCE(${input.instructions}, instructions),
        serving_suggestions = COALESCE(${input.serving_suggestions}, serving_suggestions),
        is_popular = COALESCE(${input.is_popular}, is_popular),
        updated_at = NOW()
      WHERE id = ${input.id}
      RETURNING *
    `

    if (rows.length === 0) {
      console.log(`Recipe with id ${input.id} not found`)
      return null
    }

    console.log(`Recipe updated successfully: ${rows[0].title}`)
    return rowToRecipe(rows[0])
  } catch (error) {
    console.error('Error updating recipe:', error)
    throw error
  }
}

export async function getRecipeById(id: number): Promise<Recipe | null> {
  try {
    console.log(`Fetching recipe with id: ${id}`)
    const { rows } = await sql`
      SELECT * FROM recepten_db_schema.recepten
      WHERE id = ${id}
      LIMIT 1
    `
    return rows[0] ? rowToRecipe(rows[0]) : null
  } catch (error) {
    console.error('Error fetching recipe by id:', error)
    return null
  }
}

export async function deleteRecipe(id: number): Promise<boolean> {
  try {
    console.log(`Deleting recipe with id: ${id}`)
    const { rowCount } = await sql`
      DELETE FROM recepten_db_schema.recepten
      WHERE id = ${id}
    `
    const deleted = (rowCount ?? 0) > 0
    console.log(`Recipe ${id} ${deleted ? 'deleted' : 'not found'}`)
    return deleted
  } catch (error) {
    console.error('Error deleting recipe:', error)
    throw error
  }
}
