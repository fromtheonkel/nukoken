'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdminAuth from '@/components/AdminAuth'
import ImageUpload from '@/components/ImageUpload'
import Link from 'next/link'
import { blogCategories, BlogPost } from '@/types/blog'

export default function AdminBlogPage() {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image_url: '',
    category: 'voor-beginners',
    tags: '',
    is_featured: false,
    is_published: false
  })

  const [existingPosts, setExistingPosts] = useState<BlogPost[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [createdPost, setCreatedPost] = useState<{ slug: string; title: string } | null>(null)

  // Fetch existing posts
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/blog?all=true')
        const data = await res.json()
        if (data.posts) {
          setExistingPosts(data.posts)
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
    fetchPosts()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)
    setCreatedPost(null)

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: 'Blog post succesvol toegevoegd!' })
        setCreatedPost({ slug: data.post.slug, title: data.post.title })
        // Reset form
        setFormData({
          title: '',
          excerpt: '',
          content: '',
          image_url: '',
          category: 'voor-beginners',
          tags: '',
          is_featured: false,
          is_published: false
        })
        // Refresh posts list
        const res = await fetch('/api/blog?all=true')
        const postsData = await res.json()
        if (postsData.posts) {
          setExistingPosts(postsData.posts)
        }
      } else {
        setMessage({ type: 'error', text: data.error || 'Er ging iets mis' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Kon geen verbinding maken met de server' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Weet je zeker dat je "${title}" wilt verwijderen?`)) {
      return
    }

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setExistingPosts(prev => prev.filter(p => p.id !== id))
        setMessage({ type: 'success', text: 'Blog post verwijderd!' })
      } else {
        setMessage({ type: 'error', text: 'Kon blog post niet verwijderen' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Er ging iets mis' })
    }
  }

  const getCategoryTitle = (slug: string) => {
    return blogCategories.find(c => c.slug === slug)?.title || slug
  }

  return (
    <AdminAuth>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/admin"
              className="text-amber-600 hover:text-amber-700 font-medium inline-flex items-center text-sm"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Terug naar recepten admin
            </Link>
            <Link
              href="/sourdough"
              className="text-amber-600 hover:text-amber-700 font-medium inline-flex items-center text-sm"
            >
              Bekijk Sourdough Blog
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Existing Posts List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Bestaande Blog Posts</h2>

            {existingPosts.length === 0 ? (
              <p className="text-gray-500 text-sm">Nog geen blog posts. Maak hieronder je eerste post!</p>
            ) : (
              <div className="space-y-3">
                {existingPosts.map(post => (
                  <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900">{post.title}</h3>
                        {!post.is_published && (
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded">Concept</span>
                        )}
                        {post.is_featured && (
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded">Uitgelicht</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{getCategoryTitle(post.category)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/blog/bewerk/${post.id}`}
                        className="px-3 py-1 text-sm bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition-colors"
                      >
                        Bewerk
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                      >
                        Verwijder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* New Post Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Nieuwe Sourdough Blog Post</h1>

            {message && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                <p>{message.text}</p>
                {createdPost && (
                  <Link
                    href={`/sourdough/post/${createdPost.slug}`}
                    className="mt-2 inline-block text-amber-600 hover:text-amber-700 font-medium"
                  >
                    Bekijk &quot;{createdPost.title}&quot; →
                  </Link>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Titel */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Titel *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Bijv. Mijn eerste sourdough starter"
                />
              </div>

              {/* Categorie */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Categorie *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {blogCategories.map(cat => (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, category: cat.slug }))}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${
                        formData.category === cat.slug
                          ? 'bg-amber-50 border-amber-500 text-amber-700'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span className="text-left flex-1">{cat.title}</span>
                      {formData.category === cat.slug && (
                        <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Afbeelding */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Afbeelding
                </label>
                <ImageUpload
                  value={formData.image_url}
                  onChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
                />
              </div>

              {/* Excerpt */}
              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                  Korte samenvatting * <span className="font-normal text-gray-500">(voor overzichtspagina)</span>
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Een korte introductie die bezoekers overhaalt om door te lezen..."
                />
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Inhoud * <span className="font-normal text-gray-500">(ondersteunt basis markdown)</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={15}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-mono text-sm"
                  placeholder={`# Mijn Eerste Sourdough Starter

Het begon allemaal met een simpel experiment...

## Dag 1: Het Begin

Mix 50g bloem met 50g water...

## Tips

- Gebruik altijd ongebleekt meel
- Houd de temperatuur constant
- Geduld is de sleutel!`}
                />
                <p className="mt-2 text-sm text-gray-500">
                  Gebruik # voor hoofdtitels, ## voor subtitels, - voor lijsten, **tekst** voor vet.
                </p>
              </div>

              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  Tags <span className="font-normal text-gray-500">(optioneel)</span>
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Bijv. starter, beginner, tips (gescheiden door komma's)"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_featured"
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={handleChange}
                    className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                  />
                  <label htmlFor="is_featured" className="text-sm text-gray-700">
                    Uitgelichte post (toon op de sourdough hoofdpagina)
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_published"
                    name="is_published"
                    checked={formData.is_published}
                    onChange={handleChange}
                    className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                  />
                  <label htmlFor="is_published" className="text-sm text-gray-700">
                    Publiceer direct (anders wordt het opgeslagen als concept)
                  </label>
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 focus:ring-4 focus:ring-amber-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Bezig met opslaan...' : 'Blog Post Opslaan'}
                </button>
              </div>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    </AdminAuth>
  )
}
