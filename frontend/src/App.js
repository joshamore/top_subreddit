import React, { useState } from "react";
import "./App.css";
import Appbar from "./components/Appbar";
import Spinner from "./components/Spinner";
import GetUsername from "./components/GetUsername";

function App() {
	// declaring state hooks
	const [gettingSubreddits, setGettingSubreddits] = useState(false);
	const [redditUser, setRedditUser] = useState("");

	const subredditsRequested = () => {
		setGettingSubreddits(true);
	};

	return (
		<div className="App">
			<Appbar />
			{gettingSubreddits ? (
				<Spinner />
			) : (
				<GetUsername subredditsRequested={subredditsRequested} />
			)}
		</div>
	);
}

export default App;
