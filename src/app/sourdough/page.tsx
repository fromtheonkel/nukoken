import Header from '@/components/Header'

export const metadata = {
  title: 'Sourdough Blog - NuKoken',
  description: 'Alles over zuurdesem brood bakken: tips, recepten en mijn sourdough avonturen'
}

export default function SourdoughPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🍞 Sourdough Blog
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Mijn avonturen met zuurdesem brood bakken. Tips, recepten en lessen geleerd onderweg.
            </p>
          </div>

          {/* Coming Soon */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-6">🥖</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Binnenkort beschikbaar
            </h2>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              Ik werk hard aan mijn eerste sourdough blog posts.
              Hier komen binnenkort artikelen over mijn zuurdesem starter,
              baktips en natuurlijk heerlijke recepten!
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mt-8">
              <div className="p-4 bg-amber-50 rounded-lg">
                <div className="text-3xl mb-2">🧪</div>
                <h3 className="font-semibold text-gray-900">Starter Tips</h3>
                <p className="text-sm text-gray-600">Hoe maak en onderhoud je een zuurdesem starter</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg">
                <div className="text-3xl mb-2">📖</div>
                <h3 className="font-semibold text-gray-900">Recepten</h3>
                <p className="text-sm text-gray-600">Van basic brood tot focaccia en croissants</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg">
                <div className="text-3xl mb-2">💡</div>
                <h3 className="font-semibold text-gray-900">Baktips</h3>
                <p className="text-sm text-gray-600">Technieken voor de perfecte korst en kruim</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
