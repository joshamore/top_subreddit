import React, { useState } from "react";
import "./App.css";
import Appbar from "./components/Appbar";
import GetUsername from "./components/GetUsername";
import Subreddits from "./components/Subreddits";

function App() {
	// declaring state hooks
	const [userHistory, setUserHistory] = useState({});
	const [gotUser, setGotUser] = useState(false);

	const updateUserHistory = (history) => {
		setGotUser(true);
		setUserHistory(history);
	};

	return (
		<div className="App">
			<Appbar />
			{gotUser ? (
				<Subreddits />
			) : (
				<GetUsername updateUserHistory={updateUserHistory} />
			)}
		</div>
	);
}

export default App;
