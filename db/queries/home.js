const db = require('../connection');

const getStories = () => {
  return db.query('SELECT * FROM stories ORDER BY published_at DESC LIMIT 12;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getStories };
