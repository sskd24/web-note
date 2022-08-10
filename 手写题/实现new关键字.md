## 实现 new 关键字
new 运算符用来创建用户自定义的对象类型的实例或者具有构造函数的内置对象的实例。

实现要点：
* new 会产生一个新对象；
* 新对象需要能够访问到构造函数的属性，所以需要重新指定它的原型；
* 构造函数可能会显示返回；
```js
function objectFactory() {
    var obj = new Object()
    Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj, arguments);
    
    // ret || obj 这里这么写考虑了构造函数显示返回 null 的情况
    return typeof ret === 'object' ? ret || obj : obj;
};
```
使用：
```js
function person(name, age) {
    this.name = name
    this.age = age
}
let p = objectFactory(person, '布兰', 12)
console.log(p)  // { name: '布兰', age: 12 }
```