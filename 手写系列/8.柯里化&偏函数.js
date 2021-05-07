/*
 * @Author: Quinn
 * @Date: 2021-05-06 14:58:00
 * @LastEditTime: 2021-05-06 15:07:23
 * @LastEditors: quinn
 * @Description:
 */

function curry(fn) {
    const judge = (...args1) => {
        if (args1.length == fn.length) return fn(...args1);
        return (...args2) => judge(...args1, ...args2);
    };
    return judge;
}

function partial(fn, args) {
    return (...arg) => {
        return fn(...args, ...arg);
    };
}
