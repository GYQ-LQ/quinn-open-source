/*
 * @Author: Quinn
 * @Date: 2021-05-07 11:09:52
 * @LastEditTime: 2021-05-07 11:34:55
 * @LastEditors: quinn
 * @Description:
 */
function mergeSort(list) {
    if (list.length <= 1) return list;
    let mid = Math.floor(list.length / 2);
    return merge(mergeSort(list.slice(0, mid)), mergeSort(list.slice(mid)));
}
function merge(left, right) {
    let res = [];
    while (left.length && right.length) {
        res.push(left[0] < right[0] ? left.shift() : right.shift());
    }
    res.push(...left, ...right);
    return res;
}
let arr = [3, 4, 2, 8, 1, 5, 7, 9, 0, 6];
console.log(mergeSort(arr));
