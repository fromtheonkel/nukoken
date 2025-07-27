import { getAllRecipes, getPopularRecipes } from '@/lib/database'
import RecipeCard from '@/components/RecipeCard'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { categories } from '@/lib/constants'

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
        <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg p-8 mb-12">
          <h1 className="text-4xl font-bold mb-4">Welkom bij NuKoken</h1>
          <p className="text-xl mb-6">Ontdek heerlijke recepten voor elke gelegenheid</p>
          <Link 
            href="/recepten"
            className="bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Bekijk alle recepten
          </Link>
        </div>

        {popularRecipes.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Populaire Recepten</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {popularRecipes.slice(0, 3).map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        )}

        {latestRecipes.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Nieuwste Recepten</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestRecipes.slice(0, 3).map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        )}

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

      <Footer />
    </div>
  )
}
