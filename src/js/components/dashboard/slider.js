import Vue from 'vue';

export default Vue.component('slider', {

    props: {
        pages: {
            type: Array,
            default: () => []
        }
    },

    template:
        `<div class="slider">
            <div class="slider-page-container">
                <slider-page v-for="page in pages" :key="page.id"
                    :app-groups="page.groups">
                </slider-page>
            </div>
        </div>`

});
