import { NextRequest, NextResponse } from 'next/server'
import { createRecipe, CreateRecipeInput } from '@/lib/database'

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

    const recipe = await createRecipe({
      title: body.title,
      description: body.description,
      image_url: body.image_url || '/placeholder-recipe.jpg',
      category: body.category || 'Overig',
      prep_time: body.prep_time || 0,
      cook_time: body.cook_time || 0,
      servings: body.servings || 4,
      difficulty: body.difficulty || 'gemiddeld',
      tags: body.tags,
      ingredients: body.ingredients,
      instructions: body.instructions,
      is_popular: body.is_popular || false,
    })

    return NextResponse.json({ success: true, recipe }, { status: 201 })
  } catch (error) {
    console.error('API Error creating recipe:', error)
    return NextResponse.json(
      { error: 'Er ging iets mis bij het opslaan van het recept' },
      { status: 500 }
    )
  }
}
