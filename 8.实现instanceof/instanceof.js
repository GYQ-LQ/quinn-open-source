/*
 * @Author: Quinn
 * @Date: 2021-04-18 21:50:06
 * @LastEditTime: 2021-04-18 21:54:56
 * @LastEditors: quinn
 * @Description:  
 */
function myInstanceOf(left, right) {
    let proto = left.__proto__;
    while (true) {
        if (proto === null) return false;
        if (proto === right.prototype) return true
        proto = proto.__proto__;
    }
}

console.log(myInstanceOf(1, Number));