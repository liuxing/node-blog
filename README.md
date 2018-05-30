# abc-blog [![License](https://img.shields.io/github/license/liuxing/abc-blog.svg)](https://github.com/liuxing/abc-blog/blob/master/LICENSE) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg) ](http://standardjs.com)  
《Node.js从入门到上线》—— Koa2 + MongoDB 搭建博客系统

## Table of contents

[1.1  Node.js 的安装与配置](https://github.com/liuxing/abc-blog/tree/master/docs/1.1Node.js的安装与配置.md)

- [安装Node.js](https://github.com/liuxing/abc-blog/tree/master/docs/1.1Node.js的安装与配置.md#安装nodejs)
- [使用nvm](https://github.com/liuxing/abc-blog/tree/master/docs/1.1Node.js的安装与配置.md#使用-nvm)
- [一些有用的工具](https://github.com/liuxing/abc-blog/tree/master/docs/1.1Node.js的安装与配置.md#一些有用的工具)
- [hello-node](https://github.com/liuxing/abc-blog/tree/master/docs/1.1Node.js的安装与配置.md#hello-node)

[1.2 Node.js 基础概览](https://github.com/liuxing/abc-blog/tree/master/docs/1.2Node.js基础概览.md)

- [node模块](https://github.com/liuxing/abc-blog/tree/master/docs/1.2Node.js基础概览.md#node模块)
- [npm包管理器](https://github.com/liuxing/abc-blog/tree/master/docs/1.2Node.js基础概览.md#npm模块管理器)

[2.1 Koa2初体验](https://github.com/liuxing/abc-blog/tree/master/docs/2.1Koa2初体验.md)

- [Hello Koa2](https://github.com/liuxing/abc-blog/tree/master/docs/2.1Koa2初体验.md#hello-koa2)

- [使用supervisor 或者 nodemon](https://github.com/liuxing/abc-blog/tree/master/docs/2.1Koa2初体验.md#使用supervisor-或者-nodemon)

[2.2 MongoDB的安装及使用](https://github.com/liuxing/abc-blog/tree/master/docs/2.2MongoDB安装及使用.md)

[3.1 开发前的项目配置](https://github.com/liuxing/abc-blog/tree/master/docs/3.1开发前的项目配置.md)

- [#规划项目目录结构](https://github.com/liuxing/abc-blog/tree/master/docs/3.2把项目跑起来.md#规划项目目录结构)
- [使用editorconfig](https://github.com/liuxing/abc-blog/tree/master/docs/3.2把项目跑起来.md#使用editorconfig)
- [使用commitizen](https://github.com/liuxing/abc-blog/tree/master/docs/3.2把项目跑起来.md#使用commitizen)
- [使用eslint](https://github.com/liuxing/abc-blog/tree/master/docs/3.2把项目跑起来.md#使用eslint)
- [使用Git hooks自动检查代码](https://github.com/liuxing/abc-blog/tree/master/docs/3.2把项目跑起来.md#使用git-hooks自动检查代码)

[3.2 把项目跑起来](https://github.com/liuxing/abc-blog/tree/master/docs/3.2把项目跑起来.md)

- [router](https://github.com/liuxing/abc-blog/tree/master/docs/3.2把项目跑起来.md#router)
- [配置模板引擎](https://github.com/liuxing/abc-blog/tree/master/docs/3.2把项目跑起来.md#配置模板引擎)
- [配置静态资源](https://github.com/liuxing/abc-blog/tree/master/docs/3.2把项目跑起来.md#配置静态资源)

[3.3 使用mongoose操作数据库](https://github.com/liuxing/abc-blog/tree/master/docs/3.3操作数据库.md)

- [设计Schema](https://github.com/liuxing/abc-blog/tree/master/docs/3.3操作数据库.md#设计schema)

- [使用model](https://github.com/liuxing/abc-blog/tree/master/docs/3.3操作数据库.md#使用model)

[3.4用户注册与登录](https://github.com/liuxing/abc-blog/blob/master/docs/3.4用户注册与登录.md)

- [cookie与session](https://github.com/liuxing/abc-blog/blob/master/docs/3.4用户注册与登录.md#cookie与session)
- [用户注册](https://github.com/liuxing/abc-blog/blob/master/docs/3.4用户注册与登录.md#用户注册)
- [用户登录](https://github.com/liuxing/abc-blog/blob/master/docs/3.4用户注册与登录.md#用户登录)
- [用户登出](https://github.com/liuxing/abc-blog/blob/master/docs/3.4用户注册与登录.md#用户登出)

[3.5 koa2中间件开发](https://github.com/liuxing/abc-blog/blob/master/docs/3.5koa2中间件开发.md)

- [koa2 中间件机制](https://github.com/liuxing/abc-blog/blob/master/docs/3.5koa2中间件开发.md#koa2-中间件机制)

- [koa2 中间件机制](https://github.com/liuxing/abc-blog/blob/master/docs/3.5koa2中间件开发.md#koa2-中间件机制)

- [消息闪现中间件](https://github.com/liuxing/abc-blog/blob/master/docs/3.5koa2中间件开发.md#消息闪现中间件)

[3.6 文章增删改查](https://github.com/liuxing/abc-blog/blob/master/docs/3.6文章增删改查.md)

- [文章模型设计](https://github.com/liuxing/abc-blog/blob/master/docs/3.6文章增删改查.md#文章模型设计)
- [文章发表](https://github.com/liuxing/abc-blog/blob/master/docs/3.6文章增删改查.md#文章发表)
- [文章列表与详情](https://github.com/liuxing/abc-blog/blob/master/docs/3.6文章增删改查.md#文章列表与详情)
- [文章编辑与删除](https://github.com/liuxing/abc-blog/blob/master/docs/3.6文章增删改查.md#文章编辑与删除)

[3.7 用户权限控制](https://github.com/liuxing/abc-blog/blob/master/docs/3.7用户权限控制.md)

[3.8 评论功能](https://github.com/liuxing/abc-blog/blob/master/docs/3.8评论功能.md)

- [设计评论的模型](https://github.com/liuxing/abc-blog/blob/master/docs/3.8评论功能.md#设计评论的模型)
- [发布留言](https://github.com/liuxing/abc-blog/blob/master/docs/3.8评论功能.md#发布留言)
- [显示留言](https://github.com/liuxing/abc-blog/blob/master/docs/3.8评论功能.md#发布留言)
- [删除留言](https://github.com/liuxing/abc-blog/blob/master/docs/3.8评论功能.md#删除留言)

## License

[MIT](https://github.com/liuxing/abc-blog/blob/master/LICENSE) .  Copyright (c) Liu Xing

本作品采用[知识共享 署名-非商业性使用 4.0 国际许可协议](http://creativecommons.org/licenses/by-nc/4.0/) 进行许可。

[![知识共享许可协议](https://i.creativecommons.org/l/by-nc/4.0/88x31.png)](http://creativecommons.org/licenses/by-nc/4.0/)