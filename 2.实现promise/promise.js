/*
 * @Author: Quinn
 * @Date: 2021-04-01 16:35:49
 * @LastEditTime: 2021-04-01 16:37:36
 * @LastEditors: quinn
 * @Description:  
 */
let promise = new Promise((resolve, reject) => {
    reject('faile')
})

promise.then(value => {
    console.log(value);
}, err => {
    console.log(err);
})