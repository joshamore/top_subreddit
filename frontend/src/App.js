import React, { useState } from "react";
import "./App.css";
import Appbar from "./components/Appbar";
import GetUsername from "./components/GetUsername";
import Subreddits from "./components/Subreddits";

function App() {
	// declaring state hooks
	const [userHistory, setUserHistory] = useState([]);
	const [redditUser, setRedditUser] = useState("");
	const [gotUser, setGotUser] = useState(false);

	const updateUserHistory = (history, user) => {
		setUserHistory(history);
		setRedditUser(user);
		setGotUser(true);
	};

	return (
		<div className="App">
			<Appbar />
			{gotUser ? (
				<Subreddits userHistory={userHistory} redditUser={redditUser} />
			) : (
				<GetUsername updateUserHistory={updateUserHistory} />
			)}
		</div>
	);
}

export default App;
