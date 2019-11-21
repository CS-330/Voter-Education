function loadJSON(callback) {
    /* Source: https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript */

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'https://cs-330.github.io/Voter-Education/data.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

function init(candidateName) {
    loadJSON(function(response) {
        // Parse JSON string into object
        data = JSON.parse(response);
        console.log(data);

        console.log(candidateName);
        loadInfo(data, candidateName);
    });
}

function loadTopic(topic, candidate) {
    var topicWrapper = document.getElementById(topic);
    topicWrapper.getElementsByClassName('stanceBar')[0].value = candidate['stances'][topic];
}

function loadInfo(data, candidateName) {
    candidate = data[candidateName];
    document.getElementById('profilePic').setAttribute("src", candidate["image"])
    document.getElementById('profilePic').setAttribute("alt", candidate["name"] + "'s Profile Picture");

    document.getElementById('name').innerHTML = candidate['shortname'];

    for (var i = 0; i <  data['topics'].length; i++) {
        loadTopic(data['topics'][i], candidate);
    }
}