# 🍳 NuKoken - Receptenwebsite

Een moderne receptenwebsite gebouwd met Next.js 14, TypeScript en Vercel Postgres.

## ✨ Features

- **Responsive Design** - Werkt perfect op alle apparaten
- **Recipe Management** - Voeg, bewerk en verwijder recepten
- **Category Filtering** - Filter op gerechten-categorie
- **Search Functionality** - Zoek in titel, beschrijving en tags
- **Admin Dashboard** - Beveiligd admin paneel
- **Database Storage** - Postgres database via Vercel
- **Fast Performance** - Server-side rendering en optimized images

## 🚀 Quick Start

1. **Development server starten:**
   ```bash
   npm run dev
   ```

2. **Database setup:**
   - Maak Vercel Postgres database
   - Run SQL uit `scripts/setup-database.sql`
   - Update `.env.local` met je connection strings

3. **Initiële data laden:**
   ```bash
   npm run db:migrate
   ```

4. **Deploy:**
   ```bash
   npx vercel
   ```

## 📁 Project Structuur

```
nukoken-website/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── recepten/          # Recipe pages
│   ├── admin/             # Admin dashboard
│   └── page.tsx           # Homepage
├── components/            # React components
├── lib/                   # Database & utilities
├── scripts/               # Database scripts
└── public/                # Static assets
```

## 🛠 Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Vercel Postgres
- **Icons:** Lucide React
- **Deployment:** Vercel

## 🔐 Admin Access

- URL: `/admin`
- Password: `nukoken2025`

## 📖 API Endpoints

- `GET /api/recipes` - Alle recepten
- `POST /api/recipes` - Nieuw recept
- `GET /api/recipes/[id]` - Specifiek recept
- `PUT /api/recipes/[id]` - Update recept
- `DELETE /api/recipes/[id]` - Verwijder recept

## 🎨 Customization

Pas de website aan door:
- Kleuren te wijzigen in `tailwind.config.js`
- Categorieën aan te passen in `lib/constants.ts`
- Components te stylen in de respectieve bestanden

## 🐛 Troubleshooting

**Database verbinding problemen:**
- Check je `.env.local` variabelen
- Verifieer je Vercel Postgres setup

**Images laden niet:**
- Check `next.config.js` image domains
- Verifieer image URLs zijn geldig

## 📞 Support

Voor vragen of problemen, check de documentatie of maak een issue aan.

---

Gemaakt met ❤️ door NuKoken Team
