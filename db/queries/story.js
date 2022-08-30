const db = require('../connection');

const getStoryInfo = (storyID) => {
  const query = `
  SELECT stories.title AS story_title,
         stories.initial_story,
         story_entries.entry_text,
         story_blocks.completed,
         story_entries.selected AS winning_entry
  FROM stories
  JOIN story_blocks
    ON stories.id = story_blocks.story_id
  JOIN story_entries
    ON story_blocks.id = story_entries.story_block_id
  WHERE stories.id = $1
  ;`;

  const params = [storyID];

  return db.query(query, params)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getStoryInfo };
