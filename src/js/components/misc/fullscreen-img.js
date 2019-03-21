import Vue from 'vue';

export default Vue.component('fullscreen-img', {

    props: {
        src: {
            type: String,
            default: null
        }
    },

    template:
        `<div class="fullscreen-img">
            <img :src="src" v-if="src">
            <div class="fullscreen-mask"></div>
        </div>`,

    data: function () {
        return {
        };
    },

    mounted: function () {

    }

});
