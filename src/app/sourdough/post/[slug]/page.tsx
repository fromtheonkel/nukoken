import Header from '@/components/Header'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug } from '@/lib/blog-database'
import { blogCategories } from '@/types/blog'
import React from 'react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return { title: 'Post niet gevonden - NuKoken' }
  }

  return {
    title: `${post.title} - Sourdough by Coby`,
    description: post.excerpt
  }
}

function getCategoryInfo(slug: string) {
  return blogCategories.find(c => c.slug === slug)
}

// Simple markdown-like rendering
function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactElement[] = []
  let currentList: string[] = []
  let listKey = 0

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${listKey++}`} className="list-disc list-inside space-y-2 my-4 text-[#5a5a5a]">
          {currentList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )
      currentList = []
    }
  }

  lines.forEach((line, index) => {
    const trimmed = line.trim()

    // Headers
    if (trimmed.startsWith('### ')) {
      flushList()
      elements.push(
        <h3 key={index} className="text-xl font-serif font-bold text-[#232937] mt-8 mb-4">
          {trimmed.slice(4)}
        </h3>
      )
    } else if (trimmed.startsWith('## ')) {
      flushList()
      elements.push(
        <h2 key={index} className="text-2xl font-serif font-bold text-[#232937] mt-10 mb-4">
          {trimmed.slice(3)}
        </h2>
      )
    } else if (trimmed.startsWith('# ')) {
      flushList()
      elements.push(
        <h1 key={index} className="text-3xl font-serif font-bold text-[#232937] mt-10 mb-6">
          {trimmed.slice(2)}
        </h1>
      )
    }
    // List items
    else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      currentList.push(trimmed.slice(2))
    }
    // Empty line
    else if (trimmed === '') {
      flushList()
    }
    // Regular paragraph
    else {
      flushList()
      // Handle bold text
      const formattedLine = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      elements.push(
        <p
          key={index}
          className="text-[#5a5a5a] leading-relaxed my-4"
          dangerouslySetInnerHTML={{ __html: formattedLine }}
        />
      )
    }
  })

  flushList()
  return elements
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post || !post.is_published) {
    notFound()
  }

  const categoryInfo = getCategoryInfo(post.category)
  const formattedDate = new Date(post.created_at).toLocaleDateString('nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <Header />

      {/* Hero */}
      <section className="relative bg-gradient-to-b from-amber-50 to-[#faf9f7] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-[#5a5a5a]">
                <li>
                  <Link href="/sourdough" className="hover:text-amber-700">
                    Sourdough
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href={`/sourdough/${post.category}`} className="hover:text-amber-700">
                    {categoryInfo?.title || post.category}
                  </Link>
                </li>
              </ol>
            </nav>

            {/* Category badge */}
            {categoryInfo && (
              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${categoryInfo.color} mb-4`}>
                <span>{categoryInfo.icon}</span>
                {categoryInfo.title}
              </span>
            )}

            <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#232937] mb-4">
              {post.title}
            </h1>

            <p className="text-lg text-[#5a5a5a] mb-4">
              {post.excerpt}
            </p>

            <p className="text-sm text-[#5a5a5a]">
              Gepubliceerd op {formattedDate}
            </p>
          </div>
        </div>
      </section>

      {/* Featured image */}
      {post.image_url && (
        <div className="container mx-auto px-4 -mt-4 mb-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <article className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg">
            {renderContent(post.content)}
          </div>
        </div>
      </article>

      {/* Tags */}
      {post.tags && (
        <section className="py-8 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-wrap gap-2">
                {post.tags.split(',').map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Link
              href="/sourdough"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Terug naar Sourdough Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="py-8 bg-[#faf9f7]" />
    </div>
  )
}
