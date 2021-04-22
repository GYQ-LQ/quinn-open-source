/*
 * @Author: Quinn
 * @Date: 2021-04-19 20:55:51
 * @LastEditTime: 2021-04-19 21:46:38
 * @LastEditors: quinn
 * @Description:  原生promise演示
 */
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
    return 1
}, reason => {
    console.log('reason:', reason);
}).then(value => {
    console.log('222:', value);
}, reason => {
    console.log('222:', reason);
})
console.log('3');