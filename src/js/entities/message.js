import { generateId } from '../utils/id';
import marked from 'marked';

export default class Message {

    constructor(author, content) {
        this.id = generateId();
        this.author = author;

        const html = marked(content);
        const re = new RegExp('\<a ');
        this.content = html.replace(re, '<a target="_blank" ');
    }

}
