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

    xhr.open('GET', 'http://localhost:5000/api/data');
    xhr.send();
}

// Renders data
function dataRender(redditData) {
    document.getElementById("redditData").innerHTML = redditData;
}


// Once DOM loaded, add listener to get data based on click
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("redditData").addEventListener("click", getData);
});
