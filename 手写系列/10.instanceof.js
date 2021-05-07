/*
 * @Author: Quinn
 * @Date: 2021-05-06 15:51:24
 * @LastEditTime: 2021-05-06 15:52:47
 * @LastEditors: quinn
 * @Description:
 */
function myinstanceof(left, right) {
    let proto = left.__proto__;
    while (proto) {
        if (proto === null) return false;
        if (proto === right.prototype) return true;
        proto = proto.__proto__;
    }
}
