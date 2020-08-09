import React, { useState, useEffect } from "react";
import "./App.css";
import Appbar from "./components/Appbar";
import GetUsername from "./components/GetUsername";
import Subreddits from "./components/Subreddits";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#880E4F",
		},
		secondary: {
			main: "#0E8847",
		},
	},
});

function App() {
	// declaring state hooks
	const [userHistory, setUserHistory] = useState([]);
	const [redditUser, setRedditUser] = useState("");
	const [gotUser, setGotUser] = useState(false);

	// Pinging heroku to warmup server on pageload
	useEffect(() => {
		fetch("https://topsubreddit.herokuapp.com/api/ping")
			.then((res) => console.log("ping"))
			.catch((e) => console.log(e));
	}, []);

	const updateUserHistory = (history, user) => {
		setUserHistory(history);
		setRedditUser(user);
		setGotUser(true);
	};

	const nextUser = () => {
		setGotUser(false);
	};

	if (gotUser) {
		return (
			<MuiThemeProvider theme={theme}>
				<div className="App">
					<Appbar />
					<Subreddits
						userHistory={userHistory}
						redditUser={redditUser}
						nextUser={nextUser}
					/>
				</div>
			</MuiThemeProvider>
		);
	} else if (!gotUser) {
		return (
			<MuiThemeProvider theme={theme}>
				<div className="App">
					<Appbar />
					<div>
						<GetUsername updateUserHistory={updateUserHistory} />
					</div>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
