const db = require('../connection');

const getStoryInfo = (storyID) => {
  const query = `
  SELECT stories.id AS story_id,
         stories.title AS story_title,
         stories.initial_story,
         stories.completed AS story_completion_status,
         story_blocks.id AS story_block_id,
         story_blocks.completed AS block_completed,
         story_entries.id AS entry_id,
         story_entries.story_block_id AS entry_block,
         story_entries.entry_text,
         story_entries.selected AS winning_entry
  FROM stories
  JOIN story_blocks
    ON stories.id = story_blocks.story_id
  LEFT JOIN story_entries
    ON story_blocks.id = story_entries.story_block_id
  WHERE stories.id = $1
  ;`;

  const params = [storyID];

  return db.query(query, params)
    .then(data => {
      return data.rows;
    });
};

// mark an entry as winning
const winningEntry = (entryID) => {

  const query = `
  UPDATE story_entries
  SET selected = TRUE
  WHERE id = $1;
  `;

  const params = [entryID];

  return db.query(query, params)
    .then(data => {
      return data.rows;
    });
};

// mark a block as completed by its ID
const completeBlock = (storyBlockID) => {

  const query = `
  UPDATE story_blocks
  SET completed = TRUE
  WHERE story_blocks.id = $1;
  `;

  const params = [storyBlockID];

  return db.query(query, params)
    .then(data => {
      return data.rows;
    });
};

// this creates a new story block using a storyID
const newStoryBlock = (storyID) => {

  const query = `
  INSERT INTO
  story_blocks (story_id)
  VALUES
  ($1);
  `;

  const params = [storyID];

  return db.query(query, params)
    .then(data => {
      return data.rows;
    });
};

const endStory = (storyID) => {

  const query = `
  UPDATE stories
  SET completed = TRUE
  WHERE stories.id = $1;
  `;

  const params = [storyID];

  return db.query(query, params)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getStoryInfo, winningEntry, completeBlock, newStoryBlock, endStory };
