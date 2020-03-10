function toggleSettings() {

    if (document.getElementById("settingsBox").style.visibility == "hidden") {
        document.getElementById("upcomingBox").style.visibility = "hidden";
        document.getElementById("addBox").style.visibility = "hidden";
        document.getElementById("settingsBox").style.visibility = "visible";
    } else {
        document.getElementById("upcomingBox").style.visibility = "visible";
        document.getElementById("settingsBox").style.visibility = "hidden";
    }
}

function settingsButton() {
    toggleSettings();
}