// load the reminders from the .json file
function loadReminders() {

    let requestURL = './reminders.json';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        reminders = request.response;

        if (isEmptyObject(reminders)) {
            reminders = [];
        }

        // check if timer info on URL and add to list
        getURLTimer();

        // if debug mode then add 5 second timer
        if (debug == true) {
            addTimer({
                second: 5,
                message: "Debug"
            });

            //console.log('just added a 5 second debug timer. reminders= ')
            //console.log(reminders);
        }
    }

}


// determine when to sound reminder
// put your custom reminders in the reminders.json file
function actionReminders() {

    var d = new Date();
    var nhour = d.getHours(),
        nmin = d.getMinutes(),
        nsec = d.getSeconds();

    if (nmin <= 9) nmin = "0" + nmin
    if (nsec <= 9) nsec = "0" + nsec


    // nice format for the spoken time
    var dhour = nhour;
    if (dhour > 12) {
        dhour = nhour - 12;
    }
    let time = dhour + ":" + nmin;


    // loop through all the reminders and take action
    reminders.forEach(checkReminder);

    function checkReminder(reminder, index) {
        //console.log(reminder.hour, reminder.minute, reminder.second, reminder.message);
        if (reminder.complete == true) {

        } else {
            if (nhour == reminder.hour && nmin == reminder.minute && nsec == reminder.second) {
                //console.log(reminder.hour, reminder.minute, reminder.second, reminder.message);

                reminders[index].complete = true;

                if (reminder.type == "speak") {
                    sayTime(time, reminder.message);
                } else if (reminder.type == "chime") {
                    //playChime(time, reminder.chime);
                } else if (reminder.type == "both") {
                    //playChime(time, reminder.chime);
                    //sayTime(time, reminder.message);
                }
            }
        }
    }


}

// many times a second process each reminder and take action when ready
function updateReminders() {

    if (reminders == undefined) {
        //console.log('reminders file not loaded')
        return
    }

    // sort the reminders, they could be in any order in the .json file
    // found this sort algorithm on stackoverflow
    reminders = sortByAttribute(reminders, 'sortBy')

    // check if action should be taken on a reminder or timer
    actionReminders();

    // if reminder < now then reschedule for tomorrow
    calcTomorrow();

    // calcs remaining time for all reminders
    calcTimeToAction();

    // debug code to display all reminders
    displayStatus();

    // displays the status of the next reminder that is due
    displaynextAlarm();

    // reset the complete flag so tomorrows reminders will work
    resetCompleteFlag();


}



function resetCompleteFlag() {
    // loop through reminders to determine which ones are tomorrow
    // reset the complete flag to false so it will be active tomorrow
    for (var index = 0; index < reminders.length; index++) {
        var shour = reminders[index].hour;
        var smin = reminders[index].minute;
        var ssec = reminders[index].second;

        // use built in date functions for comparison
        var nowDate = new Date();
        var nextDate = new Date();

        // give it 2 secs before reseting complete flag 
        nextDate.setHours(shour, smin, ssec + 2, 0);
        if (nextDate < nowDate) {
            reminders[index].complete = false;
        }

    }

}

function calcTomorrow() {
    // loop through reminders to determine which ones are tomorrow
    // update sortDate based on current date and time
    // if reminder time is less then now then it is for tomorrow
    for (var index = 0; index < reminders.length; index++) {
        var shour = reminders[index].hour;
        var smin = reminders[index].minute;
        var ssec = reminders[index].second;

        // use built in date functions for comparison
        var nowDate = new Date();
        var nextDate = new Date();

        // if less than now then reminder is for tomorrow
        nextDate.setHours(shour, smin, ssec, 0);
        if (nextDate < nowDate) {
            nextDate.setDate(nextDate.getDate() + 1) // add 1 day

        }
        // set the sortBy based on if date should be tomorrow
        reminders[index].sortBy = nextDate;

    }

}

function clearDisplayNextAlarm() {
    var table = document.getElementById("nextAlarmTable");
    table.rows[1].cells[0].innerHTML = "";
    table.rows[1].cells[1].innerHTML = "No Timers";
    table.rows[1].cells[2].innerHTML = "";
}

function displaynextAlarm() {
    if (reminders[0].disp_nextDiff == undefined) return;

    // find the next reminder after the current time from the sorted list
    var nextIndex = 0;
    var nowDate = new Date();
    var nextDate = new Date();

    for (var index = 0; index < reminders.length; index++) {
        nextDate = reminders[index].sortBy;
        // with sorted dates, the first nextDate > now is the next reminder
        if (nextDate > nowDate) {
            nextIndex = index;
            break;
        }
    }

    // insert into table
    var table = document.getElementById("nextAlarmTable");
    table.rows[1].cells[0].innerHTML = reminders[index].disp_nextDiff;
    table.rows[1].cells[1].innerHTML = reminders[index].disp_nextMsg;
    table.rows[1].cells[2].innerHTML = reminders[index].disp_nextRem;

}

// calculates time to alarm for all reminders and timers
function calcTimeToAction() {
    var nowDate = new Date();
    var nextDate = new Date();
    for (var index = 0; index < reminders.length; index++) {
        nextDate = reminders[index].sortBy;

        // https://www.w3schools.com/howto/howto_js_countdown.asp
        // calc the amount of time till next reminder
        var distance = nextDate - nowDate;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000) + 1; // off by 1

        // pretty format for minutes and seconds
        if (hours <= 9) {
            hours = "0" + hours;
        }
        if (minutes <= 9) {
            minutes = "0" + minutes;
        }
        if (seconds <= 9) {
            seconds = "0" + seconds;
        }
        var nextDiff = hours + ":" +
            minutes + ":" + seconds;

        // pretty format for minutes and seconds
        var hoursRem = reminders[index].hour;
        var minutesRem = reminders[index].minute;
        var secondsRem = reminders[index].second;

        if (hoursRem <= 9) {
            hoursRem = "0" + hoursRem;
        }
        if (minutesRem <= 9) {
            minutesRem = "0" + minutesRem;
        }
        if (secondsRem <= 9) {
            secondsRem = "0" + secondsRem;
        }

        var nextReminder = "";
        var nextRemTime = hoursRem + ":" +
            minutesRem + ":" + secondsRem;

        var nextMsg = reminders[index].message;

        var nextAlarm = nextDiff + " - " + nextMsg;

        var kind = reminders[index].kind;
        //if (kind == undefined || kind == "reminder") {
        nextReminder = "@ " + nextRemTime;
        //}

        // set display atribute here
        reminders[index].display = nextAlarm;
        reminders[index].disp_nextDiff = nextDiff;
        reminders[index].disp_nextMsg = nextMsg;
        reminders[index].disp_nextRem = nextReminder;
        reminders[index].displayRow = "<tr> <td>" + nextDiff +
            "</td><td>" + nextMsg + "</td><td>" + nextReminder + "</td></tr>";

    }
}

// debug code to display all reminders and timers
function displayStatus() {
    // debug code to show list of reminders
    var disp_status = "<table class=p-list>";
    var colGroup = "<colgroup> <col class='colw'><col class='colw2'><col> </colgroup>";
    //var headers = "<th>Remaining</th><th>Message</th> <th>@ Time</th>"
    disp_status += colGroup; // + headers;
    for (var index = 0; index < reminders.length; index++) {
        if (index > 0 && index < 20) {
            disp_status = disp_status + reminders[index].displayRow;
        }
    }
    disp_status += "</table>";
    document.getElementById('scheduled').innerHTML = disp_status;
}