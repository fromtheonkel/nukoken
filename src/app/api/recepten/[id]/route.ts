import { NextRequest, NextResponse } from 'next/server'
import { updateRecipe, getRecipeById, deleteRecipe, UpdateRecipeInput } from '@/lib/database'
import { revalidatePath } from 'next/cache'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const recipeId = parseInt(id)

    if (isNaN(recipeId)) {
      return NextResponse.json({ error: 'Ongeldig recept ID' }, { status: 400 })
    }

    const recipe = await getRecipeById(recipeId)

    if (!recipe) {
      return NextResponse.json({ error: 'Recept niet gevonden' }, { status: 404 })
    }

    return NextResponse.json({ recipe })
  } catch (error) {
    console.error('API Error fetching recipe:', error)
    return NextResponse.json(
      { error: 'Er ging iets mis bij het ophalen van het recept' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const recipeId = parseInt(id)

    if (isNaN(recipeId)) {
      return NextResponse.json({ error: 'Ongeldig recept ID' }, { status: 400 })
    }

    const body = await request.json() as Partial<UpdateRecipeInput>

    const recipe = await updateRecipe({
      id: recipeId,
      ...body,
    })

    if (!recipe) {
      return NextResponse.json({ error: 'Recept niet gevonden' }, { status: 404 })
    }

    // Revalidate pages to show updated recipe immediately
    revalidatePath('/recepten')
    revalidatePath(`/recepten/${recipe.slug}`)
    revalidatePath('/')

    return NextResponse.json({ success: true, recipe })
  } catch (error) {
    console.error('API Error updating recipe:', error)
    return NextResponse.json(
      { error: 'Er ging iets mis bij het bijwerken van het recept' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const recipeId = parseInt(id)

    if (isNaN(recipeId)) {
      return NextResponse.json({ error: 'Ongeldig recept ID' }, { status: 400 })
    }

    const deleted = await deleteRecipe(recipeId)

    if (!deleted) {
      return NextResponse.json({ error: 'Recept niet gevonden' }, { status: 404 })
    }

    // Revalidate pages after deletion
    revalidatePath('/recepten')
    revalidatePath('/')

    return NextResponse.json({ success: true, message: 'Recept verwijderd' })
  } catch (error) {
    console.error('API Error deleting recipe:', error)
    return NextResponse.json(
      { error: 'Er ging iets mis bij het verwijderen van het recept' },
      { status: 500 }
    )
  }
}
