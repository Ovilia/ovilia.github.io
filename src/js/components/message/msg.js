import Vue from 'vue';
import { getPixelImage } from '../../utils/image';
import colors from '../../constants/colors';
import AUTHOR from '../../constants/author';

export default Vue.component('msg', {

    props: {
        message: {
            type: Object,
            default: () => {}
        },
        ignoreAnimation: {
            type: Boolean,
            default: false
        }
    },

    directives: {
        updateBgImg: {
            componentUpdated(el, binding, vnode) {
                vnode.context.resize()
            }
        }
    },

    template:
        `<div class="msg-row" :class="'msg-' + message.author">
            <div v-update-bg-img class="msg" ref="msg" :style="{'background-image': 'url(' + bgImg + ')'}"
                v-html="msgContent">
            </div>
        </div>`,

    data: function () {
        return {
            bgImg: '',
            msgContent: ''
        };
    },

    methods: {
        resize() {
            const isXianzhe = this.message.author === AUTHOR.XIANZHE;
            const el = this.$refs.msg;
            if (el) {
                this.bgImg = getPixelImage({
                    width: el.clientWidth,
                    height: el.clientHeight,
                    radius: isXianzhe ? [0, 3, 3, 3] : [3, 0, 3, 3],
                    fillColor: isXianzhe ? colors.bg.lightest : colors.bg.mediumDarker,
                    borderColor: isXianzhe ? '#948a7c' : '#645f5b'
                });
            }

            this.$emit('resized');
        }
    },

    mounted: function () {
        if (!this.ignoreAnimation && this.message.author === AUTHOR.XIANZHE) {
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

        window.addEventListener('resize', this.resize);
    }
});
