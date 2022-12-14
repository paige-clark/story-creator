const db = require('../connection');

const getStoryInfo = (storyID) => {
  const query = `
  SELECT stories.id AS story_id,
         stories.title AS story_title,
         stories.initial_story,
         stories.completed AS story_completion_status,
         stories.user_id AS story_creator,
         story_blocks.id AS story_block_id,
         story_blocks.completed AS block_completed,
         story_entries.id AS entry_id,
         story_entries.story_block_id AS entry_block,
         story_entries.entry_text,
         story_entries.selected AS winning_entry,
         story_entries.upvote_counter
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

const postEntry = (blockID, entryText) => {

  const query = `
  INSERT INTO
  story_entries (user_id, story_block_id, entry_text)
  VALUES
  (1, $1, $2);
  `;

  const params = [blockID, entryText];

  return db.query(query, params)
    .then(data => {
      return data.rows;
    });
};

// refactor this by only getting the story entries for the required block
const likeEntry = (entryID) => {

  const query = `
  UPDATE story_entries
  SET upvote_counter = upvote_counter + 1
  WHERE story_entries.id = $1
  RETURNING upvote_counter;

  `;

  // WITH story_id AS
  //   (
  //   INSERT INTO stories (user_id, title, initial_story) VALUES ('1', $1, $2) RETURNING id
  //   )
  //   INSERT INTO story_blocks (story_id)
  //     SELECT story_id.id
  //     FROM story_id

  const params = [entryID];

  return db.query(query, params)
    .then(data => {
      return data.rows;
    });

};




module.exports = { getStoryInfo, winningEntry, completeBlock, newStoryBlock, endStory, postEntry, likeEntry };
