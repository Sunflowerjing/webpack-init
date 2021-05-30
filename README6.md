
# webpack从0到1-less、sass、postcss


## 目的
* `webpack` 如何处理`less`、`sass`这种预编译样式文件
* postcss很强大, 怎样在浏览器中自动添加前缀如`-webkit-、-moz-`等等以做兼容。


## 处理sass
1. 安装sass: `npm install sass-loader node-sass --save-dev` 
2. 在webpack.config.js中的配置:
```js
...
module: {
    rules: [
      // 处理sass
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
        ]
      },
    ]
  }
...
```

## 使用sass
1. 在项目中 `src/styles` 下新建`content.scss`文件
```js
|- /src
    |- /assets
    |- /styles
       |- header.css
+      |- content.scss
    |- logo.js
    |- header.js
    |- content.js
    |- footer.js
    |- index.js
    |- header.css
|- index.html
|- package.json
|- webpack.config.js
```
2. 在`content.js`中随便输入几行`sass`语法：
```js
body {
    .content {
        background: green;
    }
}
```
3. 在`src/content.js`中给这个块级元素添加一个`.content`类名
```js
export function createContent() {
   const div = document.createElement("div");
   div.innerText = "主体内容";
+  div.classList.add("content");
   document.body.appendChild(div);
}
```
4. 在src/index.js模块中引入这个content.scss文件
```js
import { createLogo } from "./logo";
import { createHeader } from "./header";
import { createContent } from "./content";
import { createFooter } from "./footer";

import "./styles/header.css";
+ import "./styles/content.scss";

createLogo();
createHeader();
createContent();
createFooter();
```
5. 执行: `npm run build`


## 处理less
1. 安装: `npm install less less-loader --save-dev`
2. 在webpack.config.js中的配置:
```js
...
module: {
    rules: [
        ...
        // 处理less
        {
            test: /\.less$/,
            use: ["style-loader", "css-loader", "less-loader"]
        },
        ...
    ]
}
...
```


## 安装postcss
1. 常见的需求场景:
    * 使用css3新特性的时候，我们需要根据不同的浏览器自动加上浏览器前缀如`-webkit-、-moz-`等等以做兼容。
2. 先安装postcss:
    ```js
    npm i postcss-loader --save-dev
    ```
3. 安装能给css3自动添加浏览器前缀的插件`autoprefixer`
    ```js
    npm install autoprefixer --save-dev
    ```
4. 在`src/styles/content.scss`中写点css3语法用来测试
    ```js
    .header {
        background: green;
        +  box-shadow: 0 0 20px green;
    }   
    ```

## 配置postcss
1. 在项目根目录下面, 新建一个`postcss.config.js`文件
    * 目录结构为
    ```js
        |- /src
        |- index.html
        |- package.json
    +   |- postcss.config.js
        |- webpack.config.js
    ```
    * 配置添加这个刚刚安装的`autoprefixer`插件
    ```js
    +  module.exports = {
    +    plugins: {
    +      "autoprefixer": {}
    +    }
    +  };
    ```
2. 在 `webpack.config.js` 中配置这个`post-loader`
    * 这里以应用scss文件为例，其它样式文件也是一样的配置
    * 这个loader放置的位置顺序要注意一下
    ```js
    ...
    module: {
        rules: [
        // 处理sass
        {
            test: /\.s[ac]ss$/i,
            use: [
            "style-loader",
            "css-loader",
    +         "postcss-loader", // 因为这里处理的是css文件，所以要放在sass-loader的上面
            "sass-loader"
            ]
        },
        ]
    }
    ...
    ```
3. 设置所支持的浏览器列表
    * 基本配置就完成了，但是还有一个东西一定要记得设置，不然压根没效果
    * 进入到package.json中，我们要设置所支持的`浏览器列表`，切记！！！
    * 这一步很重要，我就是忘记设置这一步，导致一直没效果，找了很久的问题！！！
    ```js
    {
        ...
        +  "browserslist": [
        +    "> 1%",
        +    "last 2 versions"
        +  ]
        ...
    }
    ```
4. 执行打包命令: `npm run build`
    * 在浏览器中打开`dist/index.html`就可以看到自动为添加好了前缀了
    * `box-shadow: 0 0 20px green;`


## 总结
1. 可以把postcss也理解为一个, 生态平台吧
2. `webpack`可以有很多的`loader`来给它`赋能`
3. `postcss`也有许多插件来给它`赋能`
4. `postcss-px-to-viewport`插件来实现使用vw实现移动端适配`移动端适配`




