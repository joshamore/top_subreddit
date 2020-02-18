'use strict'

const express = require('express');
const snoowrap = require('snoowrap');

require('dotenv').config()

const reddit = new snoowrap({
    userAgent: process.env.R_USER_AGENT,
    clientId: process.env.R_CLIENT_ID,
    clientSecret: process.env.R_SECRET,
    username: process.env.R_USERNAME,
    password: process.env.R_PASSWORD
  });

console.log(reddit.getUser('joshamoreyo'));