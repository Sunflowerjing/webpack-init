// 引入node中的path模块
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    // 定义入口文件，告诉webpack 我要打包什么
    entry: "./src/index.js",
    // 定义好输出文件，告诉 webpack 打包好的文件叫啥，给我放到哪里
    output: {
        publicPath:'/',
        filename: 'jing.js',
        // filename: '[name].bundle.js',
        // filename: '[name].bundle.[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
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
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    // 添加babel-polyfill
                                    useBuiltIns: "usage",
                                    corejs: { version: 3, proposals: true }
                                }
                            ]
                        ]
                    }
                }
            },
            {
                // 使用file-loader处理文件
                // test: /\.(png|svg|jpg|gif)$/,
                // use: ["file-loader"]
            },
            {
                // 使用url-loader处理图片资源，当图片size小于limit值时会转为DataURL
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 18192
                        }
                    }
                ]
            },
            // 处理css等样式文件
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            // 处理sass
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",   // 因为这里处理的是css文件，所以要放在sass-loader的上面
                    "sass-loader"  // 将 Sass 编译成 CSS，默认使用 Node Sass
                ]
            },
            // 处理less
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
        ]
    }
}
