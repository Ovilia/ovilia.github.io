(function () {

    let vm = new Vue({
        el: '#mobile',

        data: {
            messages: [],
            dialogs: null,
            lastDialog: null,

            hasPrompt: false
        },

        methods: {
            init: () => {
                $.getJSON('./assets/dialog.json', data => {
                    vm.dialogs = data;
                    vm.nextMsg();
                });
            },

            nextMsg: () => {
                if (vm.messages.length === 0) {
                    vm.appendDialog('0000');
                }
            },

            appendDialog: id => {
                if (!vm.dialogs) {
                    return;
                }

                vm.dialogs.fromXianzhe
                    .filter(dialog => {
                        return dialog.id === id;
                    })
                    .forEach(dialog => {
                        // only one dialog should be matched by id
                        vm.lastDialog = dialog;
                        getRandomMsg(dialog.details)
                            .forEach((content) => vm.appendMsg(content));
                    });
            },

            appendMsg: message => {
                vm.messages.push({
                    author: 'xianzhe',
                    type: '',
                    content: getRandomMsg(message)
                });
            },

            togglePrompt: toShow => {
                vm.hasPrompt = toShow;
            }
        }
    });

    vm.init();


    function getRandomMsg(messages) {
        // single item
        if (typeof messages === 'string' || !messages.length) {
            return messages;
        }

        var id = Math.floor(Math.random() * messages.length);
        return messages[id];
    }

})();
