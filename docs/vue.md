---
title: 【vue】
date: 2021-03-20 10:40:40
author: lysan
categories:
    - 加薪必备之vue篇
tags:
    - vue
publish: true 
---
### keep-alive
>keep-alive用于保存组件的渲染状态或避免重新渲染
::: tip props
include：只有名称匹配的组件会缓存 <br/>
exclude：任何名称不匹配的组件都不会缓存<br/>
max：最多可以缓存多少组件实例
:::
### v-if、v-for不能同时使用的原因
::: tip
    v-for的优先级高于v-if，意味着v-if会应用于每个v-for循环中
    解决方法：1、可先在计算属性中遍历
    2、v-if移动到容器元素上
```js
// 反例
    <ul>
        <li v-for="user in users"  v-if="user.isActive" :key="user.id">
            {{ user.name }}
        </li>
    </ul>
    <ul>
        <li v-for="user in users" v-if="shouldShowUsers" :key="user.id">
            {{ user.name }}
        </li>
    </ul>
```
```js
    // 好例子
    <ul>
        <li v-for="user in activeUsers" :key="user.id">
            {{ user.name }}
        </li>
    </ul>
    <ul v-if="shouldShowUsers">
        <li v-for="user in users" :key="user.id">
            {{ user.name }}
        </li>
    </ul>
    computed: {
        activeUsers: function () {
            return this.users.filter(function (user) {
                return user.isActive
            })
        }
    }
```

:::
### watch和computed
::: tip
computed是计算属性，根据依赖的数据动态显示新的计算结果，计算出来的属性不需要调用，可直接在dom中使用<br/>
watch是侦听器，当需要在数据变化时执行异步或开销较大的操作时，此方法可用
:::
### vuex
::: tip 核心
- state：是全局的状态存储，数据存储在其中，vue组件可以直接访问其中的值，但是只可以读，不可以进行写操作
- getter：有时候需要对获取的数据进行加工，获取数据的一部分或者某些属性，而不是直接获取state中的数据，这时候可以通过getter定义函数，返回对应的数据
- mutations：是vuex中唯一一个可以修改数据的地方，mutations可以定义事件函数，在vue组件中可以通过commit发射事件，调用函数。需要注意的是：mutations中的操作必须是同步的，不可以存在异步操作的情况
- actions：和mutation比较相似，不同的是action中不能直接修改state，二十通过commit调用mutations修改数据，而且actions中可以存在异步处理逻辑
:::
```js
const store = new Vuex.store({
    state:{
        count:1
    },
    mutations:{
        increment(state){
            state.count++
        }
    }
})
//唤醒一个mutation函数，需要commit方法
store.commit('increment')   //参数是方法名
```
>actions只是一个架构性的概念，并非必须的，本质上就是一个函数，要修改state的值，仍需要经过commit出发mutation。
```js
    actions:{
        increment(context){
            context.commit('increment')
        }
    }
    //action经过store.dispatch方法触发
    //store.dispatch('increment')
```
### vue-router实现原理
::: tip 三种模式
1、hash模式
默认模式，通过路径中的hash值来控制路由跳转，不存在兼容问题
hash模式实现原理：在正常路径后跟一个#，匹配#后边的路径为前端路由，通过window.onhashchange方法来操控路由改变的时候切换内容<br>
2、history模式：
:::

### 虚拟DOM
::: tip 模板转换成视图的过程
- 将template模板转换成渲染函数，执行渲染函数就可以得到一个虚拟节点数
- 在对dom进行操作的时候，会触发对应dep中的watcher对象。watcher对象会调用对应的update来修改视图。这个过程主要是将新旧节点进行差异对比，然后根据对比结果进行DOM操作来更新视图
:::

### 插槽
- 插槽内容<br>
插槽内可以包含任何模板代码，包括HTML、其他的组件
```js
    //父组件
    <navigation-link url="/profile">
        <!-- 添加一个 Font Awesome 图标 -->
        <span class="fa fa-user"></span>
        Your Profile
    </navigation-link>
    // 子组件
    <a v-bind:href="url" class="nav-link">
        <slot></slot>
    </a>
    // slot的内容为 
    // <span class="fa fa-user"></span>
    // Your Profile
    // 如果<navgation-link>的template中没有包含一个<slot>元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃
```
- 编译作用域<br>
当在插槽使用数据时
```js
    <navigation-link url="/profile">
        Clicking here will send you to: {{ url }}
        <!--
        这里的 `url` 会是 undefined，因为其 (指该插槽的) 内容是
        _传递给_ <navigation-link> 的而不是
        在 <navigation-link> 组件*内部*定义的。
        -->
    </navigation-link>
```
::: tip
父级模板里的所有内容都是在父级作用域中编译的；字模板里的所有内容都在子作用域中编译的
:::
- 后备内容<br>
为插槽设置后备内容，即默认内容
```js
    //组件
    <button type="submit">
        <slot>Submit</slot>
    </button>
    // 使用时
    <submit-button></submit-button> //会渲染Submit
    //也可以这样使用
    <submit-button>
        Save
    </submit-button>    //Save将会替换后备内容Submit
```
- 具名插槽 <br/>
需要多个插槽的情况，slot有一个attribute：name。可以用来定义额外的插槽。

```js
//组件 <base-layout>
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
//一个不带name的<slot>出口会带有隐含的名字default
//在向具名插槽提供内容的时候，可以在<template>元素上使用v-slot指令，并以v-slot的参数的形式提供名称
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

### 匿名插槽、具名插槽、作用域插槽
- 匿名插槽<br>
普通的插槽
```js
    // 父组件
    <h1>我是父组件</h1>
    <child>
        <h1>我是插槽内容</h1>
    </child>
    // 子组件
    <div>
        我是子组件
        <slot></slot>
    </div>
```
- 具名插槽<br>
加一个slot属性，起一个自定义的名字
```js
//父组件
<div>
    我是父组件
</div>
<child>
    我是没人管的插槽（没有名字的插槽会被匿名插槽接收）
    <div slot="slotName">
        我是根据name来加载的具名插槽
    </div>
</child>
//子组件
<div>
    <h1>我是子组件</h1>
    <slot></slot>
    <slot name="slotName"></slot>
</div>
```

- 作用域插槽<br/>
使用slot-scope进行数据的传递，将子组件的值传递给父组件
```js
//子组件
<template>
    <div>
        <h2>这是子组件</h2>
        <slot :data="data"></slot>
    </div>
</template>
data(){
    return {
        data:[1,2,3,4,5]
    }
}
//父组件
<div>
    我是父组件
    <child>
        <template slot-scope="user">   //这里随便定义一个变量，取data时就是user.data
            <div v-for="(item,i) in user.data" v-index="i">
                {{item}}
            </div>
        </template>
    </child>
</div>
```

### 防抖节流
- 防抖节流是使用定时器来实现目的
- 防抖：事件在触发n秒后再执行回调，如果在这n秒内被再次触发，则重新计时<br>
eg：输入框搜索：输入结束后n秒才进行搜索请求，n秒内又输入则重新计时
- 节流：规定在一个单位时间内，只触发一次函数，如果这个单位时间内触发多次函数，则只生效一次<br>
eg：鼠标多次点击触发，单位时间内多次点击，只生效一次

### nextTick
- 下次dom更新循环结束之后执行延迟回调，修改数据之后使用这个方法，获取更新后的dom
::: tip 什么时候使用nextTick
- 生命周期的created()钩子函数进行的DOM操作一定要放在nextTick回调中。因为created()函数执行的时候DOM并未进行任何渲染，此时操作dom无异于徒劳
- 更新数据后想立即使用js操作新的视图时需要使用它
```js
changeTxt:function(){
      let that=this;
      that.testMsg="修改后的文本值";  //修改dom结构
       
      that.$nextTick(function(){  //使用vue.$nextTick()方法可以dom数据更新后延迟执行
        let domTxt=document.getElementById('h').innerText; 
        console.log(domTxt);  //输出可以看到vue数据修改后并没有DOM没有立即更新，
        if(domTxt==="原始值"){
          console.log("文本data被修改后dom内容没立即更新");
        }else {
          console.log("文本data被修改后dom内容被马上更新了");
        }
      });
    },
```
:::
- 在使用某个第三方插件时 ，希望在vue生成的某些dom动态发生变化时重新应用该插件，也会用到该方法，这时候就需要在 $nextTick 的回调函数中执行重新应用插件的方法。

### provider和inject
- 在父组件中定义了provider，在所有的子组件中都可以通过inject来注入父组件中的值
```js
//父组件
export default{
    name:'parent',
    provider:{
        'for':'demo'
    }
}
//子组件
export default{
    name:'childOne',
    inject:['for'],
    data(){
        return{
            data:this.for
        }
    }
}
```
### 组件间的通信方式
- 组件间的关系<br/>
```js
            A.vue
              |
            B.vue
        /           \
    C.vuw           D.vue
    //A/B、B/C、B/D是父子，A/C、A/D是隔代，C/D是兄弟
```
- 组件间的通信方式有：props，$emit/$on，vuex，$parent/$children，$attrs/$listener，$provide/$inject
#### 方法一：props、$emit
- 父组件向子组件传值
```js
//父组件 传值
<child :user="user"></child>
//子组件 取值
export default{
    name:'组件名',
    props:{
        user:{
            type:Array,
            required:true
        }
    }
}
```
- 子组件向父组件传值（通过事件的形式）
```js
//子组件
<button @click="changeTitle">点击我开给父组件传值</button>
export default{
    methods:{
        changeTitle(){
            this.$emit('titChanged','子组件向父组件传的是这句话')
        }
    }
}
//父组件
<child :titChanged="updateTit"></child>
export default{
    methods:{
        updateTit(e){
            console.log(e)  //e是子组件传递的值
        }
    }
}
```
#### 方法二：$emit、$on
- 通过一个空的vue实例作为中央事件总线，用它来触发事件和接收事件，可以实现任何组件之间的通信
- 使用<br/>
``` js
    import Vue from 'vue';
    const Bus = new Vue();
    export default Bus;
    //父组件
    <child-a></child-a>
    <child-b></child-b>
    <child-c></child-c>
    // A组件
    <template id="a">
        <button @click="send">点击我</button>
    </template>
    import Bus from '../../../../js/Bus'
    export default{
        methods:{
            send(){
                Bus.$emit('data-a','Tom')
            }
        }
    }
    // B组件
    <template id="b">
        <button @click="send">点击我</button>
    </template>
    import Bus from '../../../../js/Bus'
    export default{
        methods:{
            send(){
                Bus.$emit('data-b','30岁')
            }
        }
    }
    // C组件
    <template id="c">
        {{name}}{{age}}
    </template>
    export default{
        mounted(){
            Bus.$on('data-a',name=>{
                this.name = name
            })
            s.$on('data-b',age=>{
                this.age = age
            })
        }
    }
    //监听了自定义事件data-a,data-b，不确定什么时候触发回调事件，所以一般会在mounted或creatd钩子函数中来监听
```
#### vuex省略

#### $attrs、$listeners
- 仅传递数据，不做中间处理
- $attrs：包含了父作用域中不被props所识别且获取的特性绑定（class和style除外）。当一个组件没有申明任何prop时，这里会包含所有父作用域的绑定，并且可以通过v-bind="$attrs"传入内部组件。通常配合interitAttrs选项一起使用
- $listenter：包含了父作用域中的（不含.native修饰器的）v-on事件监听器。它可以通过v-on="$listenter"传入内部组件
```js
    // $attrs
    //父组件
    <child
    :foo="foo"
    :boo="boo"
    :coo="coo"
    :doo="doo"
    title="前端开发仔"></child>
    export default{
        data(){
            return {
                foo:'js',
                boo:'html',
                coo:'css',
                doo:'vue'
            }
        }
    }
    //子组件
    <template>
        <p>foo:{{foo}}</p>
        <p>{{$attrs}}</p>
    </template>
    export default{
        inheritAttrs:true,
        porps:{
            foo:{
                type:String
            }
        },
        created(){
            console.log(this.$attrs) //{boo:'html', coo:'css', doo:'vue',title:'前端开发仔'}
        }
    }
    //子子组件
    <template>
        <p>coo:{{coo}}</p>
        <p>{{$attrs}}</p>
    </template>
    export default{
        inheritAttrs:true,
        porps:{
            coo:{
                type:String
            }
        },
        created(){
            console.log(this.$attrs) //{boo:'html', doo:'vue',title:'前端开发仔'}
        }
    }
    //子子子组件
    <template>
        <p>boo:{{boo}}</p>
        <p>{{$attrs}}</p>
    </template>
    export default{
        inheritAttrs:true,
        porps:{
            boo:{
                type:String
            }
        },
        created(){
            console.log(this.$attrs) //{ doo:'vue',title:'前端开发仔'}
        }
    }
```
::: tip
$attrs存放的是父组件中绑定的非props属性，$listener存放的是父组件绑定的非原生事件
:::
```js
// $listener
// 父组件
<child v-on="{changFun1,changeFun2}"></child> //传入两个事件
//子组件
<template>
    <child-second v-on="$listener" @showAttrs="showAttrs"></child-second>
</template>
export default{
    created(){
        console.log('child',this.$listener) //打印出来父组件的两个方法
    }
}
//子子组件
<template>
    <div>孙子</div>
</template>
export default{
    created(){
        console.log('child',this.$listener) //打印出来父组件的两个方法、子组件的showAttrs方法
    }
}
```
### provide、inject
```js
//父组件
export default{
    provide:{
        name:'把我传给子子孙孙们'
    }
}
//子组件
export default{
    inject:['name']
    mounted(){
        console.log(this.name);//子孙们就这样拿到值了
    }
}
```
provide、inject的绑定不是响应的，即父组件的name改变，子孙组件的name不会被改变
- provide、inject实现响应的方法<br/>
1、provide祖先组件的实例，在子孙组件中注入依赖
2、2.6的最新API，Vue.observable优化响应式provide（推荐）
```js
//父组件
<div>
    <button @click="()=>changeColor()"></button>
</div>
export default{
    // provide(){
    //     return:{
    //         theme:{
    //             color:this.color,        此方法并不是可响应的
    //         }
    //     }
    // }
    // provide(){
    //     return:{
    //         theme:this      //方法一：提供祖先组件的实例
    //     }
    // },
    // methods:{
    //     changeColor(color){
    //         if(color){
    //             this.color = color;
    //         }else{
    //             this.color = this.color === 'blue'?'red':'blue'
    //         }
    //     }
    // }
    //方法二：Vue.observable优化响应式provide
    provide(){
        this.theme = Vue.observable({
            color:'blue'
        });
        return{
            theme:this.theme
        }
    }
    methods:{
        changeColor(color){
            if(color){
                this.theme.color = color;
            }else{
                this.theme.color = this.theme.color === 'blue'?'red':'blue'
            }
        }
    }
}
//子组件
<template>
    {{inject.theme.color}}
</template>
export default{
    inject:{
        theme:{
            default:()=>{}  //函数式组件取值不一样
        }
    }
}
```
### $parent、$children与ref
- ref如果在普通dom上使用，就指向的dom，如果在组件上，就指向组件实例<br/>
使用：this.$ref.child.msg（方法或属性）
- $parent，$children：访问父/子实例<br/>
使用：this.$children[1].msg（获取第1个组件的msg属性），this.$parent.tip（获取父组件的tip属性）


### diff算法
- diff的过程就是调用名为patch的函数，比较新旧节点，一边比较一边给真实的dom打补丁

### 自定义指令
- 全局自定义指令<br/>
```js
// 使用： 自定义一个自动聚焦的事件
Vue.directive('focus',{
    //当被绑定的元素插入到dom中时
    inserted：function(el){
        //聚焦元素
        el.focus();
    }
})
```
- 注册局部组件，组件中接受一个directives的选项
```js
directives:{
    focus:{
        //指令的定义
        inserted:function(el){
            el.focus();
        }
    }
}
```
随后，可以在模板的任何元素上使用v-focus，例如<input v-focus/>

### vue修饰符
- 事件修饰符：<br/>
```js
// .stop 、.prevent、.captrue、.self、.once、.passive    
// 阻止单击事件继续传播（阻止事件冒泡）
<a v-on:click.stop="doFun"></a>
// 提交事件不再重载页面
<form v-on:submit.prevent="onSubmit"></form>
// 添加事件监听时使用事件捕获模式
// 事件冒泡
<div v-on:click.capture="doFun"></div>
// 点击事件只会触发一次
<div v-on:click.once="doFun"></div>
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```
- 按键修饰符<br/>
```js
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">
```

### vue2x和vue3x的区别
- vue3x移除了filters过滤器
- 