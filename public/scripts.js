// AJAX call for data
function getData() {
    // Storing input data
    const redditUsername = document.getElementById("redditUsername").value;
    
    // Updating HTML to remove button
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

// Renders data
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


