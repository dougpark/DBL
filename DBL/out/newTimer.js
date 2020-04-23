var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function newTimerColor() {
    var s = document.getElementById("newTimerImage");
    //s.setAttribute("stroke", "0000FF");
    //s.style.stroke = '#0000ff';
    //s.setAttribute("stroke", "blue");
    //s.style.stroke = "blue";
    var svgDoc = s.ownerDocument;
    // Get one of the SVG items by ID;
    var svgItem = svgDoc.getElementById("line");
    // Set the colour to something else
    //svgDoc.style.stroke = "blue";
    svgItem.setAttributeNS(null, "stroke", "0000FF");
    //.setAttributeNS(null, 'y', y + 10);
    //document.getElementById("newTimerImage").src = svgDoc.replace('#000', '#f00');
}
function setNewTimer() {
    newTimerButton({
        hour: Number(preferences.newHour),
        minute: Number(preferences.newMinute),
        second: Number(preferences.newSecond),
        message: preferences.newMessage,
        chime: preferences.newChime
    });
    showTimerTab();
}
function setNewChime() {
    return __awaiter(this, void 0, void 0, function* () {
        let newChime = document.getElementById("newChime");
        preferences.newChime = newChime.value;
        dsPref.save(preferences);
    });
}
function setNewMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        let newMessage = document.getElementById("newMessage");
        preferences.newMessage = newMessage.value;
        dsPref.save(preferences);
    });
}
function IsNumeric(val) {
    return Number(val) == val;
}
function setNewHour() {
    return __awaiter(this, void 0, void 0, function* () {
        let e = document.getElementById("newHour");
        let val = Number(e.value);
        if (!IsNumeric(val))
            val = 0;
        if (val < 0)
            val = 0;
        if (val > 23)
            val = 23;
        preferences.newHour = val.toString();
        e.value = preferences.newHour;
        dsPref.save(preferences);
    });
}
function setNewMinute() {
    return __awaiter(this, void 0, void 0, function* () {
        let e = document.getElementById("newMinute");
        let val = Number(e.value);
        if (!IsNumeric(val))
            val = 0;
        if (val < 0)
            val = 0;
        if (val > 59)
            val = 59;
        preferences.newMinute = val.toString();
        e.value = preferences.newMinute;
        dsPref.save(preferences);
    });
}
function setNewSecond() {
    return __awaiter(this, void 0, void 0, function* () {
        let e = document.getElementById("newSecond");
        let val = Number(e.value);
        if (!IsNumeric(val))
            val = 0;
        if (val < 0)
            val = 0;
        //if (val > 59) val = 59;
        preferences.newSecond = val.toString();
        e.value = preferences.newSecond;
        dsPref.save(preferences);
    });
}
//# sourceMappingURL=newTimer.js.map