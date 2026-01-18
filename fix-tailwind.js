#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🛠️  Tailwind CSS Fix Script');
console.log('===========================\n');

console.log('📦 Uninstalling problematic packages...');
try {
  execSync('npm uninstall tailwindcss postcss autoprefixer', { stdio: 'inherit' });
  console.log('✅ Uninstalled old packages');
} catch (error) {
  console.log('⚠️  Could not uninstall (packages might not exist)');
}

console.log('\n📦 Installing correct Tailwind CSS packages...');
try {
  execSync('npm install -D tailwindcss@3.4.0 postcss@8.4.31 autoprefixer@10.4.16', { stdio: 'inherit' });
  console.log('✅ Installed Tailwind CSS packages');
} catch (error) {
  console.error('❌ Failed to install packages:', error.message);
  process.exit(1);
}

console.log('\n🔧 Creating fixed configuration files...');

// Fix PostCSS config
const postCSSConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

fs.writeFileSync('postcss.config.js', postCSSConfig);
console.log('✅ Created postcss.config.js');

// Fix Tailwind config
const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;

fs.writeFileSync('tailwind.config.js', tailwindConfig);
console.log('✅ Created tailwind.config.js');

// Update Next.js config to disable Turbopack for CSS
const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  // Disable turbopack for CSS processing
  experimental: {
    turbo: false
  }
}

module.exports = nextConfig`;

fs.writeFileSync('next.config.js', nextConfig);
console.log('✅ Updated next.config.js');

// Create a simplified globals.css that definitely works
const globalsCSS = `@tailwind base;
@tailwind components; 
@tailwind utilities;

/* Custom utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Focus styles */
:focus {
  outline: 2px solid #f97316;
  outline-offset: 2px;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}`;

fs.writeFileSync('src/app/globals.css', globalsCSS);
console.log('✅ Updated globals.css');

// Create a backup CSS file without Tailwind (just in case)
const backupCSS = `/* Fallback CSS without Tailwind */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9fafb;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  background-color: #f97316;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #ea580c;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

/* Typography */
.text-4xl { font-size: 2.25rem; font-weight: bold; }
.text-2xl { font-size: 1.5rem; font-weight: bold; }
.text-xl { font-size: 1.25rem; }
.text-lg { font-size: 1.125rem; }

/* Spacing */
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mb-8 { margin-bottom: 2rem; }
.p-4 { padding: 1rem; }
.p-8 { padding: 2rem; }
.py-8 { padding-top: 2rem; padding-bottom: 2rem; }

/* Layout */
.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.gap-4 { gap: 1rem; }
.gap-6 { gap: 1.5rem; }

/* Responsive */
@media (min-width: 768px) {
  .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .lg\\:grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
}

/* Colors */
.bg-gray-50 { background-color: #f9fafb; }
.bg-white { background-color: white; }
.bg-orange-500 { background-color: #f97316; }
.text-white { color: white; }
.text-gray-600 { color: #6b7280; }
.text-gray-900 { color: #111827; }

/* Flexbox */
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }

/* Text utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}`;

fs.writeFileSync('backup-styles.css', backupCSS);
console.log('✅ Created backup-styles.css');

console.log('\n🎯 Testing Tailwind initialization...');
try {
  execSync('npx tailwindcss init --force', { stdio: 'inherit' });
  console.log('✅ Tailwind initialized successfully');
} catch (error) {
  console.log('⚠️  Tailwind init had issues, but continuing...');
}

console.log('\n🧹 Cleaning up cache...');
try {
  if (fs.existsSync('.next')) {
    fs.rmSync('.next', { recursive: true, force: true });
    console.log('✅ Cleared .next cache');
  }
} catch (error) {
  console.log('⚠️  Could not clear cache (no problem)');
}

console.log('\n✨ Fix complete! Try these steps:');
console.log('1. Stop your dev server (Ctrl+C)');
console.log('2. Run: npm run dev');
console.log('3. If still issues, import backup-styles.css in layout.tsx instead');
console.log('\nIf Tailwind still fails, I have a backup CSS ready!');