import Vue from 'vue';
import throttle from 'lodash/throttle';
import localStorage from 'localStorage';
import Message from '../../entities/message';
import {MESSAGES_KEY_IN_STORAGE} from '../../constants/storage';
import {isStale} from '../../utils/stale';

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
                <msg v-for="(message, id) in messages" @resized="scrollBottom()"
                    :message="message" :key="message.id" :ignoreAnimation="message.isFromJson">
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
            if (!this.messages.length || !this.messages[this.messages.length - 1].isSame(message)) {
                this.messages.push(message);
                this.saveMessages();
            }
        },

        scrollBottom: throttle(function () {
            const $container = $('.msg-container');
            if ($container && $container.length) {
                $container.scrollTop($container[0].scrollHeight - $container.height());
            }
        }, 500),

        saveMessages() {
            const json = this.messages.map(msg => msg.toJson());
            try {
                const str = JSON.stringify(json);
                localStorage.setItem(MESSAGES_KEY_IN_STORAGE, str);
            }
            catch (e) {
                console.warn(e);
            }
        },

        loadMessages() {
            const inStorage = localStorage.getItem(MESSAGES_KEY_IN_STORAGE);
            try {
                const json = JSON.parse(inStorage) || [];
                this.messages = json.map(msg => new Message().fromJson(msg));
            }
            catch (e) {
                console.warn(e);
            }
        },

        purgeStorage() {
            localStorage.setItem(MESSAGES_KEY_IN_STORAGE, null);
        }
    },

    created() {
        if (isStale()) {
            this.purgeStorage();
        }
        else {
            this.loadMessages();
        }

        this.$nextTick(() => this.scrollBottom());
    },

    mounted() {
        // Repaint first message bg since its width and height are not correct when first render
        // due to app-open animation
        setTimeout(() => {
            this.onMounted = true;
        }, 300);
    }
});
