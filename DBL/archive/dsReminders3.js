// load reminders values from dataStore
function DSloadDBLReminders() {
    // if running in Safari
    if (safari == true) {
        SafariloadDBLReminders();

    } else { // running in BTT
        //BTTloadDBLReminders(); // load from BTT variable
        BTTloadDBLRemindersFromTrigger(); // load from trigger
    }
}

// save reminders to dataStore
function DSsaveDBLReminders() {
    // if running in Safari
    if (safari == true) {
        SafarisaveDBLReminders();
    } else { // running in BTT
        //BTTsaveDBLReminders(); // save to BTT variable
        BTTsaveDBLRemindersToTrigger(); // save to trigger
    }
}


// load reminders from BTT Trigger
async function BTTloadDBLRemindersFromTrigger() {

    // get the trigger details from BTT
    let triggerJSONString = await callBTT('get_trigger', {
        uuid: 'F1F05EB7-51AB-4F92-82D3-8E88466AF36E'
    })

    // get the needed element
    let result = JSON.parse(triggerJSONString).BTTInlineAppleScript;

    // strange, have to parse again to get a usable js object
    let result2 = JSON.parse(result);

    // load reminders object
    reminders = result2;

    // update UI elements
    updateElements();

};

// load reminders from Safari local storage
function SafariloadDBLReminders() {
    reminders = JSON.parse(
        localStorage.getItem("DBLReminders"));
    updateElements();
}


// load reminders from BTT string variable
async function BTTloadDBLReminders() {
    let result = await callBTT('get_string_variable', {
        variable_name: 'DBLReminders'
    });
    // debug this, see if it works
    // if BTT save reminders don't exit
    if (result == null) {
        createDefaultReminders();
    } else {
        // convert string text to javascript object for global reminders
        reminders = JSON.parse(result);
        // update UI elements based on loaded reminders
        updateElements();
    };

}

// save reminders to BTT Trigger
async function BTTsaveDBLRemindersToTrigger() {

    // tell BTT where to put the stringified object
    let updateDefinition = {
        "BTTInlineAppleScript": JSON.stringify(reminders)
    }

    // update the trigger details with my JSON object embeded in the applescript element!
    callBTT('update_trigger', {
        uuid: 'F1F05EB7-51AB-4F92-82D3-8E88466AF36E',
        json: JSON.stringify(updateDefinition)
    });

};

function SafarisaveDBLReminders() {
    localStorage.setItem("DBLReminders", JSON.stringify(reminders));
}

// save reminders values to BTT string variable
async function BTTsaveDBLReminders() {
    let text = JSON.stringify(reminders);
    callBTT('set_persistent_string_variable', {
        variable_name: 'DBLReminders',
        to: text
    });

}