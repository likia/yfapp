# yfapp

基于gulp自动构建, 提供模块化, 组件化apicloud混合app开发体验. 
支持es6转码, .vue文件编译, nunjucks模板引擎


## nunjucks模板

使用模板引擎进行开发可以解决前端普遍存在的复用问题, nunjucks提供了类似php twig模板引擎的语法, 支持模板引入, 模板继承 大大提高了html复用性

## .vue文件编译

能够解析.vue文件 并编译成组件, 提供与webpack相同的开发体验

# 目录结构
* html - html文件, 模板引擎编译后的最终结果也会按目录结构存放至此
* css
    * scss - scss样式
        * dist - scss编译的最终结果
* script
    * vendor - 第三方代码库, npm安装的最好复制到目录下, 真机同步默认忽略node_modules
    * dist
        * index.js - 编译最终结果
    * es6 - gulp扫描目录
        * view - nunjucks模板
        * vue - vue相关代码
            * component - 组件目录
    * index.js 打包入口文件, 导出模块最好导出到window方便html中直接使用 