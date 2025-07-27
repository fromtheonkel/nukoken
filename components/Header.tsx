'use client'
import { useState } from 'react'
import { Search, ChefHat } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  onSearch?: (term: string) => void
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const pathname = usePathname()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    onSearch?.(term)
  }

  const isActivePage = (path: string) => {
    return pathname === path ? 'text-orange-500' : ''
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl">NuKoken</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className={`hover:text-orange-500 transition ${isActivePage('/')}`}>
              Home
            </Link>
            <Link href="/recepten" className={`hover:text-orange-500 transition ${isActivePage('/recepten')}`}>
              Recepten
            </Link>
            <Link href="/about" className={`hover:text-orange-500 transition ${isActivePage('/about')}`}>
              Over
            </Link>
            <Link href="/contact" className={`hover:text-orange-500 transition ${isActivePage('/contact')}`}>
              Contact
            </Link>
          </nav>

          <div className="relative w-64">
            <input
              type="text"
              placeholder="Zoek recepten..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  )
}
