import Vue from 'vue';
import icons from '../../constants/icons';
import { getPixelImage } from '../../utils/image';
import colors from '../../constants/colors';
import themes from '../../constants/themes';

export default Vue.component('inapp', {

    props: {
        appId: {
            type: String,
            default: ''
        }
    },

    template:
        `<div class="mobile-in-app" :class="'status-theme-' + icons[appId].appStatusTheme"
            :style="{'background-image': 'url(' + bodyBgImg + ')'}">
            <div class="mobile-head" :style="{'background-image': 'url(' + headBgImg + ')'}">
                <div class="mobile-head-center">{{ icons[appId].name }}</div>
                <div class="mobile-head-right">
                    <a class="btn-close" @click="exit()">返回</a>
                </div>
            </div>
            <div class="mobile-body">
                <app-album v-if="appId === 'album'"></app-album>
                <app-gooday v-if="appId === 'gooday'"></app-gooday>
                <app-wechat v-if="appId === 'wechat'"></app-wechat>
                <app-zhifubao v-if="appId === 'zhifubao'"></app-zhifubao>
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
            const body = this.$el;
            const theme = icons[this.appId].appBgTheme;
            const bodyColor = (() => {
                switch(theme) {
                    case themes.light:
                        return colors.bg.lightest;
                    case themes.medium:
                        return colors.bg.medium;
                    case themes.dark:
                        return colors.bg.dark;
                    default:
                        return colors.bg.light;
                }
            })();
            this.bodyBgImg = getPixelImage({
                width: body.clientWidth,
                height: body.clientHeight,
                radius: 2,
                fillColor: bodyColor,
                margin: 1
            });

            const head = this.$el.getElementsByClassName('mobile-head')[0];
            const headTheme = icons[this.appId].appStatusTheme;
            const headColor = (() => {
                switch(headTheme) {
                    case themes.light:
                        return colors.head.light;
                    case themes.medium:
                        return colors.head.medium;
                    case themes.dark:
                        return colors.head.dark;
                    default:
                        return colors.head.dark;
                }
            })();
            this.headBgImg = getPixelImage({
                width: head.clientWidth,
                height: head.clientHeight,
                radius: [2, 2, 0, 0],
                fillColor: headColor,
                margin: [1, 1, 0, 1]
            });
        }
    },

    mounted: function () {
        this.resize();
        window.addEventListener('resize', this.resize);
    }
});
