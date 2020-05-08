import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SubredditTable from "./SubredditTable";

export default function Subreddits({ userHistory }) {
	const useStyles = makeStyles((theme) => ({
		sHeading: {
			textAlign: "center",
		},
	}));
	const classes = useStyles();

	return (
		<React.Fragment>
			<h1 className={classes.sHeading}>Subreddits</h1>
			<SubredditTable userHistory={userHistory} />
		</React.Fragment>
	);
}
