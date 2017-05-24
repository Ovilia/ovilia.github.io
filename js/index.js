'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {

    var AUTHOR = {
        XIANZHE: 'xianzhe',
        ME: 'me'
    };

    var TYPING_MSG_CONTENT = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';

    var msgSendingHandler = null;

    var vm = new Vue({
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

        mounted: function mounted() {
            var _this = this;

            $.getJSON('./assets/dialog.json', function (data) {
                _this.dialogs = data;

                // TODO: update nextTopics according to dialog
                _this.nextTopics = _this.dialogs.fromUser;

                _this.appendDialog('0000');
            });
        },


        methods: {
            appendDialog: function appendDialog(id) {
                var _this2 = this;

                if ((typeof id === 'undefined' ? 'undefined' : _typeof(id)) === 'object' && id.length > 0) {
                    // array of dialog ids
                    id.forEach(function (id) {
                        return _this2.appendDialog(id);
                    });
                    return;
                } else if (id == null) {
                    return;
                }

                var dialog = this.getDialog(id);

                getRandomMsg(dialog.details).forEach(function (content) {
                    _this2.msgChain = _this2.msgChain.then(function () {
                        return _this2.sendMsg(content, AUTHOR.XIANZHE);
                    });
                });

                this.msgChain.then(function () {
                    _this2.lastDialog = dialog;
                });
            },
            sendMsg: function sendMsg(message, author) {
                switch (author) {
                    case 'me':
                        return this.sendUserMsg(message);
                    default:
                        return this.sendFriendMsg(message, author);
                }
            },
            sendFriendMsg: function sendFriendMsg(message, author) {
                var content = getRandomMsg(message);
                var length = content.length;
                var isTyping = length > 5;

                var msg = {
                    author: author,
                    content: isTyping ? TYPING_MSG_CONTENT : content
                };
                this.messages.push(msg);

                onMessageSending();

                if (isTyping) {
                    return new Promise(function (resolve) {
                        setTimeout(function () {
                            msg.content = content;
                            onMessageSending();
                            resolve();
                        }, Math.min(100 * length, 2000) // TODO: 参数调优
                        );
                    });
                }

                return Promise.resolve();
            },
            sendUserMsg: function sendUserMsg(message) {
                this.messages.push({
                    author: AUTHOR.ME,
                    content: message
                });

                onMessageSending();

                return Promise.resolve();
            },
            getDialog: function getDialog(id) {
                // only one dialog should be matched by id
                var dialogs = this.dialogs.fromXianzhe.filter(function (dialog) {
                    return dialog.id === id;
                });
                return dialogs ? dialogs[0] : null;
            },
            getDialogFromUser: function getDialogFromUser(id) {
                // only one dialog should be matched by id
                var dialogs = this.dialogs.fromUser.filter(function (dialog) {
                    return dialog.id === id;
                });
                return dialogs ? dialogs[0] : null;
            },
            togglePrompt: function togglePrompt(toShow) {
                this.hasPrompt = toShow;
            },
            respond: function respond(response) {
                // close prompt
                this.hasPrompt = false;

                // send my response
                this.sendMsg(response.content, AUTHOR.ME);

                // add xianzhe's next dialogs
                this.appendDialog(response.nextXianzhe);

                // clear possible responses
                this.lastDialog.responses = null;
            },
            ask: function ask(fromUser) {
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

        var id = Math.floor(Math.random() * messages.length);
        return messages[id];
    }

    /**
     * UI updating when new message is sending
     */
    function onMessageSending() {
        setTimeout(function () {
            var $chatbox = $('#mobile-body-content');

            // update scroll position when vue has updated ui
            $chatbox.scrollTop($chatbox[0].scrollHeight - $chatbox.height());

            // add target="_blank" for links
            var $latestMsg = $chatbox.find('.msg-row:last-child .msg');
            $latestMsg.find('a').attr('target', '_blank');
        });
    }
})();