function togglePreferences() {

    if (document.getElementById("preferencesBox").style.visibility == "hidden") {
        document.getElementById("scheduledBox").style.visibility = "hidden";
        document.getElementById("newTimerBox").style.visibility = "hidden";
        document.getElementById("countDownBox").style.visibility = "hidden";
        document.getElementById("preferencesBox").style.visibility = "visible";
    } else {
        document.getElementById("scheduledBox").style.visibility = "visible";
        document.getElementById("preferencesBox").style.visibility = "hidden";
    }
}

function preferencesButton() {
    togglePreferences();
}

function createDefaultPreferences() {

    preferences = {
        "clock12": true,
        "defaultChime": 2,
        "defaultMessage": "Timer Complete",
        "defaultView": 0

    };

    DSsaveDBLPreferences();
    updateElements();

}

// update UI elements based on loaded preferences
function updateElements() {
    document.getElementById("clock12").checked = preferences.clock12;
    document.getElementById("defaultChime").value = preferences.defaultChime;

}



async function changeClock12() {

    let clock12 = document.getElementById("clock12").checked;
    preferences.clock12 = clock12;
    DSsaveDBLPreferences();
};

async function changeDefaultChime() {

    let defaultChime = document.getElementById("defaultChime").value;
    preferences.defaultChime = defaultChime;
    DSsaveDBLPreferences();

};