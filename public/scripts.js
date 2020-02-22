// AJAX call for data
function getData() {
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
    document.getElementById("getSubData").innerHTML = redditData;
}


// Triggering call for data once page has loaded.
document.addEventListener("DOMContentLoaded", getData());
