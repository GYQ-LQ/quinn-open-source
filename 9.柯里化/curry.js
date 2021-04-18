/*
 * @Author: Quinn
 * @Date: 2021-04-18 22:54:02
 * @LastEditTime: 2021-04-18 22:59:29
 * @LastEditors: quinn
 * @Description:  
 */

function curry(fn) {
    let judge = (...args1) => {
        if (args1.length === fn.length) return fn(...args1);
        return (...args2) => judge(...args1, ...args2);
    }
    return judge;
}

function add(a, b, c) {
    return a + b + c
}
let addCurry = curry(add)
console.log(addCurry(1)(2)(3));