import { generateId } from '../utils/id';
import marked from 'marked';

export default class Message {

    constructor(author, content) {
        this.id = generateId();
        this.author = author;
        this.isFromJson = false;

        const html = marked(content || '');

        if (html.indexOf('$$$PAY_BY_ZHIFUBAO$$$') > -1) {
            this.content = '<div class="wechat-pay-img pay-with-zhifubao"></div>';
        }
        else if (html.indexOf('$$$PAY_BY_WECHAT$$$') > -1) {
            this.content = '<div class="wechat-pay-img pay-with-wechat"></div>';
        }
        else {
            const re = new RegExp('\<a ');
            this.content = html.replace(re, '<a target="_blank" ');
        }
    }

    isSame(msg) {
        return msg.content === this.content && msg.author === this.author;
    }

    toJson() {
        return {
            id: this.id,
            author: this.author,
            content: this.content
        };
    }

    fromJson(json) {
        this.id = json.id;
        this.author = json.author;
        this.content = json.content;
        this.isFromJson = true;
        return this;
    }

}
