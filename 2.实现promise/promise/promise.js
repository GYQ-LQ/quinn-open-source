/*
 * @Author: Quinn
 * @Date: 2021-04-19 20:55:59
 * @LastEditTime: 2021-04-19 21:43:55
 * @LastEditors: quinn
 * @Description:  手写实现promise
 */
// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class Promise {
    constructor(executor) {
        // 参数校验
        if (typeof executor !== 'function') {
            throw new TypeError(`Promise resolver ${executor} is not a function`);
        }
        try {
            executor(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }
    }
    // 状态
    state = PENDING;
    // 终值
    value = null;
    // 拒值
    reason = null;
    onFulfilledCallBacks = [];
    onRejectedCallBacks = [];
    // 成功后执行的函数
    resolve = (value) => {
        // 状态改变
        if (this.state === PENDING) {
            this.state = FULFILLED;
            this.value = value;
            this.onFulfilledCallBacks.forEach(fn => fn(this.value))
        }
    }
    // 失败后执行的函数
    reject = (reason) => {
        // 状态改变
        if (this.state === PENDING) {
            this.state = REJECTED;
            this.reason = reason;
            this.onRejectedCallBacks.forEach(fn => fn(this.reason))
        }
    }
    then = (onFulfilled, onRejected) => {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {
            throw reason
        };
        if (this.state === FULFILLED) {
            queueMicrotask(() => {
                onFulfilled(this.value);
            })
        }
        if (this.state === REJECTED) {
            queueMicrotask(() => {
                onRejected(this.reason);
            })
        }
        if (this.state === PENDING) {
            this.onFulfilledCallBacks.push((value) => {
                queueMicrotask(() => {
                    onFulfilled(value);
                })
            })
            this.onRejectedCallBacks.push((reason) => {
                queueMicrotask(() => {
                    onRejected(reason);
                })
            })
        }
    }
}


module.exports = Promise;