import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SubredditTable from "./SubredditTable";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

export default function Subreddits({ userHistory, redditUser, nextUser }) {
	const useStyles = makeStyles((theme) => ({
		sHeading: {
			textAlign: "center",
		},
		nextUserButton: {
			marginTop: "10px",
		},
	}));
	const classes = useStyles();

	return (
		<React.Fragment>
			<Grid container justify="center">
				<Button
					className={classes.nextUserButton}
					variant="outlined"
					color="primary"
					onClick={() => {
						nextUser();
					}}
				>
					Search New User
				</Button>
			</Grid>
			<h1 className={classes.sHeading}>Subreddits</h1>
			<SubredditTable userHistory={userHistory} redditUser={redditUser} />
		</React.Fragment>
	);
}
