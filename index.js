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
person.getSubmissions().then((content, fail) => {
  // Printing title of submissions and score
  for (let i = 0; i < content.length; i++) {
    console.log(content[i].title);
    console.log(`Score: ${content[i].score}`)
  }
});
