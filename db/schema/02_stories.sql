-- Drop and recreate stories table

DROP TABLE IF EXISTS stories CASCADE;
CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  initial_story TEXT NOT NULL,
  published_at TIMESTAMP,
  completed BOOLEAN NOT NULL DEFAULT FALSE
);
