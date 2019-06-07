# ECMAscript

## es5

ES5语法归纳 [链接1](https://blog.csdn.net/H5BOYs/article/details/78293124)[链接2](https://blog.csdn.net/chuangxin/article/details/85088485)

### 保留关键字
  -  class：类，ES6引入
  -  const：常量，ES6引入
  -  enum：
  -  extends：类继承，ES6引入
  -  import：模块导入，ES6引入
  -  export：模块导出，ES6引入
  -  super：调用父类的构造函数，ES6引入


### ES5丰富了对象方法、属性处理
```js
var o = (function(){
        var age = 0;
        return {
            get age (){return age;},
            set age (v){ age = v; }
        }
    })();
console.log(o.age); // o.age =12;console.log(o.age); //12
Object.defineProperty(o5,”name”,{ 
    writable：false, //属性不可以写入
    configurable：false，//属性不可以删除
    enumerable：false，//属性不可以枚举
    value:’eos5’ //属性值设置
})
```
strict模式  https://blog.csdn.net/kjnsfijglqj/article/details/81097262

### ES5 数组增加很多方法

::: tip
Array增加方法 every，some，foreach，filter，indexOf/lastIndexOf(返回索引值)，isArray（判断是否为数组），map，
reduce，reduceRight (接受一个累加器函数)  
Array原有方法 contact，join，pop/push数组结尾出栈入栈，reverse数组反转，shift/unshift数组开头操作，  
slice数组截取，不改变原有数组，splice数组删除，改变原有数组，sort数组升序降序，toString
::: 
**every 测数组所有元素是否都符合指定条件（通过函数提供)**
```js
var ages = [32, 33, 16, 40];
function checkAdult(age) { return age >= 18; }
ages.every(checkAdult); //false
ages.some(checkAdult); //true
```
**some 测数组所有元素是否部分符合指定条件（通过函数提供)**  
   
**foreach方法用于调用数组的每个元素，并将元素传递给回调函数，不返回数组**
```js
array.forEach(function(currentValue, index, arr), thisValue) 
demoP = document.getElementById("demo"); 
var numbers = [4, 9, 16, 25];
function myFunction(item, index) { 
    demoP.innerHTML = demoP.innerHTML + "index[" + index + "]: " + item + "
”; 
}
<button onclick="numbers.forEach(myFunction)">点我</button>
```
**filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。返回数组**
```js
var ages = [32, 33, 16, 40];
function checkAdult(age) { return age >= 18; }
let arr = ages.filter(checkAdult); //[32,33,40]
```
**map(function(currentValue,index,arr),thisValue) 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。**
```js
var numbers = [4, 9, 16, 25];
function myFunction() {
    var arr = numbers.map(Math.sqrt); [2,3,4,5]
}
```
**contact  字符串拼接**
```js
var parents = ["Jani", "Tove"];
var hege = ["Cecilie", "Lone"];
var stale = ["Emil", "Tobias", "Linus"];
var children = hege.concat(stale);  
var family = parents.concat(brothers, children);
```
**join 合并数组为字符串**
```js
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.join();
```
**slice(index,num)数组截取**
```js
var fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango”]; 
var citrus = fruits.slice(1,3);  //"Orange", “Lemon” 1为选取开始，3为选取结束，
index从0开始，num从1开始， index为负数从-1开始，num为负数也为-1开始
```
**splice(index,num,elem)**
```js
var arr= ["amy", "willian", "elice", "divi", "lvy", "marry"]
arr.splice(1,2,"sss”) ["amy", "sss", "divi", "lvy", "marry”]
arr.splice(1,1,"xxx”) ["amy", "xxx", "divi", "lvy", "marry"]
```
**sort数组升序，降序**
```js
points = [40,100,1,5,25,10];
points.sort(function(a,b){return b-a}); //100,40,25,10,5,1
points.sort();//1,5,10,25,40,100
```
### Object增加了很多方法
**Objects属性 constructor**
```js
    function Antzone(webName){
    this.webName=webName;
    }
    Antzone.prototype={  
    address:"青岛市南区",
    age:4
    };  这段代码是重置对象原型，而不是修改对象原型，也就是更换了一个新的原型对象，所以原型对象的constructor属性就不再是人为的指向构造函数的情况，而是指向它真正的构造函数Object：
    Antzone.prototype.constructor = Antzone  可以用此代码重新指向原型。
    let antzone=new Antzone("蚂蚁部落");
    console.log(antzone.constructor === Antzone); //false 
    console.log(Antzone.prototype.constructor===Antzone); //false   
```
**[放弃class，一步一图彻底理解Javascript的原型链](https://blog.csdn.net/m0_37589327/article/details/78655038)**

```js
function Computer(){ this.name = 'computer'; } 
var c = new Computer(); 
c.prototype //error  prototype 属性只有构造函数才有， __proto__向上找，  
// computer. prototype  computer.prototype.constructor同级查找。 因为prototype返回也是一个对象。

```
::: tip
1 只有构造函数才有原型 Function.prototype  Array.prototype Object.prototype  
2 每个对象都有__proto__属性，包括Window，Dom对象,RegExp对象等等，代表对象的原型对象,typeof为object类型  
3 每个对象都有 construtor属性，代表对象的构造函数。 typeof返回为function类型
:::

**Object.create(protoObj, descriptorSet)，对象创建函数，一个很关键的函数，可以解决对象继承问题；**
```js
let obj=Object.create(null,{
  webName:{
    value:"蚂蚁部落",
    enumerable:true
  },
  url:{
    value:"softwhy.com",
    enumerable: true
  }
});
console.log(obj.webName); 
console.log(obj.__proto__);
```
**Object.defineProperty(obj,propertyname,descriptor) 方法一次只能为对象添加或者修改一个属性
Object.defineProperties(obj, propName, descriptorSet) 可以多个修改**
```js
let antzone = {
  webName:"蚂蚁部落",
  url: "http://www.softwhy.com",
  age:4
};
Object.defineProperty(antzone,”address”,{ 
    value:"青岛市南区",
    writeable:true, //属性是否可更改
    enumerable:true, //属性是否可枚举
    configruable:false //属性可否可以删除
})
delete antzone.address; 
console.log(antzone.address); //青岛市南区

```
**Object.getOwnPropertyNames(obj)，获取对象自有属性名称**
```js
function Antzone(){ 
    this.webName="蚂蚁部落"; 
    this.age=6; 
}
Antzone.prototype={ address:"青岛市南区" }
let antzone=new Antzone();
console.log(Object.getOwnPropertyNames(antzone)); //webName,age 
```
**Object.getPrototypeOf(obj)，获取对象原型对象，**
```js
let reg=/a/;
let result=(Object.getPrototypeOf(reg)===RegExp.prototype);
console.log(result); //true
```
**Object.getOwnPropertyDescriptor(obj, propName)，获取属性定义描述对象{configurable,enumerable,value,writable}**
<img src='/img/1.png' style="width:600px; ">

**Object.preventExtensions(obj)，阻止对象扩展，对象不能增加新属性**
```js
"use strict"
let obj = { webName: "蚂蚁部落”, url:”www.softwhy.com"  }
Object.preventExtensions(obj);
obj.age = 4; //error 
Object.isExtensible(obj); //判断对象是否可扩展

let antzone={ webName:"蚂蚁部落”, url:”softwhy.com" }
Object.preventExtensions(antzone);
console.log(Object.isExtensible(antzone)) //false 
Object.seal(obj);//密封对象，保护对象属性除值外，其余定义属性都不能修改，也不能新增、删除属性；
```
**Object.isSealed(obj)：判断对象是否被密封；**

**configurable 配置属性是否可被删除。**

**Object.freeze(obj)：对象冻结，对象属性不能修改，包括值；**
1. 对象不能被扩展，也就是不能添加新的属性与方法。
2. 对象属性不能被删除。
3. 对象属性值也不能被改变。
4. 对象属性的可枚举性、可读写性与可配置性都不能修改。
5. 
**Object.isFrozen(obj)：判断对象是否被冻结；**

**Object.keys(obj)：获取对象可枚举的自有属性名称，是getOwnPropertyNames(obj)的子集。**
返回的是Array    Object.keys(obj).map(function(i){ return i=i+1;})
  
 
**Object.isPrototypeOf(obj)  方法可以检测一个对象是否在另一个对象的原型链上。**
```js
function Foo(){}
let f=new Foo();
console.log(Foo.prototype.isPrototypeOf(f));
console.log(Object.prototype.isPrototypeOf(f));
Object.ipropertyIsEnumerable(obj) 属性是否可以枚举
```
### ES5的函数特性，新增bind方法
```js
Funciton.prototype.bind              Date.now
String.prototype.trim
```
### JSON.stringify() .parse()
```js
JSON.stringify( ) js对象转换成json字符串，序列化
JSON.parse( )  ,解析json字符串，构建js对象 ，反序列化
var jsonObj = { x: 5, y: 6 };
var jsonStr = JSON.stringify(jsonObj); 
var jsonObj2 = JSON.parse(jsonStr);
console.log(jsonStr);  // "{"x":5,"y":6}”
console.log(jsonObj2, jsonObj == jsonObj2);//Object { x: 5, y: 6 }  false  obj对象和反序列化的JSON对象还不一样。。
```
## es6
### 零碎扩展let const ..
**块级作用域  {  } let，const**  

- let和const声明的变量和常量对外都是不可见的，称之为块级作用域。var声明的变量对外依然可见。
- let命令，const命令 两者不同点，let变量声明后，可以更改；const声明变量后，不可更改。
1. 创建块级作用域。
2. 不存在提升现象。
3. temporal dead zone。
4. 不允许在同一作用域内重复声明。
5. 不会成为全局属性。

**数组解构赋值/对象解构/字符串解构/函数参数解构**
...

**剩余运算符，展开运算符**
...

**八进制二进制**
...    

**Iterator迭代器**
Iterator遍历器接口不仅数组具有，比如以下数据结构也具有：  
（1）.Set。  
（2）.Map。  
（3）.字符串。  
（4）.TypedArray。  
<img src="/img/2.png" width=300>
::: tip 添加自定义遍历接口。
有些数据结构是没有遍历器结构的，我们可以为它添加自定义遍历器接口。对于不具有遍历器接口的类数组对象，为其添加遍历器接口的最简单的方式就是直接添加数组的遍历器接口。
:::
```js
let obj = {
  0: "蚂蚁部落",
  1: "www.softwhy.com",
  2: "青岛市南区",
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let elem of obj) {
  console.log(elem);
}
```
for of  for of语句可以遍历所有具有遍历器接口的对象。具有遍历器接口的对象如下：    
```js
//1. 数组对象。
let arr = ["蚂蚁部落",6,"青岛市南区","ES2015"];
for(let elem of arr) {
  console.log(elem);
}
//2. 某些类数组对象。 
function func(a, b) {
  let it = arguments[Symbol.iterator](); //类数组对象
  for(let arg of it) {
    console.log(arg);
  }
}
func("蚂蚁部落", "青岛市南区");
//.arguments对象具有遍历器接口。.for of本质上是通过遍历器对象来遍历数据结构。
//3 .Map对象。
//4 .Set对象。
//5 .字符串 也可以遍历
let str = "softwhy";
for(let char of str) {
  console.log(char); 
}
```
### Generator函数
异步编程解决方案，Generator函数是一个状态机，封装了多个内部状态。
```js
function* helloWorldGenerator() {
     yield 'hello’; 
    yield 'world’; 
    return 'ending’;
} 
hw.next( );//hello  
hw.next( );//world  
hw.next();//‘ending’
```
### Promise对象
:::tip
异步编程的一种解决方案，所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise是一个对象，从它可以获取异步操作的消息。 解决异步操作回调函数多层嵌套的问题。 JS一大特点就是单线程运行，不阻塞线程就要用异步。<br/>
**特点：**

1. 对象的状态不受外界影响    Pending(进行时)    Resolved(已完成)    Rejected(已失败)
2. 一旦状态改变，就不会再变 变化只有两种可能：从Pending变为Resolved和从Pending变为Rejected

**缺点：**
1. 无法取消，新建后就立即执行，中途无法取消。
2. 不设置回调函数就会报错
3. pending状态后无法得知进展到哪一阶段。
4. then方法每调用一次就会创建一个新的promise对象。造成资源浪费 
5. then方法和catch方法结尾，要是最后一个方法抛出错误，都可能无法捕捉到。 可以封装一个done方法
:::
```js
var promise=new Promise(function(resolve,reject){ 
    //在promise实例resolve之后，错误无法被捕获。
    resolve();
    throw new Error('test');//该错误无法被捕获
})
promise.then(function(){
//
}).then(function(e){
    console.log(e)
}) 
```
```js
Promise.prototype.done = function( onFulfiled,onRejected){ 
    this.then(onFulfiled, onRejected).catch( 
        function(reason){  
            setTimeout(()=>{ throw reason },0); 
    });
}
Promise.prototype.finally = function(callback){  
    let P = this.constructor;
    return this.then( 
        value => P.resolve(callback()).then(()=>value),
        reason => P.resolve(callback()).then(()=>{ throw reason })
    )
}
```
```js
promise.then( function(value){ 
    //sucess
},function(error){ 
    //failture
})
```  
```js 
function loadImageAsync( url ){ 
    return new Promise( function( resolve, reject ){ 
        var image = new Image( );
        image.onload = function( ){ 
            resolve( image );
        };
        image.onerror = function( ) { 
            reject( new Error( ‘Could not load image at’+ url ));
        };
        image.src = url ;
    })
}
```  
```js 
var getJSON = function(url){ 
    var promise = new Promise( function( resolve ,reject){ 
        var client = new XMLHttpRequest( );
        client.open( ‘GET’,url );
        client.onreadystatechange = handler ;
        client.responseType = ‘json’;
        client.setRequestHeader(‘Accept’,’application/json’);
        client.send( );
        function handler( ){ 
            if( this.readyState!==4){ 
                return ;
            }
            if(this.status ===200){ 
                resolve( this.response );
            }else{ 
                reject( new Error( this.statusText));
            }
        };
    });
    return promise ;
};
getJSON( ‘/posts.json’).then( (json)=>{ 
    console.log( cotents’+json’);
},(error)=>{ 
    console.log( ‘出错’,error)
})
```
**1.promise.prototype.then( call1,call2 )**
then方法的第一个参数是Resolved状态的回调函数，第二个参数（可选）是Rejected状态的回调函数。 then方法返回的也是promise对象。 专门用来处理两个promise回调函数用的。
```js 
   getJSON( ‘/post/1.json’ ).then( function( post ) { 
        return getJSON( post.commentURL );
    }).then( function funcA( comments ) { } , function funcB( err ){ console.log(“rejected:”,err );})
    
    getJSON(‘/post/1.json’).then( 
        post=> getJSON( post.commentURL )
    ).then( 
        comments => console.log( ‘resolved’, comments), 
        err =>console.log(‘rejected’,err )
    )
```
**2.Promise.prototype.catch( )** 
.then(null, rejection)的别名，用于指定发生错误时的回调函数。
```js
 p.then((val) => console.log("fulfilled:", val)) .catch((err) => console.log("rejected:", err));
 // 等同于
p.then((val) => console.log("fulfilled:", val)) .then(null, (err) => console.log("rejected:", err));
//一般来说，不要在then方法里面定义Reject状态的回调函数（即then的第二个参数），总是使用catch方法。
promise.then( 
    function(data) { } ,
    function(err){ }
); //bad 
promise.then( 
    function(data){ }
).catch(function(err){ 
...
}) // good
```
**3.Promise.all( )**
方法用于多个Promise实例，包装成一个新的Promise实例
::: tip
var p = Promise.all( [p1, p2, p3] );
1. 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
2. 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
:::
例子：booksPromise和userPromise是两个异步操作，只有等到它们的结果都返回了，才会触发pickTopRecommentations这个回调函数。
```js
const databasePromise = connectDatabase( );
const booksPromise = databasePromise.then(findAllBooks);
const userPromise = databasePromise.then(getCurrentUser);
Promise.all([booksPromise,userPromise]).then(([books,user])=>
        pickTopRecommentations(books,user)
);
```
**4.Promise.race([p1,p2,p3])**    
只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的Promise实例的返回值，就传递给p的回调函数。 
如果指定时间内没有获得结果，就将Promise的状态变为reject，否则变为resolve。
```js
var p = Promise.race([ 
    fetch（'/resource-that-may-take-a-while’）,
    new Promise(function(resolve,reject){ 
        setTimeout(() =>reject(new Error(‘request timeout’)),5000)
    })
])
p.then(response =>console.log(response))
p.catch(error =>console.log(error))
```
**5.Promise.resolve()** 

将现有的对象转为Promise对象，Promise.resolve可以起到这个作用
```js
var jsPromise = Promise.resolve($.ajax(‘/whatever.json’));
Promise.resolve(‘foo’)  
//等同于 new Promise(resolve =>resolve('foo'))
```
1. 参数是一个Promise实例 ，不做任何修改返回promise参数对象
2. 参数是一个thenable对象,thenable 对象指的具有then方法的对象。

```js
let thenable = { 
    then:funciton(resolve, reject ){  resolve(42); }
}
let p1 = Promise.resolve(thenable);
p1.then(function(value){ console.log(value); }) //42
```
3. 参数不是具有then方法，或者根本就不是对象
```js
var p = Promise.resolve(‘hello’);
p.then(function(s){ console.log(s) });
```
4. 不带任何参数，直接返回一个resolved状态的Promise对象
```js
var = Promise.resolve();
p.then(function(){  //… })
```
**6 Promise.reject(reason)**     
方法返回一个新的Promise实例，该实例的状态为rejected。它的参数用法与Promise.resolve 方法完全一致 
```js
var p = Promise.reject(‘出错了’);    //等同于 var p = new Promise( (resolve,reject)=>reject(‘出错了’))
p.then( null, function(s){ console.log( s ) });
```
### 字符串扩展

**endsWith/startWith ( searchString [, position] )**
```js
let str = "abcdefgh";
console.log(str.endsWith("gh"));  //true
```
**includes( searchString[, position] )**
```js
let str = "antzone";
console.log(str.includes("zon",4)); //false
```
**normalize()**    

**repeat( count )**
let str = "蚂蚁部落";
```js
console.log(str.repeat(3)); //蚂蚁部落蚂蚁部落
console.log(str); //蚂蚁部落  并不会操作原来字符
```
**模板字符串 ${ }占位**
### Number扩展
**Number.parsetInt  / Number.parseFloat**    
把原有的全局方法移植到Number对象上   

**Number.isFinite( )**        
监测是否是个有效数字 
```js
Number.isFinite(15); // true 
Number.isFinite(0.8); // true 
Number.isFinite(NaN); // false
```
**Number.isNaN**    
监测一个值是否是NaN 
上面两个和全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，非数值一律返回false。
```js
isFinite(25) // true 
isFinite("25") // true 
Number.isFinite(25) // true 
Number.isFinite("25") // false
```
**Number.isSafeInteger()**  返回true/false    

**Number.EPSILON**  极小的常量

**MAX_SAFE_INTEGER / MIN_SAFE_INTEGER**    
JavaScript能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。

### Array扩展
**Array.from( )**     
可以将指定的参数转换为真正的数组。
```js
let obj = { 
    "0": 1, 
    "1": 2, 
    "2": 3, 
    "3": 4, 
    length:4 
}; 
let thisobj = { num:2 }
Array.from(obj,function(elem,index){
    return [elem*this.num,index]   //this为 thisobj，第三个参数传入。
},thisobj)
```
**Array.of( element0[, element1[, ...[, elementN]]] )**    
接受任意类型的参数，参数之间用逗号分隔，并且能够将参数转换为数组
```js
let arr = Array.of(3);
console.log(arr[0]); // [3]
let arr = Array.of("蚂蚁部落",5,"www.softwhy.com”); 
console.log(arr); // ["蚂蚁部落", 5, "www.softwhy.com"]
```
::: tip
Array( )与Array.of( )区别  
如果Array()参数只有一个，那么它规定的是数组长度，多个参数，是规定数组元素。
Array.of( )方法，无论参数是一个还是多个，都是规定的数组元素。
:::

**copyWithin( target, start[, end = this.length] )**    
将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。

**entries( )**    
方法会返回一个遍历器对象，能够实现对数组键值的遍历功能。
```js
let arr = ["蚂蚁部落", "www.softwhy.com", 6];
let eArr = arr.entries();
console.log(eArr.next());
console.log(eArr.next());
console.log(eArr.next());
```
**find( callback(element,index,array)[,thisArg]))**    
此方法可以检索数组中满足指定条件的第一个元素。
```js
let arr = [2,3,4,5,6,10]
let obj = [ num:5 ]
let elem = arr.find(function(ele,index){ 
    if(ele>this.num){ 
        return true; 
    }
},obj)
console.log(elem);   //6 
```
**findIndex( arr.findIndex(callback(element,index,array)[, thisArg]) )**     
此方法可以检索数组中满足指定条件的第一个索引值

**fill( value[, start [, end]] )**    
:::tip 
替代splice slice数组插入的新方法
:::    

<img src="/img/3.png" width=300/><br/>
fill方法是直接操作数组本身。     
1开始，3结束     
<img src="/img/4.png" width=400/>

**keys( )**     
以返回指定数组索引的遍历器对象。 entries( ) 返回的是数组的值而非索引
```js
let arr = ["蚂蚁部落", "www.softwhy.com", 6];
let eArr = arr.entries();
console.log(eArr.next()); //0
console.log(eArr.next()); //1
console.log(eArr.next()); //2
```
**includes( ele[, start] )**  
检测数组中是否含有指定元素。
```js
let arr=["青岛市南区","蚂蚁部落",6,"ES2015"];
console.log(arr.includes("蚂蚁部落")); //true
```
**values( )**  
它会返回一个对象，包含指定数组的元素值。
```js
let arr = ["蚂蚁部落", "www.softwhy.com", 4, "antzone"];
var iterator = arr.values();
for (let elem of iterator) {
  console.log(elem); 
}
```
### 函数扩展
**允许函数参数默认值**
```js
function log(x='hello',y = 'world' ){ 
    console.log(x, y)
}   
log('hello') //hello world
```
**于解构赋值默认值结合使用**
```js
function foo({x, y = 5}) { 
    console.log(x, y);
}
foo({ }) //undefined,5  
foo({x:1,y:2})//1,2  
foo( ) //error
```
**函数length属性。 指定了默认值后，length属性将失真。**
```js
(function (a) {}).length // 1 
(function (a = 5) {}).length // 0 
(function (a, b, c = 5) {}).length // 2
```
**rest参数,（形式为“...变量名”），用于获取函数的多余参数，这样就不需要使用arguments对象了。**
```js
function add(...values){ 
    let sum = 0;
    for(let val of values){ 
        sum += value;
}}  
add(2,5,3) //10
```
**扩展运算符 是rest参数的逆运算。将一个数组转为用逗号分隔的参数序列。**
```js
console.log(...[1, 2, 3])  // 1 2 3
Math.max( 14,3,77 )
Math.max.bind( Math,[14,3,7] )
Math.max( ...[14,3,7] ) 
```
**函数 name属性**
```js
var func1 = function () { };
func1.name // “” es5
func1.name // “func1”  es6
```

### 箭头函数
```js
var f = v=>x;
var f = function(v){ return x; }

var f = function( ) { return 5; }
var f = ( ) =>5 ;

var sum = (num1,num2)=>num1+num2
var sum = function( num1, num2 ){ 
    return num1+num2; 
}

[1,2,3].map(function( a,b ){ return a -b;  })
var result = values.sort( (a,b)=>a-b; )
```

:::tip 
tip在 ES6 的箭头函数下, call 和 apply 将失效
:::
块级作用域声明函数，在块级作用域内的函数声明会被提升到当前块级作用域的顶部，
```js
（function( ){ 
    if( false ){  
        function func( ){ 
            console.log(‘xxxxx') } 
        }
        func( )
    }( ));
等同于
  （function( ){ 
        var func = undefined;
        if( false ){  
            function func( ){ 
                console.log(‘xxxxx’); 
            } 
        }
        func( );
    }( ));
```

### Object扩展
**属性简洁表示法**
```js
var foo = 'baz'; var baz= { foo } //es6

var baz={ foo:'baz' } //es5
```
**允许简写方法名称,  允许在对象之中，只写属性名，不写属性值；** 
```js
var o = { 
    method(){ 
        return 'hello!'; //es6
    } 
}
var o = { 
    method:function(){ 
        return 'hello!';  //es5
    }
}

function getPoint( ){ 
    var x =1;
    var y=10;
    return { x, y } //es6
    return { x:x, y:y } //es5
}
function setPoint( x, y ){ 
    return { x,y } //es6
    return { x:x, y:y } //es5
}

module.exports = { getPoint, setPoint }; //es6
module.exports = {  //es5
    getItem: getPoint,
     setItem: setPoint, 
};
```
**允许字面量定义对象时，用（表达式）作为对象的属性名，即把表达式放在方括号内。**
```js
let propKey = 'foo’; 
let obj = { 
    [propKey]: true, 
    ['a' + 'bc']: 123
};
```
**方法的name属性**
```js
var person = { 
    sayName() { console.log(this.name); }, 
    get firstName() { return "Nicholas"; }
};
person.sayName.name //’sayName’
person.firstName.name //‘get firstName’
(new Function( )).name // 'anonymous'
doSomething.bind().name //"bound doSomething”
```
**Object.is**  
它用来比较两个值是否严格相等 
::: tip    
相等运算符（==）和严格相等运算符（===）。它们都有缺点，前者会自动转换数据类型，后者的NaN不等于自身，
:::
Object.is( 'foo', 'foo' ) //true 
Object.is(+0, -0) // false   
Object.is(NaN, NaN) // true

**Object.assign( target, ...sources )**    
能够将一个或者多个对象的属性拷贝到目标对象。
::: tip
Object.assign方法只会拷贝可枚举属性
拷贝到目标对象的属性的值只是{x:1,y:2}对象的地址， 拷贝方式为浅拷贝。  
也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
用途：1 添加属性，2 添加方法 3克隆对象 4为属性指定默认值
:::
```js
class Point { 
    constructor(x, y) { Object.assign(this, {x, y}); }
}
Object.assign(SomeClass.prototype, { 
    someMethod(arg1, arg2) { ··· }, 
    anotherMethod() { ··· }
})

function clone( origin ){    
    return Object.assign( { },origin )
}
function processContent(options) { 
    let options = Object.assign( { }, DEFAULTS, options ); 
}
```
**Object.getOwnPropertySymbols( object )**
返回值是存储自有Symbol属性的数组。
 
**Object.setPrototypeOf( obj, proto )**    
此方法可以设置对象的原型。

**Object.values( )**    
返回存储指定对象所有自有可枚举属性值的数组。
```js
let Antzone={
  webName:"蚂蚁部落",
  age:6
}
Object.defineProperty(Antzone, "url", {
    value: "http://www.softwhy.com",
    enumerable: false //不可遍历
});
console.log(Object.values(obj));//["蚂蚁部落",6]
```
七 Math扩展 正则表达式扩展

## es7
**ES7 api 新增**
### str.padStart/padEnd 
str.padStart/padEnd( targetLength [, padString] ) 字符串头部/尾部扩充

### function bind    
函数绑定”（function bind）运算符，用来取代call、apply、bind

```js
foo::bar  //es7
bar.bind(foo) //es5

foo::bar( ...arguments ); //es7
bar.apply( foo, arguments); //es5
```
### Object.entries(obj)   
返回给定对象自有可枚举属性键值对的数组，返回嵌套数组

### async/await  
async 函数是 Generator 函数的语法糖。使用 关键字 async 来表示，在函数内部使用 await 来表示异步
```js
/**
 * Promise 方式
 */
function getUserByPromise() {
    fetchUser()
        .then((data) => {
            console.log(data);
        }, (error) => {
            console.log(error);
        })
}
getUserByPromise();
/**
 * Generator 方式
 */
function* fetchUserByGenerator() {
    const user = yield fetchUser();
    return user;
}
const g = fetchUserByGenerator();
const result = g.next().value;
result.then((v) => {
    console.log(v);
}, (error) => {
    console.log(error);
})
/**
 * async 方式
 */
async function getUserByAsync(){
    let user = await fetchUser();
    return user;
}

getUserByAsync().then(
    v => console.log(v)
);
//async 函数返回一个 Promise 对象
async function f() { 
    return 'hello world'
}; 
f().then( (v) => console.log(v)) // hello world
```

## ES8

### Promise.try   
Promise.try中的错误捕获
```js
function f(){}
Promise.try(f).then(function(){
 
}).catch(function(e){ 
})
```

