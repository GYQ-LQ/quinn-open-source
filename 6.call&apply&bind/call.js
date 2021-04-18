/*
 * @Author: Quinn
 * @Date: 2021-04-18 21:02:35
 * @LastEditTime: 2021-04-18 21:10:49
 * @LastEditors: quinn
 * @Description:  
 */
/* 
1、this可能为null
2、参数传入
3、返回值
*/
Function.prototype.call2 = function (context) {
    // 1
    var context = context || window;
    // 2
    context.fn = this;
    // 3
    var arr = [];
    for (let i = 1; i < arguments.length; i++) {
        arr.push('arguments[' + i + ']');
    }
    // 4
    let res = eval('context.fn(' + arr + ')');
    // 5
    delete context.fn;
    // 6
    return res;
}
let a = {
    value: 333
}

function fn() {
    console.log(this.value);
}

fn.call(a)