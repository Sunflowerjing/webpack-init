// 引入node中的path模块
const path = require('path');

module.exports = {
    // 定义入口文件，告诉webpack 我要打包什么
    entry: './src/index.js',
    // 定义好输出文件，告诉 webpack 打包好的文件叫啥，给我放到哪里
    output: {
        filename:'jing.js',
        path: path.resolve(__dirname, 'dist'),
    }
}
