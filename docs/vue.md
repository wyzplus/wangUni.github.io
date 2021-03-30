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
#### keep-alive
>keep-alive用于保存组件的渲染状态或避免重新渲染
::: tip props
include：只有名称匹配的组件会缓存 <br/>
exclude：任何名称不匹配的组件都不会缓存<br/>
max：最多可以缓存多少组件实例
:::
#### watch和computed
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