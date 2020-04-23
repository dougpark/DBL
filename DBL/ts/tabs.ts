function showTab(event, newBox) {

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

function showTimerTab() {
    document.getElementById('countDownBoxB').click();
}


function getTabNames() {

    var i, tabs, tabNames = [];
    var defaultTab = document.getElementById("defaultTab");
    // loop through all boxes, turn them all off
    tabs = document.getElementsByClassName("tabButton");
    for (i = 0; i < tabs.length; i++) {
        tabNames[i] = tabs[i] = {
            id: tabs[i].id,
            name: tabs[i].innerHTML
        };

        // add UI drop down list for default tab
        let opt = document.createElement("option"); // create option element
        opt.value = tabNames[i].id;
        opt.innerHTML = tabNames[i].name;
        defaultTab.append(opt); // add option to the DOM

    }
    //console.log(tabNames);

    return tabNames;
}

