const express = require('express');
const router  = express.Router();
const storyQueries = require('../db/queries/story');

router.get('/:id', (req, res) => {
  storyQueries.getStoryInfo(req.params.id).then(data => {
    const templateVars = { story: data };
    return res.render('story', templateVars);
  })

});

router.post('/:id/:block_id/select-winner', async (req, res) => {

  if (req.body.completion === 'false') {

    await Promise.all([storyQueries.winningEntry(req.body.entry), storyQueries.completeBlock(req.params.block_id), storyQueries.newStoryBlock(req.params.id)])
    return res.redirect(`/story/${req.params.id}`);

    // return storyQueries.winningEntry(req.body.entry).then(data => {
    //   storyQueries.completeBlock(req.params.block_id);
    // }).then(data => {
    //   storyQueries.newStoryBlock(req.params.id);
    // }).then(data => {
    //   return res.redirect(`/story/${req.params.id}`);
    // });

  }

  if (req.body.completion === 'true') {
    await Promise.all([storyQueries.winningEntry(req.body.entry), storyQueries.completeBlock(req.params.block_id), storyQueries.endStory(req.params.id)])
    return res.redirect(`/story/${req.params.id}`);
  }
});

router.get('/:id/:block_id/entry', (req, res) => {
  storyQueries.getStoryInfo(req.params.id).then(data => {
    const templateVars = { story: data };
    return res.render('story_entry', templateVars);
  })
});

router.post('/:id/:block_id/entry/post', (req, res) => {
  storyQueries.postEntry(req.params.block_id, req.body.entry).then(data => {
    return res.redirect(`/story/${req.params.id}`);
  });
});

router.post('/:entry_id/like', (req, res) => {
  return storyQueries.likeEntry(req.params.entry_id).then(counter => {
    return res.send(counter[0]);
  });


});

module.exports = router;
