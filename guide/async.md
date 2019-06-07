# 异步编程

## 介绍一下Promise的用途和性质 

<p>含义：一种异步编程的解决方案，简单说就是一个容器，里面保存某个未来才会结束的事件的结果。可以获取到异步操作的信息。 也用来解决异步操作回调函数多层嵌套的问题。</p>

特点：<br/>
1. 对象的状态不受外界影响，只有三个状态。Pending(进行时) Resolved（已完成）Rejected(已经失效)
2. 一旦状态改变，就不会再改变，只有两种可能 Pending ->resolved pending->rejected


缺点：<br/>
1. 无法取消，新建后就立即执行，中途无法取消。
2. 不设置回调函数就会报错
3. pending状态后无法得知进展到哪一阶段。
4. then方法每调用一次就会创建一个新的promise对象。造成资源浪费
5. then方法和catch方法结尾，要是最后一个方法抛出错误，都可能无法捕捉到。 可以封装一个done方法

## 如何实现一个Promise？
定义一个Promise类，就叫做MyPromise，类外部定义三个状态常量，’pending’,’resovle’,’rejected’<br />
这个类定义 构造函数 constructor， 私有方法_resolve,_reject,<br />

constructor，constructor方法接受一个handle函数作为参数，添加_status,_value状态，成功失败回调函数队列。myPromise实例化的时候，handle参数直接在constructor传入私有方法_resolve,_reject并执行。<br />

_resolve私有方法，接受val参数保存到_value状态，首先检测_status状态如果不是”pending”直接return掉。接着把状态变为’FULFILLED’。内部定义两个队列函数runFulfilled，runRejected用来取成功失败队列里的函数用来执行。然后 默认执行成功队列runFulfilled <br />

_reject私有方法，接受一个err参数，保存到_value状态，<br />

其他:公共方法then，catch。静态方法resolve,reject,all,race方法用来直接调用
```js
var p = new MyPromise(function(resolve,reject){
    console.log([...arguments]);
    setTimeout(function(){
        resolve(111);
        console.log('3秒111');
    },3000)
}
const PENDING ="PENDING"
const FULFILLED ='FULFILED'
const REJECTED = ‘REJECTED'
class MyPromise{ 
    constructor(handle){ 
        this._status = PENDING    
        this._value = undefined
        this._fulfilledQueues = []
        this._rejectedQueues = []
        try{
            handle(this._resolve.bind(this), this._reject.bind(this))
        }catch(err){    
            this._reject(err)
        }
    }
    _resolve(val){    
        const run = () =>{
            this._status = FULFILLED
            const runFulfilled = (value)=>{  如果有队列，取成功队列里的任务执行，  }
            const runRejected = (value)=>{  如果有队列，取失败队列里的任务执行，  }
            this._value = val  /*去val值，保存到_value的状态里，val*/
            if(val instanceof MyPromise){ 
                val.then(value=>{ 
                    this._value = value; 
                    runFulfilled(value); 
                })
            }
            else{
                this._value = val;
                runFulfilled(val)
            }
        }
        setTimeout(run, 0)
    }
    _reject(err){  
        if (this._status !== PENDING) return
        const run = () => {
            this._status = REJECTED
            this._value = errlet cb;
            while (cb = this._rejectedQueues.shift()) {
                cb(err)
            }
        }
        setTimeout(run, 0)
    }
}
```
## 如何实现一个Promise.then
::: tip then的精粹在于，在内部实例化的一个匿名的MyPromise对象，这个匿名对象和母类共享全局状态_status,_value
来达到then方法能够截获_value, 母Class声明的promise实例为异步,resolve，then方法匿名实例化也为异步，一开始状态肯定为PENDING,并把p.then后的
onFulfilled保存到数组里。母对象调用reslove方法，如果检测到成功队列数组有在then里push的队列，就会执行。从而达到顺序执行，并且能够顺序传递参数的目的。
:::
```js
class MyPromise{
    constructor{ ... }
    _resolve{ ... }
    _reject{ ... }
    then(onFulfilled,onRejected){
        const { _value, _status } = this //监听_status状态
        
        return new MyPromise((onFulfilledNext,onRejectedNext)=>{ 
            
            let fulfilled = value=>{  
                let res = onFulfilled(value);
                if(res instanceof MyPromise){
                    res.then(onFulfilledNext, onRejectedNext) 
                }
                else{ 
                    onFulfilledNext(res) 
                }
            } 
            let rejected =value =>{    }
            switch(_status){ 
                case PENDING:  //在母类中_resolve被调用之前，状态一定为PENDING,因为_resolve中为setTimeout()异步
                    this._fulfilledQueues.push(fulfilled),
                    this._rejectedQueues.push(rejected)
                break;
                case FULFILLED:
                    fulfilled(_value); break; //即便很少走这个，也要在then方法里做这个， 
                case REJECTED:
                    rejected(_value); break;
            }    
        
        })
    }
    catch(){  
        return this.then(undefined,onRejected) 
    }
    static resolve(value){  
        return new MyPromise(resolve=>resolve(value)); 
    }
    static reject(){ 
        return new MyPromise(reject=>reject(value));  
    }
```
## 如果设计一个promise.all() 
    思路：在all里实现new一个promise实例，拿到list的长度，遍历list promise参数，迭代所有list,等到迭代第三个，就resolve
```js
    static all(list){ 
        return new Promise((resolve,reject)=>{
            let value = [ ]
            let count = 0
            for(let[i,p] of list.entries()){ 
                this.resolve(p).then(res=>{ 
                    value[i]=res;
                    count++;
                    if(count===list.length) 
                        resolve(value) 
            //只有遍历完成之后，再resolve所有的promiseList，resolve里有专门处理对象的逻辑。
                    },err=>{  
                        reject(err) 
                    })
            }
        })
    }
    static race(){    }
} 
```

## promise里面和then里面执行有什么区别?  
promise和then执行两者本质没有区别，都是new一个promise对象。 <br/>
区别是then要等待promise的状态要变为resolve，拿到状态和_value之后，再去执行，否则then就没有意义。 <br/>
还有then的参数函数 resolvefuc, rejectedfunc, new 后 在pending的状态下是被保存到promise的构造函数resolveList, rejecedtList里，等promise resolve执行完毕之后，再调用执行。<br/>
Promise构造函数是同步执行，then是异步的

## Promise和Callback有什么区别? 
两者是取缔关系，promise取代callback。promise包含三种状态，callback只有一种状态。避免过渡回调

## async/await是什么？

async/await是generator的语法糖，是ES7的内容，babel 可以使用stage-3使用，是promise的一种替代方案。<br/>
async/await是用来代替Promise的方案，理由如下：<br/>
1. 简单，不需要写.then，不需要写匿名函数处理Promise的resolve值，也不需要定义多余的data变量，还避免了嵌套代码。
2. 错误处理 Async/Await让try/catch可以同时处理同步和异步错误


```js
const makeRequest = () => {
    try{ 
        getJSON( ).then(result=>{ 
            const data = JSON.parse(result); 
            console.log(data); 
        }).catch(err=>{    
            console.log(err)  
        })
    }catch(err){   
        console.log(err)    
    }
}

const makeRequest = async ( )=>{
    try{ 
        const data = JSON.parse(await getJSON())
        console.log(data)
    }catch(err){ 
        console.log(err)
    }
}
```
3. 错误栈明显 
   
4. 方便调试可以打断点 
<br />
<img src="/img/5.png" width=400>
<img src="/img/6.png" width=300>
## Promise和Async处理失败的时候有什么区别?
**Promise错误处理方法**
1. 在Promise的构造体内进行错误处理
```js
var promise = new Promise(function(resolve,reject){ 
    try{ 
        try new Error(’test')
    }catch(e){ reject(e) }
})
```

2. 通过Promise.prototype.catch来进行错误处理

```js
var promise=new Promise(function(resolve,reject){
   reject(new Error('test'));
})
promise.catch(function(e){
     console.log(e)
})
```

3. 在promise实例resolve之后，错误无法被捕获。  
```js
var promise=new Promise(function(resolve,reject){
   resolve();
   throw new Error('test');//该错误无法被捕获
})
promise.then(function(){
  //
}).then(function(e){
  console.log(e)
})
```
**Async/await 错误处理**
1. async中的错误处理,async的返回值也是个promise,跟promise的错误处理差不多。

```js
async function F(){ 
    throw new Error('test1’)  //async里面throw Error 相当于返回Promise.reject。
}
var f=F(); 
f.catch(function(e){
    console.log(e)
}); // Error:test1
```
2. await中的错误处理，promise.reject必须要被捕获
```js
async function F(){   
    await Promise.reject('Error test1').catch(function(e){ 
        console.log(e) 
    }) 
} 
var f=F(); // Error:test1
async function F(){
  await Promise.reject('Error test1’); //没有捕获，就会中断async函数的执行
  await 2
}
var f=F()
```
::: tip
两者错误不同的处理方式
1. Promise可以在构造体里直接捕获，而async/await返回的是promise,可以通过catch直接捕获错误
2. wait 后接的Promise.reject都必须被捕获，否则会中断执行。
:::

## Promise和setTimeout的区别
Promise先执行，setTimeout后执行。  
::: tip
setTimeout属于浏览器的宏任务，Promise是微任务，微任务先执行。
* 而宏任务一般是：包括整体代码script，setTimeout，setInterval、setImmediate。
* 微任务：原生Promise(有些实现的promise将then方法放到了宏任务中)、process.nextTick、Object.observe(已废弃)、 MutationObserver 记住就行了。

:::


## 什么是Event Loop（事件循环）

简单介绍：循环是指主线程 重复从任务（消息）队列中取任务（消息）、执行的过程。取一个任务（消息）并执行的过程叫做一次循环。

* 我们的同步任务在主线程上运行会形成一个执行栈
* 如果碰到异步任务，比如setTimeout、onClick等等的一些操作，我们会将他的执行结果放入执行队列 宏任务队列，此期间主线程不阻塞
* 等到主线程中的所有同步任务执行完毕，就会通过event loop在队列里面从头开始取，在执行栈中执行
* event loop永远不会断
* 微任务队列先于宏任务队列执行
* 以上的这一整个流程就是Event Loop（事件循环机制）


<img src="/img/8.png" width=400>

## setInterval
setInterval( )方法会出现程序并不是按照我们设定的精确时间而调用的问题，因为setinterval内部执行函数，在规定的时间没有执行完成完，
setInterval受单线程影响出现时间不精确现象；
使用循环+setTimeout可以完成循环执行，并且弥补了setInterval的不足；
