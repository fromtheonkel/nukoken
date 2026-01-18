require('dotenv').config({ path: '.env.local' });
const { sql } = require('@vercel/postgres');

async function testDatabase() {
  try {
    console.log('Testing database connection...');
    
    // Check what schemas exist
    console.log('\n📋 Checking available schemas...');
    const schemas = await sql`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name NOT IN ('information_schema', 'pg_catalog', 'pg_toast')
    `;
    
    console.log('Available schemas:');
    schemas.rows.forEach(schema => {
      console.log(`- ${schema.schema_name}`);
    });
    
    // Check tables in recepten_db_schema
    console.log('\n📋 Checking tables in recepten_db_schema...');
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'recepten_db_schema'
    `;
    
    console.log('Tables in recepten_db_schema:');
    tables.rows.forEach(table => {
      console.log(`- ${table.table_name}`);
    });
    
    // Test fetching recipes
    console.log('\n🍽️  Testing recipe fetch...');
    const result = await sql`SELECT * FROM recepten_db_schema.recepten`;
    console.log('✅ Database connected!');
    console.log('📊 Found recipes:', result.rows.length);
    result.rows.forEach(recipe => {
      console.log(`- ${recipe.title} (${recipe.slug}) - Popular: ${recipe.is_popular}`);
    });
    
  } catch (error) {
    console.error('❌ Database error:', error.message);
  }
}

testDatabase();