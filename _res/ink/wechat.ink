-> welcome

=== welcome ===
嗨，很高兴见到你啊！ # xianzhe

    * 我也是[]！！！
        -> about
    
    * ……
        -> about
    
    * 诶？这对话让我觉得有点似曾相识……
        看起来是我的老粉丝啊！ # xianzhe
        -> about



=== about ===
祝贺你捡到了我的手机 # xianzhe
    * 哈？
        -> what_is_this
    
    * 什么？
        -> what_is_this
    
    * ……
        -> what_is_this
    
= what_is_this
这是我的个人网站 # xianzhe
也是一个手机，里面的每个 App 都是关于我的一个角度。比如，GitHub App 会链接到我的 GitHub 网页。 # xianzhe
你可以自己体验一下哦！ # xianzhe
    * [酷]这听起来很酷
    哈哈，很高兴你喜欢！ # xianzhe
        -> who_am_i
    
    * ……
        -> who_am_i

= who_am_i
    我的常用网名是羡辙，英文 ID 是 Ovilia # xianzhe
    我是一个有着广泛爱好的程序员，包括设计、音乐、画画等等……
    我喜欢一切能发挥创造力的事情，喜欢给自己挖新坑，做一些有意思的项目！这个网站就算是其中的一个坑吧~ # xianzhe
    * 羡辙是什么意思
        -> about_name
    
    * 赞哦！
        嘿嘿，谢谢！ # xianzhe
        -> why_this
    
    * ……
        -> why_this
    
= about_name
    羡辙是我在阿里实习时候给自己起的花名，如果你想知道更多的话可以看这篇文章 # xianzhe
    http:\/\/zhangwenli.com/blog/2015/04/29/new-name/ # xianzhe
    -> why_this
    
= why_this
    * [为什么做这个]你怎么想到做这样的个人网站的？
        我每年都会重构一下我的个人网站，坚持五年了吧…… # xianzhe
        去年我做了一个对话式的个人主页，就是这样的： # xianzhe
        http:\/\/zhangwenli.com/2017 # xianzhe
        在这个版本的基础上，今年我又把其他功能做成了一个个 App 的形式
        有时候我会想，现实中被人认识的那个我，和网上别人通过我的微博、GitHub 等等了解到的我，到底本质上有多少区别 # xianzhe
        是不是如果有这样可以和我聊天的地方，就会让一个陌生人感觉我就是现实生活中的一个人呢？ # xianzhe
        * * 额……[]难道你不是么
            …… # xianzhe
            好吧，当我什么都没说吧…… # xianzhe
                -> who_are_you
        * * 嗯……[]我想我们偶尔都会有这种感觉吧……
            你能理解就最好啦！:) # xianzhe
                -> who_are_you
        * * 感觉你只是在自言自语[……]
            嗯…… # xianzhe
            如果你没有跟着我思考的话，我的确是在自言自语吧…… # xianzhe
            我也觉得自己挺无聊的…… # xianzhe
            但是 # xianzhe
            你居然还在看，是不是说明你也挺无聊的哈哈哈…… # xianzhe
                -> who_are_you

= who_are_you
    我说了这么多，还没问你是谁呢~ # xianzhe
        * [你的粉丝]我？我当然是你的粉丝了！
            哈哈，谢谢你这么说 # xianzhe
            -> topics
        * [不告诉你]我选择保持我的神秘感
            好吧，不过很高兴认识你！ # xianzhe
            -> topics
        * 你猜
            这并不有趣…… # xianzhe
            -> topics



=== topics ===
接下来你想知道点什么呢？ # xianzhe

    * [工作]你的工作是什么呢？
        我毕业后就去了百度做 ECharts，前端可视化相关的工作 # xianzhe
        * * 听起来很酷
            -> topics
        * * 「看机会」吗
            \TODO: 这里判断一下是不是老板
            如果钱多活少离家近的话不是不可以考虑 # xianzheme
            * * * 这么任性？
                但是如果钱比现在少，活比现在多，离家比现在远，吸引我的动力是什么？ # xianzheme
                * * * * 比如理想？
                    理想是钱多活少离家近 # xianzheme
                    * * * * * ……
                        总之，如果你执意要联系我的话，可以给我发邮件 me at zhangwenli.com # xianzheme
                        -> topics
    * [爱好]羡辙业余时间喜欢做点什么呢？
        作为一个三分钟热度的人，这个问题的答案其实有很多…… # xianzhe
        -> hobbies
    * [打赏]我觉得这个项目真棒，我可以怎样打赏你呢？
        哇塞？真的吗！ # xianzhe
        你太可爱啦！
        你想怎样支付呢？
        * * 支付宝
            $$$PAY_BY_ZHIFUBAO$$$ # xianzhe
            -> after_pay
        * * 微信
            $$$PAY_BY_WECHAT$$$ # xianzhe
            -> after_pay
        * * 算了吧
            -> topics
    * [没有啦]就这些吧
        -> ending
        
= after_pay
    谢谢你的打赏啦！ # xianzhe
    我会努力做得更好哒~ # xianzhe
        * * 那就太好啦
            -> topics
        * * 其实不那么努力也没关系
            诶，这么说真是很温暖的呢…… # xianzhe
            -> topics

= hobbies
    想知道哪方面的爱好呢？
    * [设计]羡辙你的设计感不错啊，作为程序员尤其不容易
        谢谢夸奖，跟设计师水平当然还差得远。不过对于程序员来讲，有一些设计能力，还是很有帮助的。最直接的好处是，有些什么想法，可以得心应手地完整设计实现出来。 # xianzhe
        我平时比较爱看 Dribbble 之类的网站，培养自己的审美，多思考别人是怎么做出来的 # xianzhe
        我想这和学习编程本质上也差不多，只是并不是所有程序员都感兴趣以及真的投入时间去学习罢了
        -> hobbies
    * [画画]你会画画吗？
        我挺喜欢画画的，不过基本上都是非常业余的自学水平 # xianzhe
        最近画得比较多的是水彩 # xianzhe
        可以在我的「相册」中看到我的画哦~ # xianzhe
        -> hobbies
    * [阅读]有什么好书推荐吗？
        关于游戏的方方面面：《游戏设计艺术》；传记类：《小脚与西服》；虚构类：《疼》。不妨看看哦！
        更多书单可以在[这里](https:\/\/www.douban.com/doulist/39632745/)看到 # xianzhe
        -> hobbies
    * [没有啦]嗯，爱好了解得差不多了呢~
        -> topics



=== ending ===
嗯嗯，我暂时也没有别的想说的啦 # xianzhe
    今天真的好开心呢，可以遇到你，说了这么多话~ # xianzhe
    现在真是越来越不爱跟人聊天了呢……你觉得我是不是有点问题？ # xianzhe
        * * 你没有问题[]，相信我
            哈哈，谢谢 # xianzhe
            如果你有时间的话，或许……以后可以多来看看我吗 # xianzhe
                * * * 没问题
                    -> DONE
                * * * 我不敢承诺[]什么，不过我想我会尽力的
                    -> DONE
                * * * 我可能不会再来了[]，但是，你可以来找我呀？
                    -> DONE
        * * 可能吧……[]但谁没有呢……
            嗯……你说得很有道理……
            -> DONE

= goodbye
好的，那么再见了 # xianzhe
    * * 再见
        -> DONE
