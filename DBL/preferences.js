function togglePreferences() {

    if (document.getElementById("preferencesBox").style.visibility == "hidden") {
        document.getElementById("scheduledBox").style.visibility = "hidden";
        document.getElementById("newTimerBox").style.visibility = "hidden";
        document.getElementById("preferencesBox").style.visibility = "visible";
    } else {
        document.getElementById("scheduledBox").style.visibility = "visible";
        document.getElementById("preferencesBox").style.visibility = "hidden";
    }
}

function preferencesButton() {
    togglePreferences();
}