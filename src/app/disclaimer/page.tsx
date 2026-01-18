import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer & Aansprakelijkheid - NuKoken',
  description: 'Belangrijke informatie over het gebruik van onze recepten en onze aansprakelijkheid.',
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            ⚠️ Disclaimer & Aansprakelijkheid
          </h1>
          
          <div className="prose prose-gray max-w-none">
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-red-400 text-xl">⚠️</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-red-800">
                    Belangrijke veiligheidsinformatie
                  </h3>
                  <p className="mt-2 text-red-700">
                    Lees deze disclaimer zorgvuldig door voordat je recepten van NuKoken gebruikt. 
                    Door gebruik te maken van onze website en recepten ga je akkoord met onderstaande voorwaarden.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-lg text-gray-600 mb-8">
              <strong>Laatst bijgewerkt:</strong> {new Date().toLocaleDateString('nl-NL')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Algemene disclaimer</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                De recepten en kookinformatie op NuKoken worden aangeboden voor informatieve en educatieve doeleinden. 
                Wij doen ons best om accurate en veilige recepten te delen, maar kunnen geen garanties geven over:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>De volledigheid en juistheid van alle receptinformatie</li>
                <li>Het eindresultaat van jouw kookpoging</li>
                <li>De voedselveiligheid als recepten niet correct worden uitgevoerd</li>
                <li>Mogelijke allergische reacties of voedselintoleranties</li>
                <li>Schade aan apparatuur of eigendommen tijdens het koken</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. 🚨 Voedselveiligheid & Hygiëne</h2>
              
              <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-medium text-yellow-900 mb-2">⚠️ Jouw verantwoordelijkheid</h3>
                <p className="text-yellow-800">
                  Het is jouw verantwoordelijkheid om voedselveilige praktijken te hanteren 
                  bij het bereiden van recepten van onze website.
                </p>
              </div>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Belangrijke veiligheidstips:</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Temperaturen:</strong> Zorg altijd voor correcte gaar-/bewaartemperaturen</li>
                <li><strong>Verse ingrediënten:</strong> Controleer versheid van vlees, vis, zuivel en eieren</li>
                <li><strong>Hygiëne:</strong> Was handen en reinig werkoppervlakten regelmatig</li>
                <li><strong>Kruisbesmetting:</strong> Voorkom contact tussen rauw vlees en andere ingrediënten</li>
                <li><strong>Houdbaarheid:</strong> Respecteer bewaar- en consumptietermijnen</li>
                <li><strong>Allergenen:</strong> Controleer alle ingrediënten op allergenen</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. 🥜 Allergenen & Dieetbeperkingen</h2>
              
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-medium text-orange-900 mb-2">🚨 Kritieke waarschuwing</h3>
                <p className="text-orange-800">
                  Wij kunnen niet garanderen dat onze recepten vrij zijn van allergenen, 
                  ook niet als dit niet expliciet vermeld staat.
                </p>
              </div>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Bij allergieën of dieetbeperkingen:</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Controleer altijd</strong> alle ingrediënten en verpakkingslabels</li>
                <li><strong>Raadpleeg je arts</strong> bij twijfel over ingrediënten</li>
                <li><strong>Let op kruisbesmetting</strong> tijdens productie van ingrediënten</li>
                <li><strong>Wees extra voorzichtig</strong> met: noten, gluten, lactose, eieren, vis, soja</li>
                <li><strong>Gebruik alternatieve ingrediënten</strong> waar nodig</li>
              </ul>

              <p className="text-gray-700 font-medium">
                Bij ernstige allergieën raden wij aan om recepten eerst met een arts of diëtist te bespreken.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. 🔥 Kookveiligheid & Apparatuur</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Gebruik van keukenapparatuur:</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Volg altijd</strong> de gebruiksaanwijzing van jouw apparaten</li>
                <li><strong>Let op hete oppervlakken</strong> en gebruik ovenwanten</li>
                <li><strong>Zorg voor ventilatie</strong> bij frituren of grillen</li>
                <li><strong>Houd kinderen weg</strong> van gevaarlijke apparatuur</li>
                <li><strong>Controleer elektrische apparaten</strong> op defecten voor gebruik</li>
                <li><strong>Gebruik geen beschadigde</strong> pannen of glaswerk</li>
              </ul>

              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-red-800">
                  <strong>⚠️ NuKoken is niet aansprakelijk voor ongevallen, verwondingen of schade 
                  die ontstaan door het gebruik van keukenapparatuur tijdens het volgen van onze recepten.</strong>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. 👶 Speciale groepen</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">👶 Baby&apos;s & Peuters</h3>
                  <p className="text-blue-800 text-sm">
                    Raadpleeg altijd een kinderarts of consultatiebureau voordat je nieuwe voeding introduceert
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium text-purple-900 mb-2">🤰 Zwangerschap</h3>
                  <p className="text-purple-800 text-sm">
                    Bepaalde ingrediënten kunnen ongeschikt zijn tijdens zwangerschap. Overleg met je verloskundige
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900 mb-2">👴 Ouderen</h3>
                  <p className="text-green-800 text-sm">
                    Extra aandacht voor voedselveiligheid en zoutgehalte kan nodig zijn
                  </p>
                </div>
                
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h3 className="font-medium text-pink-900 mb-2">🏥 Medische condities</h3>
                  <p className="text-pink-800 text-sm">
                    Bij diabetes, hartproblemen of andere condities: overleg met je arts
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. 📝 Receptaccuratesse</h2>
              <p className="text-gray-700 mb-4">
                Hoewel wij ons best doen om accurate recepten te publiceren, kunnen er fouten voorkomen in:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Hoeveelheden van ingrediënten</li>
                <li>Bereidingstijden en temperaturen</li>
                <li>Bereidingsinstructies</li>
                <li>Aantal porties</li>
                <li>Nutritionele informatie</li>
              </ul>
              
              <p className="text-gray-700">
                Gebruik je gezonde verstand en pas recepten aan als iets niet klopt. 
                Bij twijfel over bereiding of veiligheid, stop dan met koken.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. 🚫 Uitsluiting van aansprakelijkheid</h2>
              
              <div className="bg-gray-100 p-6 rounded-lg mb-4">
                <p className="text-gray-800 font-medium mb-4">
                  NuKoken wijst uitdrukkelijk alle aansprakelijkheid af voor:
                </p>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Voedselvergiftiging of andere gezondheidsproblemen</li>
                  <li>Allergische reacties van welke aard dan ook</li>
                  <li>Ongevallen of verwondingen tijdens het koken</li>
                  <li>Schade aan eigendommen of keukenapparatuur</li>
                  <li>Teleurstellende kookresultaten</li>
                  <li>Indirecte of gevolgschade van welke aard dan ook</li>
                </ul>
              </div>

              <p className="text-gray-700 italic">
                Door gebruik te maken van onze recepten erkent u dat koken inherente risico&apos;s met zich meebrengt
                en dat u deze risico&apos;s voor eigen rekening neemt.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. 🏛️ Toepasselijk recht</h2>
              <p className="text-gray-700 mb-4">
                Op deze disclaimer is Nederlands recht van toepassing. Geschillen worden voorgelegd 
                aan de bevoegde rechter in Nederland.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. 📞 Contact & Feedback</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-blue-800 mb-2">
                  <strong>Vragen over voedselveiligheid of onjuistheden in recepten?</strong>
                </p>
                <p className="text-blue-700 mb-2">
                  📧 E-mail: info@nukoken.nl
                </p>
                <p className="text-blue-700 mb-4">
                  🌐 Website: nukoken.nl
                </p>
                <p className="text-sm text-blue-600">
                  Wij waarderen feedback over onze recepten en nemen veiligheidsklachten zeer serieus.
                </p>
              </div>
            </section>

            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mt-8">
              <h3 className="text-lg font-medium text-yellow-900 mb-2">
                🍳 Geniet veilig van koken!
              </h3>
              <p className="text-yellow-800">
                Deze disclaimer is bedoeld om je bewust te maken van belangrijke veiligheidsaspecten. 
                Koken moet vooral leuk blijven! Met de juiste voorzorgsmaatregelen kun je veilig 
                genieten van alle heerlijke recepten op NuKoken.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}