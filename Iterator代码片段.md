## 迭代器
对象（Object）之所以没有默认部署 Iterator 接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。不过，严格地说，对象部署遍历器接口并不是很必要，因为这时对象实际上被当作 Map 结构使用，ES5 没有 Map 结构，而 ES6 原生提供了。
### 调用数组中的next方法
```javascript
//声明一个数组
const xiyou = ['唐僧','孙悟空','猪八戒','沙僧'];
//使用 for...of 遍历数组
// for(let v of xiyou){//由于数组，有symbol.Iterator属性
//     console.log(v);
// }

let iterator = xiyou[Symbol.iterator]();
//调用对象的next方法
console.log(iterator);
console.log(iterator.next());
console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
```
### 封装一个迭代器函数
```javascript
//封装一个迭代器函数
const colors = ['red', 'pink', 'green']

const iteratorFunc = arr => {//迭代器生成函数，传入数组，返回迭代器对象
    let index = 0
    return {
        next() {//迭代器对象的next方法
            if (index < arr.length) {
                return { done: false, value: arr[index++] }
            }
            return { done: true, value: undefined }
        }
    }
}

const colorsIterator = iteratorFunc(colors)//调用迭代器函数，返回一个迭代器
//使用迭代器的next方法迭代数组
console.log(colorsIterator.next())
console.log(colorsIterator.next())
console.log(colorsIterator.next())
console.log(colorsIterator.next())
```
```javascript
function makeIterator(array) {//遍历器生成函数 传入数组
  var nextIndex = 0;
  return {//返回一个遍历器对象（即指针对象）
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}

var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

```
### 创建一个可迭代对象
```javascript
//创建一个可迭代对象
const iterableObj = {
    colors: ['red', 'green', 'orange'],
    [Symbol.iterator]() {//给对象添加迭代器生成函数
        let index = 0
        return {
            next: () => {
                if (index < this.colors.length) {
                    return { done: false, value: this.colors[index++] }
                }
                return { done: true, value: undefined }
            }
        }
    }
}

//对象具有可迭代性后具有的性质
// 1、let ... of  ...
for (let color of iterableObj) {
    console.log(color)
}
// 2、spread
console.log([...iterableObj])
// 3、distructing assignment
const [red] = iterableObj
console.log(red)
// 4、new Set
console.log(new Set(iterableObj))
// 5、Array.from
console.log(Array.from(iterableObj))
// 6、Promise.all()
Promise.all(iterableObj).then(res => {
    console.log(res)
})
```
### 创建一个可迭代对象2
```javascript
//声明一个对象
const banji = {
  name: "终极一班",
  stus: [
    'xiaoming',
    'xiaoning',
    'xiaotian',
    'knight'
  ],
  [Symbol.iterator]() {
    //索引变量
    let index = 0;
    //
    let _this = this;
    return {
      next: function () {//改为es6写法：next:()=>{}就不用保存this了  不然for of调用next时this会指向window
        if (index < _this.stus.length) {
          const result = { value: _this.stus[index], done: false };
          //下标自增
          index++;
          //返回结果
          return result;
        }else{
          return {value: undefined, done: true};
        }
      }
    };
  }
}
//遍历这个对象 
for (let v of banji) {
  console.log(v);
}
```
### 无穷迭代器
由于 Iterator 只是把接口规格加到数据结构之上，所以，遍历器与它所遍历的那个数据结构，实际上是分开的，完全可以写出没有对应数据结构的遍历器对象，或者说用遍历器对象模拟出数据结构。下面是一个无限运行的遍历器对象的例子。
```javascript
var it = idMaker();

it.next().value // 0
it.next().value // 1
it.next().value // 2
// ...

function idMaker() {
  var index = 0;

  return {
    next: function() {
      return {value: index++, done: false};
    }
  };
}
```
### 类部署Iterator接口
```javascript
class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }

  [Symbol.iterator]() { return this; }

  next() {
    var value = this.value;
    if (value < this.stop) {
      this.value++;
      return {done: false, value: value};
    }
    return {done: true, value: undefined};
  }
}

function range(start, stop) {
  return new RangeIterator(start, stop);
}

for (var value of range(0, 3)) {
  console.log(value); // 0, 1, 2
}
```
### 类数组对象部署Iterator接口
```javascript
let iterable = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]//将它的遍历接口改成数组的Symbol.iterator属性
};
for (let item of iterable) {
  console.log(item); // 'a', 'b', 'c'
}

//普通对象部署数组的Symbol.iterator方法，并无效果
let iterable = {
  a: 'a',
  b: 'b',
  c: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // undefined, undefined, undefined
}
```
