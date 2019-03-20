import { generateId } from '../utils/id';
import marked from 'marked';

export default class Message {

    constructor(author, content) {
        this.id = generateId();
        this.author = author;

        const html = marked(content || '');
        const re = new RegExp('\<a ');
        this.content = html.replace(re, '<a target="_blank" ');
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
    }

}
