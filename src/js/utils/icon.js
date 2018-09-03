import zhihuPath from './svgs/zhihu';
import githubPath from './svgs/github';
import wechatPath from './svgs/wechat';
import goodayPath from './images/gooday';
import weiboPath from './images/weibo';

const icons = {
    zhihu: {
        type: 'svg',
        color: '#0B88EB',
        size: [31, 33],
        path: zhihuPath,
        link: 'https://www.zhihu.com/people/ovilia'
    },
    github: {
        type: 'svg',
        color: '#24292e',
        size: [34, 33.19],
        path: githubPath,
        link: 'https://github.com/Ovilia'
    },
    wechat: {
        type: 'svg',
        color: '#20B62A',
        size: [36.969, 29.031],
        path: wechatPath
    },
    gooday: {
        type: 'img',
        path: goodayPath,
        link: 'https://itunes.apple.com/cn/app/%E7%89%99%E5%93%88%E5%93%88-%E5%BF%83%E6%83%85%E6%97%A5%E8%AE%B0/id1274456709?mt=8'
    },
    weibo: {
        type: 'img',
        path: weiboPath,
        link: 'https://weibo.com/plainjane'
    }
};

export default icons;
