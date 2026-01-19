import { NextRequest, NextResponse } from 'next/server'
import { createRecipe, CreateRecipeInput } from '@/lib/database'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as CreateRecipeInput

    // Validatie
    if (!body.title || !body.description || !body.ingredients || !body.instructions) {
      return NextResponse.json(
        { error: 'Titel, beschrijving, ingrediënten en bereidingswijze zijn verplicht' },
        { status: 400 }
      )
    }

    // Validatie: minimaal 1 categorie vereist
    if (!body.categories || body.categories.length === 0) {
      return NextResponse.json(
        { error: 'Selecteer minimaal één categorie' },
        { status: 400 }
      )
    }

    const recipe = await createRecipe({
      title: body.title,
      description: body.description,
      image_url: body.image_url || '/placeholder-recipe.jpg',
      categories: body.categories,
      prep_time: body.prep_time || 0,
      cook_time: body.cook_time || 0,
      servings: body.servings || 4,
      tags: body.tags,
      ingredients: body.ingredients,
      instructions: body.instructions,
      serving_suggestions: body.serving_suggestions,
      is_popular: body.is_popular || false,
    })

    // Revalidate pages to show new recipe immediately
    revalidatePath('/recepten')
    revalidatePath('/')

    return NextResponse.json({ success: true, recipe }, { status: 201 })
  } catch (error) {
    console.error('API Error creating recipe:', error)
    return NextResponse.json(
      { error: 'Er ging iets mis bij het opslaan van het recept' },
      { status: 500 }
    )
  }
}
