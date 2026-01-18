import { getAllRecipes, getPopularRecipes } from '@/lib/database'
import RecipeCard from '@/components/RecipeCard'
import Header from '@/components/Header'
import Link from 'next/link'
import { categories } from '@/lib/constants'
import Image from 'next/image'

export const revalidate = 3600

export default async function HomePage() {
  const [popularRecipes, allRecipes] = await Promise.all([
    getPopularRecipes(),
    getAllRecipes()
  ])
  
  const latestRecipes = allRecipes.slice(0, 6)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
{/* Hero Section */}
<div className="relative h-96 rounded-lg overflow-hidden mb-12">
  {/* Background Image */}
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('/hero-image.webp')"
    }}
  />
  
  {/* Darkening overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-40" />
  
  <div className="relative z-10 h-full flex items-center justify-center text-center text-white p-8">
    <div className="max-w-2xl">
      {/* 🆕 Logo toevoegen */}
      <div className="w-20 h-20 mx-auto mb-6">
        <img
          src="/images/nukoken-logo.svg"
          alt="NuKoken Logo"
          className="w-full h-full object-contain drop-shadow-lg"
        />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
        Welkom bij NuKoken
      </h1>
      <p className="text-xl md:text-2xl mb-6 drop-shadow-md">
        Voor streetfood toppers, klassiekers en gezonde, snelle maaltijden
      </p>
      <Link 
        href="/recepten"
        className="bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        Bekijk alle recepten
      </Link>
    </div>
  </div>
</div>

        {/* Popular Recipes */}
        {popularRecipes.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Populaire Recepten</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularRecipes.slice(0, 3).map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        )}

        {/* Latest Recipes */}
        {latestRecipes.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Nieuwste Recepten</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestRecipes.slice(0, 3).map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        )}

        {/* Categories */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Ontdek per Categorie</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => (
              <Link
                key={category.name}
                href={`/recepten?category=${category.name}`}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition text-center block"
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <p className="font-semibold capitalize">{category.name}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      
    </div>
  )
}