import Vue from 'vue';

export default Vue.component('fullscreen-img', {

    props: {
    },

    template:
        `<div class="fullscreen-img">
            <div class="fullscreen-mask"></div>
            <slot></slot>
            <a class="fullscreen-close" href="javascript:;" @click="close()"></a>
        </div>`,

    data: function () {
        return {
        };
    },

    methods: {
        close: function () {
            this.$emit('close');
        }
    },

    mounted: function () {

    }

});
