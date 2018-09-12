微信小程序登录 demo
===

小程序登录 demo 分为客户端和服务端两个部分

本项目为小程序客户端, 服务端为 [wxapp-login-server](https://github.com/chunpu/wxapp-login-server)


实现功能
---

- 支持自定义登录态, 完全清除缓存后依然可以返回正确的用户信息
- 支持绑定用户信息 (昵称, 头像等)
- 支持绑定用户手机号
- 实现 cookie 基础功能, 可直接复用 Web 端接口
- 实现 session 过期判断


使用方法
---

将小程序 [wxapp-login-demo](https://github.com/chunpu/wxapp-login-demo) 和服务端 [wxapp-login-server](https://github.com/chunpu/wxapp-login-server) 两个项目都 clone 至本地

使用前请参考 [使用测试 appId](#使用测试-appid)

### wxapp-login-server

使用 Node.js 实现登录服务端

```sh
# 安装依赖
$ cnpm install

# 启动
$ npm start
```

> 注意, 服务端使用 js 变量来保存用户数据, 也就是说如果重启服务端, 用户数据就清空了

> 如需持久化存储用户数据, 需自行实现数据库相关逻辑

### wxapp-login-demo

微信小程序

1. 使用最新版微信开发者工具(需[支持npm](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)) 新建项目
1. 根据文档安装依赖 `cnpm install --production` 并构建 npm
1. 点击编译查看效果


使用测试 appId
---

开发者只能使用自己的测试 appId 和 appSecret 进行测试与开发

打开 <https://developers.weixin.qq.com/sandbox> 并登录

复制 appId 和 appSecret 至 wxapp-login-server 的 `config.js` 中

在微信开发者工具点击测试号: 小程序, 如图所示, 会自动修改 appId 为自己的 appId

![](https://p5.ssl.qhimg.com/t011f4e1ac295eb82ab.png)
