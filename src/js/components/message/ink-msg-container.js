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
            <msg-container :messages="messages" :choices="choices" :isDialogOver="isDialogOver"
                @respond="respond">
            </msg-container>
        </div>`,

    data: function () {
        return {
            inkDialog: null,
            messages: [],
            choices: [],
            isDialogOver: false
        };
    },

    methods: {
        runNext() {
            let text = this.inkDialog.getNext();
            if (text) {
                const author = this.inkDialog.story.currentTags.indexOf('xianzhe') > -1
                    ? AUTHOR.XIANZHE : AUTHOR.AUDIENCE;

                const iterator = () => {
                    setTimeout(() => {
                        const msg = new Message(author, text);
                        this.messages.push(msg);

                        // Next iteration
                        text = this.inkDialog.getNext();
                        if (text) {
                            iterator();
                        }
                    }, 2000);
                };

                if (author === AUTHOR.AUDIENCE) {
                    this.messages.push(new Message(author, text));
                    this.runNext();
                }
                else if (this.messages.length === 0) {
                    // First msg from xianzhe when open app
                    this.messages.push(new Message(author, text));
                    this.runNext();
                }
                else {
                    iterator();
                }
            }

            // Interaction
            this.choices = this.inkDialog.story.currentChoices;
            if (!text && !this.choices.length) {
                this.isDialogOver = true;
            }
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
            setTimeout(() => {
                // Load first message after 0.3 seconds, that is when app is fully loaded
                this.runNext();
            }, 300);
        });
    }

});
