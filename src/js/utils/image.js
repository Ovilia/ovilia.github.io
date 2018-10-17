import { pixelSize } from '../constants/size';
import { getValueArray } from './math';

/**
 * Get pixel image in base 64.
 *
 * Here's an example of image with radius 2
 * +-+-+-+-+
 * | | |x|x|
 * | |x| | |
 * |x| | | |
 * |x| | | |
 *
 * @param {Object} config config
 * @param {number} config.width image width
 * @param {number} config.height image height
 * @param {number|Array.<number>} config.radius in pixel, from 0 to 4, can be array like border-radius
 * @param {string} config.fillColor background color
 * @param {string} config.borderColor border color, undefined for no border
 * @param {number|number[]} config.margin margin outside of border
 */
export function getPixelImage(config) {
    const canvas = document.createElement('canvas');
    canvas.width = config.width;
    canvas.height = config.height;

    const ctx = canvas.getContext('2d');
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;

    const margin = getValueArray(config.margin || 0);
    const top = pixelSize * margin[0];
    const right = canvas.width - pixelSize * margin[1];
    const bottom = canvas.height - pixelSize * margin[2];
    const left = pixelSize * margin[3];

    const r = getValueArray(config.radius);

    if (config.borderColor) {
        const borderWidth = pixelSize;
        // Border
        drawSimplePixelImage(ctx, left, top, right - left, bottom - top, r, config.borderColor);

        // Fill
        const innerR = [r[0] - 1, r[1] - 1, r[2] - 1, r[3] - 1];
        drawSimplePixelImage(ctx, left + borderWidth, left + borderWidth,
            right - left - borderWidth * 2, bottom - top - borderWidth * 2, innerR, config.fillColor);
    }
    else {
        // Fill
        drawSimplePixelImage(ctx, left, top, right - left, bottom - top, r, config.fillColor);
    }

    return canvas.toDataURL();
}



function drawSimplePixelImage(ctx, left, top, width, height, r, color) {
    const right = left + width;
    const bottom = top + height;

    ctx.fillStyle = color;
    ctx.beginPath();

    // Left-top
    ctx.moveTo(left, top + pixelSize * r[0]);
    for (let i = 0; i < r[0]; ++i) {
        ctx.lineTo(left + pixelSize * (i + 1), top + pixelSize * (r[0] - i));
        ctx.lineTo(left + pixelSize * (i + 1), top + pixelSize * (r[0] - i - 1));
    }

    // Right-top
    ctx.lineTo(right - pixelSize * r[1], top);
    for (let i = 0; i < r[1]; ++i) {
        ctx.lineTo(right - pixelSize * (r[1] - i), top + pixelSize * (i + 1));
        ctx.lineTo(right - pixelSize * (r[1] - i - 1), top + pixelSize * (i + 1));
    }

    // Right-bottom
    ctx.lineTo(right, bottom - pixelSize * r[2]);
    for (let i = 0; i < r[2]; ++i) {
        ctx.lineTo(right - pixelSize * (i + 1), bottom - pixelSize * (r[2] - i));
        ctx.lineTo(right - pixelSize * (i + 1), bottom - pixelSize * (r[2] - i - 1));
    }

    // Left-bottom
    ctx.lineTo(left + pixelSize * r[3], bottom);
    for (let i = 0; i < r[3]; ++i) {
        ctx.lineTo(left + pixelSize * (r[3] - i), bottom - pixelSize * (i + 1));
        ctx.lineTo(left + pixelSize * (r[3] - i - 1), bottom - pixelSize * (i + 1));
    }

    ctx.closePath();
    ctx.fill();
}
