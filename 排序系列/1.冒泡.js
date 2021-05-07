/*
 * @Author: Quinn
 * @Date: 2021-05-07 08:54:16
 * @LastEditTime: 2021-05-07 08:58:16
 * @LastEditors: quinn
 * @Description:
 */
function bubble(list) {
    for (let i = 0; i < list.length - 1; i++) {
        for (let j = 0; j < list.length - 1 - i; j++) {
            if (list[j] > list[j + 1]) swap(list, j, j + 1);
        }
    }
    return list;
}
function swap(list, i, j) {
    let t = list[i];
    list[i] = list[j];
    list[j] = t;
}
let arr = [3, 4, 2, 1, 5, 7, 9, 0];
console.log(bubble(arr));
