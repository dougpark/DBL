function toggleNewTimer() {

    if (document.getElementById("newTimerBox").style.visibility == "hidden") {
        document.getElementById("scheduledBox").style.visibility = "hidden";
        document.getElementById("preferencesBox").style.visibility = "hidden";
        document.getElementById("newTimerBox").style.visibility = "visible";
    } else {
        document.getElementById("scheduledBox").style.visibility = "visible";
        document.getElementById("newTimerBox").style.visibility = "hidden";
    }
}

function createTimerButton() {
    toggleNewTimer();
}

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