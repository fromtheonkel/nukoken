import { createRecipe } from '../lib/database'
import { initialRecipes } from '../lib/constants'

async function migrateInitialData() {
  console.log('🚀 Starting data migration...')
  
  for (const recipe of initialRecipes) {
    try {
      const result = await createRecipe(recipe)
      if (result) {
        console.log(`✅ Created: ${recipe.title}`)
      } else {
        console.log(`❌ Failed: ${recipe.title}`)
      }
    } catch (error) {
      console.error(`❌ Error creating ${recipe.title}:`, error)
    }
  }
  
  console.log('🎉 Data migration completed!')
}

if (require.main === module) {
  migrateInitialData().catch(console.error)
}

export { migrateInitialData }
