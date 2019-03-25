import Vue from 'vue';
import photoInfo from '../../configs/album';
import ImageProcessor from '../../entities/imageProcessor';

const imgProcessor = new ImageProcessor();

export default Vue.component('app-album', {

    template:
        `<div class="app-album mobile-body-content padding" :class="{scroll: !openedImgSrc}">
            <div class="album-group" v-for="group in photos">
                <h3>{{ group.title }}</h3>
                <div class="album-group-content">
                    <div class="album-photo" v-for="photo in group.photos">
                        <a class="album-photo-img"
                            :style="{ 'background-image': photo.thumbnail ? 'url(' + photo.thumbnail + ')' : 'transparent' }"
                            @click="openImage(photo)">
                        </a>
                    </div>
                </div>
            </div>
            <fullscreen-img :src="openedImgSrc" v-if="openedImgSrc"
                @close="closeOpenedImg()">
            </fullscreen-img>
        </div>`,

    data: function () {
        return {
            photos: [],
            openedImgSrc: null
        };
    },

    methods: {
        openImage: function (photo) {
            this.openedImgSrc = photo.src;
            $('.app-album').scrollTop(0);
        },

        closeOpenedImg: function () {
            this.openedImgSrc = null;
        }
    },

    mounted: function () {
        this.photos = photoInfo.map(group => {
            const clonedGroups = Object.assign({}, group);
            clonedGroups.photos = clonedGroups.photos.map(url => {
                return {
                    src: url,
                    thumbnail: null
                };
            });

            clonedGroups.photos.forEach(obj => {
                const img = new Image();
                img.onload = () => {
                    const size = 50;
                    let width = img.width;
                    let height = img.height;
                    if (width > height) {
                        width = size / height * width;
                        height = size;
                    }
                    else {
                        height = size / width * height;
                        width = size;
                    }
                    obj.thumbnail = imgProcessor.doSunglass(img, width, height);
                };
                img.src = obj.src;
            });
            return clonedGroups;
        });
    }
});
