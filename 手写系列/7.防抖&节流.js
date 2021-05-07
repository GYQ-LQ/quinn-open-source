/*
 * @Author: Quinn
 * @Date: 2021-05-06 14:31:25
 * @LastEditTime: 2021-05-06 14:54:43
 * @LastEditors: quinn
 * @Description:
 */
function debunce(fn, wait = 1000, immediate = false) {
    var timer, res;
    var resDebunced = function () {
        var context = this;
        var args = arguments;
        clearTimeout(timer);
        if (immediate) {
            timer = setTimeout(() => {
                timer = null;
            }, wait);
            res = fn.call(context, args);
        } else {
            timer = setTimeout(() => {
                res = fn.call(context, args);
            }, wait);
        }
        return res;
    };
    resDebunced.cancle = function () {
        clearTimeout(timer);
        timer = null;
    };
    return resDebunced;
}

function throttle(fn, wait) {
    var pre = 0;
    return function () {
        var context = this;
        var args = arguments;
        var now = +new Date();
        if (now - pre > wait) {
            fn.call(context, args);
            pre = now;
        }
    };
}
function throttle(fn, wait) {
    let timer = null;
    return function () {
        let context = this;
        let args = arguments;
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                fn.call(context, args);
            }, wait);
        }
    };
}
