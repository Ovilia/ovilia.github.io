import Vue from 'vue';

export default Vue.component('slider', {

    props: {
        pages: {
            type: Array,
            default: () => []
        }
    },

    data: function () {
        return {
            isMouseDown: false,
            pageId: 0,
            pageContainer: null,
            lastMoveX: null,
            lastDownX: null
        };
    },

    template:
        `<div class="slider"
            @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp" @mouseleave="mouseUp"
            @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"
            :style="">
            <div class="slider-page-container">
                <slider-page v-for="page in pages" :key="page.id"
                    :app-groups="page.groups">
                </slider-page>
            </div>
            <div class="slider-control" ref="ctrl">
                <span class="slider-control-btn" v-for="page in pages" :key="page.id">
                </span>
            </div>
        </div>`,

    methods: {
        mouseDown: function (event) {
            this.isMouseDown = true;
            this.lastMoveX = event.clientX;
            this.lastDownX = event.clientX;
        },

        touchStart: function (event) {
            this.mouseDown(event.touches[0]);
        },

        mouseMove: function (event) {
            if (this.isMouseDown) {
                this.scrollBy(this.lastMoveX - event.clientX);

                this.lastMoveX = event.clientX;
            }
        },

        touchMove: function (event) {
            this.mouseMove(event.changedTouches[0]);
        },

        mouseUp: function (event) {
            if (!this.isMouseDown) {
                return;
            }

            if (this.lastDownX - event.clientX > 50) {
                // Next page
                ++this.pageId;
            }
            else if (this.lastDownX - event.clientX < -50) {
                // Previous page
                --this.pageId;
            }
            if (this.pageId < 0) {
                this.pageId = 0;
            }
            this.scrollToPage(this.pageId);

            this.isMouseDown = false;
            this.lastDownX = null;
            this.lastMoveX = null;
        },

        touchEnd: function () {
            this.mouseUp(event.changedTouches[0]);
        },

        scrollBy: function (dx) {
            this.pageContainer.scrollLeft += dx;
        },

        scrollToPage(pageId) {
            this.pageContainer.style.transition = '1s';
            const pageWidth = document.getElementsByClassName('slider-page')[0].clientWidth;
            this.pageContainer.scrollLeft = pageWidth * pageId;

            const ctrl = this.$refs.ctrl;
            if (pageId < ctrl.childNodes.length) {
                for (var i = 0; i < ctrl.childNodes.length; ++i) {
                    if (i === pageId) {
                        ctrl.childNodes[i].className = 'slider-control-btn selected';
                    }
                    else {
                        ctrl.childNodes[i].className = 'slider-control-btn';
                    }
                }
            }
        }
    },

    mounted: function () {
        this.pageContainer = this.$el.getElementsByClassName('slider-page-container')[0];
        this.scrollToPage(0);
    }

});
