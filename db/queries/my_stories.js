const db = require('../connection');

const getUserStories = () => {
  const query = `
  SELECT *
  FROM stories
  WHERE user_id = 1
  ORDER BY published_at DESC
  ;`;
  return db.query(query)
    .then(data => {
      return data.rows;
    });
};

const deleteUserStory = (storyID) => {
  const query = `
  DELETE
  FROM stories
  WHERE stories.id = $1
  ;`;
  return db.query(query, [storyID])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUserStories, deleteUserStory };
