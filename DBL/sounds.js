// preload the sound files and add options to UI drop down in preferenes 
function loadSounds() {

    // pre load sound effects audio files
    let soundList = [{
            "id": "marimba",
            "name": "Marimba",
            "loc": './assets/tones-wav/music_marimba_chord.wav'
        }, {
            "id": "beepon",
            "name": "Beep On",
            "loc": './assets/tones-wav/beep_short_on.wav'
        },
        {
            "id": "beepoff",
            "name": "Beep Off",
            "loc": './assets/tones-wav/beep_short_off.wav'
        },
        {
            "id": "ding",
            "name": "Ding",
            "loc": './assets/tones-wav/chime_bell_ding.wav'
        },
        {
            "id": "click",
            "name": "Click",
            "loc": './assets/tones-wav/click_04.wav'
        },
        {
            "id": "plink",
            "name": "Plink",
            "loc": './assets/tones-wav/digi_plink.wav'
        },
        {
            "id": "confirm",
            "name": "Confirm",
            "loc": './assets/tones-wav/pad_confirm.wav'
        },
        {
            "id": "drip",
            "name": "Drip",
            "loc": './assets/tones-wav/pop_drip.wav'
        },
    ];

    let defaultChime = document.getElementById("defaultChime");
    for (var index = 0; index < soundList.length; index++) {
        let id = soundList[index].id;
        let loc = soundList[index].loc;

        // create a Howl sound object for each sound in the soundList
        sounds[id] = new Howl({
            src: loc,
            preload: true
        });

        // add UI drop down list for default chime
        let opt = document.createElement("option"); // create option element
        opt.value = soundList[index].id;
        opt.innerHTML = soundList[index].name;
        defaultChime.append(opt); // add option to the DOM
    }
}


function playChime(chime) {
    sounds[chime].play();
}

function playDefaultChime() {

    var s = preferences.defaultChime;
    playChime(s);

}