import Vue from 'vue';

export default Vue.component('app-comment', {

    template:
        `<div class="app-comment mobile-body-content padding scroll">
            <div id="disqus_thread"></div>
            <div class="dsq-brlink">留言可能需要科学的上网方式，如果无法访问，欢迎<a href="mailto:zhangwenli.com">给我发邮件</a>，或在 <a href="https://github.com/Ovilia/ovilia.github.io/issues/10">GitHub issue</a> 中反馈意见。</div>
        </div>`,

    data: function () {
        return {
        };
    },

    mounted: function () {
        var dsq = document.createElement('script');
        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = '//wenli.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    },

    methods: {
    }
});
