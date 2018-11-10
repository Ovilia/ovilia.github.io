import Vue from 'vue';
import { getPixelImage } from '../../utils/image';
import colors from '../../constants/colors';

export default Vue.component('bottom-input', {

    props: {
    },

    template:
        `<div class="bottom-input" :class="has-prompt">
            <div class="input-prompt" v-if="isPromptOpen">
                <div class="input-prompt-head">
                    <div class="say-something">说点什么……</div>
                    <a class="close-btn"
                        v-on:click="togglePrompt(false)"></a>
                </div>
                <div class="input-prompt-body">
                    <!--ul class="responses" v-if="lastDialog">
                        <li v-for="res in lastDialog.responses">
                            <a href="javascript:;" v-on:click="respond(res)">{{ res.content }}</a>
                        </li>
                    </ul>
                    <div class="next-topic"
                        v-if="!lastDialog || !lastDialog.responses">
                        <ul class="topics">
                            <li v-for="topic in nextTopics">
                                <a href="javascript:;" v-on:click="ask(topic)">{{ topic.brief }}</a>
                            </li>
                        </ul>
                    </div-->
                </div>
            </div>
            <div class="input-hint say-something"
                v-on:click="togglePrompt(true)"
                :class="{'clickable': !isXianzheTyping }">
                <span v-if="!isXianzheTyping">说点什么……</span>
                <span v-if="isXianzheTyping">羡辙正在输入中</span>
            </div>

            <div class="bottom-input-bg"
                :style="{'background-image': 'url(' + bgImg + ')'}">
            </div>
        </div>`,

    data: function () {
        return {
            bgImg: '',
            isXianzheTyping: false,
            isPromptOpen: false
        };
    },

    methods: {
        togglePrompt(toOpen) {
            this.isPromptOpen = toOpen;
        },

        resize() {
            this.bgImg = getPixelImage({
                width: this.$el.clientWidth,
                height: this.$el.clientHeight,
                radius: [0, 0, 2, 2],
                fillColor: colors.bg.lighter,
                borderSize: [0, 1, 1, 1],
                borderColor: colors.border
            });
        }
    },

    mounted: function () {
        this.resize();
        window.addEventListener('resize', this.resize);
    }
});
