import Vue from 'vue';
import localStorage from 'localStorage';
import photoInfo from '../../configs/album';
import ImageProcessor from '../../entities/imageProcessor';

const imgProcessor = new ImageProcessor();
const thumbnailSize = 32;
const albumScrollTopKey = 'albumScrollTop';

export default Vue.component('app-album', {

    template:
        `<div class="app-album mobile-body-content padding" :class="{scroll: !openedImgSrc}">
            <div class="album-group" v-for="group in photos">
                <h3>{{ group.title }}</h3>
                <div class="album-group-content">
                    <div class="album-photo" v-for="photo in group.photos">
                        <a class="album-photo-img pixel-img"
                            :style="{ 'background-image': photo.thumbnail ? 'url(' + photo.thumbnail + ')' : 'transparent' }"
                            @click="openImage(photo)">
                        </a>
                    </div>
                </div>
            </div>
            <fullscreen-img :src="openedImgSrc" v-if="openedImgSrc" @close="closeOpenedImg()">
                <img class="fullscreen-content" :src="openedImgSrc">
                <canvas v-if="hasThumbnailCanvas" ref="thumbnailCanvas" class="fullscreen-content pixel-img"></canvas>
            </fullscreen-img>
        </div>`,

    data: function () {
        return {
            photos: [],
            openedImgSrc: null,
            hasThumbnailCanvas: false
        };
    },

    methods: {
        openImage: function (photo) {
            this.openedImgSrc = photo.src;
            this.hasThumbnailCanvas = true;
            localStorage.setItem(albumScrollTopKey, $('.app-album').scrollTop());
            $('.app-album').scrollTop(0);

            this.$nextTick(() => {
                const canvas = this.$refs.thumbnailCanvas;
                canvas.width = photo.thumbnailWidth;
                canvas.height = photo.thumbnailHeight;

                const ctx = canvas.getContext('2d');
                const img = new Image();
                img.onload = () => {
                    ctx.drawImage(img, 0, 0);
                    ctx.globalCompositeOperation = 'destination-out';

                    const duration = 1000;
                    const start = Date.now();

                    let frameCnt = 0;
                    const render = () => {
                        ++frameCnt;
                        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        const data = pixels.data;

                        const pixelsPerFrame = canvas.width * canvas.height / duration * frameCnt;
                        for (let i = 0; i < pixelsPerFrame; ++i) {
                            const id = Math.floor(Math.random() * canvas.width * canvas.height);
                            data[id * 4 + 3] = 0;
                        }

                        ctx.putImageData(pixels, 0, 0);

                        if (Date.now() - start < duration) {
                            requestAnimationFrame(render);
                        }
                        else {
                            this.hasThumbnailCanvas = false;
                        }
                    };

                    setTimeout(() => {
                        render();
                    }, 300);
                };
                img.src = photo.thumbnail;
            });
        },

        closeOpenedImg: function () {
            this.openedImgSrc = null;
            let top = localStorage.getItem(albumScrollTopKey);
            top = top ? parseInt(top) : 0;
            $('.app-album').scrollTop(top);
        }
    },

    mounted: function () {
        this.photos = photoInfo.map(group => {
            const clonedGroups = Object.assign({}, group);
            clonedGroups.photos = clonedGroups.photos.map(url => {
                return {
                    src: (__DEV__ ? '' : 'dist/') + url,
                    thumbnail: null
                };
            });

            clonedGroups.photos.forEach(obj => {
                const img = new Image();
                img.onload = () => {
                    let width = img.width;
                    let height = img.height;
                    if (width > height) {
                        width = thumbnailSize / height * width;
                        height = thumbnailSize;
                    }
                    else {
                        height = thumbnailSize / width * height;
                        width = thumbnailSize;
                    }
                    obj.thumbnailWidth = width;
                    obj.thumbnailHeight = height;
                    obj.thumbnail = imgProcessor.doSunglass(img, width, height);
                };
                img.src = obj.src;
            });
            return clonedGroups;
        });
    }
});
