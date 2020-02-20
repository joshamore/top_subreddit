'use strict'

const express = require('express');
const path = require('path');
const snoowrap = require('snoowrap');
require('dotenv').config()

// Authorising reddit script
const reddit = new snoowrap({
    userAgent: process.env.R_USER_AGENT,
    clientId: process.env.R_CLIENT_ID,
    clientSecret: process.env.R_SECRET,
    username: process.env.R_USERNAME,
    password: process.env.R_PASSWORD
});

// Creates express app
const app = express();

// Serves static files
app.use(express.static('static'))

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/static/index.html'))
});

// data route
app.get('/data', (req, res) => {
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

    res.json(userRedditData);
  }); 
});

// Uses port from environment or 500 if none.
const PORT = process.env.PORT || 5000;
// Starts server
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));



