import '../scss/app.scss';

import { Main } from './main';

init();

function init() {
    resize();
    window.addEventListener('resize', resize);

    new Main();
}

function resize() {
    const mobile = document.getElementById('mobile');

    if (window.innerWidth < 480) {
        // Mobile design
        mobile.style.width = '100%';
        mobile.style.height = '100%';
        mobile.style.marginLeft = '-50%';
        mobile.style.marginTop = '0';
        mobile.style.top = '0';
        return;
    }

    const margin = 15;
    let width = window.innerWidth - margin * 2;
    let height = window.innerHeight - margin * 2;

    const targetWidth = 750;
    const targetHeight = 1334;
    const ratio = targetWidth / targetHeight;

    if (width / height > ratio) {
        width = Math.round(height * ratio);
    }
    else {
        height = Math.round(width / ratio);
    }

    mobile.style.width = width + 'px';
    mobile.style.height = height + 'px';
    mobile.style.marginLeft = '-' + width / 2 + 'px';
    mobile.style.marginTop = '-' + height / 2 + 'px';
    mobile.style.top = '50%';
}
