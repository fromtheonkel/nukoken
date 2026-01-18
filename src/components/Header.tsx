import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
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
          {/* Tekst (optioneel - kun je weglaten als logo tekst heeft) */}
          <span className="text-xl font-bold text-gray-900 hidden sm:block">
            NuKoken
          </span>
        </Link>
        
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="text-orange-500 font-medium">
            Home
          </Link>
          <Link href="/recepten" className="text-gray-600 hover:text-orange-500">
            Recepten
          </Link>
          <Link href="/over" className="text-gray-600 hover:text-orange-500">
            Over
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-orange-500">
            Contact
          </Link>
        </div>

        <div className="flex items-center">
          <input
            type="search"
            placeholder="Zoek recepten..."
            className="hidden md:block px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
          />
        </div>
      </nav>
    </header>
  )
}