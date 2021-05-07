/*
 * @Author: Quinn
 * @Date: 2021-05-06 10:45:52
 * @LastEditTime: 2021-05-06 10:48:49
 * @LastEditors: quinn
 * @Description:
 */
function mytypeof(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

let p = new Promise((resolve, reject) => {
  resolve("aaa");
});
mytypeof(p);
mytypeof([]);
mytypeof({});
mytypeof(new Date());
mytypeof(null);
mytypeof(undefined);
mytypeof(true);
mytypeof(Symbol("a"));
mytypeof(1);
mytypeof("1.1");
mytypeof(42n);
mytypeof(new Error("err"));
mytypeof(() => {});
mytypeof(new RegExp());
mytypeof(/[a-z]/);
