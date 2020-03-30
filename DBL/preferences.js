function createDefaultPreferences() {

    preferences = {
        "clock12": true,
        "defaultChime": "marimba",
        "defaultMessage": "Timer Complete",
        "defaultView": 0,
        "newChime": "marimba",
        "newMessage": "Timer Complete",
        "newHour": 0,
        "newMinute": 0,
        "newSecond": 30,

    };

    DSsaveDBLPreferences();
    updateElements();

}

// update UI elements based on loaded preferences
function updateElements() {
    document.getElementById("clock12").checked = preferences.clock12;
    document.getElementById("defaultChime").value = preferences.defaultChime;
    document.getElementById("defaultMessage").value = preferences.defaultMessage;

    document.getElementById("newChime").value = preferences.newChime;
    document.getElementById("newMessage").value = preferences.newMessage;
    document.getElementById("newHour").value = preferences.newHour;
    document.getElementById("newMinute").value = preferences.newMinute;
    document.getElementById("newSecond").value = preferences.newSecond;
}



async function setClock12() {

    let clock12 = document.getElementById("clock12").checked;
    preferences.clock12 = clock12;
    DSsaveDBLPreferences();
};

async function setDefaultChime() {

    let defaultChime = document.getElementById("defaultChime").value;
    preferences.defaultChime = defaultChime;
    DSsaveDBLPreferences();

};

async function setDefaultMessage() {

    let defaultMessage = document.getElementById("defaultMessage").value;
    preferences.defaultMessage = defaultMessage;
    DSsaveDBLPreferences();

};