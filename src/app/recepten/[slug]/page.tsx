import { getRecipeBySlug, getAllRecipes } from '@/lib/database'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import RecipeDetail from '@/components/RecipeDetail'
import { notFound } from 'next/navigation'

export const revalidate = 3600

export async function generateStaticParams() {
  const recipes = await getAllRecipes()
  return recipes.map(recipe => ({
    slug: recipe.slug
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const recipe = await getRecipeBySlug(slug)

  if (!recipe) {
    return {
      title: 'Recept niet gevonden - NuKoken'
    }
  }

  return {
    title: `${recipe.title} - NuKoken`,
    description: recipe.description
  }
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ReceptPage({ params }: PageProps) {
  const { slug } = await params
  const recipe = await getRecipeBySlug(slug)

  if (!recipe) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <RecipeDetail recipe={recipe} />
      </main>

      <Footer />
    </div>
  )
}