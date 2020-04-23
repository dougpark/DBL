class DataStore {
    config: {
        safari: boolean,
        key: string,
        uuid: string,
    };

    constructor(config) {
        this.config = config;
        // config.safari == true if safari, false if btt
        // config.key = safari storage name
        // config.uuid = btt uuid
    }

    // load values from dataStore
    load(original) {

        // if running in Safari
        if (this.config.safari == true) {
            this.loadSafari(original);
        } else { // running in BTT
            this.loadTrigger(original);
        }
    }

    // save to dataStore
    save(original) {
        // if running in Safari
        if (this.config.safari == true) {
            this.saveSafari(original);
        } else { // running in BTT
            this.saveTrigger(original);
        }
    }

    // load values from BTT Trigger
    async loadTrigger(original) {

        // get the trigger details from BTT
        let result = await callBTT('get_trigger', {
            uuid: this.config.uuid
        })

        // get the needed element
        let element = JSON.parse(result).BTTInlineAppleScript;

        // strange, have to parse again to get a usable js object
        let obj = JSON.parse(element);

        // in async mode update global object with loaded values
        // update global object reference without breaking the link and creating a new object
        Object.assign(original, obj);
        updateElements(); // call on same "thread"

    };

    // load values from Safari local storage
    loadSafari(original) {
        let obj = JSON.parse(
            localStorage.getItem(this.config.key));

        // update global object reference without breaking the link and creating a new object
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
        // https://medium.com/@naveenkarippai/learning-how-references-work-in-javascript-a066a4e15600
        Object.assign(original, obj);
        updateElements(); // call on same "thread"
    }

    // save values to BTT Trigger
    async saveTrigger(original) {

        // tell BTT where to put the stringified object
        let obj = {
            "BTTInlineAppleScript": JSON.stringify(original)
        }

        // update the trigger details with my JSON object embeded in the applescript element!
        callBTT('update_trigger', {
            uuid: this.config.uuid,
            json: JSON.stringify(obj)
        });

    };

    saveSafari(original) {
        localStorage.setItem(this.config.key, JSON.stringify(original));
    }


}