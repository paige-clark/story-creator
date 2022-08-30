const db = require('../connection');

const newStory = (title, initialStory) => {
  const query = `
  INSERT INTO
  stories (user_id, title, initial_story)
  VALUES
  (
  '1',
  $1,
  $2
  );`;

  const params = [title, initialStory];

  return db.query(query, params)
    .then(data => {
      return data.rows;
    });
};

module.exports = { newStory };


// const db = require('../connection');

// const getUsers = () => {
//   return db.query('SELECT * FROM users;')
//     .then(data => {
//       return data.rows;
//     });
// };

// module.exports = { getUsers };
