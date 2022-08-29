const db = require('../connection');

const getUserStories = () => {
  const query = `
  SELECT *
  FROM stories
  WHERE user_id = 1
  ;`
  return db.query(query)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUserStories };
