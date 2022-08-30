const express = require('express');
const router  = express.Router();
const storyQueries = require('../db/queries/story');

router.get('/:id', (req, res) => {
  storyQueries.getStoryInfo(req.params.id).then(data => {
    const templateVars = { story: data };
    return res.render('story', templateVars);
  })

  // console.log(req.params.id);
  // res.render('story');
});

module.exports = router;
