/*
 * @Author: Quinn
 * @Date: 2021-05-12 14:04:48
 * @LastEditTime: 2021-05-12 14:40:12
 * @LastEditors: quinn
 * @Description:  
 */
var num = 1;
var obj = {
    objNum: 1
}
function add() {
    num++;
    obj.objNum++;
    console.log(num,obj.objNum);
}
console.log(module.exports===exports);
module.exports = {
    obj,
    num,
    add
};