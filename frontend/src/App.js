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

	const nextUser = () => {
		console.log("HERE");
		setGotUser(false);
	};

	return (
		<div className="App">
			<Appbar />
			{gotUser ? (
				<Subreddits
					userHistory={userHistory}
					redditUser={redditUser}
					nextUser={nextUser}
				/>
			) : (
				<GetUsername updateUserHistory={updateUserHistory} />
			)}
		</div>
	);
}

export default App;
