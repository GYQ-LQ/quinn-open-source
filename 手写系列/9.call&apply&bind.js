/*
 * @Author: Quinn
 * @Date: 2021-05-06 15:38:31
 * @LastEditTime: 2021-05-06 15:50:25
 * @LastEditors: quinn
 * @Description:
 */

Function.prototype.mycall = function (context) {
    context = context || window;
    context.fn = this;
    let args = [];
    for (let i = 1; i < arguments.length; i++) {
        args.push("arguments[" + i + "]");
    }
    console.log("context.fn(" + args + ")");
    let res = eval("context.fn(" + args + ")");
    delete context.fn;
    return res;
};

function fn() {}
fn.mycall({}, 1, 2, 3, 4);

Function.prototype.myapply = function (context, arr) {
    context = context || window;
    context.fn = this;
    var res;
    if (!arr) {
        res = context.fn();
    } else {
        let args = [];
        for (let i = 0; i < arr.length; i++) {
            args.push("arr[" + i + "]");
        }
        res = eval("context.fn(" + args + ")");
    }
    delete context.fn;
    return res;
};

fn.myapply({}, [1, 2, 3, 4]);

Function.prototype.mybind = function (context) {
    let fn = this;
    let args1 = Array.prototype.slice.call(arguments, 1);
    let midFn = function () {};
    let resFn = function () {
        let bindArgs = Array.prototype.slice();
        return fn.apply(
            this instanceof midFn ? this : context,
            args1.concat(bindArgs)
        );
    };
    midFn.prototype = this.prototype;
    resFn.prototype = new midFn();
    return resFn;
};
