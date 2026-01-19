'use client'

import { useState, useEffect, use } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdminAuth from '@/components/AdminAuth'
import ImageUpload from '@/components/ImageUpload'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { categories } from '@/lib/constants'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function EditRecipePage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    categories: [] as string[],
    prep_time: 15,
    cook_time: 30,
    servings: 4,
    tags: '',
    ingredients: '',
    instructions: '',
    serving_suggestions: '',
    is_popular: false
  })

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [recipeSlug, setRecipeSlug] = useState<string>('')

  // Laad bestaand recept
  useEffect(() => {
    async function loadRecipe() {
      try {
        const response = await fetch(`/api/recepten/${id}`)
        const data = await response.json()

        if (response.ok && data.recipe) {
          const recipe = data.recipe
          // Handle legacy data: convert category string to categories array
          const recipeCategories = recipe.categories
            ? (Array.isArray(recipe.categories) ? recipe.categories : [recipe.categories])
            : (recipe.category ? [recipe.category] : [])

          setFormData({
            title: recipe.title || '',
            description: recipe.description || '',
            image_url: recipe.image_url || '',
            categories: recipeCategories,
            prep_time: recipe.prep_time || 15,
            cook_time: recipe.cook_time || 30,
            servings: recipe.servings || 4,
            tags: recipe.tags || '',
            ingredients: recipe.ingredients || '',
            instructions: recipe.instructions || '',
            serving_suggestions: recipe.serving_suggestions || '',
            is_popular: recipe.is_popular || false
          })
          setRecipeSlug(recipe.slug)
        } else {
          setMessage({ type: 'error', text: 'Recept niet gevonden' })
        }
      } catch {
        setMessage({ type: 'error', text: 'Kon recept niet laden' })
      } finally {
        setIsLoading(false)
      }
    }

    loadRecipe()
  }, [id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked :
              type === 'number' ? parseInt(value) || 0 : value
    }))
  }

  const handleCategoryToggle = (categoryName: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryName)
        ? prev.categories.filter(c => c !== categoryName)
        : [...prev.categories, categoryName]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    // Validatie: minimaal 1 categorie vereist
    if (formData.categories.length === 0) {
      setMessage({ type: 'error', text: 'Selecteer minimaal één categorie' })
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch(`/api/recepten/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: 'Recept succesvol bijgewerkt!' })
        setRecipeSlug(data.recipe.slug)
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
    setIsDeleting(true)
    setMessage(null)

    try {
      const response = await fetch(`/api/recepten/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/recepten')
      } else {
        const data = await response.json()
        setMessage({ type: 'error', text: data.error || 'Kon recept niet verwijderen' })
        setShowDeleteConfirm(false)
      }
    } catch {
      setMessage({ type: 'error', text: 'Kon geen verbinding maken met de server' })
      setShowDeleteConfirm(false)
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <AdminAuth>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="max-w-3xl mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <p className="text-gray-600">Recept laden...</p>
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
        <div className="mb-6 flex items-center justify-between">
          <Link
            href={recipeSlug ? `/recepten/${recipeSlug}` : '/recepten'}
            className="text-teal-600 hover:text-teal-700 font-medium inline-flex items-center text-sm"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Terug naar recept
          </Link>

          <Link
            href="/admin"
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            + Nieuw recept
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Recept bewerken</h1>

          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              <p>{message.text}</p>
              {message.type === 'success' && recipeSlug && (
                <Link
                  href={`/recepten/${recipeSlug}`}
                  className="mt-2 inline-block text-teal-600 hover:text-teal-700 font-medium"
                >
                  Bekijk recept →
                </Link>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basis informatie */}
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Korte beschrijving *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Afbeelding
              </label>
              <ImageUpload
                value={formData.image_url}
                onChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
              />
            </div>

            {/* Soort gerecht - Multi-select categorieën */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Soort gerecht * <span className="font-normal text-gray-500">(selecteer één of meer)</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => handleCategoryToggle(cat.name)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${
                      formData.categories.includes(cat.name)
                        ? 'bg-teal-50 border-teal-500 text-teal-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                    {formData.categories.includes(cat.name) && (
                      <svg className="w-4 h-4 ml-auto text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
              {formData.categories.length > 0 && (
                <p className="mt-2 text-sm text-gray-500">
                  Geselecteerd: {formData.categories.join(', ')}
                </p>
              )}
            </div>

            {/* Tijden en porties */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="prep_time" className="block text-sm font-medium text-gray-700 mb-1">
                  Voorbereidingstijd (min)
                </label>
                <input
                  type="number"
                  id="prep_time"
                  name="prep_time"
                  value={formData.prep_time}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label htmlFor="cook_time" className="block text-sm font-medium text-gray-700 mb-1">
                  Bereidingstijd (min)
                </label>
                <input
                  type="number"
                  id="cook_time"
                  name="cook_time"
                  value={formData.cook_time}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label htmlFor="servings" className="block text-sm font-medium text-gray-700 mb-1">
                  Aantal personen
                </label>
                <input
                  type="number"
                  id="servings"
                  name="servings"
                  value={formData.servings}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Gescheiden door komma's"
              />
            </div>

            {/* Ingrediënten met subgroepen */}
            <div>
              <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">
                Ingrediënten *
              </label>
              <p className="text-sm text-gray-500 mb-2">
                Eén ingrediënt per regel. Voor subgroepen (bijv. dressing, marinade) gebruik je [Groepnaam] op een aparte regel.
              </p>
              <textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                required
                rows={10}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-mono text-sm"
              />
            </div>

            {/* Bereidingswijze */}
            <div>
              <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
                Bereidingswijze * <span className="font-normal text-gray-500">(één stap per regel)</span>
              </label>
              <textarea
                id="instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                required
                rows={10}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-mono text-sm"
              />
            </div>

            {/* Serveersuggesties */}
            <div>
              <label htmlFor="serving_suggestions" className="block text-sm font-medium text-gray-700 mb-1">
                Serveersuggesties <span className="font-normal text-gray-500">(optioneel)</span>
              </label>
              <textarea
                id="serving_suggestions"
                name="serving_suggestions"
                value={formData.serving_suggestions}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Bijv. Lekker met rijst en een frisse salade. Garneer met sesamzaadjes en lente-ui."
              />
            </div>

            {/* Populair checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_popular"
                name="is_popular"
                checked={formData.is_popular}
                onChange={handleChange}
                className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
              <label htmlFor="is_popular" className="text-sm text-gray-700">
                Toon als populair recept op de homepage
              </label>
            </div>

            {/* Submit button */}
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 focus:ring-4 focus:ring-teal-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Bezig met opslaan...' : 'Wijzigingen opslaan'}
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="px-8 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Annuleren
              </button>

              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="px-8 py-3 bg-white text-red-600 font-medium rounded-lg border border-red-200 hover:bg-red-50 transition-colors ml-auto"
              >
                Verwijderen
              </button>
            </div>
          </form>

          {/* Delete confirmation modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Recept verwijderen?</h3>
                </div>

                <p className="text-gray-600 mb-6">
                  Weet je zeker dat je <strong>{formData.title}</strong> wilt verwijderen? Dit kan niet ongedaan worden gemaakt.
                </p>

                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isDeleting}
                    className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Annuleren
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {isDeleting ? 'Verwijderen...' : 'Ja, verwijderen'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

        <Footer />
      </div>
    </AdminAuth>
  )
}
