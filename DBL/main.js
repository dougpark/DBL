/**************************************************************************************
 * name: Don't Be Late - DBL
 * based on: @yw4z macOS Control Center - MCC https: //community.folivora.ai/t/macos-control-center-mcc/13058
 * requires: Better Touch Tool 3.333 or later
 * @author Doug <doug@64zBit.com>
 * @site https://64zBit.com
 * @version 1.0
 * @desc Reminders so you wont be late for important events! and Timers!
 * @date February 25, 2020 - ver 1.0
 * Change log
 * Mar 4, 2020 - ver 1.1 - added URL timer, made smaller, made draggable, better fonts 
 * Mar 5, 2020 - ver 1.2 - added chimes and new timer button, fixed double announcement
 * Mar 9, 2020 - ver 1.3 - new color scheme, new timer buttons, preset timmers, New and Preference paynes
 **************************************************************************************/
"use strict"

var debug = false;

// preload UI sound effects and chimes
var sounds = {};

// list of reminders from .json file
var reminders;

// called when BTT starts the floating window
function BTTInitialize() {

};

// called when BTT is closing the floating window
function BTTWillCloseWindow() {

    closeButton();

};

// start the clock and update it every .5 seconds
function init() {

    // nice slide in from the top animation
    //document.body.classList.add("slideInDown");

    // load the reminders data from .json file
    loadReminders();

    // update the displayed clock every .1 seconds
    window.setInterval(update, 100);

    // put the first clock on the screen so there is no delay
    update(false);

    // pre load sound effects audio files
    loadSounds();

    if (debug == true) {
        debugMode();
    }

    // bug that setting these in css not working for if statements
    document.getElementById("newTimerBox").style.visibility = "hidden";
    document.getElementById("preferencesBox").style.visibility = "hidden";
}

// this is called by an interval timer to keep it up to date
function update() {

    // check for next alarm
    updateReminders();

    // update the on screen time display
    updateTime();

    // update the on screen date display
    updateDate();

    // remove completed timers
    updateTimers();

    if (debug == true) {
        debugMode();
    }
}

function updateTime() {
    var d = new Date();
    var nhour = d.getHours(),
        nmin = d.getMinutes(),
        nsec = d.getSeconds();

    if (nmin <= 9) nmin = "0" + nmin
    var dhour = nhour; // for display only
    if (dhour > 12) dhour = dhour - 12
    // if (nhour <= 9) nhour = "0" + nhour
    if (nsec <= 9) nsec = "0" + nsec

    var clockTime = "" + dhour + ":" + nmin + ":" + nsec;
    document.getElementById('clocktime').innerHTML = clockTime;
}

function updateDate() {

    var d = new Date();
    var tday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var tmonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
        "October", "November", "December"
    ];
    var nday = d.getDay(),
        nmonth = d.getMonth(),
        ndate = d.getDate();
    var clockDate = " " + tday[nday] + ", " + tmonth[nmonth] + " " + ndate + " ";

    //document.getElementById('clockdate').innerHTML = clockDate;

}

// called when user presses the close button 
function closeButton() {
    // document.body.classList.add("slideOutUp");
    setTimeout(function () {
        window.location.href = "bttweb://trigger_named/?trigger_name=&closeFloatingHTMLMenu=1"
    }, 200);
};

function debugMode() {

    // document.getElementById('clocktime').style.color = "red";
    // document.getElementById('clocktime').style.fontSize = '16px';
    // document.getElementById('clockdate').style.color = "red";
    // document.getElementById('clockdate').style.fontSize = '16px';
    // document.getElementById('nextAlarm').style.color = "red";
    // document.getElementById('nextAlarm').style.fontSize = '16px';

}