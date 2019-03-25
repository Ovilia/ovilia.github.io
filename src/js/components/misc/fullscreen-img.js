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
            <div class="fullscreen-mask"></div>
            <img :src="src" v-if="src">
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
