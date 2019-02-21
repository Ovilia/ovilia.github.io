import Vue from 'vue';
import { getPixelImage } from '../../utils/image';
import colors from '../../constants/colors';
import AUTHOR from '../../constants/author'

export default Vue.component('msg', {

    props: {
        message: {
            type: Object,
            default: () => {}
        },
        needResize: {
            type: Boolean,
            default: false
        }
    },

    template:
        `<div class="msg-row" :class="'msg-' + message.author">
            <div class="msg" ref="msg" :style="{'background-image': 'url(' + bgImg + ')'}"
                v-html="msgContent">
            </div>
        </div>`,

    data: function () {
        return {
            bgImg: '',
            msgContent: ''
        };
    },

    watch: {
        needResize: function (newValue) {
            if (newValue) {
                this.resize();
            }
        },

        msgContent: function () {
            this.$nextTick(() => {
                this.resize();
            });
        }
    },

    methods: {
        resize() {
            const isXianzhe = this.message.author === AUTHOR.XIANZHE;
            const el = this.$refs.msg;
            this.bgImg = getPixelImage({
                width: el.clientWidth,
                height: el.clientHeight,
                radius: isXianzhe ? [0, 3, 3, 3] : [3, 0, 3, 3],
                fillColor: isXianzhe ? colors.bg.lightest : colors.bg.mediumDarker,
                borderColor: isXianzhe ? '#948a7c' : '#645f5b'
            });
        }
    },

    mounted: function () {
        if (this.message.author === AUTHOR.XIANZHE) {
            this.msgContent = '.';
            setTimeout(() => {
                this.msgContent = '..';
            }, 500);
            setTimeout(() => {
                this.msgContent = '...';
            }, 1000);
            setTimeout(() => {
                this.msgContent = this.message.content;
            }, 1500);
        }
        else {
            this.msgContent = this.message.content;
        }

        this.resize();
        window.addEventListener('resize', this.resize);
    }
});
