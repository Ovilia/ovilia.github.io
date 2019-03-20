import * as sunglass from 'sunglass';
import {getCanvas} from '../utils/image';

export default class ImageProcessor {
    constructor() {
    }

    /**
     * Filter with sunglass
     *
     * @param {Image} srcImage source image
     * @param {number} distWidth target width
     * @param {number} distHeight target height
     * @return {Image} sunglass filtering result of distWidth and distHeight
     */
    doSunglass(srcImage, distWidth, distHeight) {
        const resized = this._resize(srcImage, distWidth, distHeight);
        return sunglass(resized);
    }

    /**
     * Resize image, return canvas
     *
     * @param {Image} srcImage source image
     * @param {number} distWidth target width
     * @param {number} distHeight target height
     * @return {HTMLCanvasElement} resized canvas
     */
    _resize(srcImage, distWidth, distHeight) {
        const distCanvas = getCanvas(distWidth, distHeight);
        const ctx = distCanvas.getContext('2d');
        ctx.drawImage(srcImage, 0, 0, distWidth, distHeight);
        return distCanvas;
    }

    /**
     * Convert image to canvas
     *
     * @param {Image} srcImage source image
     * @return {HTMLCanvasElement} canvas containing srcImage content
     */
    _getImageCanvas(srcImage) {
        return this._resize(srcImage, srcImage.width, srcImage.height);
    }
}
