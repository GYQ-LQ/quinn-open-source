/*
 * @Author: Quinn
 * @Date: 2021-04-01 13:43:34
 * @LastEditTime: 2021-04-01 17:55:58
 * @LastEditors: quinn
 * @Description:  手写实现 promise
 * https://juejin.cn/post/6945319439772434469#heading-10
 */
const QuinnPromise = require('./QuinnPromise');

/* QuinnPromise.resolve().then(() => {
    console.log(0);
    return QuinnPromise.resolve(4);
}).then((res) => {
    console.log(res)
})

QuinnPromise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() => {
    console.log(6);
}) */

/* QuinnPromise.resolve().then(v => {
    console.log('0', v);
    return QuinnPromise.resolve('a');
}).then(v => {
    console.log('1', v);
})


QuinnPromise.resolve().then(v => {
    console.log('2', v);
}).then(v => {
    console.log('3', v);
}).then(v => {
    console.log('4', v);
}).then(v => {
    console.log('5', v);
}).then(v => {
    console.log('6', v);
}) */

QuinnPromise.resolve('a');