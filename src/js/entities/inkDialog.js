import * as $ from 'zepto';
import * as ink from 'inkjs';

export default class InkDialog {

    constructor() {
        this.story = null;
    }

    load(fileName, callback) {
        $.getJSON(`assets/dialogs/${fileName}.json`, data => {
            console.log(data);

            this.story = new ink.Story(data);
            console.log(this.story);

            if (typeof callback === 'function') {
                callback();
            }
        });
    }

    getNext() {
        if (this.story.canContinue) {
            return this.story.Continue();
        }
        else {
            return null;
        }
    }

}
