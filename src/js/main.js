import Vue from 'vue';

import './components/components';
import { getPixelImage } from './utils/image';
import colors from './constants/colors';
import pagesConfig from './configs/pages';

const openAppDuration = 0.3; // seconds

export class Main {

    constructor() {
        this.data = {
            inApp: false,
            statusTheme: 'light',
            lastAppOpenPosition: [0, 0], // TODO: multiple apps?

            pages: pagesConfig,

            outAppImg: '',
            outAppBottomImg: ''
        };

        this.vm = new Vue({
            el: '#content',

            data: this.data,

            methods: {
                openApp: function (name, event) {
                    console.log(name, event);
                    this.inApp = true;

                    // TODO: config somewhere
                    this.statusTheme = 'dark';

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
                },

                resize: function () {
                    const mobile = document.getElementById('mobile');
                    this.outAppImg = getPixelImage(
                        mobile.clientWidth, mobile.clientHeight,
                        3, 0, colors.bgLighter, colors.border
                    );

                    const bottom = document.getElementById('mobile-out-app-bottom');
                    this.outAppBottomImg = getPixelImage(
                        bottom.clientWidth, bottom.clientHeight,
                        [0, 0, 3, 3], 0, colors.appGroup, 'transparent'
                    );
                }
            },

            mounted: function () {
                this.resize();
                window.addEventListener('resize', this.resize);

                this.$on('open-app', this.openApp);
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
