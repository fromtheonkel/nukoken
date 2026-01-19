import Header from '@/components/Header'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Sourdough by Coby - NuKoken',
  description: 'Alles over zuurdesem brood bakken: van starter tot perfecte broden. Tips, recepten en mijn sourdough avonturen.'
}

const categories = [
  {
    slug: 'starter-van-scratch',
    title: 'Sourdough Starter van Scratch',
    description: 'Leer hoe je je eigen zuurdesem starter maakt en onderhoudt. Van dag 1 tot een actieve, bubbelige starter.',
    icon: '🧪',
    color: 'bg-amber-50 border-amber-200',
    iconBg: 'bg-amber-100',
  },
  {
    slug: 'voor-beginners',
    title: 'Voor Beginners',
    description: 'Nieuw met zuurdesem? Start hier! Basis technieken, eerste broden en alles wat je moet weten om te beginnen.',
    icon: '🌱',
    color: 'bg-green-50 border-green-200',
    iconBg: 'bg-green-100',
  },
  {
    slug: 'tips-en-tricks',
    title: 'Tips & Tricks',
    description: 'Verbeter je bakkunsten met bewezen tips. Van de perfecte korst tot het ideale kruim.',
    icon: '💡',
    color: 'bg-blue-50 border-blue-200',
    iconBg: 'bg-blue-100',
  },
  {
    slug: 'recepten',
    title: 'Sourdough Recepten',
    description: 'Van klassiek boerenbrood tot focaccia, pizza en zoete broodjes. Recepten voor elk niveau.',
    icon: '🍞',
    color: 'bg-orange-50 border-orange-200',
    iconBg: 'bg-orange-100',
  },
]

const featuredPosts = [
  {
    slug: 'mijn-eerste-starter',
    title: 'Hoe ik mijn eerste starter maakte',
    excerpt: 'Het avontuur begon met meel, water en veel geduld. Dit is mijn verhaal van de eerste 14 dagen.',
    category: 'Sourdough Starter van Scratch',
    date: 'Binnenkort',
    image: '/images/sourdough-placeholder.jpg',
    comingSoon: true,
  },
  {
    slug: 'basis-sourdough-brood',
    title: 'Je eerste sourdough brood',
    excerpt: 'Een simpel recept voor beginners. Stap voor stap naar je eerste zelfgebakken zuurdesem brood.',
    category: 'Voor Beginners',
    date: 'Binnenkort',
    image: '/images/sourdough-placeholder.jpg',
    comingSoon: true,
  },
  {
    slug: 'open-kruim-tips',
    title: 'Hoe krijg je een open kruim?',
    excerpt: 'De geheimen achter die mooie grote gaten in je brood. Hydratatie, fermentatie en meer.',
    category: 'Tips & Tricks',
    date: 'Binnenkort',
    image: '/images/sourdough-placeholder.jpg',
    comingSoon: true,
  },
]

export default function SourdoughPage() {
  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-amber-50 to-[#faf9f7] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-amber-700 font-medium tracking-widest uppercase text-sm mb-4">
              Welkom bij
            </p>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#232937] mb-6">
              Sourdough
              <span className="block text-3xl md:text-4xl font-normal italic text-amber-700 mt-2">
                by Coby
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[#5a5a5a] max-w-2xl mx-auto leading-relaxed">
              Mijn passie voor zuurdesem brood bakken, gedeeld met jou.
              Van het maken van je eerste starter tot het bakken van perfecte artisan broden.
            </p>

            {/* Decorative bread illustration */}
            <div className="mt-10 flex justify-center gap-4 text-5xl">
              <span className="animate-bounce" style={{ animationDelay: '0ms' }}>🥖</span>
              <span className="animate-bounce" style={{ animationDelay: '100ms' }}>🍞</span>
              <span className="animate-bounce" style={{ animationDelay: '200ms' }}>🥐</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#232937] mb-4">
                Ontdek &amp; Leer
              </h2>
              <p className="text-[#5a5a5a] max-w-xl mx-auto">
                Kies een categorie en begin je sourdough reis
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/sourdough/${category.slug}`}
                  className={`group block p-6 md:p-8 rounded-2xl border-2 ${category.color} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 ${category.iconBg} rounded-xl flex items-center justify-center text-3xl flex-shrink-0`}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-bold text-[#232937] mb-2 group-hover:text-amber-700 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-[#5a5a5a] text-sm leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts / Coming Soon */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#232937] mb-4">
                Laatste Artikelen
              </h2>
              <p className="text-[#5a5a5a] max-w-xl mx-auto">
                Binnenkort verschijnen hier mijn eerste blog posts
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group bg-[#faf9f7] rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  {/* Image placeholder */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                    <span className="text-6xl opacity-50">🍞</span>
                    {post.comingSoon && (
                      <div className="absolute top-3 right-3 bg-amber-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                        Binnenkort
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <p className="text-amber-700 text-xs font-medium uppercase tracking-wider mb-2">
                      {post.category}
                    </p>
                    <h3 className="text-lg font-serif font-bold text-[#232937] mb-2 group-hover:text-amber-700 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-[#5a5a5a] text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / About Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 md:p-12 text-center border border-amber-100">
              <div className="text-5xl mb-6">👩‍🍳</div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#232937] mb-4">
                Over Coby
              </h2>
              <p className="text-[#5a5a5a] max-w-2xl mx-auto leading-relaxed mb-6">
                Hoi! Ik ben Coby en ik ben verslaafd aan zuurdesem brood bakken.
                Wat begon als een lockdown hobby is uitgegroeid tot een echte passie.
                Op deze blog deel ik alles wat ik heb geleerd - van mislukkingen tot successen.
              </p>
              <p className="text-[#5a5a5a] max-w-2xl mx-auto leading-relaxed">
                Mijn missie? Iedereen laten zien dat zuurdesem bakken niet zo moeilijk is als het lijkt.
                Met de juiste kennis en een beetje geduld bak jij ook de mooiste broden!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Tips Banner */}
      <section className="py-12 bg-[#232937]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="text-white">
                <div className="text-3xl mb-2">🌡️</div>
                <p className="text-amber-300 font-medium text-sm">Ideale Temp</p>
                <p className="text-white/80 text-xs mt-1">24-26°C voor fermentatie</p>
              </div>
              <div className="text-white">
                <div className="text-3xl mb-2">💧</div>
                <p className="text-amber-300 font-medium text-sm">Hydratatie</p>
                <p className="text-white/80 text-xs mt-1">Start met 70-75%</p>
              </div>
              <div className="text-white">
                <div className="text-3xl mb-2">⏰</div>
                <p className="text-amber-300 font-medium text-sm">Geduld</p>
                <p className="text-white/80 text-xs mt-1">Bulk ferment 4-6 uur</p>
              </div>
              <div className="text-white">
                <div className="text-3xl mb-2">🧂</div>
                <p className="text-amber-300 font-medium text-sm">Zout</p>
                <p className="text-white/80 text-xs mt-1">2% van het meel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="py-8 bg-[#faf9f7]" />
    </div>
  )
}
