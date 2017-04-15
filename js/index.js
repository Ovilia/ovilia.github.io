// This file is for animation test only.

(function () {
    
    function Message(options) {
        this.author = options.author;
        this.isMine = options.isMine;
        this.type = options.type;
        this.content = options.content;
        this.delay = options.delay || 0;
        this.typingDuration = (this.isMine || !options.typingDuration) ? 0 : options.typingDuration;
        this.$el = null;

        this.init();
    }

    Message.prototype.init = function () {
        this.$el = $(
            '<div class="msg-row msg-' + (this.isMine ? 'me': 'xianzhe') + '">'
            + (function (type, content) {
                switch (type) {
                    case 'text':
                        return '<div class="msg msg-txt">' + content + '</div>';
                    case 'image':
                        return '<img class="msg msg-img" src="' + content +'">'
                }
            })(this.type, this.content)
            + '</div>'
        )
            .hide()
            .appendTo('#mobile-body-content');
    };

    Message.prototype.animate = function () {
        this.typingDuration && this.showTypingEffect();

        var me = this;

        return new Promise(function (resolve) {    
            setTimeout(
                function () {
                    var animClass = 'msg-bounce-in-' + (me.isMine ? 'right' : 'left');
                    me.$el
                        .show()
                        .find('.msg')
                            .show()
                            .addClass(animClass);

                    resolve();
                },
                me.delay + me.typingDuration
            );
        });
    };

    Message.prototype.showTypingEffect = function () {
        var $el = this.$el;

        setTimeout(
            function () {
                $el.find('.msg').hide();
                $el
                    .prepend(
                        '<div class="msg-typing">'
                        + '    <div class="dot"></div>'
                        + '    <div class="dot"></div>'
                        + '    <div class="dot"></div>'
                        + '</div>'
                    )
                    .show();
            },
            this.delay
        );

        setTimeout(
            function () {
                $el.find('.msg-typing').remove();
            },
            this.delay + this.typingDuration
        );
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
                content: '真的吗？',
                delay: 1000
            },
            {
                type: 'text',
                author: '羡辙',
                isMine: false,
                content: '好吧……',
                delay: 1000,
                typingDuration: 1100
            },
            {
                type: 'text',
                author: '羡辙',
                isMine: false,
                content: '我也就客气一下，你别当真',
                delay: 200,
                typingDuration: 1100
            },
            {
                type: 'text',
                author: '钰猫',
                isMine: true,
                content: '我知道你是真心的！',
                delay: 1000
            },
            {
                type: 'text',
                author: '羡辙',
                isMine: false,
                content: '那证明给我看看',
                delay: 1000,
                typingDuration: 2200
            },
            {
                type: 'image',
                author: '钰猫',
                isMine: true,
                content: 'http://ogn7l0pet.bkt.clouddn.com/ntmy.jpeg',
                delay: 1500
            },
            {
                type: 'text',
                author: '羡辙',
                isMine: false,
                content: '哈哈，厉害了！',
                delay: 1000,
                typingDuration: 1000
            },
            {
                type: 'text',
                author: '钰猫',
                isMine: true,
                content: '半年快乐！',
                delay: 1200
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
