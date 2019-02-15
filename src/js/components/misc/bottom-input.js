import Vue from 'vue';
import $ from 'zepto';
import { getPixelImage } from '../../utils/image';
import colors from '../../constants/colors';

export default Vue.component('bottom-input', {

    props: {
        choices: {
            type: Array,
            default: () => []
        },
        isDialogOver: {
            type: Boolean,
            default: false
        }
    },

    template:
        `<div class="bottom-input" :class="{'has-prompt': isPromptOpen}"
            :style="{'background-image': 'url(' + bgImg + ')', 'height': promptHeight + 'px'}">
            <div class="input-prompt" ref="content" v-if="isPromptOpen && choices.length">
                <div class="input-prompt-head">
                    <div class="say-something">说点什么……</div>
                    <a class="close-btn" @click="togglePrompt(false)"></a>
                </div>
                <div class="input-prompt-body">
                    <ul class="choices">
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
                <span v-if="!isDialogOver && choices.length">说点什么……</span>
                <span v-if="!isDialogOver && !choices.length">等待羡辙回复……</span>
                <span v-if="isDialogOver">羡辙下线了，过些时候再来看看吧！</span>
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

    watch: {
        isDialogOver: function (isOver) {
            if (isOver) {
                this.isPromptOpen = false;
            }
        }
    },

    methods: {
        togglePrompt(toOpen) {
            if (!this.choices.length && toOpen) {
                // Ignore open when no choices
                return;
            }

            this.isPromptOpen = toOpen;

            this.$nextTick(() => {
                this.resize();
            });
        },

        respond(choice) {
            this.isPromptOpen = false;

            this.$emit('respond', choice);

            this.$nextTick(() => {
                this.resize();
            });
        },

        resize() {
            this.promptHeight = this.$refs.content ? this.$refs.content.clientHeight : 45;

            this.bgImg = getPixelImage({
                width: this.$el.clientWidth,
                height: this.promptHeight,
                radius: [0, 0, 2, 2],
                fillColor: colors.bg.lighter,
                borderSize: [0, 1, 1, 1],
                borderColor: colors.border
            });

            const $content = $('.content-above-input');
            $content.attr('style', `bottom: ${this.promptHeight}px`);
            // Scroll to the end of content
            const distance = $content[0].scrollHeight - $content.height() - $content.scrollTop();
            const duration = 250;
            const startTime = Date.now();
            requestAnimationFrame(function step() {
                const p = (Date.now() - startTime) / duration;
                $content.scrollTop($content.scrollTop() + distance * p);
                p > 0 && requestAnimationFrame(step);
            });
        }
    },

    mounted: function () {
        this.resize();
        window.addEventListener('resize', this.resize);
    }
});
