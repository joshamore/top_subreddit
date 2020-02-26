// Fetching data from API
function getData() {
    // Storing user input data
    const redditUsername = document.getElementById("redditUsername").value;
    
    // Updating HTML while data being requested from backend
    document.getElementById("redditData").innerHTML = '<p class="text-center">Reddit data coming....</p>';

    // Fetch call options
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ redditUsername: redditUsername })
    }

    // Getting reddit user data
    fetch('http://localhost:5000/api/data', options)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return null;
            }
        })
        .then(redditData => dataRender(redditData))
        .catch((err) => {
            console.log('ERROR: ' + err);
            dataRender(null);
        });
}

// Renders data on view
function dataRender(redditData) {
    // If no user data, alert client
    if (redditData === null) {
        document.getElementById("redditData").innerHTML = '<h2 class="text-center">Could not find user 😢</h2><p class="text-center"><a href="http://localhost:5000/">Try someone else</a>?</p>';
    } else {
        // Compiling totals for subreddits
        const cleanedData = compileSubreddits(redditData);

        // Unhide table
        document.getElementById('dataTable').style.display = 'table';
        
        // Getting selector for the table
        let table = document.getElementById("dataTable");

        // Populating reddit data
        for (let i = 0; i < cleanedData.scores.length; i++) {
            let row = table.insertRow(1 + i)
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
        
            cell1.innerHTML = cleanedData.subreddits[i];
            cell2.innerHTML = cleanedData.scores[i];
        }

        // Sorts table
        sortTable(table);
    }
}
// Compile subreddit data into a single field
function compileSubreddits(redditData) {
    let cleanedData = {
        subreddits: [],
        scores: []
    };

    for (let i = 0; i < redditData.subreddits.length; i++) {
        const check = cleanedData.subreddits.indexOf(redditData.subreddits[i]);

        if (check === -1) {
            cleanedData.subreddits.push(redditData.subreddits[i]);
            cleanedData.scores.push(redditData.scores[i]);
        } else {
            cleanedData.scores[check] += redditData.scores[i];
        }
    }
    return cleanedData;
}

// Sorts a table (bubble sort). Agrument must be a DOM table element
function sortTable(table) {
    let rows, switching, i, x, y, shouldSwitch;

    // Sets switching to true so while loop triggers
    switching = true;

    // Make a loop that will continue until no switching has been done
    while (switching) {
        // Defaut to no switch (will be updated if a switch is made)
        switching = false;
        // Getting table rows
        rows = table.rows;
        // Loops through all table rows (except headers)
        for (i = 1; i < (rows.length - 1); i++) {
            // Updates default of shouldSwitch
            shouldSwitch = false;
            // Get the two elements you want to compare, one from current row and one from the next
            x = rows[i].getElementsByTagName("TD")[1];
            y = rows[i + 1].getElementsByTagName("TD")[1];
            // Check if the two rows should switch place (sorting in descending order)
            if (Number(x.innerHTML) < Number(y.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            // Does switch and updates switching variable to trigger another pass of loop
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }   
}

// Once DOM loaded, add listener to get data based
document.addEventListener("DOMContentLoaded", () => {
    // Getting form element after pageload
    let form = document.getElementById("redditData");
    //  When form submitted, prevent page reload and trigger get data
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        getData();
    });
});


