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

function init() {
    loadJSON(function(response) {
        // Parse JSON string into object
        data = JSON.parse(response);
        console.log(data);

        candidates = [localStorage['candidate0'], localStorage['candidate1']];
        console.log(candidates);
        loadInfo(data, candidates);
    });
}

function loadTopic(topic, candidate0, candidate1) {
    var topicWrapper = document.getElementById(topic);
    topicWrapper.getElementsByClassName('compareStanceTop')[0].value = candidate0['stances'][topic];
    topicWrapper.getElementsByClassName('compareStanceBot')[0].value = candidate1['stances'][topic];
}

function loadInfo(data, candidates) {
    candidate0 = data["candidates"][candidates[0]];
    candidate1 = data["candidates"][candidates[1]];
    document.getElementById('comparePicL').setAttribute("src", candidate0["image"])
    document.getElementById('comparePicL').setAttribute("alt", candidate0["name"] + "'s Profile Picture");
    document.getElementById('comparePicR').setAttribute("src", candidate1["image"])
    document.getElementById('comparePicR').setAttribute("alt", candidate1["name"] + "'s Profile Picture");

    document.getElementById('compareNameL').innerHTML = candidate0['shortname'];
    document.getElementById('compareNameR').innerHTML = candidate1['shortname'];

    for (var topic of Object.keys(data["topics"])) {
        loadTopic(topic, candidate0, candidate1);
    }
}

window.onload = init();