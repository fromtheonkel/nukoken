import { NextRequest, NextResponse } from 'next/server'
import { getAllBlogPosts, createBlogPost, CreateBlogPostInput } from '@/lib/blog-database'
import { revalidatePath } from 'next/cache'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const publishedOnly = searchParams.get('all') !== 'true'

    const posts = await getAllBlogPosts(publishedOnly)
    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Error in GET /api/blog:', error)
    return NextResponse.json(
      { error: 'Er ging iets mis bij het ophalen van de blog posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateBlogPostInput = await request.json()

    // Validatie
    if (!body.title || !body.excerpt || !body.content || !body.category) {
      return NextResponse.json(
        { error: 'Titel, excerpt, inhoud en categorie zijn verplicht' },
        { status: 400 }
      )
    }

    const post = await createBlogPost(body)

    // Revalidate sourdough pages
    revalidatePath('/sourdough')
    revalidatePath(`/sourdough/${body.category}`)

    return NextResponse.json({ success: true, post }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/blog:', error)
    return NextResponse.json(
      { error: 'Er ging iets mis bij het aanmaken van de blog post' },
      { status: 500 }
    )
  }
}
