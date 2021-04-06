/*
 * @Author: Quinn
 * @Date: 2021-04-06 09:24:37
 * @LastEditTime: 2021-04-06 11:03:05
 * @LastEditors: quinn
 * @Description:  
 * typeof 可以正确识别：Undefined、Boolean、Number、String、Symbol、Function 等类型的数据，
 * 但是对于其他的都会认为是 object，比如 Null、Date 等，所以通过 typeof 来判断数据类型会不准确。
 * 但是可以使用 Object.prototype.toString 实现。
 */


function typeOf(prop) {
    let res = Object.prototype.toString.call(prop).split(' ')[1]
    res = res.slice(0, res.length - 1).toLowerCase()
    console.log(res);
    return res
}
let p = new Promise((resolve, reject) => {
    resolve('aaa')
})
typeOf(p)
typeOf([])
typeOf({})
typeOf(new Date)
typeOf(null)
typeOf(undefined)
typeOf(true)
typeOf(Symbol('a'))
typeOf(1)
typeOf('1.1')
typeOf(42n)
typeOf(new Error('err'))
typeOf(() => {})
typeOf(new RegExp())
typeOf(/[a-z]/)