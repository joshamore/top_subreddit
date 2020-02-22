/*
    Helper functions contacting the Reddit API.
*/
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

module.exports = {
    // Gets the history of a provided reddit user. Limit must not be > 1000 (hard
    // reddit api limit). Returns a promise.
    getUserHistory: (redditUser, historyLimit) => {
        const safeLimit = historyLimit <= 1000 ? historyLimit : 1000;

        // Returning a promise which will resolve with reddit user data
        return new Promise((resolve, reject) => {
            // Getting promise of specified reddit user
            const userPromise = reddit.getUser(redditUser);
            // Getting submissions for reddit user.
            userPromise.getSubmissions({limit: safeLimit}).then((content) => {
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
                
                // Resolving promise once data has been returned.
                resolve(userRedditData);
            });
        });
    }
};