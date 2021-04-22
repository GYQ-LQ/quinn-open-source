/*
 * @Author: Quinn
 * @Date: 2021-04-01 13:41:29
 * @LastEditTime: 2021-04-19 22:03:15
 * @LastEditors: quinn
 * @Description:  手写 Promise
 * 1、核心逻辑
 * 2、异步逻辑
 * 3、then多次调用
 * 4、then链式调用
 */

// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';


function resolvePromise(promise, x, resolve, reject) {
    // 如果相等了，说明return的是自己，抛出类型错误并返回
    if (promise === x) {
        return reject(new TypeError('The promise and the return value are the same'));
    }

    if (typeof x === 'object' || typeof x === 'function') {
        // x 为 null 直接返回，走后面的逻辑会报错
        if (x === null) {
            return resolve(x);
        }

        let then;
        try {
            // 把 x.then 赋值给 then 
            then = x.then;
        } catch (error) {
            // 如果取 x.then 的值时抛出错误 error ，则以 error 为据因拒绝 promise
            return reject(error);
        }

        // 如果 then 是函数
        if (typeof then === 'function') {
            let called = false;
            try {
                then.call(
                    x, // this 指向 x
                    // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
                    y => {
                        // 如果 resolvePromise 和 rejectPromise 均被调用，
                        // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
                        // 实现这条需要前面加一个变量 called
                        if (called) return;
                        called = true;
                        resolvePromise(promise, y, resolve, reject);
                    },
                    // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
                    r => {
                        if (called) return;
                        called = true;
                        reject(r);
                    });
            } catch (error) {
                // 如果调用 then 方法抛出了异常 error：
                // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
                if (called) return;

                // 否则以 error 为据因拒绝 promise
                reject(error);
            }
        } else {
            // 如果 then 不是函数，以 x 为参数执行 promise
            resolve(x);
        }
    } else {
        // 如果 x 不为对象或者函数，以 x 为参数执行 promise
        resolve(x);
    }
}


// 新建 QuinnPromise 类
class QuinnPromise {
    constructor(executor) {
        try {
            // executor 是一个执行器，进入会立即执行
            // 并传入resolve和reject方法
            executor(this.resolve, this.reject)
        } catch (error) {
            // 如果有错误，就直接执行 reject
            this.reject(error)
        }
    };

    // 储存状态的变量，初始值是 pending
    status = PENDING;
    // 成功之后的值
    value = null;
    // 失败之后的原因
    reason = null;
    // 存储成功回调函数
    onFulfilledCallbacks = [];
    // 存储失败回调函数
    onRejectedCallbacks = [];

    /* resolve 和 reject为什么要用箭头函数？
    如果直接调用的话，普通函数this指向的是window或者undefined
    用箭头函数就可以让this指向当前实例对象 */
    // 更改成功后的状态
    resolve = (value) => {
        // 只有状态是等待，才执行状态修改
        if (this.status === PENDING) {
            // 状态修改为成功
            this.status = FULFILLED;
            // 保存成功之后的值
            this.value = value;
            // 判断成功回调是否存在，如果存在就调用
            while (this.onFulfilledCallbacks.length) this.onFulfilledCallbacks.shift()(value);
        }
    };

    // 更改失败后的状态
    reject = (reason) => {
        // 只有状态是等待，才执行状态修改
        if (this.status === PENDING) {
            // 状态成功为失败
            this.status = REJECTED;
            // 保存失败后的原因
            this.reason = reason;
            // 判断失败回调是否存在，如果存在就调用
            while (this.onRejectedCallbacks.length) this.onRejectedCallbacks.shift()(reason)
        }
    };
    // resolve 静态方法
    static resolve(parameter) {
        // 如果传入 QuinnPromise 就直接返回
        if (parameter instanceof QuinnPromise) {
            return parameter;
        }

        // 转成常规方式
        return new QuinnPromise(resolve => {
            resolve(parameter);
        });
    }

    // reject 静态方法
    static reject(reason) {
        return new QuinnPromise((resolve, reject) => {
            reject(reason);
        });
    }

    then(onFulfilled, onRejected) {
        // 如果不传，就使用默认函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {
            throw reason
        };
        // 为了链式调用这里直接创建一个 QuinnPromise ，并在后面 return 出去
        const promise = new QuinnPromise((resolve, reject) => {
            // 这里的内容在执行器中，会立即执行
            if (this.status === FULFILLED) {
                // 获取成功回调函数的执行结果
                // 传入 resolvePromise 集中处理// 创建一个微任务等待 promise 完成初始化
                queueMicrotask(() => {
                    try {
                        // 获取成功回调函数的执行结果
                        const x = onFulfilled(this.value);
                        // 传入 resolvePromise 集中处理
                        resolvePromise(promise, x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                })
            } else if (this.status === REJECTED) {
                // 创建一个微任务等待 promise 完成初始化
                queueMicrotask(() => {
                    try {
                        // 调用失败回调，并且把原因返回
                        const x = onRejected(this.reason);
                        // 传入 resolvePromise 集中处理
                        resolvePromise(promise, x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                })
            } else if (this.status === PENDING) {
                this.onFulfilledCallbacks.push(() => {
                    // ==== 新增 ====
                    queueMicrotask(() => {
                        try {
                            // 获取成功回调函数的执行结果
                            const x = onFulfilled(this.value);
                            // 传入 resolvePromise 集中处理
                            resolvePromise(promise, x, resolve, reject);
                        } catch (error) {
                            reject(error)
                        }
                    })
                });
                this.onRejectedCallbacks.push(() => {
                    // ==== 新增 ====
                    queueMicrotask(() => {
                        try {
                            // 调用失败回调，并且把原因返回
                            const x = onRejected(this.reason);
                            // 传入 resolvePromise 集中处理
                            resolvePromise(promise, x, resolve, reject);
                        } catch (error) {
                            reject(error)
                        }
                    })
                });
            }
        })

        return promise;
    }
}
QuinnPromise.deferred = function () {
    var result = {};
    result.promise = new QuinnPromise(function (resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
    });

    return result;
}
module.exports = QuinnPromise;