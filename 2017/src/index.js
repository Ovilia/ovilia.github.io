(function () {

    const AUTHOR = {
        XIANZHE: 'xianzhe',
        ME: 'me'
    };

    const TYPING_MSG_CONTENT = `
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    `;

    let msgSendingHandler = null;

    const vm = new Vue({
        el: '#mobile',

        data: {
            messages: [],
            dialogs: null,
            lastDialog: null,
            msgChain: Promise.resolve(),

            isXianzheTyping: false,

            // topics that user can ask
            nextTopics: [],

            hasPrompt: false,

            latestMsgContent: null
        },

        mounted() {
            $.getJSON('./assets/dialog.json', data => {
                this.dialogs = data;

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

                this.isXianzheTyping = true;

                const dialog = this.getDialog(id);

                getRandomMsg(dialog.details)
                    .forEach(content => {
                        this.msgChain = this.msgChain
                            .then(() => delay(700))
                            .then(() => this.sendMsg(content, AUTHOR.XIANZHE));
                    });

                return dialog.nextXianzhe
                    ? this.appendDialog(dialog.nextXianzhe)
                    : this.msgChain.then(() => {
                        this.lastDialog = dialog;
                        this.isXianzheTyping = false;
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
                const length = content.replace(/<[^>]+>/g,"").length;
                const isImg = /<img[^>]+>/.test(content);
                const isTyping = length > 5 || isImg;

                const msg = {
                    author: author,
                    content: isTyping ? TYPING_MSG_CONTENT : content,
                    isImg: isImg
                };
                this.messages.push(msg);

                if (isTyping) {
                    this.markMsgSize(msg);
                    setTimeout(updateScroll);

                    return delay(Math.min(100 * length, 2000))
                        .then(() => {
                            return this.markMsgSize(msg, content);
                        })
                        .then(() => delay(150))
                        .then(() => {
                            msg.content = content;
                            onMessageSending();
                        });
                }

                onMessageSending();

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

            markMsgSize(msg, content = null) {
                this.latestMsgContent = content || msg.content;

                return delay(0)
                    .then(() => msg.isImg && onImageLoad($('#mock-msg img')))
                    .then(() => {
                        Object.assign(msg, getMockMsgSize());
                        this.messages = [...this.messages];
                    });
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
                if (this.isXianzheTyping) {
                    // don't prompt if xianzhe is typing
                    return;
                }

                this.hasPrompt = toShow;
            },

            respond(response) {
                // send to ga
                if (_gaq) {
                    _gaq.push(['_trackEvent', 'Home', "respond", response.content]);
                }

                return this.say(response.content, response.nextXianzhe);
            },

            ask(fromUser) {
                // send to ga
                if (_gaq) {
                    _gaq.push(['_trackEvent', 'Home', "ask", fromUser.brief]);
                }
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
            onImageLoad($latestMsg).then(updateScroll);
        });
    }

    function updateScroll() {
        const $chatbox = $('#mobile-body-content');

        const distance = $chatbox[0].scrollHeight - $chatbox.height() - $chatbox.scrollTop();
        const duration = 250;
        const startTime = Date.now();

        requestAnimationFrame(function step() {
            const p = Math.min(1, (Date.now() - startTime) / duration);
            $chatbox.scrollTop($chatbox.scrollTop() + distance * p);
            p < 1 && requestAnimationFrame(step);
        });
    }

    function delay(amount = 0) {
        return new Promise(resolve => {
            setTimeout(resolve, amount);
        });
    }

    function getMockMsgSize() {
        const $mockMsg = $('#mock-msg');
        return {
            width: $mockMsg.width(),
            height: $mockMsg.height()
        };
    }

    function onImageLoad($img) {
        return new Promise(resolve => {
            $img.one('load', resolve)
                .each((index, target) => {
                    // trigger load when the image is cached
                    target.complete && $(target).trigger('load');
                });
        });
    }

})();
