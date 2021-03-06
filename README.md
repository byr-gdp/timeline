# timeline

> 随时随地记录想法。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Note

- npm run dev 错误：

https://github.com/vuejs/vue-cli/issues/414

## Deploy

- 执行 `npm run build`。
- 将 dist 目录下文件传到 VPS 即可。

## TODO

- router

  - index: 包含记录想法和想法列表 √
  - index 右侧包含当前统计信息，可进一步拆分为组件的形式
  - login: 登录，不含注册 √

- api

  - 获取想法列表（分页） √
  - 新增想法 √
  - 新增想法附言 √

- 登录验证

  如何 set-cookie 及验证 cookie 值有效性。√

- 移动端适配

  仅对首页进行处理 √

- MongoDB 备份与恢复 √

- 环境

  配置开发、正式环境并易于切换(不够完美，仍然需要配置) ≈

- 优化

  - time filter √
  - localstorage 存储 newIdeaContent √
  - 引入 ui
  - 接口超时处理
  - 接口返回结果无法预览

- 服务端渲染（SSR)

  Vue 2.0 支持 SSR，官方文档提供了两个 Demo：[vue-ssr-demo-simple](https://github.com/chrisvfritz/vue-ssr-demo-simple) 和 [vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0)，但目前改造仍有困难，需进一步熟悉 Webpack 配置和 Node.js 流操作，并对 bundle 相关概念有进一步理解。
