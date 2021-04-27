---
    title: 【JS】面试点（持续更新中......）
    date: 2021-03-22 15:17:55
    author: lysan
    categories:
        - 加薪必备之JS篇
    tags:
        - JS
    publish: true 
---

### :point_right:原型、原型链、继承
::: tip
原型：每一个构造函数都有`prototype`属性，这个属性在生成实例的时候，会成为实例对象的原型对象。
:::
```js
    //举个栗子吧
    function Animal(name){
        this.name = name;
    }
    Animal.prototype.color = 'white';
    var cat1 = new Animal('大猫');
    var cat2 = new Animal('小猫');
    cat1.color //white
    cat2.color //white
```
**以上代码中，构造函数`Animal`的`prototype`对象，就是实例对象`cat1`，`cat2`的原型对象，原型对象上添加了`color`属性，实例对象继承了该属性。**
::: tip
`prototype`的作用：实现资源共享
:::
```js
    //再举个栗子
    function Cat(name,color){
        this.name = name;
        this.color = color;
        //修改前
        this.miao = function(){
            console.log(this.name+'叫了')
        }
    }
    //修改后
    // Cat.prototype.miao = function(){
    //     console.log(this.name+'叫了')
    // }
    var cat1 = new Cat('小白猫','white')
    var cat2 = new Cat('小花猫','gray')
```
**`cat1，cat2`是同一构造函数的两个实例，都有`miao`方法。`miao`方法是生成在每个实例对象上面，因此两个实例生成了两次。每新建一个实例就会创建`miao`方法。造成了资源的浪费，解决此问题可以使用`prototype`**
::: tip
原型链：读取对象的某个属性时，会先寻找对象本身的属性，如果没有就去它的原型去找。直到最顶层的Object.prototype找不到，就返回undefined。

继承： `prototype`实现继承
:::
**********
### :point_right:JS继承的多种方式
- 原型链继承（prototype）
- 借用构造函数（经典继承）（call）
- 组合继承 （prototype+call）
- 寄生式继承
- 寄生组合式继承
***************************************************
### :point_right:ES6新特性
- 模板字符串； 
>`${key}`
- `const,let`；
>区别：`let`声明的变量可以重新赋值，不能在统一作用域重新声明；`const`声明的变量必须初始化，无法重新赋值
- 对象和数组的解构赋值；
```js
    //解构数组
    const point = [10,20,30]
    const [x,y,z] = point;
    console.log(x,y,z)  //10,20,30
    //解构对象
    const obj = {
        type:'color',
        name:'中国',
        num:14
    }
    const { type,name,num} = obj
    console.log(type,name,num)  //color,中国,14
```
- 对象字面量简写
```js
    const type = 'color';
    const name = '中国';
    const num = 14;
    const obj = {
        type:type,
        name:name,
        num:num
    }
    //或者
    const type = 'color';
    const name = '中国';
    const num = 14;
    const obj = {type,name,num}
```
- for...in，for...of；（for...in需要index访问数组的值，for...of循环，只访问对象里的值）
```js
    var arr = [1,2,3,4,5]
    for( const index in arr){   //index作为索引
        console.log(index+'---'+arr[index])   //0，1，2，3，4---1,2,3,4,5
    }
    for(const item of arr){     //item每一项元素值
        console.log(item)       //1,2,3,4,5
    }
```
- 展开运算符，将对象字面量展开为多个元素
```js
    //用来结合数组
    let arr1 = [1,2.3]
    let arr2 = [4,5,6]
    let arr = [...arr1,...arr2]
```
- 剩余参数（可变参数）
```js
    //将不定量的元素表示为数组
    let arr = ['banana','apple','orange','eegegs','milk']
    let [fruit,...item] = arr;
    fruit = 'banana';
    item = ['apple','orange','eegegs','milk']
```
- 箭头函数
```js
    const a = [1,2,3,4].map(
        name => console.log(name)       
    )
```
- 默认参数函数
```js
    function a(name='小明'){
        return name
    }
```
***********************
### :point_right:箭头、普通函数的区别
- 普通函数：可以通过`call，apply，bind`改变`this`指向，可以使用`new`（`this`：谁调用我我就指向谁）
- 箭头函数：继承自外层第一个普通函数的this，被继承的普通函数的`this`指向改变，箭头函数的this指向跟着变。箭头函数外层没有普通函数时，`this`指向`window`。不能
通过`bind，call，apply`改变`this`指向，不能使用`new`调用函数。（`this`：我在哪个环境中我就指向谁）
```js
    var factory = function(){
        this.a = 'a';
        this.b = 'b';
        this.c = {
            a: 'a+',
            b:function(){
                return this.a
            }
        }
    }
    console.log(new factory().c.b()) //a+
```
> 普通函数中`this`指向调用该函数的对象，调用该函数的对象是`c`，所以`this`指向`c`
```js
    var factory = function(){
        this.a = 'a';
        this.b = 'b';
        this.c = {
            a: 'a+',
            b:()=>{
                return this.a
            }
        }
    }
    console.log(new factory().c.b()) //a
```
> 箭头函数`this`指向定义时`this`的指向，定义时`this`指向的是`factory`函数
****************************************
### :point_right:原型链和作用域链的区别
::: tip
- 原型链：`prototype`
- 作用域链：变量的取值会在创建这个变量的函数中去取
- 区别：作用域是对变量而言，原型链相对于对象而言；作用域的顶层是`window`，原型链的顶层是`objec`
:::
*******************************
### :point_right:js判断数据类型
> 基本数据类型：`number，string，boolean，null，undefined`
- `typeof`，检测不出数组和`null`，结果都为`object`，只能检测基本数据类型
- `instanceof`，不能检测出`number，string，boolean，null，undefined`类型，常用来检测复杂类型
- `constructor`，`null`和`undefined`没有`constructor`方法，不能判断`null`和`undefined`
- `Object.prototype.toString.call()`，全类型都可判断。
******************************
### :point_right:document.write、document.innerHTML的区别
::: tip
- `document.write`将内容写进页面，清空之前的内容，页面会重绘
- `document.innerHTML`在节点写入内容，页面不会重绘
:::
***********************************************************
### :point_right:null和undefined的区别
::: tip
- `null`，什么都没有，表示一个空对象
- `undefined`，没有设置变量的值
- `typeof undefined`  //undefined
- `typeof null`       //object
- `null === undefined` //false
- `null == undefined`  //true
:::
****************************************************
### :point_right:eval()的作用
::: tip
计算字符串，并执行其中的js代码
:::
**************************************************
### :point_right:闭包
::: tip
- 闭包：能够读取其他函数内部变量的函数
- 使用：在一个函数内部创建另一个函数
- 用处：读取其他函数的变量值，让这些变量始终保存在内存中
- 使用场景：给对象设置私有变量并且利用特权方法去访问私有属性
- 缺点：会引起内存泄露（引用无法销毁，一直存在）
:::
****************************************************
### :point_right:JSONP和Ajax的区别
::: tip
- Ajax的核心是通过xmlHttpRequest获取非本页内容
- jsonp的核心是动态添加script标签调用服务器提供的js脚本
- jsonp只支持get请求，Ajax可支持get、post请求
:::
*****************************************************
### :point_right:JavaScript的同源策略
::: tip
协议、域名、端口相同，同源策略是一种安全协议，指一段脚本只能读取来自同一来源的窗口和文档的属性
:::
**************************************************
### :point_right:事件冒泡和事件委托
::: tip
- 事件冒泡：一个元素接收到事件的时候，会把接收到的事件传递给父级，一直到window。阻止事件冒泡可使用event.stopPropagation（）
- 事件委托：把事件给最外层的元素，自己不实现逻辑，由最外层元素来处理
:::
****************************************************
### :point_right:js延迟加载的方式
::: tip
- defer，`<script src=”test.js” defer=”defer”></script>`，立即下载，但是会等到整个页面解析完成后再执行；
- async，`<script src=”test.js” async></script>`，不让页面等待脚本下载和执行（异步下载），但是无法控制加载的顺序；
- 动态创建script标签
- 使用定时器延迟
- 让js最后加载
:::
*******************************************************
### :point_right:promise和async
::: tip
- async/await是基于promise实现的，不能用于普通的回调函数
- async/await使异步代码看起来更像同步代码
- async/await和promise一样，是非阻塞的
:::
::: tip 区别
- 函数前面多了async。await只能用在async定义的函数内。
- async/await更节约代码。不需要.then，不需要写匿名函数处理promise的resolve的值，不需要定义多余的data变量，避免了嵌套代码。
- async/await让try/catch可以同时处理同步和异步错误。try/catch不能处理JSON.parse的错误，因为在promise中。此时需要.catch，这样的错误处理代码非常冗余。
- 条件语句
```js
    //该举个栗子了
    const makeRequest = ()=>{
        return getJSON().then( data => {
            if(data.needsAnotherRequest){
                return makeAnotherRequest(data).then( moreData => {
                    console.log(moreData)
                    return moreData;
                })
            }else{
                console.log(data)
                return data;
            }
        })
    }
    //将以上代码 使用async/await改写
    const makeRequest = async()=>{
        const data = await getJSON();
        if(data.needsAnotherRequest){
            const moreData = await makeAnotherRequest();
            console.log(moreData)
            return moreData
        }else{
            console.log(data)
            return data;
        }
    }
```
:::
*************************************************************
### :point_right:==和===的区别，什么时候用==
::: tip
- ==判断转换后的值是否相等
- ===判断值和类型是否完全相等
- 不需要判断类型时使用==
:::
**********************************************************
### :point_right:如何判断两个对象
::: tip
- 判断两个类型是否是对象
- 判断两个对象的key的长度是否一致
- 判断value值得数据类型，根据不同数据类型做比较
    - 是对象，重复以上步骤
    - 是数组，转字符串比较
    - 是基本类型，直接判断
:::
********************************************************
### :point_right:js为什么要区分微任务和宏任务
::: tip
- js是单线程的，但是区分同步和异步
- 微任务和宏任务都属于异步任务，他们都属于一个队列
- 宏任务一般是：script，setTimeot，setInterval，setImmediates
- 微任务：原生promise
- 遇到微任务先执行微任务，执行完后如果没有微任务，就执行下一个宏任务
:::
********************************************************
### :point_right:promise和setTimeout执行的顺序
::: tip
promise是微任务，先执行promise
:::
********************************************************
### :point_right:AMD、CMD、和common.js的理解
>都是js模块化的规范
>common.js是服务端js模块化的规范，node.js就是这种规范的实现，是同步的
>AMD（异步模块定义）和CMD（通用模块定义）都是浏览器端js模块化的规范。requirejs遵循的是AMD，seajs遵循的是CMD
- common.js是一个单独的文件。加载模块使用require方法，该方法读取一个文件并执行，最后返回该文件的exports对象
- AMD（异步模块定义），通过define方法定义模块，通过require方法加载模块，requirejs实现了这种规范
- CMD（通用模块定义），是seajs在推广过程中对模块定义的规范化产出
********************************************************
### :point_right:深拷贝、浅拷贝
::: tip 浅拷贝的方法：
- for...in只循环第一层
- object.assign
- 直接用=赋值
:::
::: tip 深拷贝的方法：
- 递归拷贝所有层级属性
- object.parse(object.stringsy())
- 通过jQuery的extend方法。var a = [1,2],var b = $.extend(true,[],a)
:::

###  :point_right:https缓存
- 强制缓存：当缓存数据库中已有缓存的数据时，客户端直接从数据库中读取数据。当缓存数据库中没有所请求的数据，客户端才从服务端获取<br>
强制缓存，请求头包含两个字段：expires和cache-control
- 协商缓存：客户端先从缓存数据库中获取一个缓存数据的标识，得到标识后请求服务端验证标识是否失效，没有失效客户端会返回304，此时客户端从数据库中读取数据，若失效，则请求服务端获取新数据<br>
缓存标识：last-modified，if-modidined-since，if-unmodified-since，etag