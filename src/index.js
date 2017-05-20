(function () {

    const AUTHOR = {
        XIANZHE: 'xianzhe',
        ME: 'me'
    };

    let msgSendingHandler = null;

    const vm = new Vue({
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

        mounted: () => {
            $.getJSON('./assets/dialog.json', data => {
                vm.dialogs = data;

                // TODO: update nextTopics according to dialog
                vm.nextTopics = vm.dialogs.fromUser;

                vm.appendDialog('0000');

                // auto-play messages
                vm.restartClock();
            });
        },

        methods: {

            playNext: () => {
                if (vm.nextMsgs.length > 0) {
                    // has unsent msg, send one
                    var msg = vm.nextMsgs.shift();
                    vm.sendMsg(msg.content, msg.author);

                    // check if to append new dialogs
                    if (vm.lastDialog && (vm.nextMsgs.length === 0
                        || vm.nextMsgs[0].dialog.id !== msg.dialog.id)
                    ) {
                        // end of messages with the same dialog
                        vm.appendDialog(msg.dialog.nextXianzhe);
                    }

                    vm.lastDialog = msg.dialog;
                }
            },

            appendDialog: id => {
                if (typeof id === 'object' && id.length > 0) {
                    // array of dialog ids
                    id.forEach(id => vm.appendDialog(id));
                    return;
                }
                else if (id == null) {
                    return;
                }

                let dialog = vm.getDialog(id);

                getRandomMsg(dialog.details)
                    .forEach(content => vm.nextMsgs.push({
                            content: content,
                            author: AUTHOR.XIANZHE,
                            dialog: dialog
                    }));

            },

            sendMsg: (message, author) => {
                vm.messages.push({
                    author: author,
                    type: '',
                    content: getRandomMsg(message)
                });

                onMessageSending();
            },

            getDialog: id => {
                // only one dialog should be matched by id
                const dialogs = vm.dialogs.fromXianzhe
                    .filter(dialog => dialog.id === id);
                return dialogs ? dialogs[0] : null;
            },

            getDialogFromUser: id => {
                // only one dialog should be matched by id
                const dialogs = vm.dialogs.fromUser
                    .filter(dialog => dialog.id === id);
                return dialogs ? dialogs[0] : null;
            },

            togglePrompt: toShow => {
                vm.hasPrompt = toShow;
            },

            respond: response => {
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

            ask: fromUser => {
                // close prompt
                vm.hasPrompt = false;

                // send user msg
                var content = getRandomMsg(fromUser.details);
                vm.sendMsg(content, AUTHOR.ME);

                // update xianzhe dialog
                vm.appendDialog(fromUser.nextXianzhe);
            },

            restartClock: () => {
                // stop interval
                if (msgSendingHandler) {
                    clearInterval(msgSendingHandler);
                    msgSendingHandler = null;
                }

                // start interval
                msgSendingHandler = setInterval(() => {
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

        let id = Math.floor(Math.random() * messages.length);
        return messages[id];
    }


    /**
     * UI updating when new message is sending
     */
    function onMessageSending() {
        setTimeout(() => {
            // update scroll position when vue has updated ui
            const $chatbox = $('#mobile-body-content');
            $chatbox.scrollTop(
                $chatbox[0].scrollHeight - $chatbox.height()
            );

            // add target="_blank" for links
            $('.msg a').attr('target', '_blank');
        });
    }

})();
