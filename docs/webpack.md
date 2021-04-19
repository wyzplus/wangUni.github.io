---
title: 【webpack】
date: 2021-03-20 10:40:40
author: lysan
categories:
    - 加薪必备之webpack篇
tags:
    - webpack
publish: true 
---
>webpack是一个前端资源加载/打包工具。根据模块的依赖关系，将模块按照指定的规则生成对应的静态资源。<br/>
将多种静态资源，js、css、less转换成一个静态文件，减少了页面的请求
::: tip 部分命令行
- webpack 开发环境构建
- webpack -p -生产环境构建（压缩混淆脚本）
- webpack --watck -监听变动并自动打包
- webpack -d -生成map映射文件
- webpack --colors -构建过程带颜色输出
:::
### 创建1个js文件
```js
// demo1 1个js文件
// main1.js
document.write('hello myself')
// index.html
<body>
    <script type="text/javascript" src="main1.js" charset="utf-8"></script>
</body>
// 使用webpack命令打包
webpack main1.js bundle.js
//执行以上命令，会将main1.js编译并生成bundle.js文件
```
### 创建2个js文件
```js
// demo2 2个js文件
// main2.js
moudle.exports = 'it works from main2';
// main1.js
document.write(require('./main2'))
//打包
webpack main1.js bundle.js
```
### LOADER
>webpack本身只能处理javascript模块，如果要处理其他类型的文件，需要使用loader进行转换。<br/>
如果在应用中添加css文件，需要使用到css-loader和style-loader。<br/>
css-loader会遍历css文件，找到url（）表达式并处理他们。<br/>
style-loader会把原来的css代码插入到页面中的一个style标签中
```js
    // loader
    // style.css
    body{
        background:yellow
    }
    // main1.js
    require('!style-loader!css-loader!./style.css')
    document.write(require('./main2.js'))
    //执行打包命令
    webpack main1.js bundle.js
```
>require CSS文件的时候要写loader前缀!style-loader!css-loader!<br>
也可以根据模块类型（扩展名）自动绑定需要的loader，改写以上代码
```js
    // loader
    // style.css
    body{
        background:yellow
    }
    // main1.js
    require('./style.css')  ***********
    document.write(require('./main2.js'))
    //执行打包命令
    webpack main1.js bundle.js --moudle-bind 'css=style-loader!css-loader'  ********************************
```
### 配置文件
>可以将编译选项放在配置文件中，便于统一管理，创建webpack.config.js文件
```js
    moudle.exports = {
        entry:'main1.js',
        output:{
            path:_dirname,
            filename:'bundle.js'
        },
        moudle:{
            loaders:[
                {test:/\.css$/,loader:'style-loader!css-loader'}
            ]
        }
    }
    //只需要执行webpack命令，就可以生成bundle.js文件
    webpack
```
### 插件
>插件在webpack的配置信息plugins选项中指定，用于完成一些loader不能完成的工作。
```js
//举个栗子吧 安装webpack内置的BannerPlugin 插件，在文件头部输出一些注释信息
var webpack = require('webpack')
moudle.exports = {
    entry:'main1.js',
    output:{
        path:_dirname,
        filename:'bundle.js'
    },
    moudle:{
        loaders:[
            {test:/\.css$/,loader:'style-loader!css-loader'}
        ]
    },
    plugins:[
        new webpack.bannerPlugin('我在学习webpack')
    ]
}
//运行webpack，在bundle.js文件头部会出现指定的注释信息
```
### 开发环境
>当项目变大，webpack编译时间会过长，通过参数让编译的输出内容带有进度和颜色<br/>
webpack --progress --colors<br>
>不想每个修改后都重新编译，可启用监听模式<br>
webpack --progress --colors --watch
