function loadReminders() {
    dsRemind = new DataStore({
        safari: safari,
        key: 'DBLReminders',
        uuid: '17AFFF20-22A3-4DD4-ADFD-EF1B2631B6E2'
        //uuid: 'F1F05EB7-51AB-4F92-82D3-8E88466AF36E',
    });
    dsRemind.load(reminders);
    // load the reminders data from .json file
    //loadRemindersJson();
}
// load the reminders from the .json file
function loadRemindersJson() {
    let requestURL = '././reminders.json';
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
    };
}
// determine when to sound reminder
// put your custom reminders in the reminders.json file
function actionReminders() {
    var d = new Date();
    var nhour = d.getHours().toString(), nmin = d.getMinutes().toString(), nsec = d.getSeconds().toString();
    if (Number(nmin) <= 9)
        nmin = "0" + nmin;
    if (Number(nsec) <= 9)
        nsec = "0" + nsec;
    // nice format for the spoken time
    var dhour = nhour;
    if (Number(dhour) > 12) {
        dhour = (Number(nhour) - 12).toString();
    }
    let time = dhour + ":" + nmin;
    if (reminders.length == 0)
        return;
    // loop through all the reminders and take action
    reminders.forEach(checkReminder);
    function checkReminder(reminder, index) {
        //console.log(reminder.hour, reminder.minute, reminder.second, reminder.message);
        if (reminder.complete == true || reminder.okDelete == true) {
        }
        else {
            if (nhour == reminder.hour && nmin == reminder.minute && nsec == reminder.second) {
                //console.log(reminder.hour, reminder.minute, reminder.second, reminder.message);
                reminders[index].complete = true;
                if (reminders[index].kind == 'timer') {
                    reminders[index].okDelete = true;
                }
                // save current reminders
                dsRemind.save(reminders);
                if (reminder.type == "speak") {
                    sayTime(reminder.message, reminder.chime);
                }
                else if (reminder.type == "chime") {
                    //playChime(time, reminder.chime);
                }
                else if (reminder.type == "both") {
                    //playChime(time, reminder.chime);
                    //sayTime(reminder.message);
                }
            }
        }
    }
}
function anyReminders() {
    if (reminders == undefined)
        return false;
    if (reminders.length == 0)
        return false;
    let atLeastOne = false;
    for (var index = 0; index < reminders.length; index++) {
        let complete = reminders[index].complete;
        if (complete == false) {
            atLeastOne = true;
        }
    }
    if (atLeastOne) {
        return true;
    }
    else {
        return false;
    }
}
// many times a second process each reminder and take action when ready
function updateReminders() {
    if (!anyReminders())
        return;
    // sort the reminders, they could be in any order in the .json file
    // found this sort algorithm on stackoverflow
    reminders = sortByAttribute(reminders, 'sortBy');
    // check if action should be taken on a reminder or timer
    actionReminders();
    // if reminder < now then reschedule for tomorrow
    calcTomorrow();
    // calcs remaining time for all reminders
    calcTimeToAction();
    // debug code to display all reminders
    displayStatus();
    // displays the status of the next reminder that is due
    let index = displaynextAlarm();
    // update the countDown display
    if (index >= 0) {
        updateCountDown(index);
    }
    // reset the complete flag so tomorrows reminders will work
    resetCompleteFlag();
}
function updateCountDown(index) {
    let countDown = reminders[index].disp_countDown;
    let countDownMsg = reminders[index].disp_nextMsg;
    let sec = reminders[index].disp_secondsRem;
    document.getElementById('countDownTime').innerHTML = countDown;
    document.getElementById('countDownMsg').innerHTML = countDownMsg;
    if (preferences.speakCountDown) {
        if (sec[0] == '0') {
            sec = sec[1];
        }
        if (sec != holdSpeakSecond) {
            sayTime(sec, false);
            holdSpeakSecond = sec;
        }
    }
}
function resetCompleteFlag() {
    if (!anyReminders())
        return;
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
    if (!anyReminders())
        return;
    // loop through reminders to determine which ones are tomorrow
    // update sortDate based on current date and time
    // if reminder time is less then now then it is for tomorrow
    let updateReady = false;
    for (var index = 0; index < reminders.length; index++) {
        var kind = reminders[index].kind;
        var shour = reminders[index].hour;
        var smin = reminders[index].minute;
        var ssec = reminders[index].second;
        // use built in date functions for comparison
        var nowDate = new Date();
        var nextDate = new Date();
        // if less than now then reminder is for tomorrow
        nextDate.setHours(shour, smin, ssec, 0);
        if (nextDate < nowDate) {
            if (kind != 'timer') {
                nextDate.setDate(nextDate.getDate() + 1); // add 1 day
                updateReady = true;
            }
            else {
                reminders[index].okDelete = true;
                reminders[index].complete = true;
                updateReady = true;
            }
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
    if (!anyReminders())
        return -1;
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
    if (index < reminders.length) {
        var table = document.getElementById("nextAlarmTable");
        table.rows[1].cells[0].innerHTML = reminders[index].disp_nextDiff;
        table.rows[1].cells[1].innerHTML = reminders[index].disp_nextMsg;
        table.rows[1].cells[2].innerHTML = reminders[index].disp_nextRem;
    }
    return index;
}
// calculates time to alarm for all reminders and timers
function calcTimeToAction() {
    if (!anyReminders())
        return;
    var nowDate = new Date();
    var nextDate = new Date();
    for (var index = 0; index < reminders.length; index++) {
        nextDate = reminders[index].sortBy;
        // https://www.w3schools.com/howto/howto_js_countdown.asp
        // calc the amount of time till next reminder
        var distance = nextDate.getTime() - nowDate.getTime();
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        var hoursD = hours.toString();
        var minutesD = minutes.toString();
        var secondsD = seconds.toString();
        // pretty format for minutes and seconds
        if (hours <= 9) {
            hoursD = "0" + hours;
        }
        if (minutes <= 9) {
            minutesD = "0" + minutes;
        }
        if (seconds <= 9) {
            secondsD = "0" + seconds;
        }
        var nextDiff = hoursD + ":" +
            minutesD + ":" + secondsD;
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
        nextReminder = nextRemTime;
        //}
        let disp_countDown = "";
        if (hours > 0) {
            disp_countDown = hoursD + ":" + minutesD + ":" + secondsD;
        }
        else if (minutes > 0) {
            disp_countDown = minutesD + ":" + secondsD;
        }
        else {
            disp_countDown = minutesD + ":" + secondsD;
        }
        // set display atribute here
        reminders[index].disp_countDown = disp_countDown;
        reminders[index].disp_hourRem = hours;
        reminders[index].disp_minutesRem = minutes;
        reminders[index].disp_secondsRem = seconds;
        reminders[index].display = nextAlarm;
        reminders[index].disp_nextDiff = nextDiff;
        reminders[index].disp_nextMsg = nextMsg;
        reminders[index].disp_nextRem = nextReminder;
        reminders[index].displayRow = "<tr class=tr2> <td class=td2>" + nextDiff +
            "</td><td class=td2>" + nextMsg + "</td><td class=td2>" + nextReminder + "</td></tr>";
    }
}
// debug code to display all reminders and timers
function displayStatus() {
    if (!anyReminders())
        return;
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
//# sourceMappingURL=reminders.js.map