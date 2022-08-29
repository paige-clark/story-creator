const express = require('express');
const router  = express.Router();
const myStoriesQueries = require('../db/queries/my_stories');

router.get('/', (req, res) => {
  myStoriesQueries.getUserStories().then(data => {
    console.log(data);
    const templateVars = { stories: data };
    res.render('my_stories', templateVars);
  })
});

module.exports = router;
