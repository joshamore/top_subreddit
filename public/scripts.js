// AJAX call for data
function getData() {
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

    xhr.open('POST', 'http://localhost:5000/api/data');
    xhr.send();
}

// Renders data
function dataRender(redditData) {
    const cleanedData = cleanData(JSON.parse(redditData));

    // Creates chart
    const data = {
        labels: cleanedData.subreddits,
        series: [cleanedData.scores],
    };

    new Chartist.Bar('.ct-chart', data);
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
            console.log("new");
            cleanedData.subreddits.push(redditData.subreddits[i]);
            cleanedData.scores.push(redditData.scores[i]);
        } else {
            cleanedData.scores[check] += redditData.scores[i];
            console.log("old");
        }
    }
    return cleanedData;
}

// Once DOM loaded, add listener to get data based on click
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("redditData").addEventListener("click", getData);
});
