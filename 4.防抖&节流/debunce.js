/*
 * @Author: Quinn
 * @Date: 2021-04-06 14:36:30
 * @LastEditTime: 2021-04-06 16:23:51
 * @LastEditors: quinn
 * @Description:  
 */
/**
 * @author: Quinn
 * @description: 防抖函数
 * 短时间内多次触发同一事件，只执行最后一次，或者只执行最开始的一次，中间的不执行。
 * @param {*} func 触发函数
 * @param {*} wait 防抖时间
 * @param {*} immediate 是否立即触发
 * @return {*}
 */
function debounce(func, wait, immediate) {
    let timer, result;
    let debuncer = function () {
        let context = this,
            args = arguments
        if (timer) clearTimeout(timer)
        if (immediate) { // 立即执行
            let callNow = !timer;
            timer = setTimeout(() => {
                timer = null
            }, wait);
            if (callNow) result = func.apply(context, args)
        } else { // 不立即执行
            timer = setTimeout(() => {
                func.apply(context, args)
            }, wait);
        }
        return result
    }
    debuncer.cancel = function () {
        clearTimeout(timer)
        timer = null
    }
    return debuncer
}