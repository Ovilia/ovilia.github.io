import Vue from 'vue';
// import icons from '../../utils/icon';
import icons from '../../constants/icons';
import { iconWidth } from '../../constants/size';

export default Vue.component('app', {

    props: {
        appId: {
            type: String,
            default: ''
        }
    },

    template:
        `<div class="app">
            <a class="app-icon" :href="icons[appId].link || 'javascript:;'" :target="icons[appId].link ? '_blank' : '_self'">
                <div class="app-msg-counter" v-if="msgCount">{{ msgCount }}</div>
                <div class="app-img-container">
                    <div class="img app-img-content" :style="{'background-position': appContentImagePosition}"></div>
                    <div class="img app-img-bg" :class="icons[appId].theme"></div>
                </div>
            </a>
            <div class="app-name">{{ icons[appId].name }}</div>
        </div>`,

    data: function () {
        return {
            icons: icons
        };
    },

    computed: {
        appContentImagePosition: function () {
            const pos = icons[this.appId].pos;
            return -pos[0] * iconWidth + 'px ' + (-pos[1] * iconWidth + 'px');
        },

        msgCount: function () {
            // TODO:
            if (this.appId === 'wechat') {
                return 3;
            }
            else if (this.appId === 'weibo') {
                return 129;
            }
            else {
                return 0;
            }
        }

        // logoPath: function () {
        //     return icons[this.appIcon].path;
        // },

        // logoType: function () {
        //     return icons[this.appIcon].type;
        // },

        // logoLink: function () {
        //     if (this.appIcon) {
        //         return icons[this.appIcon].link;
        //     }
        //     else {
        //         return '#';
        //     }
        // },

        // logoTarget: function () {
        //     if (this.appIcon) {
        //         return '_blank';
        //     }
        //     else {
        //         return '_self';
        //     }
        // },

        // logoTransform: function () {
        //     const svgSize = 48;
        //     const preferredSize = 30;
        //     if (this.appIcon) {
        //         const originSize = icons[this.appIcon].size;
        //         let scale = 1;
        //         let dx = (svgSize - preferredSize) / 2;
        //         let dy = (svgSize - preferredSize) / 2;
        //         if (originSize[0] > originSize[1]) {
        //             scale = preferredSize / originSize[0];
        //             dy = (svgSize - originSize[1] * scale) / 2;
        //         }
        //         else {
        //             scale = preferredSize / originSize[1];
        //             dx = (svgSize - originSize[0] * scale) / 2;
        //         }
        //         dx /= scale;
        //         dy /= scale;
        //         return `scale(${scale}, ${scale}) translate(${dx}, ${dy})`;
        //     }
        //     else {
        //         return 'none';
        //     }
        // },

        // logoFill: function () {
        //     return icons[this.appIcon].color;
        // }
    },

    methods: {
    }
});
