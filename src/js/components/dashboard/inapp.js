import Vue from 'vue';
import icons from '../../constants/icons';
import { getPixelImage } from '../../utils/image';
import colors from '../../constants/colors';

export default Vue.component('inapp', {

    props: {
        appId: {
            type: String,
            default: ''
        }
    },

    template:
        `<div class="mobile-in-app" :class="'theme-' + icons[appId].appStatusTheme">
            <div class="mobile-head" :style="{'background-image': 'url(' + headBgImg + ')'}">
                <div class="mobile-head-center">{{ icons[appId].name }}</div>
                <div class="mobile-head-right">
                    <a class="btn-close" @click="exit()">返回</a>
                </div>
            </div>
            <div class="mobile-body" :style="{'background-image': 'url(' + bodyBgImg + ')'}">
                <app-gooday v-if="appId === 'gooday'"></app-gooday>
            </div>
        </div>`,

    data: function () {
        return {
            openPosition: [0, 0],
            icons: icons,

            headBgImg: '',
            bodyBgImg: ''
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
        },

        resize() {
            const head = this.$el.getElementsByClassName('mobile-head')[0];
            // const headTheme = icons[this.appId].appStatusTheme; // TODO:
            const headColor = colors.appGroupTitle;
            this.headBgImg = getPixelImage(head.clientWidth, head.clientHeight,
                [3, 3, 0, 0], 0, headColor, headColor);

            const body = this.$el.getElementsByClassName('mobile-body')[0];
            const bodyColor = colors.bgDefault;
            this.bodyBgImg = getPixelImage(body.clientWidth, body.clientHeight,
                [0, 0, 3, 3], 0, bodyColor, bodyColor);
        }
    },

    mounted: function () {
        this.resize();
        window.addEventListener('resize', this.resize);
    }
});
