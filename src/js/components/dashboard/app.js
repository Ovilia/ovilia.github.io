import Vue from 'vue';
import icons from '../../constants/icons';
import { iconWidth } from '../../constants/size';
import colors from '../../constants/colors';
import { getPixelImage } from '../../utils/image';

export default Vue.component('app', {

    props: {
        appId: {
            type: String,
            default: ''
        }
    },

    template:
        `<div class="app" v-if="icons[appId]">
            <a class="app-icon" @click="appClick" draggable="false"
                :href="icons[appId].link || 'javascript:;'"
                :target="icons[appId].link ? '_blank' : '_self'">
                <div class="app-msg-counter pixel-img" v-if="msgCount"
                    :style="{'background-image': 'url(' + countBgImg + ')'}">
                    {{ msgCount }}
                </div>
                <div class="app-img-container">
                    <div class="img app-img-content" :style="{'background-position': appContentImagePosition}"></div>
                    <div class="img app-img-bg" :class="icons[appId].logoTheme"></div>
                </div>
            </a>
            <div class="app-name">{{ icons[appId].name }}</div>
        </div>`,

    data: function () {
        return {
            icons: icons,
            isWechatOpened: false,
            isZhifubaoOpened: false,
            countBgImg: ''
        };
    },

    computed: {
        appContentImagePosition: function () {
            const pos = icons[this.appId].pos;
            return -pos[0] * iconWidth + 'px ' + (-pos[1] * iconWidth + 'px');
        },

        msgCount: function () {
            if (this.appId === 'wechat') {
                return this.isWechatOpened ? 0 : 1;
            }
            else if (this.appId === 'zhifubao') {
                return this.isZhifubaoOpened ? 0 : 1;
            }
            else {
                return 0;
            }
        }
    },

    mounted: function () {
        this.countBgImg = getPixelImage({
            width: 20,
            height: 20,
            radius: 3,
            fillColor: colors.primaryLight,
            borderColor: colors.primaryDark,
            borderSize: 1,
            margin: 0
        });
    },

    methods: {
        appClick: function (event) {
            _gaq.push(['_trackEvent', 'Home', 'appClick', this.appId]);

            if (icons[this.appId].link) {
                return;
            }

            if (this.appId === 'wechat') {
                this.isWechatOpened = true;
            }
            else if (this.appId === 'zhifubao') {
                this.isZhifubaoOpened = true;
            }

            // Open app
            this.$root.$emit('open-app', this.appId, event);
        }
    }
});
