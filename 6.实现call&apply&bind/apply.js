/*
 * @Author: Quinn
 * @Date: 2021-04-18 21:06:23
 * @LastEditTime: 2021-04-18 21:10:37
 * @LastEditors: quinn
 * @Description:  
 */
Function.prototype.apply2 = function (context, args) {
    // 1
    var context = context || window;
    // 2
    context.fn = this;
    var res;
    if (!args) {
        res = context.fn()
    } else {
        // 3
        let arr = []
        for (let i = 0; i < args.length; i++) {
            arr.push('args[' + i + ']');
        }
        // 4
        res = eval('context.fn(' + arr + ')');
    }
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

fn.apply2(a)