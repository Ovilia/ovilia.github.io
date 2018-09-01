import Vue from 'vue';

import './components/components';

export class Main {

    constructor() {
        this.data = {
            inApp: false
        };

        this.vm = new Vue({
            el: '#content',
            data: this.data
        });

        // setTimeout(() => {
        //     this.data.inApp = true;
        // }, 2000);
    }
}
