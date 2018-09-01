import Vue from 'vue';

export default Vue.component('app', {

    props: ['appIcon', 'appName'],

    template:
        `<div class="app">
            <div class="app-icon"></div>
            <div class="app-name">{{ appName }}</div>
        </div>`,

    data: function () {
        return {
        };
    },

    created: function() {
    },

    methods: {
    }
});
