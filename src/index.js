(function () {

    const AUTHOR = {
        XIANZHE: 'xianzhe',
        ME: 'me'
    };

    const TYPING_MSG_CONTENT = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';

    let msgSendingHandler = null;

    const vm = new Vue({
        el: '#mobile',

        data: {
            messages: [],
            dialogs: null,
            lastDialog: null,
            msgChain: Promise.resolve(),

            // topics that user can ask
            nextTopics: [],

            hasPrompt: false
        },

        mounted() {
            $.getJSON('./assets/dialog.json', data => {
                this.dialogs = data;

                // TODO: update nextTopics according to dialog
                this.nextTopics = this.dialogs.fromUser;

                this.appendDialog('0000');
            });
        },

        methods: {
            appendDialog(id) {
                if (typeof id === 'object' && id.length > 0) {
                    // array of dialog ids
                    id.forEach(id => this.appendDialog(id));
                    return;
                }
                else if (id == null) {
                    // clear possible responses
                    this.lastDialog.responses = null;
                    return;
                }

                const dialog = this.getDialog(id);

                getRandomMsg(dialog.details)
                    .forEach(content => {
                        this.msgChain = this.msgChain
                            .then(() => this.sendMsg(content, AUTHOR.XIANZHE));
                    });

                this.msgChain
                    .then(() => {
                        console.log(dialog);
                        this.lastDialog = dialog;
                    });
            },

            sendMsg(message, author) {
                switch (author) {
                    case 'me':
                        return this.sendUserMsg(message);
                    default:
                        return this.sendFriendMsg(message, author);
                }
            },

            sendFriendMsg(message, author) {
                const content = getRandomMsg(message);
                const length = content.length;
                const isTyping = length > 5;

                const msg = {
                    author: author,
                    content: isTyping ? TYPING_MSG_CONTENT : content
                };
                this.messages.push(msg);

                onMessageSending();

                if (isTyping) {
                    return new Promise(resolve => {
                        setTimeout(
                            () => {
                                msg.content = content;      
                                onMessageSending();
                                resolve();
                            },
                            Math.min(100 * length, 2000) // TODO: 参数调优
                        )
                    });
                }

                return Promise.resolve();
            },

            sendUserMsg(message) {
                this.messages.push({
                    author: AUTHOR.ME,
                    content: message
                });

                onMessageSending();

                return Promise.resolve();
            },

            getDialog(id) {
                // only one dialog should be matched by id
                const dialogs = this.dialogs.fromXianzhe
                    .filter(dialog => dialog.id === id);
                return dialogs ? dialogs[0] : null;
            },

            getDialogFromUser(id) {
                // only one dialog should be matched by id
                const dialogs = this.dialogs.fromUser
                    .filter(dialog => dialog.id === id);
                return dialogs ? dialogs[0] : null;
            },

            togglePrompt(toShow) {
                this.hasPrompt = toShow;
            },

            respond(response) {
                // close prompt
                this.hasPrompt = false;

                // send my response
                this.sendMsg(response.content, AUTHOR.ME);

                // add xianzhe's next dialogs
                this.appendDialog(response.nextXianzhe);
            },

            ask(fromUser) {
                // close prompt
                this.hasPrompt = false;

                // send user msg
                var content = getRandomMsg(fromUser.details);
                this.sendMsg(content, AUTHOR.ME);

                // update xianzhe dialog
                this.appendDialog(fromUser.nextXianzhe);
            }
        }
    });


    /**
     * get a random message from message array
     */
    function getRandomMsg(messages) {
        // single item
        if (typeof messages === 'string' || !messages.length) {
            return messages;
        }

        const id = Math.floor(Math.random() * messages.length);
        return messages[id];
    }


    /**
     * UI updating when new message is sending
     */
    function onMessageSending() {
        setTimeout(() => {
            const $chatbox = $('#mobile-body-content');

            // update scroll position when vue has updated ui
            $chatbox.scrollTop(
                $chatbox[0].scrollHeight - $chatbox.height()
            );

            // add target="_blank" for links
            const $latestMsg = $chatbox.find('.msg-row:last-child .msg');
            $latestMsg.find('a').attr('target', '_blank');
        });
    }

})();
