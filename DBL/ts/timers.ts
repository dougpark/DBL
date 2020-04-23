function addTimer(timer) {

    // check for valid entries
    if (timer.hour == undefined) timer.hour = 0;
    if (timer.minute == undefined) timer.minute = 0;
    if (timer.second == undefined) timer.second = 0;
    if (timer.message == undefined) timer.message = preferences.defaultMessage;
    if (timer.chime == undefined) timer.chime = preferences.defaultChime;
    timer.sortBy = 0;
    timer.type = "speak";
    timer.kind = "timer";
    timer.complete = false;

    // add hour, min, sec to current time to set scheduled timer
    var d = new Date();
    var nhour = Number(timer.hour) + d.getHours(),
        nmin = Number(timer.minute) + d.getMinutes(),
        nsec = Number(timer.second) + d.getSeconds();

    // let Date adjust for correct hour, min, sec additions
    var nextTime = new Date();
    nextTime.setHours(nhour, nmin, nsec, 0);
    timer.hour = nextTime.getHours();
    timer.minute = nextTime.getMinutes();
    timer.second = nextTime.getSeconds();

    // add to reminders queue
    reminders.push(timer);

    // save reminders
    dsRemind.save(reminders);

    if (debug == true) {
        //var show = nhour + ":" + nmin + ":" + nsec + " " + timer.message;
        //document.getElementById("param").innerHTML = show;
        //console.log('adding new timer=')
        //console.log(timer);
    }
}

function getUrlParam(parameter, defaultvalue) {
    var urlparameter = defaultvalue;
    if (window.location.href.indexOf(parameter) > -1) {
        var url = new URL(window.location.href);
        urlparameter = url.searchParams.get(parameter);
    }
    return urlparameter;
}

function getURLTimer() {

    var hour = getUrlParam("hour", 0);
    var minute = getUrlParam("minute", 0);
    var second = getUrlParam("second", 0);
    var message = getUrlParam("message", "Done");
    var chime = getUrlParam("chime", "");

    if (hour > 0 || minute > 0 || second > 0) {
        addTimer({
            hour: hour,
            minute: minute,
            second: second,
            message: message,
            chime: chime
        });
    }

}

function updateTimers() {

    if (reminders == undefined) return;
    if (reminders.length == 0) return;

    let newArray = [];
    let needsUpdate = false;
    for (var index = 0; index < reminders.length; index++) {
        var reminder = reminders[index];

        if (reminder.kind == undefined) {
            reminder.kind = "reminder";
        }

        if ((reminder.kind == 'timer' && reminder.complete == true) ||
            (reminder.kind == 'timer' && reminder.okDelete == true) ||
            (reminder.kind == 'timer' && timerClear == true)) {
            needsUpdate = true;
            //console.log('removing timer' + reminder.message)
            //console.log(reminder)

        } else {
            newArray.push(reminder);
        }
    }
    reminders = newArray;

    // save updated reminders
    if (needsUpdate == true) {
        dsRemind.save(reminders);
    }
}


function newTimerButton({
    hour = 0,
    minute = 0,
    second = 0,
    chime = preferences.defaultChime,
    message = preferences.defaultMessage
}

) {

    //sounds.beep.play();
    playChime('beepon');
    addTimer({
        hour: hour,
        minute: minute,
        second: second,
        message: message,
        chime: chime
    });

    showTimerTab();
}