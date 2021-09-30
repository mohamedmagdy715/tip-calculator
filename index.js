let tipPerPerson = 0, totalPerPerson = 0, totalTip = 0;

// results html elements
let tipPersonElement = document.getElementById("tipPerson");
let totalPersonElement = document.getElementById("totalPerson");



// follow changes in user input
let bill = document.getElementById("bill");
bill.addEventListener("input",calcTip);
let people = document.getElementById("people");
people.addEventListener("input",calcTip);

// tip% variable changed by inputs
let tip = 0;
let tips = document.getElementsByClassName("tips"); // nodeList of fixed value tips


let customTip = document.getElementById("tip");
customTip.addEventListener("input", tipCustomChoose);


document.getElementById("reset").onclick = clear;


function calcTip(e) {
    // increase opacity of reset button
    document.getElementById("reset").style.opacity = 1;
    // check if coming from fixed value tips
    e? errorHandler(e.target):null;
    // checks for error input ... must be all valid to calculate
    if(customTip.checkValidity() && bill.checkValidity()
             && people.checkValidity() && people.value != ""){
                totalTip = (tip * bill.value) /100;
                tipPerPerson = totalTip / people.value;
                totalPerPerson = (Number(bill.value) + totalTip) / people.value;
                tipPersonElement.innerHTML = round(tipPerPerson);
                totalPersonElement.innerHTML = round(totalPerPerson);
    }
}

// function to approximate to nearest two decimals
function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
}

function errorHandler(element) {
    if (element.value == "" || !element.checkValidity()){
        element.classList.remove("border-success");
        element.classList.add("border-danger");
        //show error message related to it
        document.getElementById(`${element.id}Error`).innerHTML = `${element.validationMessage}`;
        document.getElementById(`${element.id}Error`).style.visibility = "visible";
    }else{
        element.classList.remove("border-danger");
        element.classList.add("border-success");
        //hide error message related to it
        document.getElementById(`${element.id}Error`).style.visibility = "hidden";
    }
}


function tipChoose(val, caller) {
    tip = val;
    // change background of chosen value
    [...tips].forEach(tip => {
            tip.classList.remove("tips-choose")
    });
    caller.classList.add("tips-choose");
    calcTip();
}

function tipCustomChoose(e) {
    tip = e.srcElement.value;
    // clear all fixed values backgrounds
    [...tips].forEach(tip => {
            tip.classList.remove("tips-choose")
    });
    calcTip(e);
}

function clear() {
    people.value = "";
    bill.value = "";
    tip = 0;
    customTip.value = "";
    [...tips].forEach(tip => {
            tip.classList.remove("tips-choose")
    });
    tipPersonElement.innerHTML = "0.00";
    totalPersonElement.innerHTML = "0.00";

    // decrease opacity of button
    document.getElementById("reset").style.opacity = 0.5;

    // reset error handling
    errorHandler(bill);
    errorHandler(customTip);
    errorHandler(people);
    bill.classList.remove("border-success");
    bill.classList.remove("border-danger");
    customTip.classList.remove("border-success");
    customTip.classList.remove("border-danger");
    people.classList.remove("border-success");
    people.classList.remove("border-danger");
}

