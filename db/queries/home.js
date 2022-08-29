const db = require('../connection');

const getStories = () => {
  return db.query('SELECT * FROM stories LIMIT 10;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getStories };
