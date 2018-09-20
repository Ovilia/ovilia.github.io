import Vue from 'vue';

import './components/components';

const openAppDuration = 0.2; // seconds

export class Main {

    constructor() {
        this.data = {
            inApp: false,
            statusTheme: 'light',
            lastAppOpenPosition: [0, 0] // TODO: multiple apps?
        };

        this.vm = new Vue({
            el: '#content',

            data: this.data,

            methods: {
                openApp: function (name, event) {
                    this.inApp = true;

                    // TODO: config somewhere
                    if (/*['gooday'].indexOf(name) > -1*/ true) {
                        this.statusTheme = 'dark';
                    }
                    else {
                        this.statusTheme = 'light';
                    }

                    this.$nextTick(() => {
                        const mobile = document.getElementById('mobile');
                        const mobileLeft = mobile.offsetLeft;
                        const mobileTop = mobile.offsetTop;

                        // TODO: multiple apps?
                        const x = event.clientX - mobileLeft;
                        const y = event.clientY - mobileTop;
                        setInAppAnimation(
                            x, y, '0', '0', '0',
                            '0', '0', '100%', '100%', '1'
                        );
                        this.lastAppOpenPosition = [x, y];
                    });
                },

                exitApp: function () {
                    const x = this.lastAppOpenPosition[0];
                    const y = this.lastAppOpenPosition[1];
                    setInAppAnimation(
                        '0', '0', '100%', '100%', '1',
                        x + 'px', y + 'px', '0', '0', '0',
                    );

                    setTimeout(() => {
                        this.inApp = false;
                        this.statusTheme = 'light';
                    }, openAppDuration * 1000);
                }
            }
        });
    }
}

function setInAppAnimation(startX, startY, startW, startH, startOp, endX, endY, endW, endH, endOp) {
    const target = document.getElementsByClassName('mobile-in-app')[0];
    target.style['transition-duration'] = '0';
    target.style.left = startX + 'px';
    target.style.top = startY + 'px';
    target.style.width = startW;
    target.style.height = startH;
    target.style.opacity = startOp;

    setTimeout(() => {
        target.style['transition-duration'] = openAppDuration + 's';
        target.style.left = endX;
        target.style.top = endY;
        target.style.width = endW;
        target.style.height = endH;
        target.style.opacity = endOp;
    });
}
