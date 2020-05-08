import React from "react";
import Container from "@material-ui/core/Container";
import MUIDataTable from "mui-datatables";

export default function SubredditTable({ userHistory, redditUser }) {
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
			<Container maxWidth="sm">
				<MUIDataTable
					title={`Top Subbreddits for ${redditUser}`}
					data={data}
					columns={columns}
					options={options}
				/>
			</Container>
		</React.Fragment>
	);
}
