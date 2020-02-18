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

// Getting promise of specified reddit user
const person = reddit.getUser(process.env.REDDIT_PERSON);

// Getting submissions for reddit user.
person.getSubmissions({limit: 50}).then((content, fail) => {
  // Printing title of submissions and score

  const titles = [];
  const scores = [];
  
  for (let i = 0; i < content.length; i++) {
    titles.push(content[i].title);
    scores.push(content[i].score);
  }

});
