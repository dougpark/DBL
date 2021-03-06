// say the time and message
function sayTime(msg, chime) {

    //sounds.chime.play();
    if (chime != false) {
        if (chime == undefined) {
            playDefaultChime();
        } else {
            playChime(chime);
        }
    }

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

    var nhourSt = nhour.toString();
    var nminSt = nmin.toString();
    var nsecSt = nsec.toString();

    if (nmin <= 9) nminSt = "0" + nminSt;
    if (nsec <= 9) nsecSt = "0" + nsecSt;

    // nice format for the spoken time
    if (nhour > 12) {
        nhourSt = (nhour - 12).toString();
    }
    let time = nhourSt + ":" + nmin;

    sayTime(time, false);
}

// appleScript script to say the text
async function appleScript_Say(text) {

    if (safari) return;

    let appleScript = `
    set voiceText to "` + text + `"
    say voiceText
    `;

    // this will execute the Apple Script and store the result in the result variable.
    let result = await runAppleScript({
        script: appleScript
    });

}