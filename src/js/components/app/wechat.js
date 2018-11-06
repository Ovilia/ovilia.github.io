import Vue from 'vue';

export default Vue.component('app-wechat', {

    props: {
    },

    template:
        `<div>
            <div class="app-wechat mobile-body-content">
                this is wechat
            </div>
            <bottom-input></bottom-input>
        </div>`,

    data: function () {
        return {
        };
    },

    methods: {
    }
});
