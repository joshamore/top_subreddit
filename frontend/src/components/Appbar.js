import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import GitHubIcon from "@material-ui/icons/GitHub";
import AboutDialog from "./AboutDialog";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

export default function ButtonAppBar() {
	const classes = useStyles();

	const [isAbout, setIsAbout] = React.useState(false);

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						Top Subreddits
					</Typography>
					<Button
						variant="contained"
						color="secondary"
						onClick={(event) => {
							setIsAbout(true);
						}}
					>
						About
					</Button>
					<Button color="inherit">
						<GitHubIcon
							onClick={(event) =>
								(window.location.href =
									"https://github.com/joshamore/top_subreddit")
							}
						/>
					</Button>
				</Toolbar>
			</AppBar>
			{isAbout ? <AboutDialog afterClose={setIsAbout} /> : ""}
		</div>
	);
}
