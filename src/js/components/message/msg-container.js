import Vue from 'vue';
import throttle from 'lodash/throttle';
import localStorage from 'localStorage';
import Message from '../../entities/message';

const MESSAGES_KEY_IN_STORAGE = 'messages';

export default Vue.component('msg-container', {

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
        `<div class="msg-container">
            <div class="content-above-input">
                <msg v-for="(message, id) in messages" @resized="scroll()"
                    :message="message" :key="message.id" :needResize="id === 0 && onMounted">
                </msg>
            </div>

            <bottom-input :choices="choices" :isDialogOver="isDialogOver"
                @respond="respond">
            </bottom-input>
        </div>`,

    data: function () {
        return {
            onMounted: false,
            messages: []
        };
    },

    methods: {
        respond(choice) {
            this.$emit('respond', choice);
        },

        appendMessage(message) {
            this.messages.push(message);
            this.saveMessages();
        },

        scroll: throttle(function () {
            const $container = $('.content-above-input');
            if ($container && $container.length) {
                $container.scrollTop($container[0].scrollHeight - $container.height());
            }
        }, 1000),

        saveMessages() {
            const json = this.messages.map(msg => msg.toJson());
            localStorage.setItem(MESSAGES_KEY_IN_STORAGE, JSON.stringify(json));
        },

        loadMessages() {
            const inStorage = localStorage.getItem(MESSAGES_KEY_IN_STORAGE);
            const messages = (JSON.parse(inStorage) || [])
                .map(json => new Message().fromJson(json));
            this.$set(this.messages, messages);
        },

        purgeStorage() {
            localStorage.setItem(MESSAGES_KEY_IN_STORAGE, null);
        }
    },

    created() {
        // this.purgeStorage();
        this.loadMessages();
    },

    mounted() {
        // Repaint first message bg since its width and height are not correct when first render
        // due to app-open animation
        setTimeout(() => {
            this.onMounted = true;
        }, 300);
    }
});
