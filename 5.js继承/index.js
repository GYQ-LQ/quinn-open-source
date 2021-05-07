/*
 * @Author: Quinn
 * @Date: 2021-04-10 19:21:31
 * @LastEditTime: 2021-05-06 10:57:14
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

/* 
原型链继承
重点：让新实例的原型等于父类的实例。
特点：1、实例可继承的属性有：实例的构造函数的属性，父类构造函数属性，父类原型的属性。（新实例不会继承父类实例的属性！）
缺点：1、新实例无法向父类构造函数传参。
　　　2、继承单一。
　　　3、所有新实例都会共享父类实例的属性。（原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改！）
*/
function Per() {
  this.name = "jason";
}
Per.prototype = new Person(); // 重点
let p1 = new Per("peter"); // 1 新实例无法向父类构造函数传参
let p2 = new Per();
Person.prototype.age = 11; // 3 所有新实例都会共享父类实例的属性
p1.info();
console.log(p1.age);
console.log(p2.age);
console.log(p1 instanceof Person);

/* 
借用构造函数继承
重点：用.call()和.apply()将父类构造函数引入子类函数（在子类函数中做了父类函数的自执行（复制））
特点：1、只继承了父类构造函数的属性，没有继承父类原型的属性。
　　　2、解决了原型链继承缺点1、2、3。
　　　3、可以继承多个构造函数属性（call多个）。
　　　4、在子实例中可向父实例传参。
缺点：1、只能继承父类构造函数的属性。
　　　2、无法实现构造函数的复用。（每次用每次都要重新调用）
　　　3、每个新实例都有父类构造函数的副本，臃肿。
*/
function Con(name) {
  Person.call(this, name); // 重点
  this.age = 12;
}
let con = new Con("ABC");
console.log(con.name);
console.log(con.age);
con.info();
console.log(con instanceof Person); // false

/* 
组合继承（组合原型链继承和借用构造函数继承）（常用）
重点：结合了两种模式的优点，传参和复用
特点：1、可以继承父类原型上的属性，可以传参，可复用。
　　　2、每个新实例引入的构造函数属性是私有的。
缺点：调用了两次父类构造函数（耗内存），子类的构造函数会代替原型上的那个父类构造函数。
*/
function SubType(name) {
  Person.call(this, name); // 构造函数继承
}
SubType.prototype = new Person(); // 原型链继承
SubType.prototype.constructor = SubType;
var sub = new SubType("SubName");
console.log(sub.name); // 继承构造函数属性
console.log(sub.age); // 继承父类原型的属性
sub.info();
console.log(sub instanceof Person);

/* 
原型式继承
重点：用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了个可以随意增添属性的实例或对象。object.create()就是这个原理。
特点：类似于复制一个对象，用函数来包装。
缺点：1、所有实例都会继承原型上的属性。
　　　2、无法实现复用。（新实例属性都是后面添加的）
*/
// 封装一个函数容器，用来输出对象和承载继承的原型
function content(obj) {
  function F() {}
  F.prototype = obj; // 继承了传入的参数
  return new F(); // 返回函数对象
}
let sup = new Person("quinn");
var sup1 = content(sup); // 拿到父类的实例
console.log(sup1.name);
console.log(sup1.age);
sup1.info();
console.log(sup1 instanceof Person);

/* 
寄生式继承
重点：就是给原型式继承外面套了个壳子。
优点：没有创建自定义类型，因为只是套了个壳子返回对象（这个），这个函数顺理成章就成了创建的新对象。
缺点：没用到原型，无法复用。
*/

function newcontent(obj) {
  function F() {}
  F.prototype = obj; // 继承了传入的参数
  return new F(); // 返回函数对象
}
// 以上是原型式继承，给原型式继承再套个壳子传递参数
function subobject(obj) {
  var sub = newcontent(obj);
  sub.name = "gar";
  return sub;
}
let sp = new Person();
var sup2 = subobject(sp);
console.log(sup2.name);
console.log(sup2.age);
sup2.info();
console.log(sup2 instanceof Person);

/* 
寄生组合式继承（常用）
寄生：在函数内返回对象然后调用
组合：1、函数的原型等于另一个实例。2、在函数中用apply或者call引入另一个构造函数，可传参　
重点：修复了组合继承的问题
*/
function content(obj) {
  function F() {}
  F.prototype = obj; // 继承了传入的参数
  return new F(); // 返回函数对象
}
// content 就是F实例饿的另一种表示法
var mycon = content(Person.prototype);
// con实例（F实例）的原型继承了父类函数的原型
// 上述更像原型链继承， 只不过只继承了原型属性

// 组合
function Sub(name) {
  Person.call(this, name); // 这个继承了父类构造函数的属性
} // 解决了组合式两次调用构造函数的缺点
// 重点
Sub.prototype = mycon; // 继承了con实例
mycon.constructor = Sub; // 修复实例
var mysub = new Sub("aaa");
console.log(mysub.age);
console.log(mysub.name);
console.log(mysub.age);
mysub.info();
console.log(mysub instanceof Person);
