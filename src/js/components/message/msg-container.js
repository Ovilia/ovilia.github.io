import Vue from 'vue';

export default Vue.component('msg-container', {

    props: {
        messages: {
            type: Array,
            default: () => []
        },
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
                <msg v-for="(message, id) in messages"
                    :message="message" :key="message.id" :needResize="id === 0 && onMounted">
                </msg>
            </div>

            <bottom-input :choices="choices" :isDialogOver="isDialogOver"
                @respond="respond">
            </bottom-input>
        </div>`,

    data: function () {
        return {
            onMounted: false
        };
    },

    methods: {
        respond(choice) {
            this.$emit('respond', choice);
        }
    },

    mounted() {
        // Repaint first message bg since its width and height are not correct when first render
        // due to app-open animation
        setTimeout(() => {
            this.onMounted = true;
        }, 300);
    }
});
