import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function AboutDialog({ afterClose }) {
	const [open, setOpen] = React.useState(true);

	const handleClose = () => {
		setOpen(false);
		afterClose(false);
	};

	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">
					{"What is TopSubreddit.tech?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						<strong>
							This app allows you to find the top subreddits for a particular
							Reddit user.{" "}
						</strong>
					</DialogContentText>
					<DialogContentText id="alert-dialog-slide-description">
						{" "}
						Enter a Reddit username, click Get Top Subreddits, and receive a
						sortable table containing the subreddits where that user has
						received upvotes.
					</DialogContentText>
					<DialogContentText id="alert-dialog-slide-description">
						{" "}
						<em>
							Created by <a href="https://joshamore.com">Josh Amore</a>.
						</em>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Sounds good{" "}
						<span role="img" aria-label="Thumbs up emoji">
							👍
						</span>
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
