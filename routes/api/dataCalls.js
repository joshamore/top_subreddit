const express = require('express');
const router = express.Router();
const snoowrap = require('snoowrap');


// Authorising reddit script
const reddit = new snoowrap({
    userAgent: process.env.R_USER_AGENT,
    clientId: process.env.R_CLIENT_ID,
    clientSecret: process.env.R_SECRET,
    username: process.env.R_USERNAME,
    password: process.env.R_PASSWORD
});

// Home route
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/index.html'))
}); 
  
// data route
router.get('/data', (req, res) => {
    // Getting promise of specified reddit user
    const person = reddit.getUser(process.env.REDDIT_PERSON);

    // Getting submissions for reddit user.
    person.getSubmissions({limit: 60}).then((content) => {
        // Printing title of submissions and score
        let userRedditData = {
            titles: [],
            subreddits: [],
            scores: []
        };

        // Pushing elements to object.
        for (let i = 0; i < content.length; i++) {
            userRedditData.titles.push(content[i].title);
            userRedditData.subreddits.push(content[i].subreddit);
            userRedditData.scores.push(content[i].score);
        }

        // Return reddit data
        res.json(userRedditData);
    }); 
});

// Exporting module
module.exports = router;