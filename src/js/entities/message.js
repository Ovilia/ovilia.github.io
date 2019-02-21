import { generateId } from '../utils/id';
import marked from 'marked';

export default class Message {

    constructor(author, content) {
        this.id = generateId();
        this.author = author;
        this.content = marked(content);
    }

}
