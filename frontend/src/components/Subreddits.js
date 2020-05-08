import React from "react";

export default function Subreddits({ userHistory }) {
	console.log(userHistory);
	return (
		<React.Fragment>
			<h1>Subreddits</h1>
			<p>{userHistory}</p>
		</React.Fragment>
	);
}
