import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">NuKoken</h3>
            <p className="text-gray-400">
              Jouw dagelijkse inspiratie voor heerlijke maaltijden.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Navigatie</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/recepten" className="hover:text-white">Recepten</Link></li>
              <li><Link href="/about" className="hover:text-white">Over</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Volg ons</h3>
            <p className="text-gray-400">
              Blijf op de hoogte van nieuwe recepten en tips!
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 NuKoken.nl - Alle rechten voorbehouden</p>
          <Link href="/admin" className="text-xs text-gray-600 hover:text-gray-400 mt-2 inline-block">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
