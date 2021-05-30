
# webpack从0到1-打包图片资源

## 打包图片资源的loader
1. file-loader
2. url-loader


## 项目中使用图片
1. 图片放到`src/assets`目录下，并同时新建一个`logo.js`文件
2. 然后我们在`src/logo.js`里面引入这张图片并挂载到页面上
    ```js
    +   import Logo from "./assets/logo.png";

    + export function createLogo() {
    +   const myLogo = new Image();
    +   myLogo.src = Logo;
    +   document.body.appendChild(myLogo);
    + }
    ```
3. 在src/index.js中: 
    ```js
    + import { createLogo } from "./logo";
    import { createHeader } from "./header";
    import { createContent } from "./content";
    import { createFooter } from "./footer";

    + createLogo();
    createHeader();
    createContent();
    createFooter();
    ```


## file-loader
1. 很明显，`.png`后缀的引入文件webpack压根不认识，所以需要安装相应的`loader`也就是`file-loader`来处理这种文件，给webpack赋能。
2. 安装: `npm install file-loader --save-dev`
3. 在webpack.config.js中配置:
```js
module: {
    rules: [
        // ...
        {
            // 使用file-loader处理文件
            test: /\.(png|svg|jpg|gif)$/,
            use: ["file-loader"]
        }
    ]
}
```

## url-loader
1. 补充说明的是，`file-loader`很强大，像`.xml`文件啊，`.csv`、`字体文件.ttf`等等它都能处理，可是对于处理图片来说，可能我们有更好的选择。
2. 安装url-loader: `npm install url-loader --save-dev`
3. 修改webpack.config.js文件:
```js
module: {
    rules: [
    // ...
-     {
-       // 使用file-loader处理文件
-       test: /\.(png|svg|jpg|gif)$/,
-       use: ["file-loader"]
-     },
+     {
+       // 使用url-loader处理图片资源，当图片size小于limit值时会转为DataURL
+       test: /\.(png|jpg|gif)$/i,
+       use: [
+           {
+               loader: "url-loader",
+               options: {
+                   limit: 8192
+               }
+           }
+       ]
+     }
    ]
}
```
4. `url-loader`跟`file-loader`的工作能力一样，也可以用来处理图片资源，但是它可以设置一个`limit`值，这样如果你的图片大小小于这个`limit`值，那么它就会直接把图片转为一个`base64的DataURL`，不会打包为一张新的图片了，所以如果你的图片小于你设置的`limit`值，那么打包后的`dist`目录下是没有如上文中那样有新的图片生成。



