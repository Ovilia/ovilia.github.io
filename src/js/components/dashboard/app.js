import Vue from 'vue';
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
            <a class="app-icon" @click="appClick" draggable="false"
                :href="icons[appId].link || 'javascript:;'"
                :target="icons[appId].link ? '_blank' : '_self'">
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
            return 0;
            // if (this.appId === 'wechat') {
            //     return 3;
            // }
            // else if (this.appId === 'weibo') {
            //     return 129;
            // }
            // else {
            //     return 0;
            // }
        }
    },

    methods: {
        appClick: function (event) {
            if (icons[this.appId].link) {
                return;
            }

            // Open app
            this.$root.$emit('open-app', this.appId, event);
        }
    }
});
