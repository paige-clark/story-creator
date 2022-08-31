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

router.post('/:id/:block_id/select-winner', (req, res) => {
  // console.log(req.params.id);
  // console.log(req.params.block_id);
  // console.log(req.body.entry);
  // console.log(req.body.completion);
  // console.log(req.body);


  if (req.body.completion === 'false') {
    console.log('continue the story')
    console.log(req.params.block_id);
    // call function to continue story
    // storyQueries.continueStory(req.params.id, req.params.block_id, req.body.entry);

    // storyQueries.winningEntry(req.body.entry)
    //   .then(storyQueries.completeBlock(req.params.block_id))
    //   .then(storyQueries.newStoryBlock(req.params.id));

    storyQueries.winningEntry(req.body.entry).then
    storyQueries.completeBlock(req.params.block_id);
    storyQueries.newStoryBlock(req.params.id);

    return res.redirect(`/story/${req.params.id}`);

  } else if (req.body.completion === 'true') {
    // call function to end story
  }


  // return res.redirect("/req.params.id")
  // storyQueries.getStoryInfo(req.params.id).then(data => {
  //   const templateVars = { story: data };
  //   return res.render('story', templateVars);
  // })

  // console.log(req.params.id);
  // res.render('story');
});

module.exports = router;
