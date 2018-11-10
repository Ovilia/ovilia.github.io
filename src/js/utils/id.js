import shortid from 'shortid';

export function generateId() {
    return shortid.generate();
}
