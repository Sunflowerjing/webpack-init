
# webpack从0到1-entry、output、sourcemap

## entry与output
1. 对于`入口entry`我们常见的其实是简写模式，我们可以使用`键值对`的形式来定义它，其实默认是这样的。
```js
module.exports = {
  ...
  // 简写
  entry: "./src/index.js",
  
  // 默认
  entry: {
    "main": "./src/index.js",
  }
  ...
}
```
2. 而输出`output`中`filename`就是打包后指定的文件名，`path`就是存放的位置。还有一些其他的输出名称更改的几个点：
    * `[name]`就是`entry`里面的key键名
    * `[hash]`就是一段hash值，这个还是挺常见的
3. 案例
    ```js
    const path = require("path");

    module.exports = {
        mode: "development",
        entry: {
            "app": "./src/index.js",
        },
        output: {
        -   filename: 'bundle.js',
        +   filename: '[name].bundle.[hash].js',
            path: path.resolve(__dirname, "dist")
        }
    }
    ```
    * 最后我们打包就会生成一个长成这样的文件：`app.bundle.ee39eb0347a038bf0d2f.js`

## 多页面相关
1. 一般来说，我们在写多页面应用的时候，可能有指定的`多个入口文件`
    * 这个时候就需要分开打包了，而不是把所有的文件打包为一个。
    * 比如说在我们项目中要把`header.js、content.js、footer.js`的打包为三个文件。
    ```js
    const path = require("path");

    module.exports = {
        mode: "development",
        entry: {
            "header": "./src/header.js",
            "content": "./src/content.js",
            "footer": "./src/footer.js",
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, "dist")
        }
    }
    ```
2. 打包完以后，我们就会生成三个文件，如果把这三个文件作为三个不同的入口文件，分别引入各个`index.html`中，这就是写多页面的基础思路吧。


## 关于sourceMap
1. 回到开始的状态，在我们的开发过程中啊，当我们打包的时候，我们会把几个模块的文件打包为一个`main.js`输出出去，这个时候，如果某个js文件出了错，那么在浏览器中指出的这个错误位置是跟`main.js`相关联的，这对我们找出错误毫无意义。
2. 我们在`src/header.js`中打印一行错误。然后要去`webpack.config.js`中把mode: `"development"`这行代码注释掉，因为开发模式下，默认是开启了`sourcemap`的
```js
export function createHeader() {
+ console.error('这是一行错误')
  const div = document.createElement("div");
  div.innerText = "头部块";
  div.classList.add("header");
  document.body.appendChild(div);
}
```
3. 打包后浏览器中打开，打印出的信息对于我们找出错误并没有什么卵用。



## 使用sourceMap
1. 而`sourceMap`就是解决这个问题的，当浏览器抛出错误的时候可以帮我们定位到具体的js文件和行列位置
2. 在webpack中开启sourceMap是个很简单的事情:
    ```js
    module.exports = {
        mode: 'development',
        // 开启sourceMap
    +   devtool: 'inline-source-map',
        entry: {
            main: "./src/index.js"
        },
        output: {
            publicPath:'/',
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "dist")
        }
        ...
    };
    ```
3. `inline-source-map`
    * 那`devtool: 'inline-source-map'`中`inline-source-map`是个什么意思，跟设置`source-map`又有什么不同？
    * 如果你设置这个键值为`source-map`，那么打包就会生成一个`.map`的映射文件
    * 而`inline-source-map`就是会把这个`.map`文件直接作为`DataUrl`插入到`main.bundle.js`中。


## 总结
1. sorcemap做了些什么事情呢？
    * 打包后会生成一个`.map`的映射文件，它会将你打包后的代码映射到源代码中，与之相关关联。这样，我们就知道在源代码中出错的位置是几行几列了。
    * 配置sorcemap有很多的可选值，但是不用管这么多，开发模式中我们设置为`inline-source-map`或者`source-map`，生产模式中我们将其设置为`cheap-module-source-map`即可，react和vue都是这么设置的。





继续学习https://www.jianshu.com/nb/41890709, webpack 7需要看