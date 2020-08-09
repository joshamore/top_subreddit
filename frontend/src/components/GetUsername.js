import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { FormGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Spinner from "./Spinner";
import Container from "@material-ui/core/Container";
import AlertError from "./AlertError";

export default function GetUsername({ updateUserHistory }) {
	const useStyles = makeStyles((theme) => ({
		container: {
			display: "flex",
			flexWrap: "wrap",
		},
		textField: {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			width: 200,
		},
		formGroup: {
			alignItems: "center",
		},
		qHeading: {
			textAlign: "center",
		},
	}));
	const classes = useStyles();

	// Declaring state hooks
	const [gettingSubreddits, setGettingSubreddits] = useState(false);
	const [redditUser, setRedditUser] = useState("");
	const [redditError, setRedditError] = useState("");

	// Getting subreddits for a user
	const getSubreddits = (redditUser) => {
		// Setting flag
		setGettingSubreddits(true);

		// Fetch call options
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ redditUsername: redditUser }),
		};
		// Getting reddit user data
		fetch("https://topsubreddit.herokuapp.com/api/data", options)
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw Error("Unable to get reddit user");
				}
			})
			.then((redditData) => {
				setGettingSubreddits(false);
				updateUserHistory(compileSubreddits(redditData), redditUser);
			})
			.catch((err) => {
				setGettingSubreddits(false);
				setRedditError(err.message);
			});
	};

	// Compiles subreddits into an array (0 index = subreddit name and 1 index = score)
	const compileSubreddits = (redditData) => {
		let cleanedData = [[], []];
		// Adds each subreddit and score to clanedData object (consolidating each subreddit with a single score)
		for (let i = 0; i < redditData.subreddits.length; i++) {
			const check = cleanedData[0].indexOf(redditData.subreddits[i]);

			if (check === -1) {
				cleanedData[0].push(redditData.subreddits[i]);
				cleanedData[1].push(redditData.scores[i]);
			} else {
				cleanedData[1][check] += redditData.scores[i];
			}
		}
		return cleanedData;
	};

	return (
		<React.Fragment>
			{gettingSubreddits ? (
				<Spinner />
			) : (
				<React.Fragment>
					{redditError ? (
						<Container maxWidth="sm">
							<AlertError errorMessage={redditError} />
						</Container>
					) : (
						<div></div>
					)}
					<h1 className={classes.qHeading}>Enter a Reddit username</h1>
					<div className={classes.container}>
						<Grid item xs={12}>
							<Grid item xs={12}>
								<FormGroup
									className={classes.formGroup}
									noValidate
									autoComplete="on"
								>
									<TextField
										id="outlined-basic"
										label="Reddit Username"
										value={redditUser}
										onChange={(e) => setRedditUser(e.target.value)}
										variant="outlined"
									/>
									<br />
									<Button
										variant="contained"
										color="primary"
										onClick={() => {
											getSubreddits(redditUser);
										}}
									>
										Get Top Subreddits
									</Button>
								</FormGroup>
							</Grid>
						</Grid>
					</div>
				</React.Fragment>
			)}
		</React.Fragment>
	);
}
