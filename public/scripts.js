// AJAX call for data
function getData() {
    // Storing input data
    const redditUsername = document.getElementById("redditUsername").value;
    
    // Updating HTML to remove button
    document.getElementById("redditData").innerHTML = '<p class="text-center">Reddit data coming....</p>';
    
    // Setting fetch options
    const reqOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ redditUsername: redditUsername })
    };
    
    // Making fetch request and sending response to dataRender
    // TODO: add error checking if user is invalid
    fetch('http://localhost:5000/api/data', reqOptions)
        .then(res => res.json())
        .then(redditData => {
                dataRender(redditData);
        })
        .catch(err => console.log('ERROR: ' + err));
}

// Renders data
function dataRender(redditData) {
    const cleanedData = cleanData(redditData);

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
// Clean data
function cleanData(redditData) {
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


