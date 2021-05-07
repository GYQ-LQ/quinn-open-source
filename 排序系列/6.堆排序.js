/*
 * @Author: Quinn
 * @Date: 2021-05-07 11:09:52
 * @LastEditTime: 2021-05-07 11:27:42
 * @LastEditors: quinn
 * @Description:
 */
function heap(list) {
    buildMaxHeap(list);
    for (let j = list.length - 1; j > 0; j--) {
        swap(list, 0, j);
        setHeap(list, 0, j);
    }
    return list;
}
function buildMaxHeap(list) {
    for (let i = Math.floor(list.length / 2); i >= 0; i--) {
        setHeap(list, i, list.length);
    }
}
function setHeap(list, i, len) {
    let left = 2 * i + 1,
        right = 2 * i + 2,
        max = i;
    if (left < len && list[left] > list[max]) max = left;
    if (right < len && list[right] > list[max]) max = right;
    if (max != i) {
        swap(list, i, max);
        setHeap(list, max, len);
    }
}
function swap(list, i, j) {
    let t = list[i];
    list[i] = list[j];
    list[j] = t;
}
let arr = [3, 4, 2, 8, 1, 5, 7, 9, 0, 6];
console.log(heap(arr));
