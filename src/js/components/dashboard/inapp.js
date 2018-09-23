import Vue from 'vue';
import icons from '../../constants/icons';

export default Vue.component('inapp', {

    props: {
        appId: {
            type: String,
            default: ''
        }
    },

    template:
        `<div class="mobile-in-app" :class="'theme-' + icons[appId].appStatusTheme">
            <div class="mobile-head">
                <div class="mobile-head-center">{{ icons[appId].name }}</div>
                <div class="mobile-head-right">
                    <a class="btn-close" @click="exit()">返回</a>
                </div>
            </div>
            <div class="mobile-body">
                <app-gooday v-if="appId === 'gooday'"></app-gooday>
            </div>
        </div>`,

    data: function () {
        return {
            openPosition: [0, 0],
            icons: icons
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
