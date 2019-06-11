import {MSG_DURATION, MESSAGES_KEY_IN_STORAGE} from '../constants/storage';

const CACHE_TIME_KEY = 'cacheTime';

export function isStale() {
    const lastTime = parseInt(localStorage.getItem(CACHE_TIME_KEY));
    const now = Date.now();
    const msgs = localStorage.getItem(MESSAGES_KEY_IN_STORAGE);
    return lastTime && (now - lastTime > MSG_DURATION * 1000)
        || !lastTime && msgs;
}

export function updateStale() {
    const now = Date.now();
    localStorage.setItem(CACHE_TIME_KEY, now);
}
