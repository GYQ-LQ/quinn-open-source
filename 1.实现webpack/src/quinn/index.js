/*
 * @Author: Quinn
 * @Date: 2021-04-14 18:15:07
 * @LastEditTime: 2021-04-14 18:29:29
 * @LastEditors: quinn
 * @Description:  
 */
// import myCounter from "./counter";

// myCounter += 1;

// console.log(myCounter);

var data = {
    name: "niuzai",
    info: {
        age: 18,
        sex: "male"
    }
};

JSON.stringify(data, function (key, val) {
    console.log("key is %s", key);
    console.log("val is %s", typeof (val));
    return val;
});