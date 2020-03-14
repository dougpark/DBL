function toggleCountDown() {

    if (document.getElementById("countDownBox").style.visibility == "hidden") {
        document.getElementById("scheduledBox").style.visibility = "hidden";
        document.getElementById("preferencesBox").style.visibility = "hidden";
        document.getElementById("countDownBox").style.visibility = "visible";
        document.getElementById("newTimerBox").style.visibility = "hidden";
    } else {
        document.getElementById("scheduledBox").style.visibility = "visible";
        document.getElementById("countDownBox").style.visibility = "hidden";
    }
}

function showCountDownButton() {
    toggleCountDown();
}