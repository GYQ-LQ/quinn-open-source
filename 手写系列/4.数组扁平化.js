/*
 * @Author: Quinn
 * @Date: 2021-05-06 11:42:23
 * @LastEditTime: 2021-05-06 14:19:12
 * @LastEditors: quinn
 * @Description: https://cloud.tencent.com/developer/article/1497418
 */
function mytype(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
// 栈
function myflat(params) {
  let stack = [];
  let res = [];
  stack.push(params);
  while (stack.length) {
    let p = stack.shift();
    if (mytype(p) == "array") {
      stack.push(...p);
    } else {
      res.push(p);
    }
  }
  return res;
}
// toString split
function myflat(params) {
  return params
    .toString()
    .split(",")
    .map((e) => Number(e));
}
// join split
function join(params) {
  return params
    .join(",")
    .split(",")
    .map((e) => Number(e));
}
// reduce 递归
function myflat(params) {
  return params.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? myflat(cur) : cur);
  }, []);
}
// map 递归
function myflat(params) {
  let res = [];
  params.map((e) => {
    if (Array.isArray(e)) {
      res = res.concat(myflat(e));
    } else {
      res.push(e);
    }
  });
  return res;
}
// some ...
function myflat(params) {
  while (params.some((e) => Array.isArray(e))) {
    params = [].concat(...params);
  }
  return params;
}
// Array.prototype.flat()
function myflat(params) {
  return params.flat(Infinity);
}
var arr = [1, 2, [3, 4, [5, 6]]];
console.log(myflat(arr));
