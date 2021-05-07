/*
 * @Author: Quinn
 * @Date: 2021-04-18 21:12:34
 * @LastEditTime: 2021-05-06 15:32:15
 * @LastEditors: quinn
 * @Description:
 */
function _bind(asThis) {
    // 1、判断调用bind的是不是个函数
    var fn = this;
    if (typeof this !== "function") {
        throw new Error(
            "Function.prototype.bind - what is trying to be bound is not callable"
        );
    }
    // 2、bind() 除了 this 外，还可传入多个参数；
    var args1 = Array.prototype.slice.call(arguments, 1);
    // 3、bind 创建一个新函数
    var resultFn = function () {
        // 4、bing 创建的新函数可能传入多个参数；
        var args2 = Array.prototype.slice.call(arguments);
        // 如果使用new操作符，这里为true
        return fn.apply(
            this instanceof resultFn ? this : asThis,
            args1.concat(args2)
        );
    };
    // 5、
    // 如果直接用resultFn.prototype = fn.prototype，修改resultFn.prototype也会造成fn.prototype的修改
    // 解决方式：使用一个空函数作为中转
    // 新函数可能被当做构造函数调用；
    var fnNo = new Function();
    fnNo.prototype = fn.prototype;
    resultFn.prototype = new fnNo();
    // 6、函数可能有返回值；
    return resultFn;
}
Function.prototype.bind3 = function (asThis) {
    // 1
    var fn = this;
    if (typeof fn !== "function") {
        throw new Error("Must be a function");
    }
    // 2
    let args1 = Array.prototype.slice.call(arguments, 1);
    // 3
    let resFn = function () {
        // 4
        let args2 = Array.prototype.slice.call(arguments);
        return fn.apply(
            this instanceof resFn ? this : asThis,
            args1.concat(args2)
        );
    };
    // 5
    let midFn = new Function();
    midFn.prototype = fn.prototype;
    resFn.prototype = new midFn();
    // 6
    return resFn;
};

Function.prototype.bind2 = function (context) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(
            this instanceof fBound ? this : context,
            args.concat(bindArgs)
        );
    };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
};

Function.prototype.bind2 = function (context) {
    if (typeof this !== "function") {
        throw new Error(
            "Function.prototype.bind - what is trying to be bound is not callable"
        );
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(
            this instanceof fNOP ? this : context,
            args.concat(bindArgs)
        );
    };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
};
Function.prototype.bind2 = function (context) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(
            this instanceof fNOP ? this : context,
            args.concat(bindArgs)
        );
    };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
};

Function.prototype.bind2 = function (context) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var midFn = function () {};

    var resFn = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(
            this instanceof midFn ? this : context,
            args.concat(bindArgs)
        );
    };

    midFn.prototype = this.prototype;
    resFn.prototype = new midFn();
    return resFn;
};

Function.prototype.bind3 = function (context) {
    // ...
    let fn = this;
    let args = Array.prototype.slice.call(arguments, 1);
    let midFn = function () {};
    let resFn = function () {
        let bindArgs = Array.prototype.slice.call(arguments);
        return fn.apply(
            this instanceof midFn ? this : context,
            args.concat(bindArgs)
        );
    };
    midFn.prototype = this.prototype;
    resFn.prototype = new midFn();
    return resFn;
};
