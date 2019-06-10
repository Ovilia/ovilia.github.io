import * as $ from 'zepto';
import * as ink from 'inkjs';
import localStorage from 'localStorage';

export default class InkDialog {

    constructor() {
        this.story = null;
        this.fileName = null;
    }

    load(fileName, callback) {
        this.fileName = fileName;
        // this.purgeState();

        const prefix = __DEV__ ? '' : 'dist/';
        $.getJSON(`${prefix}assets/dialogs/${fileName}.json`, data => {
            this.story = new ink.Story(data);

            if (this.hasState()) {
                this.loadState();
            }

            if (typeof callback === 'function') {
                callback();
            }
        });
    }

    getNext() {
        if (this.story.canContinue) {
            this.saveState();
            return this.story.Continue();
        }
        else {
            return null;
        }
    }

    saveState() {
        const state = this.story.state.ToJson();
        localStorage.setItem(getStateKey(this.fileName), state);
    }

    loadState() {
        const state = localStorage.getItem(getStateKey(this.fileName));
        if (state && state !== 'null') {
            this.story.state.LoadJson(state);
            return true;
        }
        return false;
    }

    hasState() {
        const state = localStorage.getItem(getStateKey(this.fileName));
        return state && state !== 'null';
    }

    purgeState() {
        localStorage.setItem(getStateKey(this.fileName), null);
    }

}

function getStateKey(fileName) {
    if (!fileName) {
        console.warn('No fileName in getStateKey');
        return '';
    }
    return 'inkState' + fileName;
}
