import Vue from 'vue';
import Message from '../../entities/message';
import AUTHOR from '../../constants/author';

export default Vue.component('app-wechat', {

    template:
        `<div>
            <div class="app-wechat mobile-body-content">
                <msg-container :messages="messages"></msg-container>
            </div>
        </div>`,

    data: function () {
        return {
            messages: []
        };
    },

    methods: {
    },

    created: function () {
        // // tmp
        // for (let i = 0; i < 10; ++i) {
        //     this.messages.push(new Message(
        //         Math.random() > 0.6 ? AUTHOR.AUDIENCE : AUTHOR.XIANZHE,
        //         '今天天气不错，所以需要测试一下中文的显示。毕竟有什么不好呢？'
        //     ));
        // }
        // console.log(this.messages);
    }

});
