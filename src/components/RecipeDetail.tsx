'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { categories } from '@/lib/constants'

interface Recipe {
  id: number
  title: string
  slug: string
  description: string
  image_url: string
  categories: string[]
  prep_time: number
  cook_time: number
  servings: number
  tags?: string
  ingredients?: string
  instructions?: string
  serving_suggestions?: string
}

interface RecipeDetailProps {
  recipe: Recipe
}

interface IngredientGroup {
  name: string | null
  items: string[]
}

// Parse ingredients with subgroups (e.g., [Marinade], [Dressing])
function parseIngredientsWithGroups(ingredientsText: string): IngredientGroup[] {
  const lines = ingredientsText.split('\n').filter(Boolean)
  const groups: IngredientGroup[] = []
  let currentGroup: IngredientGroup = { name: null, items: [] }

  for (const line of lines) {
    const trimmedLine = line.trim()
    // Check if this is a group header like [Marinade]
    const groupMatch = trimmedLine.match(/^\[(.+)\]$/)
    if (groupMatch) {
      // Save the current group if it has items
      if (currentGroup.items.length > 0) {
        groups.push(currentGroup)
      }
      // Start a new group
      currentGroup = { name: groupMatch[1], items: [] }
    } else if (trimmedLine) {
      currentGroup.items.push(trimmedLine)
    }
  }

  // Don't forget the last group
  if (currentGroup.items.length > 0) {
    groups.push(currentGroup)
  }

  return groups
}

function getCategoryIcon(categoryName: string): string {
  const category = categories.find(c => c.name.toLowerCase() === categoryName.toLowerCase())
  return category?.icon || '🍽️'
}

export default function RecipeDetail({ recipe }: RecipeDetailProps) {
  const [servings, setServings] = useState(recipe.servings)
  const [screenLock, setScreenLock] = useState(false)
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null)
  const [showCopied, setShowCopied] = useState(false)

  const baseServings = recipe.servings
  const multiplier = servings / baseServings

  const ingredientGroups = recipe.ingredients ? parseIngredientsWithGroups(recipe.ingredients) : []
  const instructions = recipe.instructions ? recipe.instructions.split('\n').filter(Boolean) : []

  // Functie om ingrediënt hoeveelheden aan te passen
  const adjustIngredient = (ingredient: string): string => {
    if (multiplier === 1) return ingredient

    // Zoek naar getallen aan het begin van de string
    const match = ingredient.match(/^([\d.,\/]+)\s*(.*)/)
    if (match) {
      const originalAmount = match[1]
      const rest = match[2]

      // Verwerk breuken zoals 1/2
      let numericValue: number
      if (originalAmount.includes('/')) {
        const [numerator, denominator] = originalAmount.split('/')
        numericValue = parseFloat(numerator) / parseFloat(denominator)
      } else {
        numericValue = parseFloat(originalAmount.replace(',', '.'))
      }

      if (!isNaN(numericValue)) {
        const newAmount = numericValue * multiplier
        // Rond af op 1 decimaal als nodig
        const formatted = newAmount % 1 === 0 ? newAmount.toString() : newAmount.toFixed(1).replace('.', ',')
        return `${formatted} ${rest}`
      }
    }
    return ingredient
  }

  // Wake Lock functionaliteit
  const toggleScreenLock = useCallback(async () => {
    if (!screenLock) {
      try {
        if ('wakeLock' in navigator) {
          const lock = await navigator.wakeLock.request('screen')
          setWakeLock(lock)
          setScreenLock(true)
        } else {
          alert('Scherm aanhouden wordt niet ondersteund in deze browser')
        }
      } catch (err) {
        console.error('Wake Lock error:', err)
      }
    } else {
      if (wakeLock) {
        await wakeLock.release()
        setWakeLock(null)
      }
      setScreenLock(false)
    }
  }, [screenLock, wakeLock])

  // Cleanup wake lock bij unmount
  useEffect(() => {
    return () => {
      if (wakeLock) {
        wakeLock.release()
      }
    }
  }, [wakeLock])

  // Reactiveer wake lock bij terugkeer naar pagina
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (screenLock && document.visibilityState === 'visible' && 'wakeLock' in navigator) {
        try {
          const lock = await navigator.wakeLock.request('screen')
          setWakeLock(lock)
        } catch (err) {
          console.error('Wake Lock reactivation error:', err)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [screenLock])

  // Print functie
  const handlePrint = () => {
    window.print()
  }

  // WhatsApp delen
  const handleWhatsAppShare = () => {
    const url = window.location.href
    const text = `Bekijk dit heerlijke recept: ${recipe.title} - ${url}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  // Kopieer link
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setShowCopied(true)
      setTimeout(() => setShowCopied(false), 2000)
    } catch (err) {
      console.error('Copy error:', err)
    }
  }

  const totalTime = recipe.prep_time + recipe.cook_time

  // Korte intro tekst genereren
  const getIntroText = () => {
    return `Wil je ${recipe.title.toLowerCase()} maken? Dit recept staat binnen ${totalTime} minuten op tafel en is perfect voor ${servings} personen. Eet smakelijk!`
  }

  return (
    <article className="bg-white">
      {/* Hero sectie met afbeelding - gecentreerd */}
      <div className="max-w-5xl mx-auto px-4 pt-6">
        {/* Terug link */}
        <Link
          href="/recepten"
          className="text-teal-600 hover:text-teal-700 font-medium mb-6 inline-flex items-center text-sm"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Alle recepten
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Linker kolom: titel en info */}
          <div className="order-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {recipe.title}
            </h1>

            <p className="text-gray-600 mb-6 text-sm sm:text-base">{recipe.description}</p>

            {/* Tijden */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{recipe.prep_time} min. voorbereidingstijd</span>
              </div>
              {recipe.cook_time > 0 && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                  <span>{recipe.cook_time} min. bereidingstijd</span>
                </div>
              )}
            </div>

            {/* Categorieën */}
            <div className="flex flex-wrap gap-2">
              {recipe.categories?.map((cat, index) => (
                <span key={index} className="px-3 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                  {getCategoryIcon(cat)} {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Rechter kolom: afbeelding */}
          <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden order-2">
            <Image
              src={recipe.image_url || '/placeholder-recipe.jpg'}
              alt={recipe.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Intro tekst */}
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-600 italic text-base sm:text-lg">
          {getIntroText()}
        </p>
      </div>

      {/* Recept content */}
      <div className="max-w-5xl mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Ingrediënten kolom */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h2 className="text-lg font-bold text-teal-700 mb-4">Ingrediënten</h2>

              {/* Personen selector */}
              <div className="flex items-center justify-between bg-white rounded-lg p-3 mb-5 border border-gray-200">
                <span className="font-medium text-gray-700 text-sm">{servings} personen</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 text-gray-600 font-medium transition-colors text-sm"
                    aria-label="Minder personen"
                  >
                    -
                  </button>
                  <button
                    onClick={() => setServings(servings + 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 text-gray-600 font-medium transition-colors text-sm"
                    aria-label="Meer personen"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Ingrediënten lijst met subgroepen */}
              {ingredientGroups.length > 0 ? (
                <div className="space-y-4">
                  {ingredientGroups.map((group, groupIndex) => (
                    <div key={groupIndex}>
                      {group.name && (
                        <h3 className="font-semibold text-gray-800 text-sm mb-2 mt-4 first:mt-0">
                          {group.name}
                        </h3>
                      )}
                      <ul className="space-y-2">
                        {group.items.map((ingredient, index) => (
                          <li key={index} className="flex items-start gap-2 pb-2 border-b border-gray-200 last:border-0 text-sm">
                            <span className="text-teal-600 mt-0.5">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                            <span className="text-gray-700">{adjustIngredient(ingredient)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Geen ingrediënten beschikbaar</p>
              )}
            </div>
          </div>

          {/* Bereidingswijze kolom */}
          <div className="lg:col-span-3">
            {/* Scherm aanhouden toggle */}
            <div className="flex items-center justify-end gap-3 mb-4">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-600 text-sm">Scherm aanhouden</span>
              <button
                onClick={toggleScreenLock}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  screenLock ? 'bg-teal-600' : 'bg-gray-300'
                }`}
                aria-label={screenLock ? 'Scherm aanhouden uitschakelen' : 'Scherm aanhouden inschakelen'}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow ${
                    screenLock ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <h2 className="text-lg font-bold text-gray-900 mb-5">Bereidingswijze</h2>

            {instructions.length > 0 ? (
              <ol className="space-y-5">
                {instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed text-sm pt-1">{instruction}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-gray-500 text-sm">Geen bereidingswijze beschikbaar</p>
            )}

            {/* Serveersuggesties */}
            {recipe.serving_suggestions && (
              <div className="mt-8 p-4 bg-orange-50 rounded-lg border border-orange-100">
                <h3 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                  <span>💡</span> Serveersuggesties
                </h3>
                <p className="text-orange-700 text-sm">{recipe.serving_suggestions}</p>
              </div>
            )}

            {/* Tags */}
            {recipe.tags && (
              <div className="mt-6 pt-5 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.split(',').map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-xs hover:bg-gray-200 transition-colors"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actie knoppen */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-10 pt-6 border-t border-gray-200">
          <Link
            href={`/admin/bewerk/${recipe.id}`}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Bewerken
          </Link>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 text-teal-700 hover:text-teal-800 transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print recept
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-4 py-2 text-teal-700 hover:text-teal-800 transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {showCopied ? 'Gekopieerd!' : 'Sla recept op'}
          </button>

          <button
            onClick={handleWhatsAppShare}
            className="flex items-center gap-2 px-4 py-2 text-green-600 hover:text-green-700 transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Deel op WhatsApp
          </button>
        </div>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          header, footer, nav, .no-print {
            display: none !important;
          }

          button {
            display: none !important;
          }

          .print-only {
            display: block !important;
          }

          body {
            font-size: 12pt;
            color: black;
            background: white;
          }

          article {
            box-shadow: none !important;
          }

          img {
            max-height: 200px !important;
            object-fit: cover;
          }
        }
      `}</style>
    </article>
  )
}
