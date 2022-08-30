const db = require('../connection');

const getStoryInfo = (storyID) => {
  const query = `
  SELECT *
  FROM stories
  WHERE stories.id = $1
  ;`;

  const params = [storyID];

  return db.query(query, params)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getStoryInfo };
