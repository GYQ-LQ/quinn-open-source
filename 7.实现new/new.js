/*
 * @Author: Quinn
 * @Date: 2021-04-18 21:43:32
 * @LastEditTime: 2021-04-18 21:49:29
 * @LastEditors: quinn
 * @Description:  
 */
function myNew() {
    let obj = new Object();
    let Con = Array.prototype.shift.call(arguments);

    obj.prototype = Con.prototype;
    let res = Con.apply(obj, arguments);

    // ret || obj 这里这么写考虑了构造函数显示返回 null 的情况
    return typeof res == 'object' ? res || obj : obj;
}