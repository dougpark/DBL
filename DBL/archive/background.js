/**
 *
 *
 * @param {*} requestPath
 * @returns
 */
async function bttRequest(requestPath) {
    const response = await fetch(requestPath);
    const responseText = await response.text();
    return responseText;
}

async function getCurrentlyPlayingSong() {
    // this is special - as soon as the BTTCurrentlyPlaying is requested, BTT will start observing
    // media information and call the BTTNotification function above if they changed.
    // let currentlyPlaying = await callBTT('get_number_variable', {
    //     variable_name: 'get_number_variable'
    // });

    (async () => {
        let result = await callBTT('get_number_variable', {
            variable_name: 'dnp'
        })
        returnToBTT(result);
    })();

}

var serverRunning = false;

/**
 *
 *
 * @returns
 */
async function checkDBLServer() {

    let aliveTime = await callBTT('get_string_variable', {
        variable_name: 'DBLServerAliveTime'
    })
    return aliveTime;
}

/**
 *
 *
 * @param {*} aliveTime
 * @returns
 */
async function statusDBLServer(aliveTime) {

    //console.log('aliveTime= ' + aliveTime);

    let now = new Date();
    if (aliveTime == undefined) {
        serverRunning = false;
    } else
    if (aliveTime == null) {
        serverRunning = false;
    }
    if (now.getTime() > aliveTime + 5000) {
        //console.log('server has stopped now=' + now.getTime() + " aliveTime= " + aliveTime);
        serverRunning = false;
    } else {
        //console.log('server is running now=' + now.getTime() + " aliveTime= " + aliveTime);
        serverRunning = true;
    }

    return serverRunning;

}

async function startDBLServer() {

    // start the DBL server
    // let result = await callBTT('trigger_named', {
    //     trigger_name: 'DBLServer'
    // });

    let aliveTime = await checkDBLServer();
    let serverRunning = await statusDBLServer(aliveTime);

    if (serverRunning == false) {
        //var server = await bttRequest("bttweb://trigger_named/?trigger_name=DBLServer");
    }


}