const express = require('express');
const reddit = require('../../helpers/reddit');
const router = express.Router();

// Home route.
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
}); 
  
// Route to get reddit data.
router.post('/data', (req, res) => {
    reddit.getUserHistory(process.env.REDDIT_PERSON, 100).then((redditUserData) => {
        res.json(redditUserData);
    });
}); 

// Exporting module
module.exports = router;