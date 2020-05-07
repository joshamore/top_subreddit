import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { FormGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export default function GetUsername({ subredditsRequested, updateRedditUser }) {
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

	const [redditUser, setRedditUser] = useState("");

	return (
		<React.Fragment>
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
									subredditsRequested();
									updateRedditUser(redditUser);
								}}
							>
								Get Top Subreddits
							</Button>
						</FormGroup>
					</Grid>
				</Grid>
			</div>
		</React.Fragment>
	);
}
