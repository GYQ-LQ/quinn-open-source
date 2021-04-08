/*
 * @Author: Quinn
 * @Date: 2021-04-08 11:08:09
 * @LastEditTime: 2021-04-08 11:08:10
 * @LastEditors: quinn
 * @Description:  
 */
// 时间戳版
function throttle(func, wait) {
    let pre = 0;
    return function () {
        let context = this,
            args = arguments
        let now = Date.now()
        if (now - pre > wait) {
            func.apply(context, args);
            pre = now;
        }
    }
}
// 定时器版
function throttle(func, wait) {
    let timer = null;
    return function () {
        let context = this,
            args = arguments
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args)
            }, wait);
        }
    }
}