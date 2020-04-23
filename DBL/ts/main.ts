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
 * Apr 15, 2020 - ver 1.4.3 - user selectable color scheme
 * Apr 22, 2020 - ver 1.4.4 - TypeScript
 **************************************************************************************/
"use strict"

// declare javascript libraries
declare var callBTT: any;
declare var runAppleScript: any;
declare var Howl: any;

// current version to display
let version = "v1.4.4 Apr 22, 2020";

// use only for debug mode
var debug = false;

// preload UI sound effects and chimes
var sounds = {};

// list of reminders from .json file
var reminders = [];

// global preferences
var preferences = {
    newHour: "",
    newMinute: "",
    newSecond: "",
    newMessage: "",
    newChime: "",
    clock12: true,
    defaultChime: "",
    defaultTab: "",
    defaultMessage: "",
    speakCountDown: false,
    defaultColor: "",

};

// for debug running in safari or BTT
var safari = false;

//debug to clear existing reminders
var timerClear = false;

let holdSpeakSecond = 99;

// new datastore preferences object
let dsPref;

// new datastore reminders object
let dsRemind;

// default color object
let colors = new Colors();

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

    // pre load tab names, must load before loading preferences
    getTabNames();

    // pre load sound effects audio files, must load before loading preferences to build index.html select element
    loadSounds();

    // load preferences from safari or BTT
    loadPreferences();

    // load reminders from safari or BTT
    loadReminders();

    // update the displayed clock every .1 seconds
    window.setInterval(update, 100);

    // put the first clock on the screen so there is no delay
    update();

    if (debug == true) {
        debugMode();
    }

    // put the version info on the preferences tab
    document.getElementById('version').innerHTML = version;


}

function setColor(color) {
    colors.setColor(color);
}

function changeColor(direction) {
    colors.changeColor(direction);
}

// this is called by an interval timer to keep it up to date
function update() {

    let t0 = performance.now();
    // update the on screen time display
    updateTime();

    // clear out the last alarm from the display
    clearDisplayNextAlarm();

    // don't process reminders, timers, alarms if the queue is empty
    if (anyReminders()) {
        // check for next alarm
        updateReminders();
    }
    // remove completed timers
    updateTimers();


    // update the on screen date display
    updateDate();

    if (debug == true) {
        debugMode();
    }

    let t1 = performance.now() - t0;
    if (t1 > 1.5) {
        //console.log('update loop took ' + t1)
    }
}

function updateTime() {
    var d = new Date();
    //var nhour = "", nmin="", nsec="";

    var nhour = d.getHours().toString(),
        nmin = d.getMinutes().toString(),
        nsec = d.getSeconds().toString();

    if (Number(nmin) <= 9) nmin = "0" + nmin
    var dhour = nhour; // for display only
    if (Number(dhour) > 12) dhour = (Number(dhour) - 12).toString();
    // if (nhour <= 9) nhour = "0" + nhour
    if (Number(nsec) <= 9) nsec = "0" + nsec

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