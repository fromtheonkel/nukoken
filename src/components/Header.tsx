'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          {/* Logo */}
          <div className="w-12 h-12 mr-3">
            <Image
              src="/images/nukoken-logo.svg"
              alt="NuKoken Logo"
              width={48}
              height={48}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          {/* Tekst */}
          <span className="text-xl font-bold text-gray-900 hidden sm:block">
            NuKoken
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="text-orange-500 font-medium">
            Home
          </Link>
          <Link href="/recepten" className="text-gray-600 hover:text-orange-500">
            Recepten
          </Link>
          <Link href="/sourdough" className="text-gray-600 hover:text-orange-500">
            Sourdough Blog
          </Link>
          <Link href="/over" className="text-gray-600 hover:text-orange-500">
            Over
          </Link>
          <Link href="/admin" className="text-gray-600 hover:text-orange-500">
            Admin
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="search"
            placeholder="Zoek recepten..."
            className="hidden md:block px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
          />

          {/* Hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Menu openen"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-orange-500 font-medium py-2"
            >
              Home
            </Link>
            <Link
              href="/recepten"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-600 hover:text-orange-500 py-2"
            >
              Recepten
            </Link>
            <Link
              href="/sourdough"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-600 hover:text-orange-500 py-2"
            >
              Sourdough Blog
            </Link>
            <Link
              href="/over"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-600 hover:text-orange-500 py-2"
            >
              Over
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-600 hover:text-orange-500 py-2"
            >
              Admin
            </Link>

            {/* Mobile search */}
            <div className="pt-2 border-t border-gray-100">
              <input
                type="search"
                placeholder="Zoek recepten..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
