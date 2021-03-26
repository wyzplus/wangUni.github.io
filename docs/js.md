---
    title: JS面试点（持续更新中......）
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
- `const,let`，区别；
>`let`声明的变量可以重新赋值，不能在统一作用域重新声明；`const`声明的变量必须初始化，无法重新赋值
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
### :point_right:闭包
::: tip
- 闭包：能够读取其他函数内部变量的函数
- 使用：在一个函数内部创建另一个函数
- 用处：读取其他函数的变量值，让这些变量始终保存在内存中
- 缺点：会引起内存泄露（引用无法销毁，一直存在）
:::
### :point_right:JSONP和Ajax的区别
::: tip
- Ajax的核心是通过xmlHttpRequest获取非本页内容
- jsonp的核心是动态添加script标签调用服务器提供的js脚本
- 

:::