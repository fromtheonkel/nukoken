import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacybeleid - NuKoken',
  description: 'Lees ons privacybeleid en ontdek hoe wij omgaan met jouw persoonlijke gegevens.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            🔒 Privacybeleid NuKoken
          </h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              <strong>Laatst bijgewerkt:</strong> {new Date().toLocaleDateString('nl-NL')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Wie zijn wij?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                NuKoken is een Nederlandse receptenwebsite die zich richt op het delen van heerlijke recepten 
                en kookinspiratie. Wij respecteren jouw privacy en gaan zorgvuldig om met jouw persoonlijke gegevens.
              </p>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Contactgegevens:</strong><br />
                  Website: nukoken.nl<br />
                  E-mail: privacy@nukoken.nl
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Welke gegevens verzamelen wij?</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Automatisch verzamelde gegevens</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>IP-adres (geanonimiseerd)</li>
                <li>Browsertype en versie</li>
                <li>Bezochte pagina's en duur van bezoek</li>
                <li>Referrer URL (waar je vandaan komt)</li>
                <li>Apparaattype (desktop, tablet, mobiel)</li>
                <li>Algemene locatie (land/regio)</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Vrijwillig verstrekte gegevens</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>E-mailadres (bij nieuwsbrief aanmelding)</li>
                <li>Naam (optioneel bij contact)</li>
                <li>Reacties en beoordelingen</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Cookies en tracking</h2>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-medium text-blue-900 mb-2">🍪 Wat zijn cookies?</h3>
                <p className="text-blue-800">
                  Cookies zijn kleine tekstbestanden die op jouw apparaat worden opgeslagen 
                  om onze website te laten werken en jouw ervaring te verbeteren.
                </p>
              </div>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Google Analytics (GA4)</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Doel:</strong> Anonieme websitestatistieken</li>
                <li><strong>Gegevens:</strong> Paginabezoeken, populaire recepten, zoekgedrag</li>
                <li><strong>Bewaartermijn:</strong> 26 maanden</li>
                <li><strong>IP-anonimisering:</strong> Ingeschakeld</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Cloudflare Analytics</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Doel:</strong> Performance monitoring en beveiliging</li>
                <li><strong>Gegevens:</strong> Laadtijden, serverstatistieken</li>
                <li><strong>Privacy-vriendelijk:</strong> Geen tracking tussen websites</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Noodzakelijke cookies</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Cookie voorkeuren</li>
                <li>Zoekfilters en instellingen</li>
                <li>Beveiligingscookies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Waarom gebruiken wij jouw gegevens?</h2>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Het functioneren van onze receptenwebsite</li>
                <li>Verbetering van gebruikerservaring</li>
                <li>Analyseren van populaire recepten en zoektermen</li>
                <li>Technische optimalisatie en bugfixes</li>
                <li>Beveiligingsmonitoring</li>
                <li>Nieuwsbrief versturen (alleen met toestemming)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Jouw rechten (AVG/GDPR)</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900 mb-2">✅ Recht op inzage</h3>
                  <p className="text-green-800 text-sm">
                    Je kunt opvragen welke gegevens wij van jou hebben
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900 mb-2">✏️ Recht op correctie</h3>
                  <p className="text-green-800 text-sm">
                    Onjuiste gegevens kun je laten corrigeren
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900 mb-2">🗑️ Recht op verwijdering</h3>
                  <p className="text-green-800 text-sm">
                    Je kunt vragen om verwijdering van jouw gegevens
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900 mb-2">🚫 Recht op bezwaar</h3>
                  <p className="text-green-800 text-sm">
                    Bezwaar maken tegen gebruik van jouw gegevens
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mb-4">
                <strong>Contact voor privacyverzoeken:</strong> privacy@nukoken.nl
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Beveiliging</h2>
              <p className="text-gray-700 mb-4">
                Wij nemen passende technische en organisatorische maatregelen om jouw 
                persoonlijke gegevens te beschermen tegen onbevoegde toegang, verlies of misbruik:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>HTTPS encryptie voor alle verbindingen</li>
                <li>Cloudflare beveiligingslaag</li>
                <li>Reguliere beveiligingsupdates</li>
                <li>Minimale gegevensverzameling</li>
                <li>IP-anonimisering in analytics</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Delen met derde partijen</h2>
              <p className="text-gray-700 mb-4">
                Wij verkopen, verhuren of delen jouw persoonlijke gegevens nooit met derden voor commerciële doeleinden. 
                Gegevens worden alleen gedeeld met:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Google Analytics:</strong> Geanonimiseerde websitestatistieken</li>
                <li><strong>Cloudflare:</strong> CDN en beveiligingsdiensten</li>
                <li><strong>Hostingpartner:</strong> Voor het hosten van onze website</li>
              </ul>
              <p className="text-gray-700">
                Al deze partijen hebben passende privacy agreements en voldoen aan GDPR.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Bewaartermijnen</h2>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Google Analytics:</strong> 26 maanden</li>
                <li><strong>Nieuwsbrief:</strong> Tot uitschrijving</li>
                <li><strong>Contact berichten:</strong> 2 jaar</li>
                <li><strong>Cookie voorkeuren:</strong> 1 jaar</li>
                <li><strong>Logbestanden:</strong> 30 dagen</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Wijzigingen in dit beleid</h2>
              <p className="text-gray-700">
                Wij kunnen dit privacybeleid van tijd tot tijd aanpassen. Belangrijke wijzigingen 
                zullen we duidelijk aangeven op onze website. De laatste wijzigingsdatum staat 
                bovenaan dit document.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <strong>Vragen over dit privacybeleid?</strong>
                </p>
                <p className="text-gray-700 mb-2">
                  📧 E-mail: privacy@nukoken.nl
                </p>
                <p className="text-gray-700 mb-4">
                  🌐 Website: nukoken.nl
                </p>
                <p className="text-sm text-gray-600">
                  Je hebt ook het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens (AP) 
                  als je vindt dat wij niet goed omgaan met jouw persoonlijke gegevens.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}