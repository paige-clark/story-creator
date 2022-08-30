const express = require('express');
const router  = express.Router();
const createNewStoryQuery = require('../db/queries/create');

router.get('/', (req, res) => {
  res.render('create');
});

router.post('/new', (req, res) => {
  // console.log(req.body);
  createNewStoryQuery.newStory(req.body.title, req.body.story);
  return res.redirect('/my-stories');
});

module.exports = router;
