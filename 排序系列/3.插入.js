/*
 * @Author: Quinn
 * @Date: 2021-05-07 08:58:33
 * @LastEditTime: 2021-05-07 09:27:14
 * @LastEditors: quinn
 * @Description:
 */
function insert(list) {
    for (let i = 1; i < list.length; i++) {
        let pivot = list[i],
            preInd = i - 1;
        while (preInd >= 0 && pivot < list[preInd]) {
            list[preInd + 1] = list[preInd];
            preInd--;
        }
        list[preInd + 1] = pivot;
    }
    return list;
}
let arr = [3, 4, 2, 8, 1, 5, 7, 9, 0, 6];
console.log(insert(arr));
