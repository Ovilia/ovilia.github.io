import Vue from 'vue';
import { getLang } from '../../utils/lang';

export default Vue.component('slider-page', {

    props: {
        appGroups: {
            type: Array,
            default: () => []
        }
    },

    data: function () {
        return {
            lang: getLang()
        };
    },

    template:
        `<div class="slider-page">
            <app-group v-for="group in appGroups" :key="group.title[lang]"
                :apps="group.apps" :title="group.title">
            </app-group>
        </div>`

});
