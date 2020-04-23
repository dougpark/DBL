// function setDefaultPreferences() {

//     preferences = {
//         "clock12": true,
//         "defaultColor": 0,
//         "defaultChime": "marimba",
//         "defaultMessage": "Timer Complete",
//         "defaultView": 0,
//         "newChime": "marimba",
//         "newMessage": "Timer Complete",
//         "newHour": 0,
//         "newMinute": 0,
//         "newSecond": 5,
//         "speakCountDown": false

//     };

//     dsPref.save(preferences);
//     updateElements();

// }

function loadPreferences() {
    dsPref = new DataStore({
        safari: safari,
        key: 'DBLPreferences',
        uuid: 'DC7BA45E-EB3E-4EBE-82BF-DD396003BA28',

    })

    dsPref.load(preferences);
}

function checkDefaults() {

    let needToSave = false;
    let defaultPreferences = {
        "clock12": true,
        "defaultColor": 0,
        "defaultChime": "marimba",
        "defaultTab": "countDownBoxB",
        "defaultMessage": "Timer Complete",
        "defaultView": 0,
        "newChime": "marimba",
        "newMessage": "Timer Complete",
        "newHour": 0,
        "newMinute": 0,
        "newSecond": 6,
        "speakCountDown": false

    };

    Object.keys(defaultPreferences).forEach((key) => {
        //console.log(key + ' -> ' + defaultPreferences[key]);
        checkIt(key);
    });

    function checkIt(key) {
        if (preferences[key] == undefined) {
            preferences[key] = defaultPreferences[key];
            //console.log(key + " : " + preferences[key])
            needToSave = true;
        }
    }

    if (needToSave) {
        dsPref.save(preferences);
    }

}

// update UI elements based on loaded preferences
function updateElements() {
    checkDefaults();
    const e1 = <HTMLInputElement>document.getElementById("clock12");
    e1.checked = preferences.clock12;

    const e2 = <HTMLInputElement>document.getElementById("defaultChime")
    e2.value = preferences.defaultChime;

    const e3 = <HTMLInputElement>document.getElementById("defaultTab")
    e3.value = preferences.defaultTab;

    const e4 = <HTMLInputElement>document.getElementById("defaultMessage")
    e4.value = preferences.defaultMessage;

    //document.getElementById("speakCountDown").checked = preferences.speakCountDown;

    const e5 = <HTMLInputElement>document.getElementById("speakCountDown");
    e5.checked = preferences.speakCountDown;

    const e6 = <HTMLInputElement>document.getElementById("newChime")
    e6.value = preferences.newChime;

    const e7 = <HTMLInputElement>document.getElementById("newMessage")
    e7.value = preferences.newMessage;

    const e8 = <HTMLInputElement>document.getElementById("newHour")
    e8.value = preferences.newHour;

    const e9 = <HTMLInputElement>document.getElementById("newMinute")
    e9.value = preferences.newMinute;

    const e10 = <HTMLInputElement>document.getElementById("newSecond")
    e10.value = preferences.newSecond;

    setColor(preferences.defaultColor);
    // set the intial view
    document.getElementById(preferences.defaultTab.toString()).click();
}


async function setSpeakCountDown() {

    let speak = <HTMLInputElement>document.getElementById("speakCountDown");
    preferences.speakCountDown = speak.checked;
    dsPref.save(preferences);
};

async function setClock12() {

    let clock12 = <HTMLInputElement>document.getElementById("clock12");
    preferences.clock12 = clock12.checked;
    dsPref.save(preferences);
};

async function setDefaultChime() {

    let defaultChime = <HTMLInputElement>document.getElementById("defaultChime");
    preferences.defaultChime = defaultChime.value;
    dsPref.save(preferences);

};

async function setDefaultTab() {

    let defaultTab = <HTMLInputElement>document.getElementById("defaultTab");
    preferences.defaultTab = defaultTab.value;
    dsPref.save(preferences);

};

async function setDefaultMessage() {

    let defaultMessage = <HTMLInputElement>document.getElementById("defaultMessage");
    preferences.defaultMessage = defaultMessage.value;
    dsPref.save(preferences);

};