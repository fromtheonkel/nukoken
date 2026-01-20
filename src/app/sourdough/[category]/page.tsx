import Header from '@/components/Header'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getBlogPostsByCategory } from '@/lib/blog-database'
import { blogCategories } from '@/types/blog'

interface PageProps {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params
  const categoryInfo = blogCategories.find(c => c.slug === category)

  if (!categoryInfo) {
    return { title: 'Categorie niet gevonden - NuKoken' }
  }

  return {
    title: `${categoryInfo.title} - Sourdough by Coby`,
    description: `Alle artikelen in de categorie ${categoryInfo.title}`
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params
  const categoryInfo = blogCategories.find(c => c.slug === category)

  // Check if it's "post" - that's handled by a different route
  if (category === 'post') {
    notFound()
  }

  if (!categoryInfo) {
    notFound()
  }

  const posts = await getBlogPostsByCategory(category)

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <Header />

      {/* Hero */}
      <section className={`relative py-16 md:py-20 ${categoryInfo.color} border-b-2`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center justify-center gap-2 text-sm text-[#5a5a5a]">
                <li>
                  <Link href="/sourdough" className="hover:text-amber-700">
                    Sourdough
                  </Link>
                </li>
                <li>/</li>
                <li className="text-amber-700 font-medium">{categoryInfo.title}</li>
              </ol>
            </nav>

            <div className={`w-20 h-20 ${categoryInfo.iconBg} rounded-2xl flex items-center justify-center text-5xl mx-auto mb-6`}>
              {categoryInfo.icon}
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#232937] mb-4">
              {categoryInfo.title}
            </h1>

            <p className="text-lg text-[#5a5a5a] max-w-2xl mx-auto">
              {category === 'starter-van-scratch' && 'Leer hoe je je eigen zuurdesem starter maakt en onderhoudt. Van dag 1 tot een actieve, bubbelige starter.'}
              {category === 'voor-beginners' && 'Nieuw met zuurdesem? Start hier! Basis technieken, eerste broden en alles wat je moet weten om te beginnen.'}
              {category === 'tips-en-tricks' && 'Verbeter je bakkunsten met bewezen tips. Van de perfecte korst tot het ideale kruim.'}
              {category === 'recepten' && 'Van klassiek boerenbrood tot focaccia, pizza en zoete broodjes. Recepten voor elk niveau.'}
            </p>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-6 opacity-50">🍞</div>
                <h2 className="text-2xl font-serif font-bold text-[#232937] mb-4">
                  Nog geen artikelen
                </h2>
                <p className="text-[#5a5a5a] mb-8">
                  Er zijn nog geen artikelen in deze categorie. Binnenkort meer!
                </p>
                <Link
                  href="/sourdough"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Terug naar overzicht
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/sourdough/post/${post.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                      {post.image_url ? (
                        <Image
                          src={post.image_url}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-6xl opacity-50">🍞</span>
                      )}
                    </div>

                    <div className="p-6">
                      <h2 className="text-xl font-serif font-bold text-[#232937] mb-2 group-hover:text-amber-700 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-[#5a5a5a] text-sm leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                      <span className="text-amber-600 font-medium text-sm">
                        Lees meer →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Back link */}
      <section className="py-8 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/sourdough"
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Terug naar Sourdough overzicht
            </Link>
          </div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="py-8 bg-[#faf9f7]" />
    </div>
  )
}
