import { Category } from './types'

export const categories: Category[] = [
  { name: "voorgerecht", icon: "🥗", color: "bg-green-100 text-green-800" },
  { name: "hoofdgerecht", icon: "🍽️", color: "bg-blue-100 text-blue-800" },
  { name: "bijgerecht", icon: "🥔", color: "bg-yellow-100 text-yellow-800" },
  { name: "dessert", icon: "🍰", color: "bg-pink-100 text-pink-800" },
  { name: "snack", icon: "🥨", color: "bg-orange-100 text-orange-800" },
  { name: "drank", icon: "🥤", color: "bg-purple-100 text-purple-800" }
]

export const difficulties = ['makkelijk', 'gemiddeld', 'moeilijk'] as const

export const initialRecipes = [
  {
    title: "Romige Pasta Carbonara",
    description: "Authentieke Italiaanse carbonara met ei, kaas en spek",
    image_url: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400",
    category: "hoofdgerecht",
    tags: ["pasta", "italiaans", "comfort food", "snel"],
    prep_time: 15,
    cook_time: 20,
    servings: 4,
    difficulty: "makkelijk",
    ingredients: [
      "400g spaghetti",
      "200g guanciale of pancetta",
      "4 eieren",
      "100g Pecorino Romano",
      "Zwarte peper"
    ],
    instructions: [
      "Kook de pasta volgens de verpakking",
      "Bak de guanciale knapperig",
      "Meng eieren met kaas",
      "Combineer alles met pastawater"
    ]
  },
  {
    title: "Verse Groentesoep", 
    description: "Gezonde soep vol met seizoensgroenten",
    image_url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400",
    category: "voorgerecht",
    tags: ["soep", "vegetarisch", "gezond", "winter"],
    prep_time: 20,
    cook_time: 30,
    servings: 6,
    difficulty: "makkelijk",
    ingredients: [
      "2 uien, gesnipperd",
      "3 wortels, in blokjes", 
      "2 stengels bleekselderij",
      "1 liter groentebouillon",
      "Verse kruiden"
    ],
    instructions: [
      "Fruit de ui glazig",
      "Voeg groenten toe en bak 5 minuten",
      "Giet er bouillon bij",
      "Laat 25 minuten sudderen",
      "Breng op smaak met kruiden"
    ]
  }
]
