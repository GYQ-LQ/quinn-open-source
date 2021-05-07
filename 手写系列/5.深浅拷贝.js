/*
 * @Author: Quinn
 * @Date: 2021-05-06 13:37:45
 * @LastEditTime: 2021-05-06 14:19:01
 * @LastEditors: quinn
 * @Description:
 */
// for in
// assign
// json parse stringfy
// slice
// concat
// ...

// 一层对象
function clone(target) {
  let cloneTarget = {};
  for (const key in target) {
    cloneTarget[key] = target[key];
  }
  return cloneTarget;
}
// 多层对象
function clone(target) {
  if (typeof target == "object") {
    let cloneTarget = {};
    for (const key in target) {
      cloneTarget[key] = clone(target[key]);
    }
    return cloneTarget;
  } else {
    return target;
  }
}
// 兼容数组
function clone(target) {
  if (typeof target == "object") {
    let cloneObj = Array.isArray(target) ? [] : {};
    for (const key in target) {
      if (Object.hasOwnProperty.call(target, key)) {
        cloneObj[key] = clone(target[key]);
      }
    }
    return cloneObj;
  } else {
    return target;
  }
}
// 循环引用
function clone(target, map = new WeakMap()) {
  if (typeof target === "object") {
    let cloneObj = Array.isArray(target) ? [] : {};
    if (map.has(target)) {
      return target;
    }
    for (const key in target) {
      if (Object.hasOwnProperty.call(target, key)) {
        const e = target[key];
        cloneObj[key] = e;
      }
    }
    map.set(target, cloneObj);
    return cloneObj;
  } else {
    return target;
  }
}
// 性能优化 while > for > forin
function myForEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}
function clone(target, map = new WeakMap()) {
  if (typeof target === "object") {
    const isArray = Array.isArray(target);
    let cloneTarget = isArray ? [] : {};

    if (map.get(target)) {
      return target;
    }
    map.set(target, cloneTarget);

    const keys = isArray ? undefined : Object.keys(target);
    myForEach(keys || target, (value, key) => {
      if (keys) {
        key = value;
      }
      cloneTarget[key] = clone(target[key], map);
    });

    return cloneTarget;
  } else {
    return target;
  }
}

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: "child",
  },
  field4: [2, 4, 8],
};
target.target = target;
console.log(clone(target));
