'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdminAuth from '@/components/AdminAuth'
import ImageUpload from '@/components/ImageUpload'
import Link from 'next/link'
import { blogCategories, BlogPost } from '@/types/blog'

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()

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

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Fetch existing post data
  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/blog/${id}`)
        const data = await res.json()

        if (data.post) {
          const post: BlogPost = data.post
          setFormData({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            image_url: post.image_url || '',
            category: post.category,
            tags: post.tags || '',
            is_featured: post.is_featured,
            is_published: post.is_published
          })
        } else {
          setMessage({ type: 'error', text: 'Blog post niet gevonden' })
        }
      } catch (error) {
        console.error('Error fetching post:', error)
        setMessage({ type: 'error', text: 'Kon blog post niet laden' })
      } finally {
        setIsLoading(false)
      }
    }
    fetchPost()
  }, [id])

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

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: 'Blog post succesvol bijgewerkt!' })
      } else {
        setMessage({ type: 'error', text: data.error || 'Er ging iets mis' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Kon geen verbinding maken met de server' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Weet je zeker dat je deze blog post wilt verwijderen? Dit kan niet ongedaan worden gemaakt.')) {
      return
    }

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/admin/blog')
      } else {
        setMessage({ type: 'error', text: 'Kon blog post niet verwijderen' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Er ging iets mis' })
    }
  }

  if (isLoading) {
    return (
      <AdminAuth>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="max-w-3xl mx-auto px-4 py-8">
            <div className="text-center py-12">
              <p className="text-gray-500">Blog post laden...</p>
            </div>
          </main>
          <Footer />
        </div>
      </AdminAuth>
    )
  }

  return (
    <AdminAuth>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-3xl mx-auto px-4 py-8">
          <div className="mb-6">
            <Link
              href="/admin/blog"
              className="text-amber-600 hover:text-amber-700 font-medium inline-flex items-center text-sm"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Terug naar blog admin
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Blog Post Bewerken</h1>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                Verwijderen
              </button>
            </div>

            {message && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                <p>{message.text}</p>
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
                  placeholder="Schrijf hier je blog post..."
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
                    Gepubliceerd (zichtbaar voor bezoekers)
                  </label>
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-4 flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 focus:ring-4 focus:ring-amber-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Bezig met opslaan...' : 'Wijzigingen Opslaan'}
                </button>
                <Link
                  href="/admin/blog"
                  className="px-8 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Annuleren
                </Link>
              </div>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    </AdminAuth>
  )
}
