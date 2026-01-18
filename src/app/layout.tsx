import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import CookieConsentBanner from '@/components/CookieConsentBanner'
import Footer from '@/components/Footer' 

export const metadata: Metadata = {
  title: 'NuKoken - Heerlijke Recepten',
  description: 'Ontdek heerlijke recepten voor elke gelegenheid',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <head>
        {/* Default consent (denied) */}
<Script id="gtm-consent-default" strategy="beforeInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'consent',
      'consent_mode': {
        'analytics_storage': 'denied',
        'ad_storage': 'denied', 
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      }
    });
  `}
</Script>

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5DMT4695');
          `}
        </Script>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased bg-gray-50">
        {/* GTM noscript */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5DMT4695"
                  height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe>
        </noscript>
        
        {children}
        <Footer />  
        <CookieConsentBanner />
      </body>
    </html>
  )
}