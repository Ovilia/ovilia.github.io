/**
 * Like CSS padding attribute, for `value` in the form of:
 * `10` or `[10]`:     returns `[10, 10, 10, 10]`,
 * `[10, 20]`:         returns `[10, 20, 10, 20]`,
 * `[10, 20, 30]`:     returns `[10, 20, 30, 20]`,
 * `[10, 20, 30, 40]`: returns `[10, 20, 30, 40]`.
 *
 * @param {number|number[]} value in number or number array form
 * @return {number[]} value in array of length 4
 */
export function getValueArray(value) {
    let result;
    if (typeof value === 'number') {
        result = [value, value, value, value];
    }
    else if (value.length === 4) {
        result = value;
    }
    else if (value.length === 3) {
        result = [value[0], value[1], value[2], value[1]];
    }
    else if (value.length === 2) {
        result = [value[0], value[1], value[0], value[1]];
    }
    else if (value.length === 1) {
        result = [value[0], value[0], value[0], value[0]];
    }
    else {
        console.warn('Error value form', value);
        result = [0, 0, 0, 0];
    }
    return result;
}