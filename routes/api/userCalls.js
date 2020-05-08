const express = require("express");
const bodyParser = require("body-parser");
const reddit = require("../../helpers/reddit");
const router = express.Router();

// Body parser middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Route to get reddit data
// NOTE: there is a username stored here for testing: process.env.REDDIT_PERSON
router.post("/data", (req, res) => {
	// Getting reddit username from request body
	const redditUsername = req.body.redditUsername;
	// Getting reddit data
	reddit
		.getUserHistory(redditUsername, 200)
		// Returning reddit user data if exists.
		.then((redditUserData) => {
			res.json(redditUserData);
		})
		// If an error is received from promise, returning 404.
		.catch((err) => {
			res.status(404).send("Reddit Username Not Found");
		});
});

// Exporting module
module.exports = router;
