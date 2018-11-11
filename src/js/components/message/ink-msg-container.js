import Vue from 'vue';
import InkDialog from '../../entities/inkDialog';
import Message from '../../entities/message';
import AUTHOR from '../../constants/author';

export default Vue.component('ink-msg-container', {

    props: {
        inkFileName: {
            type: String,
            default: ''
        }
    },

    template:
        `<div class="ink-msg-container">
            <msg-container :messages="messages" :choices="choices" @respond="respond"></msg-container>
        </div>`,

    data: function () {
        return {
            inkDialog: null,
            messages: [],
            choices: []
        };
    },

    methods: {
        runNext() {
            let text = this.inkDialog.getNext();
            while (text) {
                const msg = new Message(AUTHOR.XIANZHE, text);
                this.messages.push(msg);

                text = this.inkDialog.getNext();
            }

            // Interaction
            this.choices = this.inkDialog.story.currentChoices;
        },

        respond(choice) {
            console.log('respond', choice);
            this.inkDialog.story.ChooseChoiceIndex(choice.index);
            this.runNext();
        }
    },

    created: function () {
        this.inkDialog = new InkDialog();

        this.inkDialog.load(this.inkFileName, () => {
            this.runNext();
        });
    }

});
