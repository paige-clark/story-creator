const db = require('../connection');

// should take an input of author ID and return the titles of the stories they've
// written. This was just a test, no functionality planned.
const getStoryAuthor = (authorID) => {
  const query =`
  SELECT users.name AS story_author,
         stories.title AS story_title
  FROM stories
  JOIN users
    ON users.id = stories.user_id
  WHERE user_id = $1
  ;`;

  const args = [ authorID ];

  return db.query(query, args)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getStoryAuthor };

/*
query to select the story title, the status of thats story's
story blocks, and the id of its story blocks
*/
/*
SELECT stories.title,
       story_blocks.completed,
       story_blocks.id AS story_block_id
FROM stories
JOIN story_blocks
  ON story_blocks.story_id = stories.id
WHERE story_blocks.story_id = 1;
*/
