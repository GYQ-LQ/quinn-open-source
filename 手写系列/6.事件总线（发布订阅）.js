/*
 * @Author: Quinn
 * @Date: 2021-05-06 14:20:57
 * @LastEditTime: 2021-05-06 14:25:21
 * @LastEditors: quinn
 * @Description:
 */
class Event {
  constructor() {
    this.evts = {};
  }
  on(name, fn) {
    if (this.evts[name]) {
      this.evts[name].push(fn);
    } else {
      this.evts[name] = [fn];
    }
  }
  emit(name, once = false, ...args) {
    if (this.evts[name]) {
      let tasks = this.evts[name].slice();
      for (const fn of tasks) {
        fn(...args);
      }
      if (once) {
        delete this.evts[name];
      }
    }
  }
  off(name, fn) {
    let tasks = this.evts[name];
    if (tasks) {
      const index = tasks.findIndex((f) => f === fn || f.callback === fn);
      if (index >= 0) {
        tasks.splice(index, 1);
      }
    }
  }
}
