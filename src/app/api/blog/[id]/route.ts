import { NextRequest, NextResponse } from 'next/server'
import { getBlogPostById, updateBlogPost, deleteBlogPost, UpdateBlogPostInput } from '@/lib/blog-database'
import { revalidatePath } from 'next/cache'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const post = await getBlogPostById(parseInt(id))

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post niet gevonden' },
        { status: 404 }
      )
    }

    return NextResponse.json({ post })
  } catch (error) {
    console.error('Error in GET /api/blog/[id]:', error)
    return NextResponse.json(
      { error: 'Er ging iets mis bij het ophalen van de blog post' },
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
    const body = await request.json()

    const input: UpdateBlogPostInput = {
      id: parseInt(id),
      ...body
    }

    const post = await updateBlogPost(input)

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post niet gevonden' },
        { status: 404 }
      )
    }

    // Revalidate sourdough pages
    revalidatePath('/sourdough')
    revalidatePath(`/sourdough/${post.category}`)
    revalidatePath(`/sourdough/post/${post.slug}`)

    return NextResponse.json({ success: true, post })
  } catch (error) {
    console.error('Error in PUT /api/blog/[id]:', error)
    return NextResponse.json(
      { error: 'Er ging iets mis bij het bijwerken van de blog post' },
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
    const deleted = await deleteBlogPost(parseInt(id))

    if (!deleted) {
      return NextResponse.json(
        { error: 'Blog post niet gevonden' },
        { status: 404 }
      )
    }

    // Revalidate sourdough pages
    revalidatePath('/sourdough')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/blog/[id]:', error)
    return NextResponse.json(
      { error: 'Er ging iets mis bij het verwijderen van de blog post' },
      { status: 500 }
    )
  }
}
