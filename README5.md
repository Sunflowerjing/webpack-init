
# webpack从0到1-处理css文件

## 目的
* webpack如何处理css样式文件


## 使用
1. 进入项目中，在src目录下新建一个styles/header.css文件
```js
...
|- /src
    |- /assets
    |- content.js
    |- footer.js
    |- header.js
    |- index.js
    |- logo.js
+   |- /styles
+       header.css
|- index.html
|- package.json
|- webpack.config.js
...  
```
2. `header.css`内容
```js
/* header.css */
.header {
    background: red;
}
```
3. 在`src/header.js`中给这个块级元素添加一个`.header`类名。
```js
// header.js
export function createHeader() {
    const div = document.createElement("div");
    div.innerText = "头部块";
+   div.classList.add("header");
    document.body.appendChild(div);
}
```
4. 在`src/index.js`模块中引入这个`header.css`文件，这样头部块就会应用这行样式，使其背景变为红色。
```js
// index.js
import { createLogo } from "./logo";
import { createHeader } from "./header";
import { createContent } from "./content";
import { createFooter } from "./footer";

+ import "./styles/header.css";

createLogo();
createHeader();
createContent();
createFooter();
```
5. 安装 css 包
    * 安装相应的loader了来处理css文件
    ```js
    npm install style-loader css-loader --save-dev 
    ```
6. 配置webpack.config.js
```js
...
  module: {
    rules: [
        // 处理css等样式文件
+       {
+           test: /\.css$/,
+           use: ["style-loader", "css-loader"]
+       }
    ]
  }
...
```
7. 执行打包命令: `npm run build`


## 运行机制
1. 第一点我们需要知道:
    * 上面use: `["style-loader", "css-loader"]`这行代码中
    * 在webpack中是`先执行css-loader再执行style-loader`
    * webpack中执行的顺序是从`下到上，从右到左`
2. 当遇到`.css`文件的时候，先走`css-loader`，这个loader使用类似`@import`和`url(...)`的方法, 实现`require/import`的功能。
3. 再走`style-loader`，它可以将编译完成的css挂载到html中。如下
```js
<head>
    <style>
        .header {
            background: red;
        }
    </style>
</head>
```


## 总结
1. webpack中loader加载顺序是`从下到上，从右到左`。
2. `css-loader`使类似`@import和url(...)`的方法, 实现require/import的功能
3. `style-loader`可以将编译完成的css挂载到html中。
