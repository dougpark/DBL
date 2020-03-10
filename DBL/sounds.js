// pre load sound effects audio files
function loadSounds() {
    // load sounds
    sounds.beep = new Howl({
        src: ['./assets/tones-wav/beep_short_on.wav'],
        preload: true
    });
    sounds.downBeep = new Howl({
        src: ['./assets/tones-wav/beep_short_off.wav'],
        preload: true
    });
    sounds.chime = new Howl({
        src: ['./assets/tones-wav/music_marimba_chord.wav'],
        preload: true
    });
}

function playChime2(cTime, chime) {
    // play chime here
}