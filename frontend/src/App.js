import React from "react";
import "./App.css";
import Appbar from "./components/Appbar";
import TextField from "@material-ui/core/TextField";

function App() {
	return (
		<div className="App">
			<Appbar />
			<h1 className="addUserHeading">Enter a Reddit username</h1>
			<form noValidate autoComplete="off">
				<TextField
					id="outlined-basic"
					label="Reddit Username"
					variant="outlined"
				/>
			</form>
		</div>
	);
}

export default App;
