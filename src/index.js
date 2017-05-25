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
                            .then(() => delay(700))
                            .then(() => this.sendMsg(content, AUTHOR.XIANZHE));
                    });

                return this.msgChain
                    .then(() => {
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
                    return delay(Math.min(100 * length, 1000)) // TODO: 参数调优
                        .then(() => {
                            msg.content = content;
                            onMessageSending();
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
                return this.say(response.content, response.nextXianzhe);
            },

            ask(fromUser) {
                const content = getRandomMsg(fromUser.details);
                return this.say(content, fromUser.nextXianzhe);
            },

            say(content, dialogId) {
                // close prompt
                this.hasPrompt = false;
 
                return delay(200)
                    // send user msg
                    .then(() => this.sendMsg(content, AUTHOR.ME))
                    .then(() => delay(300))
                    // add xianzhe's next dialogs
                    .then(() => this.appendDialog(dialogId)); 
            }
        }
    });


    function bindImageLoad() {
        console.log('bind');

        $('#mobile-body-content').one('load', 'img', () => {
            console.log('image load');
        }).each(function () {
            console.log(this);
        });
    }

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
            // update scroll position when vue has updated ui
            updateScroll();
            
            const $latestMsg = $('#mobile-body-content .msg-row:last-child .msg');

            // add target="_blank" for links
            $latestMsg.find('a').attr('target', '_blank');

            // update scroll position when images are loaded
            $latestMsg.find('img').one('load', updateScroll)
                .each((index, target) => {
                    // trigger load when the image is cached
                    target.complete && $(target).trigger('load');
                });
        });
    }

    function updateScroll() {
        const $chatbox = $('#mobile-body-content');

        $chatbox.scrollTop(
            $chatbox[0].scrollHeight - $chatbox.height()
        );
    }

    function delay(amount = 0) {
        return new Promise(resolve => {
            setTimeout(resolve, amount);
        });
    }

})();
