const express = require('express');
const router  = express.Router();
const storyQueries = require('../db/queries/story');

router.get('/:id', (req, res) => {
  storyQueries.getStoryInfo(req.params.id).then(data => {
    console.log(data[data.length - 1]);
    const templateVars = { story: data };
    return res.render('story', templateVars);
  })

  // console.log(req.params.id);
  // res.render('story');
});

router.post('/:id/:block_id/select-winner', async (req, res) => {
  // console.log(req.params.id);
  // console.log(req.params.block_id);
  // console.log(req.body.entry);
  // console.log(req.body.completion);
  // console.log(req.body);


  if (req.body.completion === 'false') {
    console.log('continue the story')
    console.log(req.params.block_id);
    // call function to continue story
    // storyQueries.winningEntry(req.body.entry);
    // storyQueries.completeBlock(req.params.block_id);
    // storyQueries.newStoryBlock(req.params.id);
    // return res.redirect(`/story/${req.params.id}`);



    return storyQueries.winningEntry(req.body.entry).then(data => {
      storyQueries.completeBlock(req.params.block_id);
    }).then(data => {
      storyQueries.newStoryBlock(req.params.id);
    }).then(data => {
      return res.redirect(`/story/${req.params.id}`);
    });

  }

  if (req.body.completion === 'true') {
    console.log('the story is done!')
    // call function to end story
    // storyQueries.winningEntry(req.body.entry);
    // storyQueries.completeBlock(req.params.block_id);
    // storyQueries.endStory(req.params.id);
    // return res.redirect(`/story/${req.params.id}`);
    await Promise.all([storyQueries.winningEntry(req.body.entry), storyQueries.completeBlock(req.params.block_id), storyQueries.endStory(req.params.id)])
    return res.redirect(`/story/${req.params.id}`);
    // return storyQueries.winningEntry(req.body.entry).then(data => {
    //   storyQueries.completeBlock(req.params.block_id);
    // }).then(data => {
    //   storyQueries.endStory(req.params.id);
    // }).then(data => {
    //   return res.redirect(`/story/${req.params.id}`);
    // });
  }
});

router.get('/:id/:block_id/entry', (req, res) => {
  storyQueries.getStoryInfo(req.params.id).then(data => {
    const templateVars = { story: data };
    return res.render('story_entry', templateVars);
  })

  // console.log(req.params.id);
  // res.render('story');
});

router.post('/:id/:block_id/entry/post', (req, res) => {
  storyQueries.postEntry(req.params.block_id, req.body.entry).then(data => {
    return res.redirect(`/story/${req.params.id}`);
  });

  // console.log(req.params.id);
  // res.render('story');
});

router.post('/:entry_id/like', (req, res) => {
  return storyQueries.likeEntry(req.params.entry_id).then(counter => {
    console.log(counter);
    return res.send(counter[0]);
  });


});

module.exports = router;
