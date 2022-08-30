const db = require('../connection');

const getStoryInfo = (storyID) => {
  const query = `
  SELECT stories.title AS story_title,
         stories.initial_story,
         story_blocks.*
  FROM stories
  JOIN story_blocks
    ON stories.id = story_blocks.story_id
  WHERE stories.id = $1
  ;`;

  const params = [storyID];

  return db.query(query, params)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getStoryInfo };
