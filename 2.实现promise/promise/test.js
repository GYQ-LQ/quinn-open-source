/*
 * @Author: Quinn
 * @Date: 2021-04-19 20:56:03
 * @LastEditTime: 2021-04-19 21:36:38
 * @LastEditors: quinn
 * @Description:  
 */
const Promise = require('./promise');
console.log('1');
new Promise((resolve, reject) => {
    console.log('2');
    setTimeout(() => {
        console.log('aaa');
        resolve('bbb')
    });
}).then(value => {
    console.log('4');
    console.log('value:', value);
}, reason => {
    console.log('reason:', reason);
})
console.log('3');