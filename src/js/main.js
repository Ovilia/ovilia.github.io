import Vue from 'vue';

import './components/components';

export class Main {
    constructor() {
        console.log('11');

        this.vm = new Vue({
            el: '#content'
        });
        console.log(this.vm);
    }
}
