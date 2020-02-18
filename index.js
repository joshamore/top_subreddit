'use strict'

const express = require('express');
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

// Home route
app.get('/', (req, res) => {
  res.json("hey");
});

// Uses port from environment or 500 if none.
const PORT = process.env.PORT || 5000;
// Starts server
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));


// TESTING
// Getting promise of specified reddit user
const person = reddit.getUser(process.env.REDDIT_PERSON);

// Getting submissions for reddit user.
person.getSubmissions({limit: 50}).then((content, fail) => {
  // Printing title of submissions and score
  let titles = [];
  let scores = [];

  for (let i = 0; i < content.length; i++) {
    titles.push(content[i].title);
    scores.push(content[i].score);
  }
});
