-- NuKoken Database Schema
CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    tags TEXT[] DEFAULT '{}',
    prep_time INTEGER NOT NULL,
    cook_time INTEGER NOT NULL,
    servings INTEGER NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    ingredients TEXT[] DEFAULT '{}',
    instructions TEXT[] DEFAULT '{}',
    is_popular BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    icon VARCHAR(10) NOT NULL,
    color VARCHAR(50) NOT NULL
);

INSERT INTO categories (name, icon, color) VALUES
('voorgerecht', '🥗', 'bg-green-100 text-green-800'),
('hoofdgerecht', '🍽️', 'bg-blue-100 text-blue-800'),
('bijgerecht', '🥔', 'bg-yellow-100 text-yellow-800'),
('dessert', '🍰', 'bg-pink-100 text-pink-800'),
('snack', '🥨', 'bg-orange-100 text-orange-800'),
('drank', '🥤', 'bg-purple-100 text-purple-800')
ON CONFLICT (name) DO NOTHING;

CREATE INDEX IF NOT EXISTS idx_recipes_category ON recipes(category);
CREATE INDEX IF NOT EXISTS idx_recipes_slug ON recipes(slug);
CREATE INDEX IF NOT EXISTS idx_recipes_popular ON recipes(is_popular);
CREATE INDEX IF NOT EXISTS idx_recipes_created_at ON recipes(created_at);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_recipes_updated_at ON recipes;
CREATE TRIGGER update_recipes_updated_at
    BEFORE UPDATE ON recipes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
