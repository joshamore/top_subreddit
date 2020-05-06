import React from "react";
import "./App.css";
import Appbar from "./components/Appbar";
import GetUsername from "./components/GetUsername";

function App() {
	return (
		<div className="App">
			<Appbar />
			<GetUsername />
		</div>
	);
}

export default App;
