import Vue from 'vue';

export default Vue.component('app-wechat', {

    template:
        `<div>
            <div class="app-wechat mobile-body-content">
                <ink-msg-container ink-file-name="wechat"></ink-msg-container>
            </div>
        </div>`,

    data: function () {
        return {
        };
    },

    methods: {
    },

    created: function () {
    }

});
