/*
 * @Author: Quinn
 * @Date: 2021-05-07 09:27:29
 * @LastEditTime: 2021-05-08 15:49:22
 * @LastEditors: quinn
 * @Description:
 */
function shell(list) {
    for (
        let gap = Math.floor(list.length / 2);
        gap > 0;
        gap = Math.floor(gap / 2)
    ) {
        for (let i = gap; i < list.length; i++) {
            let pivot = list[i],
                preInd = i - gap;
            while (preInd >= 0 && pivot < list[preInd]) {
                list[preInd + gap] = list[preInd];
                preInd -= gap;
            }
            list[preInd + gap] = pivot;
        }
    }
    return list;
}

let arr = [3, 4, 2, 8, 1, 5, 7, 9, 0, 6];
console.log(shell(arr));
