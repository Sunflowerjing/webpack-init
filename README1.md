# webpack从0到1-开始

## 目的
1. 了解webpack打包
2. 平常项目开发中所用如ES6语法、less、vue是如何被打包的

## 什么是webpack？
1. `webpack is a module bundler`
2. webpack是一个模块打包工具，可以打包js、图片资源等等

## 初始化项目
1. 创建文件夹
2. `git init`, 生成 .git 文件
3. `touch .gitignore`, 生成 .gitignore 文件
4. `npm init`, 初始化生成一个 package.json 文件
5. `git remote add origin git仓库地址`,  本地仓库关联到远程仓库
6. 项目目录结构:
    ```js
        |- package.json
    +   |- index.html
    +   |- /src
    +       |- index.js
    ```

## 安装webpack
1. `npm install webpack webpack-cli --save-dev`
2. --save-dev和--save两个有什么区别呢？
    * 后缀 `--save-dev` 可以简写为 -D，这个会自动把模块和版本号添加到`package.json`中的 `devDependencies` 部分。
    * 后缀 `--save` 可以简写为 -S，这个会自动把模块和版本号添加到 `dependencies` 部分。
3. `--save-dev`是开发时候依赖的东西，`--save`是发布之后还依赖的东西。


## 打包js
1. 第一种方式–使用`默认打包的模式`
    ```js
        npx webpack
    ```
    * 执行`npx webpack`简单一点来说就是会去找项目中本地的./node_modules/.bin/webpack，然后中执行它。
    * 执行`npx webpack`，会将我们的`src/index.js`作为入口文件，然后会新建一个`dist`文件夹和 `dist/main.js`作为输出文件。
2. 第二种方式–`使用配置文件打包`
    * 在项目目录下新建一个webpack.config.js配置文件。
    ```js
        |- package.json
        |- index.html
        |- /src
            |- index.js
    +   |- webpack.config.js
    ```
    * 配置文件webpack.config.js中写：
    ```js
    // 引入node中的path模块
    const path = require('path');
    module.exports = {
        // 定义入口文件，告诉webpack我要打包啥
        entry: './src/index.js',
        // 定义输出文件，告诉webpack打包好的文件叫啥，给我放到哪里
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist'),
        }
    };
    ```
    * 打包，使用`webpack-cli`提供的命令行（这就是为什么要安装webpack-cli的原因）: 
        * `npx webpack --config webpack.config.js`
3. 第三种方式–使用npm脚本
    * 上面使用webpack-cli命令打包的方式不够简洁明了，可在package.json中的scripts中定义一条命令。
    ```js
    {
    ...
    +  "scripts": {
    +    "build": "webpack"
    +   }
    ...
    }
    ```
    * 执行 `npm run build` 这条命令跟上面使用一样的效果，它会自动的去找文件目录下的`webpack.config.js`文件然后执行它。

