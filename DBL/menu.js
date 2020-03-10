function toggleAdd() {

    if (document.getElementById("addBox").style.visibility == "hidden") {
        document.getElementById("upcomingBox").style.visibility = "hidden";
        document.getElementById("settingsBox").style.visibility = "hidden";
        document.getElementById("addBox").style.visibility = "visible";
    } else {
        document.getElementById("upcomingBox").style.visibility = "visible";
        document.getElementById("addBox").style.visibility = "hidden";
    }
}

function menuButton() {
    toggleAdd();
}

function menuColor() {
    var s = document.getElementById("menuImage");
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
    //document.getElementById("menuImage").src = svgDoc.replace('#000', '#f00');
}