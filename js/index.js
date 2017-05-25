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
                    // clear possible responses
                    this.lastDialog.responses = null;
                    return;
                }

                var dialog = this.getDialog(id);

                getRandomMsg(dialog.details).forEach(function (content) {
                    _this2.msgChain = _this2.msgChain.then(function () {
                        return delay(700);
                    }).then(function () {
                        return _this2.sendMsg(content, AUTHOR.XIANZHE);
                    });
                });

                return this.msgChain.then(function () {
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
                    return delay(Math.min(100 * length, 1000)) // TODO: 参数调优
                    .then(function () {
                        msg.content = content;
                        onMessageSending();
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
                return this.say(response.content, response.nextXianzhe);
            },
            ask: function ask(fromUser) {
                var content = getRandomMsg(fromUser.details);
                return this.say(content, fromUser.nextXianzhe);
            },
            say: function say(content, dialogId) {
                var _this3 = this;

                // close prompt
                this.hasPrompt = false;

                return delay(200)
                // send user msg
                .then(function () {
                    return _this3.sendMsg(content, AUTHOR.ME);
                }).then(function () {
                    return delay(300);
                })
                // add xianzhe's next dialogs
                .then(function () {
                    return _this3.appendDialog(dialogId);
                });
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
            // update scroll position when vue has updated ui
            updateScroll();

            var $latestMsg = $('#mobile-body-content .msg-row:last-child .msg');

            // add target="_blank" for links
            $latestMsg.find('a').attr('target', '_blank');

            // update scroll position when images are loaded
            $latestMsg.find('img').one('load', updateScroll).each(function (index, target) {
                // trigger load when the image is cached
                target.complete && $(target).trigger('load');
            });
        });
    }

    function updateScroll() {
        var $chatbox = $('#mobile-body-content');

        var distance = $chatbox[0].scrollHeight - $chatbox.height() - $chatbox.scrollTop();
        var duration = 200;
        var startTime = Date.now();

        // TODO: 加速再加速
        requestAnimationFrame(function step() {
            var p = Math.min(1, (Date.now() - startTime) / duration);
            $chatbox.scrollTop($chatbox.scrollTop() + distance * p * p);
            p < 1 && requestAnimationFrame(step);
        });
    }

    function delay() {
        var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        return new Promise(function (resolve) {
            setTimeout(resolve, amount);
        });
    }
})();