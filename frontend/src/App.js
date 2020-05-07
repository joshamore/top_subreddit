import React, { useState } from "react";
import "./App.css";
import Appbar from "./components/Appbar";
import Spinner from "./components/Spinner";
import GetUsername from "./components/GetUsername";

function App() {
	// declaring state hooks
	const [gettingSubreddits, setGettingSubreddits] = useState(false);
	const [redditUser, setRedditUser] = useState("");
	const [userHistory, setUserHistory] = useState("");

	const subredditsRequested = () => {
		setGettingSubreddits(true);
	};

	const updateRedditUser = (user) => {
		setRedditUser(user);
	};

	return (
		<div className="App">
			<Appbar />
			{gettingSubreddits ? (
				<Spinner />
			) : (
				<GetUsername
					subredditsRequested={subredditsRequested}
					updateRedditUser={updateRedditUser}
				/>
			)}

			{redditUser ? <h1>{redditUser}</h1> : <p>Nup</p>}
		</div>
	);
}

export default App;
