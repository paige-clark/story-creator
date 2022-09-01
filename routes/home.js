const express = require('express');
const router  = express.Router();
const homeQueries = require('../db/queries/home');

router.get('/', (req, res) => {
  homeQueries.getStories().then(data => {
    const templateVars = { stories: data };
    res.render('home', templateVars);
  })
});

module.exports = router;
