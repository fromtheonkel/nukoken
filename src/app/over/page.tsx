// src/app/over/page.tsx
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Over NuKoken - Van Hobby Project tot Volledige Website',
  description: 'Het verhaal achter NuKoken: hoe een simpel receptenboekje uitgroeide tot een moderne website vol functionaliteiten'
}

export default function OverPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="w-24 h-24 mx-auto mb-6">
              <img
                src="/images/nukoken-logo.svg"
                alt="NuKoken Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Over NuKoken
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Het verhaal van een uit de hand gelopen hobby project dat begon als een simpel receptenboekje 
              en uitgroeide tot een volledige website vol moderne functionaliteiten.
            </p>
          </div>


          {/* Evolution Timeline */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              🚀 Van Simpel naar Ingewikkeld
            </h2>
            
            <div className="space-y-8">
              {/* Phase 1 */}
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-400">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl">📝</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Fase 1: De Basis</h3>
                    <p className="text-gray-600">Gewoon een paar recepten online zetten</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  Geen wordpress, dat zou echt te laf zijn. Gewoon lekker vibe coden en het begon met een beetje HTML en CSS. Een simpele lijst met recepten, wat styling, klaar toch? 
                  Maar toen dacht ik: "Het zou handig zijn als ik kon zoeken..."
                </p>
              </div>

              {/* Phase 2 */}
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-400">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Fase 2: Zoekfunctionaliteit</h3>
                    <p className="text-gray-600">JavaScript toevoegen voor interactiviteit</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  Oké, dus JavaScript erbij. Een zoekbalk, wat filters op categorie en bereidingstijd. 
                  Werkte prima! Maar toen dacht ik: "Een database zou eigenlijk handiger zijn..."
                </p>
              </div>

              {/* Phase 3 */}
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-400">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl">🗄️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Fase 3: Database & Backend</h3>
                    <p className="text-gray-600">Next.js, Neon database, TypeScript</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  Nu wordt het serieus! Next.js voor server-side rendering, een PostgreSQL database 
                  via Neon, TypeScript voor type safety. Plots had ik een "echte" web applicatie...
                </p>
              </div>

              {/* Phase 4 */}
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-400">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Fase 4: Design & UX</h3>
                    <p className="text-gray-600">Tailwind CSS, logo design, responsive layout</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  Het moest er ook mooi uitzien! Tailwind CSS voor styling, een eigen logo ontwerpen, 
                  responsive design voor mobiel. En natuurlijk dark mode overwogen (maar niet geïmplementeerd... nog niet).
                </p>
              </div>

              {/* Phase 5 */}
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-400">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Fase 5: Moderne Features</h3>
                    <p className="text-gray-600">Contact formulieren, analytics, optimalisaties</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  Nu moesten er formulieren bij voor feedback, email integratie, image optimalisatie, 
                  SEO metadata, performance optimalisaties... Het simple receptenboekje was officieel een full-stack applicatie geworden!
                </p>
              </div>
            </div>
          </div>

          {/* Current Features */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              🛠️ Wat er nu allemaal in zit
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">🔍 Geavanceerd Zoeken</h3>
                <p className="text-gray-600 text-sm">Zoek op ingrediënten, tags, bereidingstijd, moeilijkheidsgraad</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">🗄️ Database Integratie</h3>
                <p className="text-gray-600 text-sm">PostgreSQL via Neon voor schaalbare data opslag</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">📱 Responsive Design</h3>
                <p className="text-gray-600 text-sm">Werkt perfect op desktop, tablet en mobiel</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">📧 Contact Formulier</h3>
                <p className="text-gray-600 text-sm">Direct email verzenden via Nodemailer</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">🎨 Custom Logo</h3>
                <p className="text-gray-600 text-sm">Zelf ontworpen logo en huisstijl</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">⚡ Performance</h3>
                <p className="text-gray-600 text-sm">Image optimalisatie, caching, snelle laadtijden</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">🔗 SEO Vriendelijk</h3>
                <p className="text-gray-600 text-sm">Metadata, sitemap, search engine optimalisatie</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">📊 Analytics Ready</h3>
                <p className="text-gray-600 text-sm">Server-side tagging en tracking mogelijkheden</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">🍪 Cookie Management</h3>
                <p className="text-gray-600 text-sm">GDPR compliant cookie banner (work in progress)</p>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              💻 Technische Stack
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Frontend</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Next.js 14</strong> - React framework met server-side rendering</li>
                  <li>• <strong>TypeScript</strong> - Voor type safety en betere development</li>
                  <li>• <strong>Tailwind CSS</strong> - Utility-first CSS framework</li>
                  <li>• <strong>React Hooks</strong> - Voor state management</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Backend & Database</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Next.js API Routes</strong> - Server-side endpoints</li>
                  <li>• <strong>PostgreSQL</strong> - Relationele database via Neon</li>
                  <li>• <strong>Nodemailer</strong> - Email functionaliteit</li>
                  <li>• <strong>Vercel</strong> - Hosting en deployment</li>
                </ul>
              </div>
            </div>
          </div>


          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">
              🍽️ Deel je eigen recepten!
            </h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Heb je een geweldig recept dat je wilt delen? Of feedback over de website? 
              Ik hoor graag van je!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
              >
                Stuur een bericht
              </Link>
              <Link 
                href="/recepten"
                className="bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-800 transition inline-block"
              >
                Bekijk alle recepten
              </Link>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}