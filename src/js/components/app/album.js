import Vue from 'vue';
import photoInfo from '../../configs/album';
import ImageProcessor from '../../entities/imageProcessor';

const imgProcessor = new ImageProcessor();

export default Vue.component('app-album', {

    template:
        `<div class="app-album mobile-body-content padding scroll">
            <div class="album-group" v-for="group in photoInfo">
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
        photoInfo.forEach(group => {
            group.photos = group.photos.map(url => {
                return {
                    src: url,
                    thumbnail: null
                };
            });

            group.photos.forEach(obj => {
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
        });

        return {
            photoInfo: photoInfo,
            openedImgSrc: null
        };
    },

    methods: {
        openImage: function (photo) {
            this.openedImgSrc = photo.src;
        },

        closeOpenedImg: function () {
            this.openedImgSrc = null;
        }
    },

    mounted: function () {

    }
});
