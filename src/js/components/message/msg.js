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
            <div class="msg">
                This is msg from {{ message.author }}: {{ message.content }}
                <img class="msg-bg pixel-img" :src="bgImg">
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
            const el = this.$el.getElementsByClassName('msg')[0];
            console.log(el);
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
        this.resize();
        window.addEventListener('resize', this.resize);
    }
});
