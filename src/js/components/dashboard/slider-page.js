import Vue from 'vue';

export default Vue.component('slider-page', {

    props: {
        appGroups: {
            type: Array,
            default: () => []
        }
    },

    template:
        `<div class="slider-page">
            <app-group v-for="group in appGroups" :key="group.title"
                :apps="group.apps" :title="group.title">
            </app-group>
        </div>`

});
