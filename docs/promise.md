---
    title: 【JS】Promise详解
    date: 2021-04-09 15:17:55
    author: lysan
    categories:
        - 加薪必备之JS篇
    tags:
        - JS
    publish: true 
---

```js
    //简单使用
    var p1 = new Promise(test)
    var p2 = p1.then(function(result) {
        console.log('成功'+result)
    })
    var p3 = p2.catch(function(reasons) {
        console.log('失败：'+reason)
    })
    //p1是一个promise对象，负责执行test函数。test函数在内部是异步执行的，当test执行成功时，告诉promise对象
    //如果执行成功，执行这个函数
    // p1.then(function(result) {
    //     console.log('成功'+result)
    // })
    //当test执行失败时，告诉promise对象
    // p2.catch(function(reasons) {
    //     console.log('失败：'+reason)
    // })
    //promise对象可以串联起来，以上可以简化为：
    new Promise(test).then(function(result) {
        console.log('成功'+result)
    }).catch(function(reasons) {
        console.log('失败'+reasons)
    })
```
```js
    //举例
    new Promise(function(resolve,reject){
        console.log('start new Promise')
        var timeOut = Math.random()*2;  //2以内的随机数
        console.log('set timeOut to:' + timeOut + 'second.')
        setTimeout(function(){
            if( timeOut < 1){
                console.log('call resolve()...')
                resolve('200 OK')
            }else{
                console.log('call reject()...')
                resolve('timeout in' + timeOut + ' seconds.')
            }
        },timeOut*1000)
    }).then(function(r){
        console.log('Done:'+r)
    }).catch(function(reason){
        console.log('Failed: '+reason)
    })
```