import { sql } from '@vercel/postgres'
import { BlogPost } from '@/types/blog'

export async function getAllBlogPosts(publishedOnly = true): Promise<BlogPost[]> {
  try {
    console.log('Fetching all blog posts...')
    const { rows } = publishedOnly
      ? await sql`
          SELECT * FROM recepten_db_schema.blog_posts
          WHERE is_published = true
          ORDER BY created_at DESC
        `
      : await sql`
          SELECT * FROM recepten_db_schema.blog_posts
          ORDER BY created_at DESC
        `
    console.log(`Found ${rows.length} blog posts`)
    return rows as BlogPost[]
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  try {
    console.log('Fetching featured blog posts...')
    const { rows } = await sql`
      SELECT * FROM recepten_db_schema.blog_posts
      WHERE is_featured = true AND is_published = true
      ORDER BY created_at DESC
      LIMIT 3
    `
    console.log(`Found ${rows.length} featured blog posts`)
    return rows as BlogPost[]
  } catch (error) {
    console.error('Error fetching featured blog posts:', error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    console.log(`Fetching blog post with slug: ${slug}`)
    const { rows } = await sql`
      SELECT * FROM recepten_db_schema.blog_posts
      WHERE slug = ${slug}
      LIMIT 1
    `
    console.log(`Found blog post: ${rows.length > 0 ? rows[0].title : 'none'}`)
    return rows[0] as BlogPost || null
  } catch (error) {
    console.error('Error fetching blog post by slug:', error)
    return null
  }
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    console.log(`Fetching blog posts for category: ${category}`)
    const { rows } = await sql`
      SELECT * FROM recepten_db_schema.blog_posts
      WHERE category = ${category} AND is_published = true
      ORDER BY created_at DESC
    `
    console.log(`Found ${rows.length} blog posts in category ${category}`)
    return rows as BlogPost[]
  } catch (error) {
    console.error('Error fetching blog posts by category:', error)
    return []
  }
}

export interface CreateBlogPostInput {
  title: string
  excerpt: string
  content: string
  image_url?: string
  category: string
  tags?: string
  is_featured?: boolean
  is_published?: boolean
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

export async function createBlogPost(input: CreateBlogPostInput): Promise<BlogPost | null> {
  try {
    const slug = generateSlug(input.title)
    console.log(`Creating blog post: ${input.title} with slug: ${slug}`)

    const { rows } = await sql`
      INSERT INTO recepten_db_schema.blog_posts (
        title, slug, excerpt, content, image_url, category,
        tags, is_featured, is_published,
        created_at, updated_at
      ) VALUES (
        ${input.title},
        ${slug},
        ${input.excerpt},
        ${input.content},
        ${input.image_url || ''},
        ${input.category},
        ${input.tags || ''},
        ${input.is_featured || false},
        ${input.is_published || false},
        NOW(),
        NOW()
      )
      RETURNING *
    `

    console.log(`Blog post created successfully: ${rows[0].title}`)
    return rows[0] as BlogPost
  } catch (error) {
    console.error('Error creating blog post:', error)
    throw error
  }
}

export interface UpdateBlogPostInput extends Partial<CreateBlogPostInput> {
  id: number
}

export async function updateBlogPost(input: UpdateBlogPostInput): Promise<BlogPost | null> {
  try {
    console.log(`Updating blog post with id: ${input.id}`)

    // Generate new slug if title changed
    const slug = input.title ? generateSlug(input.title) : undefined

    const { rows } = await sql`
      UPDATE recepten_db_schema.blog_posts
      SET
        title = COALESCE(${input.title}, title),
        slug = COALESCE(${slug}, slug),
        excerpt = COALESCE(${input.excerpt}, excerpt),
        content = COALESCE(${input.content}, content),
        image_url = COALESCE(${input.image_url}, image_url),
        category = COALESCE(${input.category}, category),
        tags = COALESCE(${input.tags}, tags),
        is_featured = COALESCE(${input.is_featured}, is_featured),
        is_published = COALESCE(${input.is_published}, is_published),
        updated_at = NOW()
      WHERE id = ${input.id}
      RETURNING *
    `

    if (rows.length === 0) {
      console.log(`Blog post with id ${input.id} not found`)
      return null
    }

    console.log(`Blog post updated successfully: ${rows[0].title}`)
    return rows[0] as BlogPost
  } catch (error) {
    console.error('Error updating blog post:', error)
    throw error
  }
}

export async function getBlogPostById(id: number): Promise<BlogPost | null> {
  try {
    console.log(`Fetching blog post with id: ${id}`)
    const { rows } = await sql`
      SELECT * FROM recepten_db_schema.blog_posts
      WHERE id = ${id}
      LIMIT 1
    `
    return rows[0] as BlogPost || null
  } catch (error) {
    console.error('Error fetching blog post by id:', error)
    return null
  }
}

export async function deleteBlogPost(id: number): Promise<boolean> {
  try {
    console.log(`Deleting blog post with id: ${id}`)
    const { rowCount } = await sql`
      DELETE FROM recepten_db_schema.blog_posts
      WHERE id = ${id}
    `
    const deleted = (rowCount ?? 0) > 0
    console.log(`Blog post ${id} ${deleted ? 'deleted' : 'not found'}`)
    return deleted
  } catch (error) {
    console.error('Error deleting blog post:', error)
    throw error
  }
}
