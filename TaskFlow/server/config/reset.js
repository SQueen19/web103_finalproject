import { pool } from './database.js'
import './dotenv.js'

const createTablesQuery = `
  DROP TABLE IF EXISTS tasks CASCADE;
  DROP TABLE IF EXISTS projects CASCADE;
  DROP TABLE IF EXISTS users CASCADE;

  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    githubid INTEGER UNIQUE NOT NULL,
    username VARCHAR(100) NOT NULL,
    avatarurl VARCHAR(500),
    accesstoken VARCHAR(500)
  );

  CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    start_date DATE,
    category VARCHAR(100),
    status VARCHAR(50) DEFAULT 'planning',
    progress INTEGER DEFAULT 0,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(50) DEFAULT 'medium',
    due_date DATE,
    status VARCHAR(50) DEFAULT 'todo',
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`

const seedDataQuery = `
  -- Seed Users
  INSERT INTO users (githubid, username, avatarurl, accesstoken) VALUES
  (12345678, 'demo_user', 'https://avatars.githubusercontent.com/u/12345678', 'demo_token_123'),
  (87654321, 'test_user', 'https://avatars.githubusercontent.com/u/87654321', 'demo_token_456');

  -- Seed Projects
  INSERT INTO projects (title, due_date, progress, status, category) VALUES
  ('Website Redesign', '2025-12-15', 65, 'active', 'design'),
  ('Mobile App Development', '2026-01-20', 30, 'active', 'development'),
  ('Marketing Campaign', '2025-11-30', 90, 'active', 'marketing'),
  ('Product Launch', '2025-12-31', 45, 'active', 'planning'),
  ('Q4 Planning', '2025-11-15', 15, 'planning', 'planning'),
  ('Client Onboarding', '2025-11-25', 80, 'active', 'other');

  -- Seed Tasks (for Website Redesign project)
  INSERT INTO tasks (project_id, title, priority, due_date, status, completed) VALUES
  (1, 'Design homepage mockup', 'high', '2025-11-10', 'todo', false),
  (1, 'Setup development environment', 'medium', '2025-11-08', 'todo', false),
  (1, 'Create user flow diagram', 'high', '2025-11-12', 'in-progress', false),
  (1, 'Database schema design', 'medium', '2025-11-15', 'in-progress', false),
  (1, 'Project kickoff meeting', 'low', '2025-11-05', 'done', true),
  (1, 'Requirements gathering', 'high', '2025-11-06', 'done', true);
`

const resetDatabase = async () => {
  try {
    console.log('🔄 Resetting database...')

    await pool.query(createTablesQuery)
    console.log('✅ Tables created successfully')

    await pool.query(seedDataQuery)
    console.log('✅ Data seeded successfully')
    
    console.log('🎉 Database reset complete!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error resetting database:', error)
    process.exit(1)
  }
}

resetDatabase()