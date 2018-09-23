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
            :style="">
            <div class="slider-page-container">
                <slider-page v-for="page in pages" :key="page.id"
                    :app-groups="page.groups">
                </slider-page>
            </div>
            <div class="slider-control">
                <span class="slider-control-btn" v-for="page in pages" :key="page.id">
                </span>
            </div>
        </div>`,

    methods: {
        mouseDown: function () {
            this.isMouseDown = true;
            console.log('down');
            this.lastMoveX = event.clientX;
            this.lastDownX = event.clientX;
        },

        mouseMove: function (event) {
            if (this.isMouseDown) {
                console.log('move');
                this.scrollBy(this.lastMoveX - event.clientX);

                this.lastMoveX = event.clientX;
            }
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

        scrollBy: function (dx) {
            this.pageContainer.scrollLeft += dx;
        },

        scrollToPage(pageId) {
            this.pageContainer.style.transition = '1s';
            const pageWidth = document.getElementsByClassName('slider-page')[0].clientWidth;
            this.pageContainer.scrollLeft = pageWidth * pageId;
        }
    },

    mounted: function () {
        this.pageContainer = this.$el.getElementsByClassName('slider-page-container')[0];
    }

});
