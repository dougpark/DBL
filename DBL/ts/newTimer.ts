function newTimerColor() {
    var s = document.getElementById("newTimerImage");
    //s.setAttribute("stroke", "0000FF");
    //s.style.stroke = '#0000ff';
    //s.setAttribute("stroke", "blue");
    //s.style.stroke = "blue";

    var svgDoc = s.ownerDocument;
    // Get one of the SVG items by ID;
    var svgItem = svgDoc.getElementById("line");
    // Set the colour to something else
    //svgDoc.style.stroke = "blue";
    svgItem.setAttributeNS(null, "stroke", "0000FF");
    //.setAttributeNS(null, 'y', y + 10);
    //document.getElementById("newTimerImage").src = svgDoc.replace('#000', '#f00');
}

function setNewTimer() {
    newTimerButton({
        hour: Number(preferences.newHour),
        minute: Number(preferences.newMinute),
        second: Number(preferences.newSecond),
        message: preferences.newMessage,
        chime: preferences.newChime
    })

    showTimerTab();



}

async function setNewChime() {
    let newChime = <HTMLInputElement>document.getElementById("newChime");
    preferences.newChime = newChime.value;
    dsPref.save(preferences);
}

async function setNewMessage() {
    let newMessage = <HTMLInputElement>document.getElementById("newMessage");
    preferences.newMessage = newMessage.value;
    dsPref.save(preferences);
}

function IsNumeric(val) {
    return Number(val) == val;
}

async function setNewHour() {
    let e = <HTMLInputElement>document.getElementById("newHour");
    let val = Number(e.value);
    if (!IsNumeric(val)) val = 0;
    if (val < 0) val = 0;
    if (val > 23) val = 23;

    preferences.newHour = val.toString();
    e.value = preferences.newHour;
    dsPref.save(preferences);
}

async function setNewMinute() {
    let e = <HTMLInputElement>document.getElementById("newMinute");
    let val = Number(e.value);
    if (!IsNumeric(val)) val = 0;
    if (val < 0) val = 0;
    if (val > 59) val = 59;
    preferences.newMinute = val.toString();
    e.value = preferences.newMinute;
    dsPref.save(preferences);
}

async function setNewSecond() {
    let e = <HTMLInputElement>document.getElementById("newSecond");
    let val = Number(e.value);
    if (!IsNumeric(val)) val = 0;
    if (val < 0) val = 0;
    //if (val > 59) val = 59;
    preferences.newSecond = val.toString();
    e.value = preferences.newSecond;
    dsPref.save(preferences);
}