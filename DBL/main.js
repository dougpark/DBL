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
 * Mar 10, 2020 - ver 1.4 - table view layout for next alarm and scheduled alarms
 * Mar 11, 2020 - ver 1.4.1 - save preferences to BTT Variable, and to named trigger
 * Mar 30, 2020 - ver 1.4.2 - tabs, new visual look and feel, new timer
 **************************************************************************************/
"use strict"

// current version to display
let version = "v1.4.2 Mar 30, 2020";

// use only for debug mode
var debug = false;

// preload UI sound effects and chimes
var sounds = {};

// list of reminders from .json file
var reminders = [];

// global preferences
var preferences = {};

// for debug running in safari or BTT
var safari = false;


// called when BTT starts the floating window
function BTTInitialize() {
    init();

};

// called when BTT is closing the floating window
function BTTWillCloseWindow() {

    closeButton();

};

// called from index.html onload tag
function initBody() {
    // for running in Safari, check if running in taller window
    // so not running in BTT
    if (window.innerHeight > 350) {
        safari = true;
        init();
    }
}

// start the clock and update it every .1 seconds
function init() {

    // nice slide in from the top animation
    //document.body.classList.add("slideInDown");

    // pre load sound effects audio files, must load before loading preferences to build index.html select element
    loadSounds();

    // load preferences from BTT persistant string
    DSloadDBLPreferences();
    //setDefaultPreferences();

    // load the reminders data from .json file
    loadReminders();

    // update the displayed clock every .1 seconds
    window.setInterval(update, 500);

    // put the first clock on the screen so there is no delay
    update();

    if (debug == true) {
        debugMode();
    }

    // put the version info on the preferences tab
    document.getElementById('version').innerHTML = version;

    // set the intial view
    document.getElementById("scheduledBoxB").click();
}

// this is called by an interval timer to keep it up to date
function update() {

    let t0 = performance.now();
    // update the on screen time display
    updateTime();



    // clear out the last alarm from the display
    clearDisplayNextAlarm();


    // don't process reminders, timers, alarms if the queue is empty
    if (isEmptyObject(reminders)) return;


    // check for next alarm
    updateReminders();



    // update the on screen date display
    updateDate();



    // remove completed timers
    updateTimers();


    if (debug == true) {
        debugMode();
    }

    let t1 = performance.now() - t0;
    if (t1 > 1.5) {
        //console.log('update took ' + t1)
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

function showBox(event, newBox) {

    var i, boxes, buttons;

    // loop through all boxes, turn them all off
    boxes = document.getElementsByClassName("Box");
    for (i = 0; i < boxes.length; i++) {
        boxes[i].style.display = "none";
    }
    //console.log(boxes);

    // loop through all buttons, turn them all off
    buttons = document.getElementsByClassName("tabButton");
    for (i = 0; i < buttons.length; i++) {
        buttons[i].className = buttons[i].className.replace(" active", "");
    }
    //console.log(buttons);

    // highlight new box
    document.getElementById(newBox).style.display = "block";
    document.getElementById(newBox).style.visibility = "visible";

    // highlight new button
    event.currentTarget.className += " active";

}

function openSafariWindow() {
    var myWindow = window.open("index.html", "", "dialog=yes,width=500,height=400,left=500,top=500,titlebar=no,status=no,scrollbars=no,resizable=no,menubar=no,location=no");

}