const express = require('express');
const bodyParser = require('body-parser');
const reddit = require('../../helpers/reddit');
const router = express.Router();

// Body parser middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Home route.
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
}); 
  
// Route to get reddit data.
// NOTE: there is a username stored here for testing: process.env.REDDIT_PERSON
router.post('/data', (req, res) => {
    // Getting reddit username from request body
    const redditUsername = req.body.redditUsername;

    // Getting reddit data
    reddit.getUserHistory(redditUsername, 100).then((redditUserData) => {
        res.json(redditUserData);
    });
}); 

// Exporting module
module.exports = router;