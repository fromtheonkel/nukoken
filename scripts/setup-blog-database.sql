-- Sourdough Blog Posts Database Schema
-- Run this in your Neon/Vercel Postgres dashboard

CREATE TABLE IF NOT EXISTS recepten_db_schema.blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    category VARCHAR(50) NOT NULL,
    tags TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON recepten_db_schema.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON recepten_db_schema.blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON recepten_db_schema.blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON recepten_db_schema.blog_posts(is_featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON recepten_db_schema.blog_posts(created_at);

-- Trigger for auto-updating updated_at
CREATE OR REPLACE FUNCTION recepten_db_schema.update_blog_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON recepten_db_schema.blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON recepten_db_schema.blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION recepten_db_schema.update_blog_updated_at_column();
