import Vue from 'vue';
import icons from '../../utils/icon';

export default Vue.component('app', {

    props: {
        appIcon: {
            type: String,
            default: ''
        },
        appName: {
            type: String,
            default: ''
        }
    },

    template:
        `<div class="app">
            <a class="app-icon" :href="logoLink" :target="logoTarget">
                <svg v-if="appIcon && logoType === 'svg'" :style="{ background: logoFill }">
                    <path fill="#fff" :d="logoPath" :transform="logoTransform">
                    </path>
                </svg>
                <img v-if="appIcon && logoType === 'img'" :src="logoPath" />
            </a>
            <div class="app-name">{{ appName }}</div>
        </div>`,

    data: function () {
        return {
        };
    },

    computed: {
        logoPath: function () {
            return icons[this.appIcon].path;
        },

        logoType: function () {
            return icons[this.appIcon].type;
        },

        logoLink: function () {
            if (this.appIcon) {
                return icons[this.appIcon].link;
            }
            else {
                return '#';
            }
        },

        logoTarget: function () {
            if (this.appIcon) {
                return '_blank';
            }
            else {
                return '_self';
            }
        },

        logoTransform: function () {
            const svgSize = 48;
            const preferredSize = 30;
            if (this.appIcon) {
                const originSize = icons[this.appIcon].size;
                let scale = 1;
                let dx = (svgSize - preferredSize) / 2;
                let dy = (svgSize - preferredSize) / 2;
                if (originSize[0] > originSize[1]) {
                    scale = preferredSize / originSize[0];
                    dy = (svgSize - originSize[1] * scale) / 2;
                }
                else {
                    scale = preferredSize / originSize[1];
                    dx = (svgSize - originSize[0] * scale) / 2;
                }
                dx /= scale;
                dy /= scale;
                return `scale(${scale}, ${scale}) translate(${dx}, ${dy})`;
            }
            else {
                return 'none';
            }
        },

        logoFill: function () {
            return icons[this.appIcon].color;
        }
    }
});
