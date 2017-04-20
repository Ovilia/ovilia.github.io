(function () {

    const AUTHOR = {
        XIANZHE: 'xianzhe',
        ME: 'me'
    };

    let vm = new Vue({
        el: '#mobile',

        data: {
            messages: [],
            dialogs: null,
            lastDialog: null,
            nextDialogs: ['0000'], // dialogs that has not yet send

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
                    let dialogId = vm.nextDialogs.shift();
                    vm.appendDialog(dialogId);

                    // add next dialog
                    let dialog = getDialog(dialogId);
                    vm.nextDialogs = vm.nextDialogs.concat(
                        dialog.nextXianzhe || []
                    );
                }
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

            togglePrompt: toShow => {
                vm.hasPrompt = toShow;
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
     * get dialog from dialog id
     */
    function getDialog(id) {
        // only one dialog should be matched by id
        let dialogs = vm.dialogs.fromXianzhe
            .concat(vm.dialogs.fromUser)
            .filter(dialog => dialog.id === id);
        return dialogs ? dialogs[0] : null;
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
