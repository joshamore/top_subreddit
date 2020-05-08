import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import MUIDataTable from "mui-datatables";

export default function SubredditTable({ userHistory }) {
	// TODO update with actual searched username
	const USERNAME = "Bob";

	const columns = [
		{
			name: "Subreddit",
			label: "Subreddit",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: "Score",
			label: "Score",
			options: {
				filter: true,
				sort: true,
			},
		},
	];

	const data = [];

	for (let i = 0; i < userHistory[0].length; i++) {
		let dataItem = [userHistory[0][i], userHistory[1][i]];
		data.push(dataItem);
	}

	const options = {
		filterType: "checkbox",
		print: false,
		responsive: "scrollFullHeight",
	};

	return (
		<React.Fragment>
			<Container maxWidth={false}>
				<MUIDataTable
					title={`Top Subbreddits for ${USERNAME}`}
					data={data}
					columns={columns}
					options={options}
				/>
			</Container>
		</React.Fragment>
	);
}
