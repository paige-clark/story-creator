const express = require('express');
const router  = express.Router();
const myStoriesQueries = require('../db/queries/my_stories');

router.get('/', (req, res) => {
  myStoriesQueries.getUserStories().then(data => {
    const templateVars = { stories: data };
    return res.render('my_stories', templateVars);
  })
});

router.post('/:id/delete', (req, res) => {
  myStoriesQueries.deleteUserStory(req.params.id);
  return res.redirect('/my-stories');
});

module.exports = router;
