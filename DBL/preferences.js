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
    document.getElementById("defaultMessage").value = preferences.defaultMessage;

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

async function defaultMessageButton() {

    let defaultMessage = document.getElementById("defaultMessage").value;
    preferences.defaultMessage = defaultMessage;
    DSsaveDBLPreferences();

};