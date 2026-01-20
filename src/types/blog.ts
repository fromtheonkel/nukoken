export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  image_url: string
  category: 'starter-van-scratch' | 'voor-beginners' | 'tips-en-tricks' | 'recepten'
  tags: string
  is_featured: boolean
  is_published: boolean
  created_at: string
  updated_at: string
}

export const blogCategories = [
  {
    slug: 'starter-van-scratch',
    title: 'Sourdough Starter van Scratch',
    icon: '🧪',
    color: 'bg-amber-50 border-amber-200',
    iconBg: 'bg-amber-100',
  },
  {
    slug: 'voor-beginners',
    title: 'Voor Beginners',
    icon: '🌱',
    color: 'bg-green-50 border-green-200',
    iconBg: 'bg-green-100',
  },
  {
    slug: 'tips-en-tricks',
    title: 'Tips & Tricks',
    icon: '💡',
    color: 'bg-blue-50 border-blue-200',
    iconBg: 'bg-blue-100',
  },
  {
    slug: 'recepten',
    title: 'Sourdough Recepten',
    icon: '🍞',
    color: 'bg-orange-50 border-orange-200',
    iconBg: 'bg-orange-100',
  },
] as const

export type BlogCategorySlug = typeof blogCategories[number]['slug']
