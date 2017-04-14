// This file is for animation test only.

(function () {
    
    function Message(options) {
        this.author = options.author;
        this.isMine = options.isMine;
        this.type = options.type || 'text';
        this.content = options.content;
        this.delay = options.delay || 0;
        this.typingDuration = this.isMine ? 0 : options.typingDuration;
        this.$el = null;

        this.init();
    }

    Message.prototype.init = function () {
        this.$el = $(
            '<div class="msg-row msg-' + (this.isMine ? 'me': 'xianzhe') + '">'
            + '<div class="msg msg-txt">' + this.content + '</div>'
            + '</div>'
        )
            .hide()
            .appendTo('#mobile-body-content');
    };

    Message.prototype.animate = function () {
        var me = this;

        return new Promise(function (resolve) {    
            setTimeout(
                function () {
                    var animClass = 'msg-bounce-in-' + (me.isMine ? 'right' : 'left');
                    me.$el
                        .show()
                        .find('.msg')
                            .addClass(animClass);
                    
                    // setTimeout(resolve, 500);
                    resolve();
                },
                me.delay
            );
        });
    };

    Message.prototype.showTypingEffect = function () {
    };


    var script = {
        msgDataList: [
            {
                type: 'text',
                author: '羡辙',
                isMine: false,
                content: '很高兴遇见你！',
                delay: 1000,
                typingDuration: 1000
            },
            {
                type: 'text',
                author: '钰猫',
                isMine: true,
                content: '很高兴遇见你！',
                delay: 1000
            },
            {
                type: 'text',
                author: '羡辙',
                isMine: false,
                content: '好吧……',
                delay: 1000,
                typingDuration: 1000
            },
            {
                type: 'text',
                author: '羡辙',
                isMine: false,
                content: '我也就客气一下，你别当真',
                delay: 1000
            }
        ],

        run: function () {
            var p = null;
            var animateMsg = function (data) {
                return new Message(data).animate();
            };

            this.msgDataList.forEach(function (data) {
                p = !p
                    ? animateMsg(data)
                    : p.then(function () {
                        return animateMsg(data);
                    });
            });
        }
    }

    script.run();

})();
