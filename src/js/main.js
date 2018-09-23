import Vue from 'vue';

import './components/components';
import { getPixelImage } from './utils/image';
import colors from './constants/colors';
import pagesConfig from './configs/pages';
import icons from './constants/icons';

const openAppDuration = 0.3; // seconds

export class Main {

    constructor() {
        this.data = {
            inApp: false,
            statusTheme: 'default',
            lastAppOpenPosition: [0, 0], // TODO: multiple apps?
            openedAppId: null,

            pages: pagesConfig,

            appDefaultBgImg: '',
            appLightBgImg: '',
            outAppBottomImg: ''
        };

        this.vm = new Vue({
            el: '#content',

            data: this.data,

            computed: {
                appBgImg: function () {
                    return this.appDefaultBgImg;
                }
            },

            methods: {
                openApp: function (name, event) {
                    this.inApp = true;
                    this.openedAppId = name;

                    this.$nextTick(() => {
                        const mobile = document.getElementById('mobile');
                        const mobileLeft = mobile.offsetLeft;
                        const mobileTop = mobile.offsetTop;

                        this.statusTheme = icons[name].appStatusTheme || 'default';

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
                        this.statusTheme = 'default';
                    }, openAppDuration * 1000);
                },

                resize: function () {
                    const mobile = document.getElementById('mobile');
                    this.appLightBgImg = getPixelImage(
                        mobile.clientWidth, mobile.clientHeight,
                        3, 0, colors.bgLight, colors.border
                    );
                    this.appDefaultBgImg = getPixelImage(
                        mobile.clientWidth, mobile.clientHeight,
                        3, 0, colors.bgDefault, colors.border
                    );

                    const bottom = document.getElementById('mobile-out-app-bottom');
                    this.outAppBottomImg = getPixelImage(
                        bottom.clientWidth, bottom.clientHeight,
                        [0, 0, 3, 3], 0, colors.appGroup, 'transparent'
                    );
                }
            },

            created: function () {
                this.$root.$on('open-app', (appId, event) => {
                    this.openApp(appId, event);
                });
            },

            mounted: function () {
                this.resize();
                window.addEventListener('resize', this.resize);
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
