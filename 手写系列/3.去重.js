/*
 * @Author: Quinn
 * @Date: 2021-05-06 11:20:59
 * @LastEditTime: 2021-05-06 11:41:46
 * @LastEditors: quinn
 * @Description:
 */
/* indexOf/includes
sort + for
sort + reduce
splice
filter
set
{}/Map */

// es6
function unique(arr) {
  return [...new Set(arr)];
}
// filter
function unique(arr) {
  return arr.filter((item, i, list) => list.indexOf(item) == i);
}
// for+for+splice
function unique(arr) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      const e = arr[j];
      if (e == item) {
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr;
}
// for + indexOf/includes
function unique(arr) {
  var array = [];
  for (var i = 0; i < arr.length; i++) {
    if (array.indexOf(arr[i]) === -1) {
      array.push(arr[i]);
    }
  }
  return array;
}
// sort + for
function unique(arr) {
  arr.sort((a, b) => a - b);
  var arrry = [arr[0]];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      arrry.push(arr[i]);
    }
  }
  return arrry;
}

// {}/Map
function unique(arr) {
  let res = [],
    obj = {};
  for (let i = 0; i < arr.length; i++) {
    const e = arr[i];
    if (obj[e]) {
      obj[e]++;
    } else {
      res.push(e);
      obj[e] = 1;
    }
  }
  return res;
}
// sort + reduce
function unique(arr) {
  arr.sort((a, b) => a - b);
  let res = [];
  arr.reduce((pre, cur, index, list) => {
    if (pre != cur) {
      res.push(cur);
    }
    return cur;
  });
  return res;
}

var arr = [
  1,
  1,
  "true",
  "true",
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  "NaN",
  0,
  0,
  "a",
  "a",
  {},
  {},
];
console.log(unique(arr));
