import Vue from 'vue';

import { getPixelImage } from '../../utils/image';
import colors from '../../constants/colors';

export default Vue.component('app-group', {

    props: {
        apps: {
            type: Array,
            default: () => []
        },
        title: {
            type: String,
            default: ''
        }
    },

    template:
        `<div class="app-group" :style="{'background-image': 'url(' + appGroupImg + ')'}">
            <div class="app-group-title" :style="{'background-image': 'url(' + appGroupTitleImg + ')'}">{{ title }}</div>
            <div class="app-group-content">
                <app v-for="appId in apps" :app-id="appId" :key="appId"></app>
            </div>
        </div>`,

    data: function () {
        return {
            appGroupImg: '',
            appGroupTitleImg: ''
        };
    },

    computed: {
    },

    methods: {
        resize: function () {
            const group = this.$el;

            this.appGroupImg = getPixelImage({
                width: group.clientWidth,
                height: group.clientHeight,
                radius: 2,
                fillColor: colors.appGroup
            });

            const title = group.getElementsByClassName('app-group-title')[0];
            this.appGroupTitleImg = getPixelImage({
                width: title.clientWidth,
                height: title.clientHeight,
                radius: [2, 2, 0, 0],
                fillColor: colors.appGroupTitle
            });
        },

        openApp: function () {
            console.log('openApp in group')
        }
    },

    mounted: function () {
        this.resize();
        window.addEventListener('resize', this.resize);
    }
});
