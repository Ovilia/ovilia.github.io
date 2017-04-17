(function () {

    var vm = new Vue({
        el: '#mobile',

        data: {
            messages: [],

            dialogs: null
        },

        methods: {
            init: function () {
                $.getJSON('../assets/dialog.json', function (data) {
                    vm.dialogs = data;

                    vm.nextMsg();
                });
            },

            nextMsg: function () {
                if (vm.messages.length === 0) {
                    vm.appendMsgs('0000');
                }
            },

            appendMsgs: function (id) {
                if (!vm.dialogs) {
                    return;
                }

                var dialogs = vm.dialogs.fromXianzhe;
                for (var dialogId = 0; dialogId < dialogs.length; ++dialogId) {
                    if (dialogs[dialogId].id === id) {
                        var dialog = dialogs[dialogId];

                        // send multiple details
                        for (var detailId = 0; detailId < dialog.details.length;
                            ++detailId)
                        {
                            vm.messages.push({
                                author: 'xianzhe',
                                type: '',
                                content: getRandomMsg(dialog.details[detailId])
                            });
                        }
                    }
                }
            }
        }
    });

    vm.init();


    function getRandomMsg(messages) {
        // convert into string of single msg in form of string
        if (typeof messages === 'string') {
            return getRandomMsg([messages]);
        }

        var id = Math.floor(Math.random() * messages.length);
        return messages[id];
    }

})();
