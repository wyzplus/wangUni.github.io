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
- 具名插槽 <br>
需要多个插槽的情况，<slot>有一个attribute：name。可以用来定义额外的插槽
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