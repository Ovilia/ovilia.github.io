import Vue from 'vue';

export default Vue.component('inapp', {

    props: {
    },

    template:
        `<div class="mobile-in-app">
            <div class="mobile-head">
                <div class="mobile-head-right">
                    <a class="btn-close" @click="exit()">返回</a>
                </div>
            </div>
            <div class="mobile-body">
                <div class="mobile-body-bg"></div>
                <div class="mobile-body-content">
                </div>
            </div>
        </div>`,

    data: function () {
        return {
            openPosition: [0, 0]
        };
    },

    computed: {
    },

    methods: {
        exit: function () {
            this.$emit('exit');
        },

        setOpenPosition: function (x, y) {
            this.openPosition = [x, y];
        }
    }
});
