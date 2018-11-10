import { generateId } from '../utils/id';

export default class Message {

    constructor(author, content) {
        this.id = generateId();
        this.author = author;
        this.content = content;
    }

}
