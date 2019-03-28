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
            <msg-container ref="msgContainer" :choices="choices" :isDialogOver="isDialogOver"
                @respond="respond">
            </msg-container>
        </div>`,

    data: function () {
        return {
            inkDialog: null,
            choices: [],
            isDialogOver: false,
            isFirstMessage: true
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
                        this.appendMessage(new Message(author, text));

                        // Next iteration
                        text = this.inkDialog.getNext();
                        if (text) {
                            iterator();
                        }
                        else {
                            this.runNext();
                        }
                    }, 2000);
                };

                if (author === AUTHOR.AUDIENCE) {
                    this.appendMessage(new Message(author, text));
                    this.runNext();
                }
                else if (this.isFirstMessage) {
                    // First msg from xianzhe when open app
                    this.appendMessage(new Message(author, text));
                    this.runNext();
                    this.isFirstMessage = false;
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

        appendMessage(msg) {
            if (this.$refs.msgContainer) {
                this.$refs.msgContainer.appendMessage(msg);
            }
        },

        respond(choice) {
            this.inkDialog.story.ChooseChoiceIndex(choice.index);
            this.runNext();
        }
    },

    created: function () {
        this.inkDialog = new InkDialog();

        setTimeout(() => {
            // Load first message after 0.3 seconds, that is when app is fully loaded
            this.inkDialog.load(this.inkFileName, hasHistory => {
                if (!hasHistory) {
                    this.runNext();
                }
            });
        }, 300);
    }

});
