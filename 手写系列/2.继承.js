/*
 * @Author: Quinn
 * @Date: 2021-05-06 10:49:01
 * @LastEditTime: 2021-05-06 11:19:53
 * @LastEditors: quinn
 * @Description:
 */
function Person(name) {
  this.name = name;
  this.info = function () {
    console.log(this.name, "/", this.age);
  };
}
Person.prototype.age = 10;

// 原型链
function Per() {
  this.name = "jason";
}
Per.prototype = new Person();
// 构造函数

function Con(name) {
  Person.call(this, name); // 重点
  this.age = 12;
}
// 组合式
function SubType(name) {
  Person.call(this, name); // 构造函数继承
}
SubType.prototype = new Person(); // 原型链继承
SubType.prototype.constructor = SubType;
// 原型式
// 封装一个函数容器，用来输出对象和承载继承的原型
function content(obj) {
  function F() {}
  F.prototype = obj; // 继承了传入的参数
  return new F(); // 返回函数对象
}
// 寄生式
function createObj(o) {
  var clone = Object.create(o);
  clone.sayName = function () {
    console.log("hi");
  };
  return clone;
}
// 继承组合式
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
function prototype(child, parent) {
  var prototype = object(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}
// 当我们使用的时候：
