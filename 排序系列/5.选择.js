/*
 * @Author: Quinn
 * @Date: 2021-05-07 11:09:52
 * @LastEditTime: 2021-05-07 11:11:39
 * @LastEditors: quinn
 * @Description:
 */

function select(list) {
    for (let i = 0; i < list.length; i++) {
        let minInd = i;
        for (let j = i + 1; j < list.length; j++) {
            minInd = list[j] < list[minInd] ? j : minInd;
        }
        swap(list, minInd, i);
    }
    return list;
}
function swap(list, i, j) {
    let t = list[i];
    list[i] = list[j];
    list[j] = t;
}
let arr = [3, 4, 2, 8, 1, 5, 7, 9, 0, 6];
console.log(select(arr));
