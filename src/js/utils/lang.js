import Cookies from 'js-cookie';

const cookieKey = 'home-lang';

export function getLang () {
    const fromCookie = Cookies.get(cookieKey);
    const lang = fromCookie || navigator.language || navigator.userLanguage;
    return lang.indexOf('zh') > -1 ? 'zh' : 'en';
};


export function setLang(lang) {
    Cookies.set(cookieKey, lang);
    location.href = location.href;
};
