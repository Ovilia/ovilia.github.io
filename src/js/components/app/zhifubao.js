import Vue from 'vue';

export default Vue.component('app-zhifubao', {

    template:
        `<div class="app-gooday mobile-body-content padding scroll">
            <div class="zhifubao-container">
                <h3>羡辙不喝咖啡，挑一本书送给她吧！</h3>
                <img class="zhifubao-img" src="assets/pay-zhifubao.png">
                <div class="note">
                    <p>送羡辙任意一本书，即可在下一个圣诞节的时候，收到一张羡辙自制的圣诞明信片。Email 邮寄地址、邮编、收件人至 <a href="mailto:me@zhangwenli.com">me@zhangwenli.com</a> 领取。</p>
                    <p>此外，也可以支付宝转账至 me@zhangwenli.com。</p>
                </div>
            </div>
        </div>`,

    data: function () {
        return {
        };
    },

    methods: {
    }
});
