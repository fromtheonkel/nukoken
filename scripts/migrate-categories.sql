-- Migration: Update recepten table schema
-- Run this in your Neon database console

-- Step 1: Add new columns
ALTER TABLE recepten_db_schema.recepten
ADD COLUMN IF NOT EXISTS categories TEXT,
ADD COLUMN IF NOT EXISTS serving_suggestions TEXT;

-- Step 2: Migrate existing category data to categories array format
-- This converts the old single category to a JSON array
UPDATE recepten_db_schema.recepten
SET categories = '["' || COALESCE(category, 'Overig') || '"]'
WHERE categories IS NULL;

-- Step 3: Optionally drop the old columns after verifying migration
-- Uncomment these lines after verifying the migration worked correctly
-- ALTER TABLE recepten_db_schema.recepten DROP COLUMN IF EXISTS category;
-- ALTER TABLE recepten_db_schema.recepten DROP COLUMN IF EXISTS difficulty;

-- Verify the migration
SELECT id, title, category, categories, difficulty, serving_suggestions
FROM recepten_db_schema.recepten
LIMIT 5;
