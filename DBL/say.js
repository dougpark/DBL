// say the time and message
function sayTime(cTime, msg) {

    //sounds.chime.play();
    playDefaultChime();

    // call the applescript function to speak
    //appleScript_Say("The time is " + cTime + ". " + msg);
    appleScript_Say(msg);
}

// called by user button on display
function speakNow() {
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

    sayTime(time, time);
}

// appleScript script to say the text
async function appleScript_Say(text) {

    let appleScript = `
    set voiceText to "` + text + `"
    say voiceText
    `;

    // this will execute the Apple Script and store the result in the result variable.
    let result = await runAppleScript({
        script: appleScript
    });

}