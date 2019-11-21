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

    document.getElementById('runComparisonButton').style.display = "none";
}

function selectCandidate(element) {
    if(isCompare) {
        if(element.classList.contains('clicked')) {
            document.getElementById('runComparisonButton').style.display = "none";
            element.classList.remove('clicked');
            numSelected--;
        }else if(numSelected < 2) {
            element.classList.add('clicked');
            numSelected++;
            if(numSelected == 2) {
                activateCompare();
            }
        }else {
            alert("Only 2 candidates can be selected for comparison");
        }
    }else {
        location.href = element.id + ".html"
    }
}

function activateCompare() {
    console.log("here");
    document.getElementById('runComparisonButton').style.display = "inline";
    var selected = document.getElementsByClassName('candidate-wrapper clicked');
    localStorage.setItem("candidate0", selected[0].id);
    localStorage.setItem("candidate1", selected[1].id);
}

window.onload = init();
