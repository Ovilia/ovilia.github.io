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
        }
    },

    template:
        `<div class="msg-container">
            <div class="content-above-input">
                <msg v-for="message in messages"
                    :message="message" :key="message.id">
                </msg>
            </div>

            <bottom-input :choices="choices" @respond="respond"></bottom-input>
        </div>`,

    data: function () {
        return {
        };
    },

    methods: {
        respond(choice) {
            this.$emit('respond', choice);
        }
    }
});
