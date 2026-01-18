// src/components/CookieConsentBanner.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { Cookie, Shield, CheckCircle, XCircle, BarChart, Settings, Cloud } from 'lucide-react'

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [consent, setConsent] = useState<string | null>(null)

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem('cookieConsent')
    if (savedConsent) {
      setConsent(savedConsent)
      if (savedConsent === 'accepted') {
        enableTracking()
      }
    } else {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

    const enableTracking = () => {
    // Trigger GTM dataLayer events for consent
    if (typeof window !== 'undefined' && window.dataLayer) {
      // GTM Consent Mode v2
      window.dataLayer.push({
        'event': 'consent',
        'consent_mode': {
          'analytics_storage': 'granted',
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied'
        }
      })
      
      // Custom event for your triggers
      window.dataLayer.push({
        event: 'cookie_consent_granted',
        consent_analytics: true,
        consent_marketing: false,
        consent_cloudflare: true
      })
      
      // Enable Google Analytics
      window.dataLayer.push({
        event: 'gtm_init'
      })

      // Enable Cloudflare Analytics
      window.dataLayer.push({
        event: 'cloudflare_analytics_init'
      })
    }

    // Initialize Cloudflare Web Analytics if consent given
    if (typeof window !== 'undefined') {
      // Your Cloudflare beacon token would go here
      const script = document.createElement('script')
      script.defer = true
      script.src = 'https://static.cloudflareinsights.com/beacon.min.js'
      script.setAttribute('data-cf-beacon', '{"token": "your-cloudflare-token"}')
      document.head.appendChild(script)
    }
  }

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setConsent('accepted')
    setShowBanner(false)
    enableTracking()
  }

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined')
    setConsent('declined')
    setShowBanner(false)
    
    // Trigger GTM dataLayer event for consent declined
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'cookie_consent_declined',
        consent_analytics: false,
        consent_marketing: false,
        consent_cloudflare: false
      })
    }
  }

  const resetConsent = () => {
    localStorage.removeItem('cookieConsent')
    setConsent(null)
    setShowBanner(true)
  }

  // Show consent status indicator when banner is hidden
  if (!showBanner && consent) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={resetConsent}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg ${
            consent === 'accepted' 
              ? 'bg-green-100 text-green-800 hover:bg-green-200 border border-green-300' 
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300'
          }`}
          title="Klik om cookie voorkeuren te wijzigen"
        >
          {consent === 'accepted' ? (
            <>
              <CheckCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Cookies geaccepteerd</span>
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Cookies geweigerd</span>
            </>
          )}
        </button>
      </div>
    )
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          
          <div className="flex items-start space-x-3 flex-1">
            <div className="flex-shrink-0 mt-1">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                🍽️ Cookie-instellingen NuKoken
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Wij gebruiken cookies om onze receptenwebsite te verbeteren en jouw ervaring te optimaliseren. 
                Dit omvat <strong>Google Analytics</strong> voor websitestatistieken en{' '}
                <strong>Cloudflare Analytics</strong> voor performance monitoring.{' '}
                <button 
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-orange-600 hover:text-orange-700 underline inline-flex items-center gap-1"
                >
                  <Settings className="h-3 w-3" />
                  {showDetails ? 'Verberg details' : 'Toon details'}
                </button>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button
              onClick={declineCookies}
              className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors border border-gray-300"
            >
              Alleen noodzakelijk
            </button>
            <button
              onClick={acceptCookies}
              className="px-6 py-2 bg-orange-500 text-white hover:bg-orange-600 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <Cookie className="h-4 w-4" />
              <span>Alle cookies accepteren</span>
            </button>
          </div>
        </div>

        {/* Detailed info */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-600">
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart className="h-4 w-4 text-blue-600" />
                  <h4 className="font-semibold text-gray-900">Google Analytics</h4>
                </div>
                <p className="mb-2">
                  <strong>Google Analytics 4:</strong> Anonieme websitestatistieken om recepten en zoekfuncties te verbeteren
                </p>
                <p className="text-gray-500">
                  • Populaire recepten<br/>
                  • Zoekgedrag<br/>
                  • Apparaat type<br/>
                  • Geanonimiseerde locatie
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Cloud className="h-4 w-4 text-orange-600" />
                  <h4 className="font-semibold text-gray-900">Cloudflare Analytics</h4>
                </div>
                <p className="mb-2">
                  <strong>Server-side tracking:</strong> Performance monitoring en veiligheidsstatistieken
                </p>
                <p className="text-gray-500">
                  • Laadtijden website<br/>
                  • Server performance<br/>
                  • Veiligheid monitoring<br/>
                  • CDN optimalisatie
                </p>
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <h4 className="font-semibold text-gray-900">Noodzakelijk</h4>
                </div>
                <p className="mb-2">
                  <strong>Functionele cookies:</strong> Voor correct functioneren van de receptenwebsite
                </p>
                <p className="text-gray-500">
                  • Cookie voorkeuren<br/>
                  • Zoekfilters<br/>
                  • Veiligheid<br/>
                  • Basisfunctionaliteit
                </p>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              <p>
                <strong>Privacy:</strong> Wij respecteren je privacy en slaan geen persoonlijke gegevens op. 
                Je kunt je voorkeuren altijd wijzigen. Meer info in ons{' '}
                <a href="/privacy" className="text-orange-600 hover:text-orange-700 underline">
  privacybeleid
</a>
{' en onze '}
<a href="/disclaimer" className="text-orange-600 hover:text-orange-700 underline">
  disclaimer
</a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}