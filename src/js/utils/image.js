import { pixelSize as pixel } from '../constants/size';

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
 * @param {number} width image width
 * @param {number} height image height
 * @param {number|Array.<number>} radius in pixel, from 0 to 4,
 *                                       can be array like border-radius
 * @param {string} fillColor background color
 * @param {string} borderColor border color
 */
export function getPixelImage(width, height, radius, shadowSize, fillColor, borderColor, shadowColor) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;

    const pixelSize = pixel;
    const innerWidth = width - shadowSize;
    const innerHeight = height - shadowSize;

    let r;
    if (typeof radius === 'number') {
        r = [radius, radius, radius, radius];
    }
    else if (radius.length === 4) {
        r = radius;
    }
    else if (radius.length === 3) {
        r = [radius[0], radius[1], radius[2], radius[1]];
    }
    else if (radius.length === 2) {
        r = [radius[0], radius[1], radius[0], radius[1]];
    }
    else if (radius.length === 1) {
        r = [radius[0], radius[0], radius[0], radius[0]];
    }
    else {
        console.warn('Error radius value', radius);
        r = [0, 0, 0, 0];
    }

    ctx.fillStyle = fillColor;
    // Left-top
    if (r[0] === 0) {
        ctx.moveTo(pixelSize, pixelSize);
    }
    else {
        ctx.moveTo(pixelSize, r[0] * pixelSize);
        for (let i = 0; i < r[0] - 1; ++i) {
            ctx.lineTo(pixelSize * (i + 2), pixelSize * (r[0] - i));
            ctx.lineTo(pixelSize * (i + 2), pixelSize * (r[0] - i - 1));
        }
    }
    // Right-top
    if (r[1] === 0) {
        ctx.lineTo(innerWidth - pixelSize, pixelSize);
    }
    else {
        ctx.lineTo(innerWidth - pixelSize * r[1], pixelSize);
        for (let i = 0; i < r[1] - 1; ++i) {
            ctx.lineTo(innerWidth - pixelSize * (r[1] - i), pixelSize * (i + 2));
            ctx.lineTo(innerWidth - pixelSize * (r[1] - i - 1), pixelSize * (i + 2));
        }
    }
    // Right-bottom
    if (r[2] === 0) {
        ctx.lineTo(innerWidth - pixelSize, innerHeight - pixelSize);
    }
    else {
        ctx.lineTo(innerWidth - pixelSize, innerHeight - pixelSize * r[2]);
        for (let i = 0; i < r[2] - 1; ++i) {
            ctx.lineTo(innerWidth - pixelSize * (i + 2), innerHeight - pixelSize * (r[2] - i));
            ctx.lineTo(innerWidth - pixelSize * (i + 2), innerHeight - pixelSize * (r[2] - i - 1));
        }
    }
    // Left-bottom
    if (r[3] === 0) {
        ctx.lineTo(pixelSize, innerHeight - pixelSize);
    }
    else {
        ctx.lineTo(pixelSize * r[3], innerHeight - pixelSize);
        for (let i = 0; i < r[3] - 1; ++i) {
            ctx.lineTo(pixelSize * (r[3] - i), innerHeight - pixelSize * (i + 2));
            ctx.lineTo(pixelSize * (r[3] - i - 1), innerHeight - pixelSize * (i + 2));
        }
    }
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = borderColor;

    // Right
    ctx.fillRect(
        innerWidth - pixelSize,
        pixelSize * r[1],
        pixelSize,
        innerHeight - pixelSize * (r[1] + r[2])
    );
    // Bottom
    ctx.fillRect(
        pixelSize * r[3],
        innerHeight - pixelSize,
        innerWidth - pixelSize * (r[3] + r[2]),
        pixelSize
    );
    // Left
    ctx.fillRect(
        0,
        pixelSize * r[0],
        pixelSize,
        innerHeight - pixelSize * (r[0] + r[3])
    );
    // Top
    ctx.fillRect(
        pixelSize * r[0],
        0,
        innerWidth - pixelSize * (r[0] + r[1]),
        pixelSize
    );

    // Left-top
    if (r[0] === 0) {
        ctx.fillRect(0, 0, pixelSize, pixelSize);
    }
    else {
        for (let i = 0; i < r[0] - 1; ++i) {
            ctx.fillRect(pixelSize * (i + 1), pixelSize * (r[0] - 1 - i), pixelSize, pixelSize);
        }
    }
    // Right-top
    if (r[1] === 0) {
        ctx.fillRect(innerWidth - pixelSize, 0, pixelSize, pixelSize);
    }
    else {
        for (let i = 0; i < r[1] - 1; ++i) {
            ctx.fillRect(innerWidth - pixelSize * (i + 2), pixelSize * (r[1] - 1 - i), pixelSize, pixelSize);
        }
    }
    // Right-bottom
    if (r[2] === 0) {
        ctx.fillRect(innerWidth - pixelSize, innerHeight - pixelSize, pixelSize, pixelSize);
    }
    else {
        for (let i = 0; i < r[2] - 1; ++i) {
            ctx.fillRect(innerWidth - pixelSize * (i + 2), innerHeight - pixelSize * (r[2] - i), pixelSize, pixelSize);
        }
    }
    // Left-bottom
    if (r[3] === 0) {
        ctx.fillRect(0, innerHeight - pixelSize, pixelSize, pixelSize);
    }
    else {
        for (let i = 0; i < r[3] - 1; ++i) {
            ctx.fillRect(pixelSize * (i + 1), innerHeight - pixelSize * (r[3] - i), pixelSize, pixelSize);
        }
    }

    return canvas.toDataURL();
}
