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

            // messages not sent yet
            nextMsgs: [],

            // topics that user can ask
            nextTopics: [],

            hasPrompt: false
        },

        mounted: function mounted() {
            $.getJSON('./assets/dialog.json', function (data) {
                vm.dialogs = data;

                // TODO: update nextTopics according to dialog
                vm.nextTopics = vm.dialogs.fromUser;

                vm.appendDialog('0000');

                // auto-play messages
                vm.restartClock();
            });
        },

        methods: {

            playNext: function playNext() {
                if (vm.nextMsgs.length > 0) {
                    // has unsent msg, send one
                    var msg = vm.nextMsgs.shift();
                    vm.sendMsg(msg.content, msg.author);

                    // check if to append new dialogs
                    if (vm.lastDialog && (vm.nextMsgs.length === 0 || vm.nextMsgs[0].dialog.id !== msg.dialog.id)) {
                        // end of messages with the same dialog
                        vm.appendDialog(msg.dialog.nextXianzhe);
                    }

                    vm.lastDialog = msg.dialog;
                }
            },

            appendDialog: function appendDialog(id) {
                if ((typeof id === 'undefined' ? 'undefined' : _typeof(id)) === 'object' && id.length > 0) {
                    // array of dialog ids
                    id.forEach(function (id) {
                        return vm.appendDialog(id);
                    });
                    return;
                } else if (id == null) {
                    return;
                }

                var dialog = vm.getDialog(id);

                getRandomMsg(dialog.details).forEach(function (content) {
                    return vm.nextMsgs.push({
                        content: content,
                        author: AUTHOR.XIANZHE,
                        dialog: dialog
                    });
                });
            },

            sendMsg: function sendMsg(message, author) {
                switch (author) {
                    case 'me':
                        return vm.sendUserMsg(message);
                    default:
                        return vm.sendFriendMsg(message, author);
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
                vm.messages.push(msg);

                onMessageSending();

                if (isTyping) {
                    return new Promise(function (resolve) {
                        setTimeout(function () {
                            msg.content = content;
                            onMessageSending();
                            resolve();
                        }, Math.min(200 * length, 2000) // TODO: 参数调优
                        );
                    });
                }

                return Promise.resolve();
            },

            sendUserMsg: function sendUserMsg(message) {
                vm.messages.push({
                    author: AUTHOR.ME,
                    content: message
                });

                onMessageSending();

                return Promise.resolve();
            },

            getDialog: function getDialog(id) {
                // only one dialog should be matched by id
                var dialogs = vm.dialogs.fromXianzhe.filter(function (dialog) {
                    return dialog.id === id;
                });
                return dialogs ? dialogs[0] : null;
            },

            getDialogFromUser: function getDialogFromUser(id) {
                // only one dialog should be matched by id
                var dialogs = vm.dialogs.fromUser.filter(function (dialog) {
                    return dialog.id === id;
                });
                return dialogs ? dialogs[0] : null;
            },

            togglePrompt: function togglePrompt(toShow) {
                vm.hasPrompt = toShow;
            },

            respond: function respond(response) {
                // close prompt
                vm.hasPrompt = false;

                // send my response
                vm.sendMsg(response.content, AUTHOR.ME);

                // add xianzhe's next dialogs
                vm.appendDialog(response.nextXianzhe);

                // clear possible responses
                vm.lastDialog.responses = null;

                // send msg after a duration
                vm.restartClock();
            },

            ask: function ask(fromUser) {
                // close prompt
                vm.hasPrompt = false;

                // send user msg
                var content = getRandomMsg(fromUser.details);
                vm.sendMsg(content, AUTHOR.ME);

                // update xianzhe dialog
                vm.appendDialog(fromUser.nextXianzhe);
            },

            restartClock: function restartClock() {
                // stop interval
                if (msgSendingHandler) {
                    clearInterval(msgSendingHandler);
                    msgSendingHandler = null;
                }

                // start interval
                msgSendingHandler = setInterval(function () {
                    vm.playNext();
                }, 1000);
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