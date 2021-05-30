# webpack从0到1-模块化规范

## 模块化规范
1. 何为模块?
    * 一个js文件、css等等都可以称之为模块
2. 几种模块化规范:
    * `ES6Module`--就是import、export这类的。
    * `CommonJs`--就是require这种，node里面使用的，是node的模块规范。
    * `AMD`--是Require.js在推广的过程中对模块定义的规范化产出。
    * `CMD`--是淘宝Sea.js在推广的过程中对模块定义的规范化产出。
    * 还有css的`@import`声明也是一种模块引入规范
3. 新建模块
    * 在src目录下新建几个js文件，并在其中用es6的语法写一些内容并导出。
    ```js
    |- package.json
    |- index.html
    |- /src
        |- index.js
    +   |- header.js
    +   |- content.js
    +   |- footer.js
    ...
    ```
    * header.js内容：
    ```js
    export function createHeader() {
        const div = document.createElement("div");
        div.innerText = "头部块";

        document.body.appendChild(div);
    }
    ```
    * content.js内容：
    ```js
    export function createContent() {
        const div = document.createElement("div");
        div.innerText = "主体内容";

        document.body.appendChild(div);
    }
    ```
    * footer.js内容：
    ```js
    export function createFooter() {
        const div = document.createElement("div");
        div.innerText = "尾部块";

        document.body.appendChild(div);
    }
    ```
    * 然后在`index.js`中引入这些模块，这样分模块的创建并引入了一些将要在页面上显示的内容了。
    ```js
    import { createHeader } from "./header";
    import { createContent } from "./content";
    import { createFooter } from "./footer";

    createHeader();
    createContent();
    createFooter();
    ```
4. 打包模块: `npm run build`


## 疑问
1. 为什么能把es6的这种语法成功打包？
    * 很简单，因为webpack认识它。
    * 不仅webpack认识它，而且还在打包的时候对import和export做了转译，这点我们从打包后的main.js源码中就能看出来。
    * 所以我们能在chrome浏览器中正常的打开它并显示，再者，新版的chorme浏览器对es6语法也做了兼容。
2. 优化
    * 虽然webpack会认识 `import和export`，但是对其它的es6语法就不怎么认识了，再者像chrome这种优秀的浏览器虽然与时俱进的兼容了es6的语法，但是并不是所有的浏览器都像它这么优秀，所以我们还需要将其转为es5这种大众都认识的js语法，所以babel就上场了
    * `bable-loader` 将本章内容中的es6语法转换为es5

