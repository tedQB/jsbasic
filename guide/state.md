# 状态管理

## Vuex

### vuex有哪几种属性？

答：有五种，分别是 State、 Getter、Mutation 、Action、 Module

* state

    存储数据，存储状态；在根实例中注册了store 后，用 this.$store.state 来访问；对应vue里面的data；存放数据方式为响应式，vue组件从store中读取数据，如数据发生变化，组件也会对应的更新。

    特性：
    一、Vuex就是一个仓库，仓库里面放了很多对象。其中state就是数据源存放地，对应于与一般Vue对象里面的data

    二、state里面存放的数据是响应式的，Vue组件从store中读取数据，若是store中的数据发生改变，依赖这个数据的组件也会发生更新

    三、它通过mapState把全局的 state 和 getters 映射到当前组件的 computed 计算属性中   

* getter

    getter有点类似vue.js的计算属性，当我们需要从store的state中派生出一些状态，那么我们就需要使用getter，getter会接收state作为第一个参数，而且getter的返回值会根据它的依赖被缓存起来，只有getter中的依赖值（state中的某个需要派生状态的值）发生改变的时候才会被重新计算。

    特性：

    一、getters 可以对State进行计算操作，它就是Store的计算属性

    二、 虽然在组件内也可以做计算属性，但是getters 可以在多组件之间复用

    三、 如果一个状态只在一个组件内使用，是可以不用getters    

* mutation

    更改store中state状态的唯一方法就是提交mutation，就很类似事件。每个mutation都有一个字符串类型的事件类型和一个回调函数，我们需要改变state的值就要在回调函数中改变。我们要执行这个回调函数，那么我们需要执行一个相应的调用方法：store.commit。

    特性：
    
* action

    action可以提交mutation，在action中可以执行store.commit，而且action中可以有任何的异步操作。在页面中如果我们要嗲用这个action，则需要执行store.dispatch

* module

    module其实只是解决了当state中很复杂臃肿的时候，module可以将store分割成模块，每个模块中拥有自己的state、mutation、action和getter。


### 不用Vuex会带来什么问题？

一、可维护性会下降，你要想修改数据，你得维护三个地方

二、可读性会下降，因为一个组件里的数据，你根本就看不出来是从哪来的

三、增加耦合，大量的上传派发，会让耦合性大大的增加，本来Vue用Component就是为了减少耦合，现在这么用，和组件化的初衷相背。

但兄弟组件有大量通信的，建议一定要用，不管大项目和小项目，因为这样会省很多事

 
### Vuex原理

实现方式完完全全的使用了vue自身的响应式设计，依赖监听、依赖收集都属于vue对对象Property set get方法的代理劫持。最后一句话结束vuex工作原理，vuex中的store本质就是没有template的隐藏着的vue组件；

[vuex工作原理详解](https://www.jianshu.com/p/d95a7b8afa06)