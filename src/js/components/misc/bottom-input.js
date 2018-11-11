import Vue from 'vue';
import { getPixelImage } from '../../utils/image';
import colors from '../../constants/colors';

export default Vue.component('bottom-input', {

    props: {
        choices: {
            type: Array,
            default: () => []
        }
    },

    template:
        `<div class="bottom-input" :class="{'has-prompt': isPromptOpen}"
            :style="{'background-image': 'url(' + bgImg + ')', 'height': promptHeight + 'px'}">
            <div class="input-prompt" ref="content" v-if="isPromptOpen">
                <div class="input-prompt-head">
                    <div class="say-something">说点什么……</div>
                    <a class="close-btn"
                        @click="togglePrompt(false)"></a>
                </div>
                <div class="input-prompt-body">
                    <ul class="choices" v-if="choices.length">
                        <li v-for="choice in choices">
                            <a @click="respond(choice)">{{ choice.text }}</a>
                        </li>
                    </ul>
                    <!--div class="next-topic"
                        v-if="!lastDialog || !lastDialog.responses">
                        <ul class="topics">
                            <li v-for="topic in nextTopics">
                                <a @click="ask(topic)">{{ topic.brief }}</a>
                            </li>
                        </ul>
                    </div-->
                </div>
            </div>
            <div class="input-hint say-something" v-if="!isPromptOpen"
                @click="togglePrompt(true)"
                :class="{'clickable': !isXianzheTyping }">
                <span v-if="!isXianzheTyping">说点什么……</span>
                <span v-if="isXianzheTyping">羡辙正在输入中</span>
            </div>
        </div>`,

    data: function () {
        return {
            bgImg: '',
            isXianzheTyping: false,
            isPromptOpen: false,
            promptHeight: 45
        };
    },

    methods: {
        togglePrompt(toOpen) {
            this.isPromptOpen = toOpen;

            this.$nextTick(() => {
                const height = this.$refs.content.clientHeight;
                this.promptHeight = height;

                this.resize();
            });
        },

        respond(choice) {
            this.$emit('respond', choice);
        },

        resize() {
            this.bgImg = getPixelImage({
                width: this.$el.clientWidth,
                height: this.promptHeight,
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
