// Getting form element
let form;

document.addEventListener("DOMContentLoaded", () => {
    form = document.getElementById("redditData");
});

// AJAX call for data
function getData() {
    // Storing input data
    const redditUsername = document.getElementById("redditUsername").value;
    
    // Updating HTML to remove button
    document.getElementById("redditData").innerHTML = '<p class="text-center">Reddit data coming....</p>';

    const xhr = new XMLHttpRequest();

    // Setup listener to process completed requests
    xhr.onload = () => {
        // Process returned data
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('success!', xhr);   
            dataRender(xhr.response);
        } else {
            console.log('The request failed!');
        }
    };

    // Sending form data to server.
    xhr.open('POST', 'http://localhost:5000/api/data');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ redditUsername: redditUsername }));
}

// Renders data
function dataRender(redditData) {
    const cleanedData = cleanData(JSON.parse(redditData));

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

// Once DOM loaded, add listener to get data based on click
document.addEventListener("DOMContentLoaded", () => {
    //  When form submitted, prevent page reload and trigger get data
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        getData();
    });
});


