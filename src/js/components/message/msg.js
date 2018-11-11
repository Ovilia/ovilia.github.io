import Vue from 'vue';
import { getPixelImage } from '../../utils/image';
import colors from '../../constants/colors';
import AUTHOR from '../../constants/author'

export default Vue.component('msg', {

    props: {
        message: {
            type: Object,
            default: () => {}
        }
    },

    template:
        `<div class="msg-row" :class="'msg-' + message.author">
            <div class="msg" ref="msg" :style="{'background-image': 'url(' + bgImg + ')'}">
                {{ message.content }}
            </div>
        </div>`,

    data: function () {
        return {
            bgImg: ''
        };
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
        // TODO: not sure why need 0.3s delay here
        console.log('before', this.$refs.msg.clientWidth, this.$refs.msg.clientHeight);
        setTimeout(() => {
            console.log('after', this.$refs.msg.clientWidth, this.$refs.msg.clientHeight);
            this.resize();
        }, 300);
        window.addEventListener('resize', this.resize);
    }
});
