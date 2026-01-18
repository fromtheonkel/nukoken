'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdminAuth from '@/components/AdminAuth'
import ImageUpload from '@/components/ImageUpload'
import Link from 'next/link'

const CATEGORIES = [
  'Hoofdgerecht',
  'Voorgerecht',
  'Bijgerecht',
  'Dessert',
  'Snack',
  'Soep',
  'Salade',
  'Ontbijt',
  'Lunch',
  'Drank',
  'Overig'
]

const DIFFICULTIES = [
  { value: 'makkelijk', label: 'Makkelijk' },
  { value: 'gemiddeld', label: 'Gemiddeld' },
  { value: 'moeilijk', label: 'Moeilijk' }
]

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    category: 'Hoofdgerecht',
    prep_time: 15,
    cook_time: 30,
    servings: 4,
    difficulty: 'gemiddeld',
    tags: '',
    ingredients: '',
    instructions: '',
    is_popular: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [createdRecipe, setCreatedRecipe] = useState<{ slug: string; title: string } | null>(null)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)
    setCreatedRecipe(null)

    try {
      const response = await fetch('/api/recepten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: 'Recept succesvol toegevoegd!' })
        setCreatedRecipe({ slug: data.recipe.slug, title: data.recipe.title })
        // Reset formulier
        setFormData({
          title: '',
          description: '',
          image_url: '',
          category: 'Hoofdgerecht',
          prep_time: 15,
          cook_time: 30,
          servings: 4,
          difficulty: 'gemiddeld',
          tags: '',
          ingredients: '',
          instructions: '',
          is_popular: false
        })
      } else {
        setMessage({ type: 'error', text: data.error || 'Er ging iets mis' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Kon geen verbinding maken met de server' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AdminAuth>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/recepten"
            className="text-teal-600 hover:text-teal-700 font-medium inline-flex items-center text-sm"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Terug naar recepten
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Nieuw recept toevoegen</h1>

          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              <p>{message.text}</p>
              {createdRecipe && (
                <Link
                  href={`/recepten/${createdRecipe.slug}`}
                  className="mt-2 inline-block text-teal-600 hover:text-teal-700 font-medium"
                >
                  Bekijk "{createdRecipe.title}" →
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
                placeholder="Bijv. Koreaanse Fried Chicken"
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
                placeholder="Een korte beschrijving van het gerecht..."
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

            {/* Categorie en moeilijkheid */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Categorie
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                  Moeilijkheid
                </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  {DIFFICULTIES.map(diff => (
                    <option key={diff.value} value={diff.value}>{diff.label}</option>
                  ))}
                </select>
              </div>
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
                placeholder="Bijv. Aziatisch, Kip, Gefrittuurd (gescheiden door komma's)"
              />
            </div>

            {/* Ingrediënten */}
            <div>
              <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">
                Ingrediënten * <span className="font-normal text-gray-500">(één per regel)</span>
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                required
                rows={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-mono text-sm"
                placeholder="500g kipfilet&#10;2 el sojasaus&#10;1 tl gember&#10;..."
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
                placeholder="Snijd de kip in stukken.&#10;Meng de marinade ingrediënten.&#10;Laat de kip 30 minuten marineren.&#10;..."
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
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 focus:ring-4 focus:ring-teal-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Bezig met opslaan...' : 'Recept opslaan'}
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
