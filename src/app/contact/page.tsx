import ContactForm from '@/components/ContactForm'
import Header from '@/components/Header'

export const metadata = {
  title: 'Contact - NuKoken',
  description: 'Neem contact op met NuKoken voor vragen of suggesties'
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Contact
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Heb je vragen, suggesties voor nieuwe recepten, of wil je feedback geven? 
              We horen graag van je!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Waarom contact opnemen?
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-orange-600 text-lg">💡</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Recept suggesties</h3>
                      <p className="text-gray-600">Deel je favoriete recepten met de community</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-orange-600 text-lg">❓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Vragen over recepten</h3>
                      <p className="text-gray-600">Hulp nodig bij een recept? We helpen graag!</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-orange-600 text-lg">⭐</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Feedback</h3>
                      <p className="text-gray-600">Vertel ons hoe we NuKoken nog beter kunnen maken</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-orange-600 text-lg">🤝</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Samenwerking</h3>
                      <p className="text-gray-600">Interesse in partnerships of gastbijdragen?</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="font-semibold text-orange-900 mb-2">
                  📧 Reactietijd
                </h3>
                <p className="text-orange-800">
                  We proberen binnen 24 uur te reageren op alle berichten. 
                  Voor urgente vragen reageren we meestal binnen een paar uur!
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}