
# webpack从0到1-使用babel打包

## 目的
1. 讲下webpack中的`loaders`的概念
2. 然后结合使用`babel-loader`来对项目中的es6语法做下转换。

## 什么是loaders？
1. Loaders的解释: `webpack enables use of loaders to preprocess files`(Webpack允许使用加载器对文件进行预处理)
2. 简单一点来说就是:
    * 可以帮我们处理文件的东西
    * 比如一个js文件，在`webpack`打包的时候看到这个js文件就会走我们定义的比如接下来要说的`babel-loader`
    * 给它转化一下，然后吐出来的就是一个纯es5语法的js文件了，大概就是起了这么一个作用。 
    * 有很多的loader，用来处理`图片的file-loader`，用来处理`css文件的style-loader`，file-loader也可以处理excel文件等等


## 安装babel
1. 执行
    * `npm install babel-loader @babel/core @babel/preset-env --save-dev`
2. 使用babel打包
    * 进入到 `webpack.config.js` 文件中，接下来我们要将`babel-loader`添加到 `module`的 `loaders`列表中。
    ```js
    // 使用loaders的列表
    module: {
        // 定义规则
        rules: [
            {
                // 这是一个正则，所有以js结尾的文件都要给我过这里！！
                test: /\.js$/,
                // 除了node_modules下的（真香）
                exclude: /(node_modules|bower_components)/,
                // 使用babel-loader，options是它的一些配置项
                use: {
                    loader: "babel-loader",
                    // "@babel/preset-env"这个东西是babel提供给自己用的插件
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    }
    ```
3. 配置文件写完了，然后我们就可以使用命令开始打包了: 
    * `npm run build`
    * 确实可以看到各模块内容中的es6语法都转换为es5语法了


## babel-polyfill
1. 上文安装的`babel-loader`可以转，但是不支持把所有的es6转换为es5，比如一些`promise`、`Array.from`这些语法啊，babel-loader就不能处理。
2. 所以babel就又提供了一个`babel-polyfill`包, `babel-polyfill` 简单点理解就是补充了`babel`的转换能力。
3. 使用
    * npm安装这个包，要走--save: `npm install --save @babel/polyfill`
    * 第一种方式可以在所需的js文件开头可以`import "@babel/polyfill"`引入这个文件。
    * 第二种方式也就是这个项目中会用到的方式，加个`useBuiltIns: "usage"`即可。
    ```js
    // 在 webpack 中

    module.exports = {
        // ...
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                    +               {
                    +                  // 添加babel-polyfill
                    +                  useBuiltIns: "usage"
                    +                }
                                ]
                            ]
                        }
                    }
                }
            ]
        }
    };
    ```
    * 然后输入`npm run build`打包，就ok了

## 关于core-js
1. 当成功的完成了上面的配置步骤，能正常打包也能在浏览器中正常显示，那么我们配置的babel基本能满足你大部分的开发需求了，但是当我们打包的时候应该会碰到几个问题:
    * 第一个就是每次我们打包的时候，虽然打包成功了，但是会看到有warning警告:
    ```js
    useBuiltIns .... core-js
    ```
    * 阅读并查阅`babel官方文档`以后发现原来在`Babel 7.4.0`以后，`@babel/polyfill`这个包就会被移除了。官方叫我们直接使用`core-js`来代替`@babel/polyfill`的作用
    * 所以需要改点东西。先在`package.json`的把`@babel/polyfill`移除（仓库代码里为了做演示我就没移除了），并安装`core-js`包。

2. 安装: `$ npm install core-js@3 --save`
    ```js
        // package.json 修改
        ...
        "dependencies": {
        -   "@babel/polyfill": "^7.8.3"
        +   "core-js": "^3.6.4"
        }
        ...
    ```
3. webpack.config.js配置文件
    ```js
    module.exports = {
        // ...
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                    loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        // 添加babel-polyfill
                                        useBuiltIns: "usage",
                                    +   corejs: { version: 3, proposals: true }
                                    }
                                ]
                            ]
                        }
                    }
                }
            ]
        }
    };
    ```
4. babel不建议继续使用`@babel/polyfill`这个垫片了，推荐直接安装`core-js`包。
