import { NextRequest, NextResponse } from 'next/server'
import { getAllRecipes, createRecipe, searchRecipes } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    
    const recipes = search 
      ? await searchRecipes(search)
      : await getAllRecipes()
    
    return NextResponse.json(recipes)
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (!body.title || !body.description || !body.image_url) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, image_url' },
        { status: 400 }
      )
    }

    const recipe = await createRecipe(body)
    
    if (!recipe) {
      return NextResponse.json(
        { error: 'Failed to create recipe' },
        { status: 500 }
      )
    }

    return NextResponse.json(recipe, { status: 201 })
  } catch (error) {
    console.error('Error creating recipe:', error)
    return NextResponse.json(
      { error: 'Failed to create recipe' },
      { status: 500 }
    )
  }
}
