import * as $ from 'zepto';
import * as ink from 'inkjs';

export default class InkDialog {

    constructor(fileName) {
        this.story = null;

        this.load(fileName);
    }

    load(fileName) {
        $.getJSON(`assets/dialogs/${fileName}.json`, data => {
            console.log(data);

            this.story = new ink.Story(data);
            console.log(this.story);
        });
    }

}
