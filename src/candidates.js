var isCompare;
var numSelected;

function init() {
    isCompare = false;
    numSelected = 0;
}

function toggleCompare() {
    isCompare = !isCompare;
    document.getElementById('compareButton').classList.toggle('clicked');
    numSelected = 0;

    var candidates = document.getElementsByClassName('candidate-wrapper');

    for (var i = 0; i < candidates.length; i++) {
        candidates[i].classList.remove('clicked');
    }
}

function selectCandidate(element) {
    if(isCompare) {
        if(element.classList.contains('clicked')) {
            element.classList.remove('clicked');
            numSelected--;
        }else if(numSelected < 2) {
            element.classList.add('clicked');
            numSelected++;
            if(numSelected == 2) {
                activativeCompare();
            }
        }else {
            alert("Only 2 candidates can be selected for comparison");
        }
    }else {
        location.href = "./" + element.id + ".html"
    }
}

window.onload = init();
