# 原理篇
## Vue-router路由原理  
[link](https://zhuanlan.zhihu.com/p/27588422)
[link](https://www.jianshu.com/p/4295aec31302)
随着前端应用的业务功能越来越复杂、用户对于使用体验的要求越来越高，单页应用（SPA）成为前端应用的主流形式。大型单页应用最显著特点之一就是采用前端路由系统，通过改变URL，在不重新请求页面的情况下，更新页面视图。<br/>
“更新视图但不重新请求页面”是前端路由原理的核心之一，目前在浏览器环境中这一功能的实现主要有两种方式：
### 利用URL中的hash（“#”） HashHistory
特点:
* hash虽然出现在URL中，但不会被包括在HTTP请求中。它是用来指导浏览器动作的，对服务器端完全无用，因此，改变hash不会重新加载页面
* 可以为hash的改变添加监听事件：
        window.addEventListener("hashchange", funcRef, false)
* 每一次改变hash（window.location.hash），都会在浏览器的访问历史中增加一个记录
    
HashHistory中的push()方法：
```js
push (location: RawLocation, onComplete?: Function, onAbort?: Function) {
  this.transitionTo(location, route => {
    pushHash(route.fullPath)
    onComplete && onComplete(route)
  }, onAbort)
}
function pushHash (path) {
  window.location.hash = path
}
//transitionTo()方法是父类中定义的是用来处理路由变化中的基础逻辑的，push()方法最主要的是对window的hash进行了直接赋值HashHistory.replace()
//replace()方法与push()方法不同之处在于，它并不是将新路由添加到浏览器访问历史的栈顶，而是替换掉当前的路由：
replace (location: RawLocation, onComplete?: Function, onAbort?: Function) {
  this.transitionTo(location, route => {
    replaceHash(route.fullPath)
    onComplete && onComplete(route)
  }, onAbort)
}
  
function replaceHash (path) {
  const i = window.location.href.indexOf('#')
  window.location.replace(
    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
  )
}
```
### 利用History interface在 HTML5中新增的方法 HTML5History
pushState(), replaceState()使得我们可以对浏览器历史记录栈进行修改：
两者优劣
当然，严谨的我们肯定不应该用颜值评价技术的好坏。根据MDN的介绍，调用history.pushState()相比于直接修改hash主要有以下优势：
* pushState设置的新URL可以是与当前URL同源的任意URL；而hash只可修改#后面的部分，故只可设置与当前同文档的URL
* pushState设置的新URL可以与当前URL一模一样，这样也会把记录添加到栈中；而hash设置的新值必须与原来不一样才会触发记录添加到栈中* pushState通过stateObject可以添加任意类型的数据到记录中；而hash只可添加短字符串
* pushState可额外设置title属性供后续使用


**history模式的一个问题**
比如用户直接在地址栏中输入并回车，浏览器重启重新加载应用等。

hash模式仅改变hash部分的内容，而hash部分是不会包含在HTTP请求中的：
http://oursite.com/#/user/id   // 如重新请求只会发送http://oursite.com/
故在hash模式下遇到根据URL请求页面的情况不会有问题。
而history模式则会将URL修改得就和正常请求后端的URL一样
http://oursite.com/user/id
解决：
在 Vue 应用里面覆盖所有的路由情况，然后在给出一个 404 页面。或者，如果是用 Node.js 作后台，可以使用服务端的路由来匹配 URL，当没有匹配到路由的时候返回 404，从而实现 fallback。

## Virtual DOM原理
## webPack原理
## AST原理
## Vue实现数据双向绑定的原理
## base64的原理
## babel原理
## ajax原理
## 响应式布局的原理？
## Bootstrap 网格系统（Grid System）的工作原理
* （1）行必须放置在 .container class 内，以便获得适当的对齐（alignment）和内边距（padding）。
* （2）使用行来创建列的水平组。
* （3）内容应该放置在列内，且唯有列可以是行的直接子元素。
* （4）预定义的网格类，比如 .row 和 .col-xs-4，可用于快速创建网格布局。LESS 混合类可用于更多语义布局。
* （5）列通过内边距（padding）来创建列内容之间的间隙。该内边距是通过 .rows 上的外边距（margin）取负，表示第一列和最后一列的行偏移。
* （6）网格系统是通过指定您想要横跨的十二个可用的列来创建的。例如，要创建三个相等的列，则使用三个 .col-xs-4
##  generator 原理

Generator 是 ES6中新增的语法，和 Promise 一样，都可以用来异步编程
```js
// 使用 * 表示这是一个 Generator 函数
// 内部可以通过 yield 暂停代码
// 通过调用 next 恢复执行
function* test() {
  let a = 1 + 2;
  yield 2;
  yield 3;
}
let b = test();
console.log(b.next()); // >  { value: 2, done: false }
console.log(b.next()); // >  { value: 3, done: false }
console.log(b.next()); // >  { value: undefined, done: true }
//从以上代码可以发现，加上 *的函数执行后拥有了 next 函数，也就是说函数执行后返回了一个对象。每次调用 next 函数可以继续执行被暂停的代码。以下是 Generator 函数的简单实现
// cb 也就是编译过的 test 函数
function generator(cb) {
  return (function() {
    var object = {
      next: 0,
      stop: function() {}
    };
    return {
      next: function() {
        var ret = cb(object);
        if (ret === undefined) return { value: undefined, done: true };
        return {
          value: ret,
          done: false
        };
      }
    };
  })();
}
// 如果你使用 babel 编译后可以发现 test 函数变成了这样
function test() {
  var a;
  return generator(function(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        // 可以发现通过 yield 将代码分割成几块
        // 每次执行 next 函数就执行一块代码
        // 并且表明下次需要执行哪块代码
        case 0:
          a = 1 + 2;
          _context.next = 4;
          return 2;
        case 4:
          _context.next = 6;
          return 3;
                // 执行完毕
        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}
```

## SSR原理？
## react-native实现原理?
## echart这类图像库的实现原理？
## 小程序的实现原理是什么？
## React的diff/patch算法原理?
## angularJS的数据绑定采用什么机制？详述原理？



优缺点篇
base64的优缺点
* 优点可以加密，减少了http请求
* 缺点是需要消耗CPU进行编解码

ajax优缺点

经典面试题：
插入几万个 DOM，如何实现页面不卡顿？
* 对于这道题目来说，首先我们肯定不能一次性把几万个 DOM 全部插入，这样肯定会造成卡顿，所以解决问题的重点应该是如何分批次部分渲染 DOM。大部分人应该可以想到通过 requestAnimationFrame 的方式去循环的插入 DOM，其实还有种方式去解决这个问题：虚拟滚动（virtualized scroller）。
* 这种技术的原理就是只渲染可视区域内的内容，非可见区域的那就完全不渲染了，当用户在滚动的时候就实时去替换渲染的内容

