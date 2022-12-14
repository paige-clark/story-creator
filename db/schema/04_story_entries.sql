DROP TABLE IF EXISTS story_entries CASCADE;
CREATE TABLE story_entries (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  story_block_id INTEGER REFERENCES story_blocks(id) ON DELETE CASCADE,
  entry_text TEXT NOT NULL,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  upvote_counter INTEGER NOT NULL DEFAULT 0,
  selected BOOLEAN NOT NULL DEFAULT FALSE
);
