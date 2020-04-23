var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DataStore {
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
        }
        else { // running in BTT
            this.loadTrigger(original);
        }
    }
    // save to dataStore
    save(original) {
        // if running in Safari
        if (this.config.safari == true) {
            this.saveSafari(original);
        }
        else { // running in BTT
            this.saveTrigger(original);
        }
    }
    // load values from BTT Trigger
    loadTrigger(original) {
        return __awaiter(this, void 0, void 0, function* () {
            // get the trigger details from BTT
            let result = yield callBTT('get_trigger', {
                uuid: this.config.uuid
            });
            // get the needed element
            let element = JSON.parse(result).BTTInlineAppleScript;
            // strange, have to parse again to get a usable js object
            let obj = JSON.parse(element);
            // in async mode update global object with loaded values
            // update global object reference without breaking the link and creating a new object
            Object.assign(original, obj);
            updateElements(); // call on same "thread"
        });
    }
    ;
    // load values from Safari local storage
    loadSafari(original) {
        let obj = JSON.parse(localStorage.getItem(this.config.key));
        // update global object reference without breaking the link and creating a new object
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
        // https://medium.com/@naveenkarippai/learning-how-references-work-in-javascript-a066a4e15600
        Object.assign(original, obj);
        updateElements(); // call on same "thread"
    }
    // save values to BTT Trigger
    saveTrigger(original) {
        return __awaiter(this, void 0, void 0, function* () {
            // tell BTT where to put the stringified object
            let obj = {
                "BTTInlineAppleScript": JSON.stringify(original)
            };
            // update the trigger details with my JSON object embeded in the applescript element!
            callBTT('update_trigger', {
                uuid: this.config.uuid,
                json: JSON.stringify(obj)
            });
        });
    }
    ;
    saveSafari(original) {
        localStorage.setItem(this.config.key, JSON.stringify(original));
    }
}
//# sourceMappingURL=DataStore.js.map