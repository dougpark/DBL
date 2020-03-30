function newTimerColor() {
    var s = document.getElementById("newTimerImage");
    //s.setAttribute("stroke", "0000FF");
    //s.style.stroke = '#0000ff';
    //s.setAttribute("stroke", "blue");
    //s.style.stroke = "blue";

    var svgDoc = s.contentDocument;
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
        hour: preferences.newHour,
        minute: preferences.newMinute,
        second: preferences.newSecond,
        message: preferences.newMessage,
        chime: preferences.newChime
    })

}

async function setNewChime() {
    let newChime = document.getElementById("newChime").value;
    preferences.newChime = newChime;
    DSsaveDBLPreferences();
}

async function setNewMessage() {
    let newMessage = document.getElementById("newMessage").value;
    preferences.newMessage = newMessage;
    DSsaveDBLPreferences();
}

function IsNumeric(val) {
    return Number(val) == val;
}

async function setNewHour() {
    let val = document.getElementById("newHour").value;
    if (val < 0) val = 0;
    if (val > 24) val = 24;
    if (!IsNumeric(val)) val = 0;

    preferences.newHour = val;
    document.getElementById("newHour").value = preferences.newHour;
    DSsaveDBLPreferences();
}

async function setNewMinute() {
    let val = document.getElementById("newMinute").value;
    if (val < 0) val = 0;
    if (val > 59) val = 59;
    if (!IsNumeric(val)) val = 0;
    preferences.newMinute = val;
    document.getElementById("newMinute").value = preferences.newMinute;
    DSsaveDBLPreferences();
}

async function setNewSecond() {
    let val = document.getElementById("newSecond").value;
    if (val < 0) val = 0;
    if (val > 59) val = 59;
    if (!IsNumeric(val)) val = 30;
    preferences.newSecond = val;
    document.getElementById("newSecond").value = preferences.newSecond;
    DSsaveDBLPreferences();
}