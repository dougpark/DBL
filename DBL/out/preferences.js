// function setDefaultPreferences() {
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    });
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
    const e1 = document.getElementById("clock12");
    e1.checked = preferences.clock12;
    const e2 = document.getElementById("defaultChime");
    e2.value = preferences.defaultChime;
    const e3 = document.getElementById("defaultTab");
    e3.value = preferences.defaultTab;
    const e4 = document.getElementById("defaultMessage");
    e4.value = preferences.defaultMessage;
    //document.getElementById("speakCountDown").checked = preferences.speakCountDown;
    const e5 = document.getElementById("speakCountDown");
    e5.checked = preferences.speakCountDown;
    const e6 = document.getElementById("newChime");
    e6.value = preferences.newChime;
    const e7 = document.getElementById("newMessage");
    e7.value = preferences.newMessage;
    const e8 = document.getElementById("newHour");
    e8.value = preferences.newHour;
    const e9 = document.getElementById("newMinute");
    e9.value = preferences.newMinute;
    const e10 = document.getElementById("newSecond");
    e10.value = preferences.newSecond;
    setColor(preferences.defaultColor);
    // set the intial view
    document.getElementById(preferences.defaultTab.toString()).click();
}
function setSpeakCountDown() {
    return __awaiter(this, void 0, void 0, function* () {
        let speak = document.getElementById("speakCountDown");
        preferences.speakCountDown = speak.checked;
        dsPref.save(preferences);
    });
}
;
function setClock12() {
    return __awaiter(this, void 0, void 0, function* () {
        let clock12 = document.getElementById("clock12");
        preferences.clock12 = clock12.checked;
        dsPref.save(preferences);
    });
}
;
function setDefaultChime() {
    return __awaiter(this, void 0, void 0, function* () {
        let defaultChime = document.getElementById("defaultChime");
        preferences.defaultChime = defaultChime.value;
        dsPref.save(preferences);
    });
}
;
function setDefaultTab() {
    return __awaiter(this, void 0, void 0, function* () {
        let defaultTab = document.getElementById("defaultTab");
        preferences.defaultTab = defaultTab.value;
        dsPref.save(preferences);
    });
}
;
function setDefaultMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        let defaultMessage = document.getElementById("defaultMessage");
        preferences.defaultMessage = defaultMessage.value;
        dsPref.save(preferences);
    });
}
;
//# sourceMappingURL=preferences.js.map