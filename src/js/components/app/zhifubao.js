import Vue from 'vue';

const rootPath = __DEV__ ? '' : 'dist/';

export default Vue.component('app-zhifubao', {

    template:
        `<div class="app-gooday mobile-body-content padding scroll">
            <div class="zhifubao-container">
                <div class="zhifubao-note">
                    <div>如果你觉得我的网站对你有帮助或启发</div>
                    <div>可以送我一本想读的书哦！</div>
                </div>
                <img class="zhifubao-img" src="${rootPath}assets/pay-zhifubao.png">
                <div class="zhifubao-note">或支付宝转账至 me@zhangwenli.com</div>
            </div>
            <div class="zhifubao-about">
                送羡辙任意一本书，即可在下一个圣诞节的时候，收到一张羡辙自制的圣诞明信片。Email 邮寄地址、邮编、收件人至 <a href="mailto:me@zhangwenli.com">me@zhangwenli.com</a> 领取。
            </div>
        </div>`,

    data: function () {
        return {
        };
    },

    methods: {
    }
});
