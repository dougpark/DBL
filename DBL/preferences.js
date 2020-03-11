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

function setDefaultPreferences() {

    preferences = {
        "clock12": true,
        "defaultChime": 0,
        "defaultMessage": "Timer Complete",
        "defaultView": 0,
        "doug": "tired"

    };

    saveDBLPreferences();

}

async function loadDBLPreferences() {

    let result = await callBTT('get_string_variable', {
        variable_name: 'DBLPrefString'
    })

    // convert string text to javascript object for global preferences
    preferences = JSON.parse(result);

    // update UI elements based on loaded preferences
    document.getElementById("clock12").checked = preferences.clock12;
    document.getElementById("defaultChime").value = preferences.defaultChime;

}

async function saveDBLPreferences() {

    let text = JSON.stringify(preferences);
    preferences = callBTT('set_persistent_string_variable', {
        variable_name: 'DBLPrefString',
        to: text
    });

}

async function changeClock12() {

    let clock12 = document.getElementById("clock12").checked;
    preferences.clock12 = clock12;
    saveDBLPreferences();

};

async function changeDefaultChime() {

    let defaultChime = document.getElementById("defaultChime").value;
    preferences.defaultChime = defaultChime;
    saveDBLPreferences();

};