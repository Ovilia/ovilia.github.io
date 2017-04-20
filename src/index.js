(function () {

    const AUTHOR = {
        XIANZHE: 'xianzhe',
        ME: 'me'
    };

    const vm = new Vue({
        el: '#mobile',

        data: {
            messages: [],
            dialogs: null,
            lastDialog: null,
            nextDialogs: ['0000'], // dialogs not yet send

            hasPrompt: false
        },

        mounted: () => {
            $.getJSON('./assets/dialog.json', data => {
                vm.dialogs = data;
                vm.nextMsg();

                // TODO: add animation here
                setInterval(() => {
                    vm.nextMsg();
                }, 1000);
            });
        },

        methods: {
            nextMsg: () => {
                if (vm.nextDialogs.length > 0) {
                    // send next messages
                    const dialogId = vm.nextDialogs.shift();
                    vm.appendDialog(dialogId);

                    // add next dialog
                    const dialog = getDialog(dialogId);
                    vm.nextDialogs = vm.nextDialogs.concat(
                        dialog.nextXianzhe || []
                    );
                }
            },

            appendDialog: id => {
                if (!vm.dialogs) {
                    return;
                }

                let dialog = getDialog(id);
                vm.lastDialog = dialog;

                getRandomMsg(dialog.details)
                    .forEach(
                        content => vm.appendMsg(content, AUTHOR.XIANZHE)
                    );
            },

            appendMsg: (message, author) => {
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
                    .concat(vm.dialogs.fromUser)
                    .filter(dialog => dialog.id === id);
                return dialogs ? dialogs[0] : null;
            },

            togglePrompt: toShow => {
                vm.hasPrompt = toShow;
            },

            respond: (response) => {
                // close prompt
                vm.hasPrompt = false;

                // send my response
                vm.appendMsg(response.content, AUTHOR.ME);

                // add xianzhe's next dialogs
                vm.nextDialogs = vm.nextDialogs.concat(
                    response.nextXianzhe || []
                );
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
