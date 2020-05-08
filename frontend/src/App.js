import React, { useState } from "react";
import "./App.css";
import Appbar from "./components/Appbar";
import GetUsername from "./components/GetUsername";
import Subreddits from "./components/Subreddits";

function App() {
	// declaring state hooks
	const [userHistory, setUserHistory] = useState([]);
	const [gotUser, setGotUser] = useState(false);

	const updateUserHistory = (history) => {
		setUserHistory(history);
		setGotUser(true);
	};

	return (
		<div className="App">
			<Appbar />
			{gotUser ? (
				<Subreddits userHistory={userHistory} />
			) : (
				<GetUsername updateUserHistory={updateUserHistory} />
			)}
		</div>
	);
}

export default App;
