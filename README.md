# vue-h5-pro

> A vue2+ h5 project of my configuration framework

## 简介
移动端h5页面框架：vue-cli3生成框架，集成lib-flexible.js页面自适应，less样式预处理，axios请求封装，vue-router路由，vuex状态管理，mint-ui，better-scroll封装...

## Project setup
```
node -v （版本8.7.0以上）
npm install yarn -g
yarn install

// 开发
yarn serve
npm run start

// 打包
yarn build
npm run build
yarn build:master
npm run build:master

// 代码检验
yarn lint
npm run lint
```

## 项目规范
- 1.public: 为不经过编译的静态资源文件夹
- 2.assets: 存放项目的静态资源
- 3.styles: 存放全局样式和公用样式变量、函数，样式预处理用less；规范：样式名都用驼峰大小写
- 4.component: 通用组件，component/business: 业务组件
- 5.config: 项目的环境配置
- 6.router: 路由处理（新增页面需手动添加路由） [文档](https://router.vuejs.org/zh/)
- 7.service: 封装的axios请求，api.js预设请求地址，index.js导出所有请求; [文档](https://github.com/axios/axios)
- 8.store: 管理全局状态（vuex）
- 9.utils: 全局工具函数
- 10.views: 存放页面，规范：页面文件夹包含.vue文件和.less文件，样式剥离出去
- 11..env文件：让页面可引用命令行的环境变量 [文档](https://cli.vuejs.org/zh/guide/mode-and-env.html)
- 12..eslintrc.js: [文档](https://eslint.org/) (https://eslint.vuejs.org/)
- 13.postcss.config.js: 设置pxtorem的参数，该项目移动端的自适应用的是lib-flexible.js
- 14.vue.config.js: 设置全局less样式源，添加别名，等...
- 15.所有文件名都有“-”中划线分割
- 16.文件头注释作者，方便沟通

## 命名规范
- 1.目录和文件一律用小写加-
- 2.组件名命名一律大写驼峰

## 参考文档
- vue2.+ [文档] (https://cn.vuejs.org/)
- vue-cli3.0 [文档] (https://cli.vuejs.org/zh/)
- vue-router [文档] (https://router.vuejs.org/zh/)
- axios [文档] (https://github.com/axios/axios)
- vuex [文档] (https://vuex.vuejs.org/zh/api/#vuex-store)
- mint-ui [文档] (https://github.com/ElemeFE/mint-ui)
- lint [文档] (https://eslint.org/) (https://eslint.vuejs.org/)
- vuex [文档] (https://github.com/axios/axios)
- webpack [文档] (https://webpack.js.org/)

## git规范
[语义化版本](https://semver.org/lang/zh-CN/) 

[约定式提交](https://www.conventionalcommits.org/zh/v1.0.0-beta.4/)

[文档](https://www.liaoxuefeng.com/wiki/896043488029600)

## 项目域名地址：
暂无

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
