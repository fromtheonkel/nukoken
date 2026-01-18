'use client'

import React from 'react'
import Link from 'next/link'
import { Heart, Mail, Shield, AlertTriangle, Home, Search, BookOpen } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-orange-500 p-2 rounded-lg">
                <span className="text-white font-bold text-xl">🍽️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">NuKoken</h3>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Ontdek heerlijke recepten voor elke gelegenheid. Van snelle doordeweekse maaltijden 
              tot feestelijke gerechten - bij NuKoken vind je altijd inspiratie voor je keuken.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Heart className="h-4 w-4 text-red-500" />
              <span>Gemaakt met liefde voor lekker eten</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Navigatie</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-600 hover:text-orange-500 transition-colors flex items-center space-x-2"
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/recepten" 
                  className="text-gray-600 hover:text-orange-500 transition-colors flex items-center space-x-2"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Alle Recepten</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/zoeken" 
                  className="text-gray-600 hover:text-orange-500 transition-colors flex items-center space-x-2"
                >
                  <Search className="h-4 w-4" />
                  <span>Zoeken</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-600 hover:text-orange-500 transition-colors flex items-center space-x-2"
                >
                  <Mail className="h-4 w-4" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Juridisch</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/privacy" 
                  className="text-gray-600 hover:text-orange-500 transition-colors flex items-center space-x-2"
                >
                  <Shield className="h-4 w-4" />
                  <span>Privacybeleid</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/disclaimer" 
                  className="text-gray-600 hover:text-orange-500 transition-colors flex items-center space-x-2"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span>Disclaimer</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/algemene-voorwaarden" 
                  className="text-gray-600 hover:text-orange-500 transition-colors"
                >
                  Algemene Voorwaarden
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => {
                    try {
                      // Reset cookie consent to show banner again
                      localStorage.removeItem('cookieConsent')
                      // Gebruik setTimeout om reload te voorkomen tijdens render
                      setTimeout(() => {
                        window.location.reload()
                      }, 100)
                    } catch (error) {
                      console.log('Cookie reset error:', error)
                    }
                  }}
                  className="text-gray-600 hover:text-orange-500 transition-colors text-left"
                >
                  Cookie Instellingen
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm">
                © {currentYear} NuKoken. Alle rechten voorbehouden.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Gemaakt in Nederland 🇳🇱
              </p>
            </div>

            {/* Social Links (optioneel) */}
            <div className="flex space-x-4">
              <a 
                href="mailto:info@nukoken.nl" 
                className="text-gray-400 hover:text-orange-500 transition-colors"
                title="Email ons"
              >
                <Mail className="h-5 w-5" />
              </a>
              {/* Voeg hier andere social media links toe indien gewenst */}
            </div>
          </div>

          {/* Extra disclaimer text */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400 leading-relaxed">
              Onze recepten zijn bedoeld voor informatieve doeleinden. 
              Volg altijd voedselveiligheidsrichtlijnen en raadpleeg bij allergieën een arts.
              <br />
              Lees ons <Link href="/disclaimer" className="underline hover:text-orange-500">disclaimer</Link> voor belangrijke veiligheidsinformatie.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}