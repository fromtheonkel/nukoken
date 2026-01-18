import { getAllRecipes } from '@/lib/database'
import Header from '@/components/Header'
import SearchAndFilters from '@/components/SearchAndFilters'

export const revalidate = 3600

export const metadata = {
  title: 'Alle Recepten - NuKoken',
  description: 'Ontdek heerlijke recepten voor elke gelegenheid'
}

interface SearchParams {
  search?: string
  category?: string
  difficulty?: string
  tag?: string
  ingredient?: string
  sort?: string
  servings?: string
  maxTime?: string
}

interface PageProps {
  searchParams: Promise<SearchParams>
}

export default async function ReceptenPage({ searchParams }: PageProps) {
  // Await searchParams (Next.js 15 requirement)
  const params = await searchParams
  // Haal alle recepten op - we filteren client-side voor betere UX
  const allRecipes = await getAllRecipes()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Ontdek Recepten</h1>
          <p className="text-lg text-gray-600">
            Doorzoek onze collectie van {allRecipes.length} heerlijke recepten
          </p>
        </div>

        {/* Search and Filters Component */}
        <SearchAndFilters
          recipes={allRecipes}
          searchParams={params}
        />
      </main>

    </div>
  )
}