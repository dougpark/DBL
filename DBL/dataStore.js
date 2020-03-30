// load preference values from dataStore
function DSloadDBLPreferences() {
    // if running in Safari
    if (safari == true) {
        SafariloadDBLPreferences();

    } else { // running in BTT
        //BTTloadDBLPreferences(); // load from BTT variable
        BTTloadDBLPreferencesFromTrigger(); // load from trigger
    }
}

// save preferences to dataStore
function DSsaveDBLPreferences() {
    // if running in Safari
    if (safari == true) {
        SafarisaveDBLPreferences();
    } else { // running in BTT
        //BTTsaveDBLPreferences(); // save to BTT variable
        BTTsaveDBLPreferencesToTrigger(); // save to trigger
    }
}


// load preferences from BTT Trigger
async function BTTloadDBLPreferencesFromTrigger() {

    // get the trigger details from BTT
    let triggerJSONString = await callBTT('get_trigger', {
        uuid: 'DC7BA45E-EB3E-4EBE-82BF-DD396003BA28'
    })

    // get the needed element
    let result = JSON.parse(triggerJSONString).BTTInlineAppleScript;

    // strange, have to parse again to get a usable js object
    let result2 = JSON.parse(result);

    // load preferences object
    preferences = result2;

    // update UI elements
    updateElements();

};

// load prefs from Safari local storage
function SafariloadDBLPreferences() {
    preferences = JSON.parse(
        localStorage.getItem("DBLPrefString"));
    updateElements();
}


// load preference from BTT string variable
async function BTTloadDBLPreferences() {
    let result = await callBTT('get_string_variable', {
        variable_name: 'DBLPrefString'
    });
    // debug this, see if it works
    // if BTT save preferences don't exit
    if (result == null) {
        createDefaultPreferences();
    } else {
        // convert string text to javascript object for global preferences
        preferences = JSON.parse(result);
        // update UI elements based on loaded preferences
        updateElements();
    };

}

// save preferences to BTT Trigger
async function BTTsaveDBLPreferencesToTrigger() {

    // tell BTT where to put the stringified object
    let updateDefinition = {
        "BTTInlineAppleScript": JSON.stringify(preferences)
    }

    // update the trigger details with my JSON object embeded in the applescript element!
    callBTT('update_trigger', {
        uuid: 'DC7BA45E-EB3E-4EBE-82BF-DD396003BA28',
        json: JSON.stringify(updateDefinition)
    });

};

function SafarisaveDBLPreferences() {
    localStorage.setItem("DBLPrefString", JSON.stringify(preferences));
}

// save preference values to BTT string variable
async function BTTsaveDBLPreferences() {
    let text = JSON.stringify(preferences);
    callBTT('set_persistent_string_variable', {
        variable_name: 'DBLPrefString',
        to: text
    });

}



// just a test
async function test2() {

    let triggerJSONString = await callBTT('get_trigger', {
        uuid: 'DC7BA45E-EB3E-4EBE-82BF-DD396003BA28'
    })
    let settingsresult = JSON.parse(triggerJSONString).BTTTriggerConfig.BTTHUDDetailText;
    let obj = JSON.parse(settingsresult);
    console.log(obj);
    console.log(obj[0].hour);

    // let removeq = settingsresult.slice(1, -1)
    // let firstp = removeq.split(":", 2).join(":") + ":"
    // let secondp = "," + removeq.split_with_tail(',', 3)[2]
    // let settingsnew = '\"' + firstp + selected + secondp + '\"'

    //"BTTGestureNotes": JSON.stringify(preferences),
    let updateDefinition = {
        "BTTTriggerConfig": {
            "BTTHUDDetailText": JSON.stringify(reminders)
        }
    }

    callBTT('update_trigger', {
        uuid: 'DC7BA45E-EB3E-4EBE-82BF-DD396003BA28',
        json: JSON.stringify(updateDefinition)
    });
    //console.log(updateDefinition);

};



/*

[{
    "BTTTriggerType": 643,
    "BTTTriggerTypeDescription": "Named Trigger: DBL Settings",
    "BTTTriggerClass": "BTTTriggerTypeOtherTriggers",
    "BTTPredefinedActionType": 172,
    "BTTPredefinedActionName": "Run Apple Script (blocking)",
    "BTTInlineAppleScript": "[{\"sortBy\":\"2020-03-12T11:45:00.000Z\",\"hour\":9,\"minute\":45,\"second\":0,\"type\":\"speak\",\"message\":\"Time for breakfast.\",\"chime\":\"\",\"display\":\"08:36:26 - Time for breakfast.\",\"disp_nextDiff\":\"08:36:26\",\"disp_nextMsg\":\"Time for breakfast.\",\"disp_nextRem\":\"@ 06:45:00\",\"displayRow\":\"<tr> <td>08:36:26<\/td><td>Time for breakfast.<\/td><td>@ 06:45:00<\/td><\/tr>\",\"complete\":false,\"kind\":\"reminder\"},{\"sortBy\":\"2020-03-12T11:58:00.000Z\",\"hour\":6,\"minute\":58,\"second\":0,\"type\":\"speak\",\"message\":\"Time for backscratch.\",\"chime\":\"\",\"display\":\"08:49:26 - Time for backscratch.\",\"disp_nextDiff\":\"08:49:26\",\"disp_nextMsg\":\"Time for backscratch.\",\"disp_nextRem\":\"@ 06:58:00\",\"displayRow\":\"<tr> <td>08:49:26<\/td><td>Time for backscratch.<\/td><td>@ 06:58:00<\/td><\/tr>\",\"complete\":false,\"kind\":\"reminder\"},{\"sortBy\":\"2020-03-12T12:00:00.000Z\",\"hour\":7,\"minute\":0,\"second\":0,\"type\":\"speak\",\"message\":\"Time to get ready.\",\"chime\":\"\",\"display\":\"08:51:26 - Time to get ready.\",\"disp_nextDiff\":\"08:51:26\",\"disp_nextMsg\":\"Time to get ready.\",\"disp_nextRem\":\"@ 07:00:00\",\"displayRow\":\"<tr> <td>08:51:26<\/td><td>Time to get ready.<\/td><td>@ 07:00:00<\/td><\/tr>\",\"complete\":false,\"kind\":\"reminder\"},{\"sortBy\":\"2020-03-12T12:02:00.000Z\",\"hour\":7,\"minute\":2,\"second\":0,\"type\":\"speak\",\"message\":\"Don't be late.\",\"chime\":\"\",\"display\":\"08:53:26 - Don't be late.\",\"disp_nextDiff\":\"08:53:26\",\"disp_nextMsg\":\"Don't be late.\",\"disp_nextRem\":\"@ 07:02:00\",\"displayRow\":\"<tr> <td>08:53:26<\/td><td>Don't be late.<\/td><td>@ 07:02:00<\/td><\/tr>\",\"complete\":false,\"kind\":\"reminder\"},{\"sortBy\":\"2020-03-12T12:03:00.000Z\",\"hour\":7,\"minute\":3,\"second\":0,\"type\":\"speak\",\"message\":\"Get going. It's time to move.\",\"chime\":\"\",\"display\":\"08:54:26 - Get going. It's time to move.\",\"disp_nextDiff\":\"08:54:26\",\"disp_nextMsg\":\"Get going. It's time to move.\",\"disp_nextRem\":\"@ 07:03:00\",\"displayRow\":\"<tr> <td>08:54:26<\/td><td>Get going. It's time to move.<\/td><td>@ 07:03:00<\/td><\/tr>\",\"complete\":false,\"kind\":\"reminder\"},{\"sortBy\":\"2020-03-12T12:20:00.000Z\",\"hour\":7,\"minute\":20,\"second\":0,\"type\":\"speak\",\"message\":\"Get in the car, I'm leaving!\",\"chime\":\"\",\"display\":\"09:11:26 - Get in the car, I'm leaving!\",\"disp_nextDiff\":\"09:11:26\",\"disp_nextMsg\":\"Get in the car, I'm leaving!\",\"disp_nextRem\":\"@ 07:20:00\",\"displayRow\":\"<tr> <td>09:11:26<\/td><td>Get in the car, I'm leaving!<\/td><td>@ 07:20:00<\/td><\/tr>\",\"complete\":false,\"kind\":\"reminder\"},{\"sortBy\":\"2020-03-13T03:00:00.000Z\",\"hour\":22,\"minute\":0,\"second\":0,\"type\":\"speak\",\"message\":\"Time for bed.\",\"chime\":\"\",\"display\":\"23:51:26 - Time for bed.\",\"disp_nextDiff\":\"23:51:26\",\"disp_nextMsg\":\"Time for bed.\",\"disp_nextRem\":\"@ 22:00:00\",\"displayRow\":\"<tr> <td>23:51:26<\/td><td>Time for bed.<\/td><td>@ 22:00:00<\/td><\/tr>\",\"complete\":false,\"kind\":\"reminder\"}]",
    "BTTTriggerName": "DBL Settings",
    "BTTEnabled2": 1,
    "BTTAlternateModifierKeys": 0,
    "BTTRepeatDelay": 0,
    "BTTUUID": "DC7BA45E-EB3E-4EBE-82BF-DD396003BA28",
    "BTTNotesInsteadOfDescription": 0,
    "BTTEnabled": 1,
    "BTTModifierMode": 0,
    "BTTOrder": 2,
    "BTTDisplayOrder": 0,
    "BTTTriggerConfig": {
        "BTTHUDDetailText": "[{\"sortBy\":\"2020-03-12T03:00:00.000Z\",\"hour\":22,\"minute\":0,\"second\":0,\"type\":\"speak\",\"message\":\"Time for bed.\",\"chime\":\"\",\"display\":\"00:00:34 - Time for bed.\",\"disp_nextDiff\":\"00:00:34\",\"disp_nextMsg\":\"Time for bed.\",\"disp_nextRem\":\"@ 22:00:00\",\"displayRow\":\"<tr> <td>00:00:34<\/td><td>Time for bed.<\/td><td>@ 22:00:00<\/td><\/tr>\",\"kind\":\"reminder\"},{\"sortBy\":\"2020-03-12T11:45:00.000Z\",\"hour\":6,\"minute\":45,\"second\":0,\"type\":\"speak\",\"message\":\"Time for breakfast.\",\"chime\":\"\",\"display\":\"08:45:34 - Time for breakfast.\",\"disp_nextDiff\":\"08:45:34\",\"disp_nextMsg\":\"Time for breakfast.\",\"disp_nextRem\":\"@ 06:45:00\",\"displayRow\":\"<tr> <td>08:45:34<\/td><td>Time for breakfast.<\/td><td>@ 06:45:00<\/td><\/tr>\",\"complete\":false,\"kind\":\"reminder\"},{\"sortBy\":\"2020-03-12T11:58:00.000Z\",\"hour\":6,\"minute\":58,\"second\":0,\"type\":\"speak\",\"message\":\"Time for backscratch.\",\"chime\":\"\",\"display\":\"08:58:34 - Time for backscratch.\",\"disp_nextDiff\":\"08:58:34\",\"disp_nextMsg\":\"Time for backscratch.\",\"disp_nextRem\":\"@ 06:58:00\",\"displayRow\":\"<tr> <td>08:58:34<\/td><td>Time for backscratch.<\/td><td>@ 06:58:00<\/td><\/tr>\",\"complete\":false,\"kind\":\"reminder\"},{\"sortBy\":\"2020-03-12T12:00:00.000Z\",\"hour\":7,\"minute\":0,\"second\":0,\"type\":\"speak\",\"message\":\"Time to get ready.\",\"chime\":\"\",\"display\":\"09:00:34 - Time to get ready.\",\"disp_nextDiff\":\"09:00:34\",\"disp_nextMsg\":\"Time to get ready.\",\"disp_nextRem\":\"@ 07:00:00\",\"displayRow\":\"<tr> <td>09:00:34<\/td><td>Time to get ready.<\/td><td>@ 07:00:00<\/td><\/tr>\",\"complete\":false,\"kind\":\"reminder\"},{\"sortBy\":\"2020-03-12T12:02:00.000Z\",\"hour\":7,\"minute\":2,\"second\":0,\"type\":\"speak\",\"message\":\"Don't be late.\",\"chime\":\"\",\"display\":\"09:02:34 - Don't be late.\",\"disp_nextDiff\":\"09:02:34\",\"disp_nextMsg\":\"Don't be late.\",\"disp_nextRem\":\"@ 07:02:00\",\"displayRow\":\"<tr> <td>09:02:34<\/td><td>Don't be late.<\/td><td>@ 07:02:00<\/td><\/tr>\",\"complete\":false,\"kind\":\"reminder\"},{\"sortBy\":\"2020-03-12T12:03:00.000Z\",\"hour\":7,\"minute\":3,\"second\":0,\"type\":\"speak\",\"message\":\"Get going. It's time to move.\",\"chime\":\"\",\"display\":\"09:03:34 - Get going. It's time to move.\",\"disp_nextDiff\":\"09:03:34\",\"disp_nextMsg\":\"Get going. It's time to move.\",\"disp_nextRem\":\"@ 07:03:00\",\"displayRow\":\"<tr> <td>09:03:34<\/td><td>Get going. It's time to move.<\/td><td>@ 07:03:00<\/td><\/tr>\",\"complete\":false,\"kind\":\"reminder\"},{\"sortBy\":\"2020-03-12T12:20:00.000Z\",\"hour\":7,\"minute\":20,\"second\":0,\"type\":\"speak\",\"message\":\"Get in the car, I'm leaving!\",\"chime\":\"\",\"display\":\"09:20:34 - Get in the car, I'm leaving!\",\"disp_nextDiff\":\"09:20:34\",\"disp_nextMsg\":\"Get in the car, I'm leaving!\",\"disp_nextRem\":\"@ 07:20:00\",\"displayRow\":\"<tr> <td>09:20:34<\/td><td>Get in the car, I'm leaving!<\/td><td>@ 07:20:00<\/td><\/tr>\",\"complete\":false,\"kind\":\"reminder\"}]"
    }
}]




[{
    "BTTTriggerType": 643,
    "BTTTriggerTypeDescription": "Named Trigger: DBL Settings",
    "BTTTriggerClass": "BTTTriggerTypeOtherTriggers",
    "BTTPredefinedActionType": 172,
    "BTTPredefinedActionName": "Run Apple Script (blocking)",
    "BTTInlineAppleScript": "[{'hello':'There'}]",
    "BTTTriggerName": "DBL Settings",
    "BTTEnabled2": 1,
    "BTTAlternateModifierKeys": 0,
    "BTTRepeatDelay": 0,
    "BTTUUID": "DC7BA45E-EB3E-4EBE-82BF-DD396003BA28",
    "BTTNotesInsteadOfDescription": 0,
    "BTTEnabled": 1,
    "BTTModifierMode": 0,
    "BTTOrder": 2,
    "BTTDisplayOrder": 0,
    "BTTTriggerConfig": {
        "BTTHUDDetailText": "[{\"sortBy\":\"2020-03-12T03:00:00.000Z\",\"hour\":22,\"minute\":0,\"second\":0,\"type\":\"speak\",\"message\":\"Time for bed.\",\"chime\":\"\",\"display\":\"00:00:34 - Time for bed.\",\"disp_nextDiff\":\"00:00:34\",\"disp_nextMsg\":\"Time for bed.\",\"disp_nextRem\":\"@ 22:00:00\",\"displayRow\":\"<tr> <td>00:00:34<\/td><td>Time for bed.<\/td><td>@ 22:00:00<\/td><\/tr>\",\"kind\":\"reminder\"},{\"sortBy\":\"2020-03-12T11:45:00.000Z\",\"hour\":6,\"minute\":45,\"second\":0,\"type\":\"speak\",\"message\":\"Time for breakfast.\",\"chime\":\"\",\"display\":\"08:45:34 - Time for breakfast.\",\"disp_nextDiff\":\"08:45:34\",\"disp_nextMsg\":\"Time for breakfast.\",\"disp_nextRem\":\"@ 06:45:00\",\"displayRow\":\"<tr> <td>08:45:34<\/td><td>Time for breakfast.<\/td><td>@ 06:45:00<\/td><\/tr>\",\"complete\":false,\"kind\":\"reminder\"},{\"sortBy\":\"2020-03-12T11:58:00.000Z\",\"hour\":6,\"minute\":58,\"second\":0,\"type\":\"speak\",\"message\":\"Time for backscratch.\",\"chime\":\"\",\"display\":\"08:58:34 - Time for backscratch.\",\"disp_nextDiff\":\"08:58:34\",\"disp_nextMsg\":\"Time for backscratch.\",\"disp_nextRem\":\"@ 06:58:00\",\"displayRow\":\"<tr> <td>08:58:34<\/td><td>Time for backscratch.<\/td><td>@ 06:58:00<\/td><\/tr>\",\"complete\":false,\"kind\":\"reminder\"},{\"sortBy\":\"2020-03-12T12:00:00.000Z\",\"hour\":7,\"minute\":0,\"second\":0,\"type\":\"speak\",\"message\":\"Time to get ready.\",\"chime\":\"\",\"display\":\"09:00:34 - Time to get ready.\",\"disp_nextDiff\":\"09:00:34\",\"disp_nextMsg\":\"Time to get ready.\",\"disp_nextRem\":\"@ 07:00:00\",\"displayRow\":\"<tr> <td>09:00:34<\/td><td>Time to get ready.<\/td><td>@ 07:00:00<\/td><\/tr>\",\"complete\":false,\"kind\":\"reminder\"},{\"sortBy\":\"2020-03-12T12:02:00.000Z\",\"hour\":7,\"minute\":2,\"second\":0,\"type\":\"speak\",\"message\":\"Don't be late.\",\"chime\":\"\",\"display\":\"09:02:34 - Don't be late.\",\"disp_nextDiff\":\"09:02:34\",\"disp_nextMsg\":\"Don't be late.\",\"disp_nextRem\":\"@ 07:02:00\",\"displayRow\":\"<tr> <td>09:02:34<\/td><td>Don't be late.<\/td><td>@ 07:02:00<\/td><\/tr>\",\"complete\":false,\"kind\":\"reminder\"},{\"sortBy\":\"2020-03-12T12:03:00.000Z\",\"hour\":7,\"minute\":3,\"second\":0,\"type\":\"speak\",\"message\":\"Get going. It's time to move.\",\"chime\":\"\",\"display\":\"09:03:34 - Get going. It's time to move.\",\"disp_nextDiff\":\"09:03:34\",\"disp_nextMsg\":\"Get going. It's time to move.\",\"disp_nextRem\":\"@ 07:03:00\",\"displayRow\":\"<tr> <td>09:03:34<\/td><td>Get going. It's time to move.<\/td><td>@ 07:03:00<\/td><\/tr>\",\"complete\":false,\"kind\":\"reminder\"},{\"sortBy\":\"2020-03-12T12:20:00.000Z\",\"hour\":7,\"minute\":20,\"second\":0,\"type\":\"speak\",\"message\":\"Get in the car, I'm leaving!\",\"chime\":\"\",\"display\":\"09:20:34 - Get in the car, I'm leaving!\",\"disp_nextDiff\":\"09:20:34\",\"disp_nextMsg\":\"Get in the car, I'm leaving!\",\"disp_nextRem\":\"@ 07:20:00\",\"displayRow\":\"<tr> <td>09:20:34<\/td><td>Get in the car, I'm leaving!<\/td><td>@ 07:20:00<\/td><\/tr>\",\"complete\":false,\"kind\":\"reminder\"}]"
    }
}]

*/





/*
[{
    "BTTTriggerType": 643,
    "BTTTriggerTypeDescription": "Named Trigger: DBL Settings",
    "BTTTriggerClass": "BTTTriggerTypeOtherTriggers",
    "BTTPredefinedActionType": -1,
    "BTTPredefinedActionName": "No Action",
    "BTTTriggerName": "DBL Settings",
    "BTTEnabled2": 1,
    "BTTAlternateModifierKeys": 0,
    "BTTRepeatDelay": 0,
    "BTTUUID": "DC7BA45E-EB3E-4EBE-82BF-DD396003BA28",
    "BTTNotesInsteadOfDescription": 0,
    "BTTEnabled": 1,
    "BTTModifierMode": 0,
    "BTTOrder": 2,
    "BTTDisplayOrder": 0,
    "BTTTriggerConfig": {
        "BTTHUDDetailText": "{\"clock12\":false,\"defaultChime\":\"marimba\"}"
    }
}]


[{
    "BTTGestureNotes": "{\"clock12\":true,\"defaultChime\":\"marimba\"}",
    "BTTTriggerType": 643,
    "BTTTriggerTypeDescription": "Named Trigger: DBL Settings",
    "BTTTriggerClass": "BTTTriggerTypeOtherTriggers",
    "BTTPredefinedActionType": -1,
    "BTTPredefinedActionName": "No Action",
    "BTTTriggerName": "DBL Settings",
    "BTTEnabled2": 1,
    "BTTAlternateModifierKeys": 0,
    "BTTRepeatDelay": 0,
    "BTTUUID": "DC7BA45E-EB3E-4EBE-82BF-DD396003BA28",
    "BTTNotesInsteadOfDescription": 0,
    "BTTEnabled": 1,
    "BTTModifierMode": 0,
    "BTTOrder": 2,
    "BTTDisplayOrder": 0,
    "BTTTriggerConfig": {
        "BTTHUDDetailText": "{\"myohmy\":\"this is it\"}"
    }
}]


[{
    "BTTGestureNotes": "{\"clock12\":true,\"defaultChime\":\"marimba\"}",
    "BTTTriggerType": 643,
    "BTTTriggerTypeDescription": "Named Trigger: DBL Settings",
    "BTTTriggerClass": "BTTTriggerTypeOtherTriggers",
    "BTTPredefinedActionType": -1,
    "BTTPredefinedActionName": "No Action",
    "BTTTriggerName": "DBL Settings",
    "BTTEnabled2": 1,
    "BTTAlternateModifierKeys": 0,
    "BTTRepeatDelay": 0,
    "BTTUUID": "DC7BA45E-EB3E-4EBE-82BF-DD396003BA28",
    "BTTNotesInsteadOfDescription": 0,
    "BTTEnabled": 1,
    "BTTModifierMode": 0,
    "BTTOrder": 2,
    "BTTDisplayOrder": 0,
    "BTTTriggerConfig": {
        "BTTHUDDetailText": "{\"myohmy\":\"this is it\"}",
        "BTTShowHUD": 1
    }
}]



[{
    "BTTGestureNotes": "{\"clock12\":true,\"defaultChime\":\"marimba\"}",
    "BTTTriggerType": 643,
    "BTTTriggerTypeDescription": "Named Trigger: DBL Settings",
    "BTTTriggerClass": "BTTTriggerTypeOtherTriggers",
    "BTTPredefinedActionType": -1,
    "BTTPredefinedActionName": "No Action",
    "BTTTriggerName": "DBL Settings",
    "BTTEnabled2": 1,
    "BTTAlternateModifierKeys": 0,
    "BTTRepeatDelay": 0,
    "BTTUUID": "DC7BA45E-EB3E-4EBE-82BF-DD396003BA28",
    "BTTNotesInsteadOfDescription": 0,
    "BTTEnabled": 1,
    "BTTModifierMode": 0,
    "BTTOrder": 2,
    "BTTDisplayOrder": 0,
    "BTTTriggerConfig": {
        "BTTHUDDetailText": "{\"myohmy\":\"this is it\"}",
        "BTTShowHUD": 1
    }
}]



[{
    "BTTGestureNotes": "{\"clock12\":true,\"defaultChime\":\"marimba\"}",
    "BTTTriggerType": 643,
    "BTTTriggerTypeDescription": "Named Trigger: DBL Settings",
    "BTTTriggerClass": "BTTTriggerTypeOtherTriggers",
    "BTTPredefinedActionType": 281,
    "BTTPredefinedActionName": "Run Real JavaScript",
    "BTTTriggerName": "DBL Settings",
    "BTTEnabled2": 1,
    "BTTAlternateModifierKeys": 0,
    "BTTRepeatDelay": 0,
    "BTTUUID": "DC7BA45E-EB3E-4EBE-82BF-DD396003BA28",
    "BTTNotesInsteadOfDescription": 0,
    "BTTEnabled": 1,
    "BTTModifierMode": 0,
    "BTTOrder": 2,
    "BTTDisplayOrder": 0
}]

[{
    "BTTGestureNotes": "{\"clock12\":true,\"defaultChime\":\"marimba\"}",
    "BTTTriggerType": 643,
    "BTTTriggerTypeDescription": "Named Trigger: DBL Settings",
    "BTTTriggerClass": "BTTTriggerTypeOtherTriggers",
    "BTTPredefinedActionType": 281,
    "BTTPredefinedActionName": "Run Real JavaScript",
    "BTTTriggerName": "DBL Settings",
    "BTTEnabled2": 1,
    "BTTAlternateModifierKeys": 0,
    "BTTRepeatDelay": 0,
    "BTTUUID": "DC7BA45E-EB3E-4EBE-82BF-DD396003BA28",
    "BTTNotesInsteadOfDescription": 0,
    "BTTEnabled": 1,
    "BTTModifierMode": 0,
    "BTTOrder": 2,
    "BTTDisplayOrder": 0
}]

[{
    "BTTGestureNotes": "{\"clock12\":true,\"defaultChime\":\"marimba\"}",
    "BTTTriggerType": 643,
    "BTTTriggerTypeDescription": "Named Trigger: DBL Settings",
    "BTTTriggerClass": "BTTTriggerTypeOtherTriggers",
    "BTTPredefinedActionType": 172,
    "BTTPredefinedActionName": "Run Apple Script (blocking)",
    "BTTInlineAppleScript": "[{'hello':'There'}]",
    "BTTTriggerName": "DBL Settings",
    "BTTEnabled2": 1,
    "BTTAlternateModifierKeys": 0,
    "BTTRepeatDelay": 0,
    "BTTUUID": "DC7BA45E-EB3E-4EBE-82BF-DD396003BA28",
    "BTTNotesInsteadOfDescription": 0,
    "BTTEnabled": 1,
    "BTTModifierMode": 0,
    "BTTOrder": 2,
    "BTTDisplayOrder": 0
}]




[{
    "BTTGestureNotes": "[{\"sortBy\":\"2020-03-12T03:00:00.000Z\",\"hour\":22,\"minute\":0,\"second\":0,\"type\":\"speak\",\"message\":\"Time for bed.\",\"chime\":\"\",\"display\":\"00:50:37 - Time for bed.\",\"disp_nextDiff\":\"00:50:37\",\"disp_nextMsg\":\"Time for bed.\",\"disp_nextRem\":\"@ 22:00:00\",\"displayRow\":\"<tr> <td>00:50:37<\/td><td>Time for bed.<\/td><td>@ 22:00:00<\/td><\/tr>\",\"kind\":\"reminder\"},{\"sortBy\":\"2020-03-12T11:45:00.000Z\",\"hour\":6,\"minute\":45,\"second\":0,\"type\":\"speak\",\"message\":\"Time for breakfast.\",\"chime\":\"\",\"display\":\"09:35:37 - Time for breakfast.\",\"disp_nextDiff\":\"09:35:37\",\"disp_nextMsg\":\"Time for breakfast.\",\"disp_nextRem\":\"@ 06:45:00\",\"displayRow\":\"<tr> <td>09:35:37<\/td><td>Time for breakfast.<\/td><td>@ 06:45:00<\/td><\/tr>\",\"complete\":false,\"kind\":\"reminder\"},{\"sortBy\":\"2020-03-12T11:58:00.000Z\",\"hour\":6,\"minute\":58,\"second\":0,\"type\":\"speak\",\"message\":\"Time for backscratch.\",\"chime\":\"\",\"display\":\"09:48:37 - Time for backscratch.\",\"disp_nextDiff\":\"09:48:37\",\"disp_nextMsg\":\"Time for backscratch.\",\"disp_nextRem\":\"@ 06:58:00\",\"displayRow\":\"<tr> <td>09:48:37<\/td><td>Time for backscratch.<\/td><td>@ 06:58:00<\/td><\/tr>\",\"complete\":false,\"kind\":\"reminder\"},{\"sortBy\":\"2020-03-12T12:00:00.000Z\",\"hour\":7,\"minute\":0,\"second\":0,\"type\":\"speak\",\"message\":\"Time to get ready.\",\"chime\":\"\",\"display\":\"09:50:37 - Time to get ready.\",\"disp_nextDiff\":\"09:50:37\",\"disp_nextMsg\":\"Time to get ready.\",\"disp_nextRem\":\"@ 07:00:00\",\"displayRow\":\"<tr> <td>09:50:37<\/td><td>Time to get ready.<\/td><td>@ 07:00:00<\/td><\/tr>\",\"complete\":false,\"kind\":\"reminder\"},{\"sortBy\":\"2020-03-12T12:02:00.000Z\",\"hour\":7,\"minute\":2,\"second\":0,\"type\":\"speak\",\"message\":\"Don't be late.\",\"chime\":\"\",\"display\":\"09:52:37 - Don't be late.\",\"disp_nextDiff\":\"09:52:37\",\"disp_nextMsg\":\"Don't be late.\",\"disp_nextRem\":\"@ 07:02:00\",\"displayRow\":\"<tr> <td>09:52:37<\/td><td>Don't be late.<\/td><td>@ 07:02:00<\/td><\/tr>\",\"complete\":false,\"kind\":\"reminder\"},{\"sortBy\":\"2020-03-12T12:03:00.000Z\",\"hour\":7,\"minute\":3,\"second\":0,\"type\":\"speak\",\"message\":\"Get going. It's time to move.\",\"chime\":\"\",\"display\":\"09:53:37 - Get going. It's time to move.\",\"disp_nextDiff\":\"09:53:37\",\"disp_nextMsg\":\"Get going. It's time to move.\",\"disp_nextRem\":\"@ 07:03:00\",\"displayRow\":\"<tr> <td>09:53:37<\/td><td>Get going. It's time to move.<\/td><td>@ 07:03:00<\/td><\/tr>\",\"complete\":false,\"kind\":\"reminder\"},{\"sortBy\":\"2020-03-12T12:20:00.000Z\",\"hour\":7,\"minute\":20,\"second\":0,\"type\":\"speak\",\"message\":\"Get in the car, I'm leaving!\",\"chime\":\"\",\"display\":\"10:10:37 - Get in the car, I'm leaving!\",\"disp_nextDiff\":\"10:10:37\",\"disp_nextMsg\":\"Get in the car, I'm leaving!\",\"disp_nextRem\":\"@ 07:20:00\",\"displayRow\":\"<tr> <td>10:10:37<\/td><td>Get in the car, I'm leaving!<\/td><td>@ 07:20:00<\/td><\/tr>\",\"complete\":false,\"kind\":\"reminder\"}]",
    "BTTTriggerType": 643,
    "BTTTriggerTypeDescription": "Named Trigger: DBL Settings",
    "BTTTriggerClass": "BTTTriggerTypeOtherTriggers",
    "BTTPredefinedActionType": 172,
    "BTTPredefinedActionName": "Run Apple Script (blocking)",
    "BTTInlineAppleScript": "[{'hello':'There'}]",
    "BTTTriggerName": "DBL Settings",
    "BTTEnabled2": 1,
    "BTTAlternateModifierKeys": 0,
    "BTTRepeatDelay": 0,
    "BTTUUID": "DC7BA45E-EB3E-4EBE-82BF-DD396003BA28",
    "BTTNotesInsteadOfDescription": 0,
    "BTTEnabled": 1,
    "BTTModifierMode": 0,
    "BTTOrder": 2,
    "BTTDisplayOrder": 0
}]



[{
    "BTTGestureNotes": "notes go here",
    "BTTTriggerType": 643,
    "BTTTriggerTypeDescription": "Named Trigger: DBL Settings",
    "BTTTriggerClass": "BTTTriggerTypeOtherTriggers",
    "BTTPredefinedActionType": 172,
    "BTTPredefinedActionName": "Run Apple Script (blocking)",
    "BTTInlineAppleScript": "[{'hello':'There'}]",
    "BTTTriggerName": "DBL Settings",
    "BTTEnabled2": 1,
    "BTTAlternateModifierKeys": 0,
    "BTTRepeatDelay": 0,
    "BTTUUID": "DC7BA45E-EB3E-4EBE-82BF-DD396003BA28",
    "BTTNotesInsteadOfDescription": 1,
    "BTTEnabled": 1,
    "BTTModifierMode": 0,
    "BTTOrder": 2,
    "BTTDisplayOrder": 0
}]






[{
    "BTTTriggerType": 643,
    "BTTTriggerTypeDescription": "Named Trigger: DBL Settings",
    "BTTTriggerClass": "BTTTriggerTypeOtherTriggers",
    "BTTPredefinedActionType": 172,
    "BTTPredefinedActionName": "Run Apple Script (blocking)",
    "BTTInlineAppleScript": "[{'hello':'There'}]",
    "BTTTriggerName": "DBL Settings",
    "BTTEnabled2": 1,
    "BTTAlternateModifierKeys": 0,
    "BTTRepeatDelay": 0,
    "BTTUUID": "DC7BA45E-EB3E-4EBE-82BF-DD396003BA28",
    "BTTNotesInsteadOfDescription": 0,
    "BTTEnabled": 1,
    "BTTModifierMode": 0,
    "BTTOrder": 2,
    "BTTDisplayOrder": 0
}]
*/