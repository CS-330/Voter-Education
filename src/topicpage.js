var data;

function loadJSON(callback) {
    /* Source: https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript */

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'https://cs-330.github.io/Voter-Education/data.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

function init(topicName) {
    loadJSON(function(response) {
        // Parse JSON string into object
        data = JSON.parse(response);
        console.log(data);

        console.log(topicName);
        loadInfo(data, topicName);
    });
}

function loadCandidate(topicName, candidate, data) {
    console.log(topicName, candidate);
    var candidateWrapper = document.getElementById(candidate);
    candidateWrapper.getElementsByClassName('stanceBar')[0].value = data["candidates"][candidate]['stances'][topicName];
}

function loadInfo(data, topicName) {
    topic = data["topics"][topicName];
    document.getElementById('profilePic').setAttribute("src", topic["image"])
    document.getElementById('profilePic').setAttribute("alt", topic["name"] + " Profile Picture");

    document.getElementById('topic').innerHTML = topic["name"];

    for (var candidate of Object.keys(data["candidates"])) {
        loadCandidate(topicName, candidate, data);
    }
}