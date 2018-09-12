微信小程序登录 demo
===

此项目是demo的客户端, 和 [wxapp-login-server](https://github.com/chunpu/wxapp-login-server) 是兄弟项目


实现功能
---

- 支持自定义登录态, 完全清除缓存后依然可以返回正确的用户信息
- 支持绑定用户信息 (昵称, 头像等)
- 支持绑定用户手机号
- 实现 cookie 基础功能, 可直接复用 Web 端接口
- 实现 session 过期判断


使用方法
---

将 [wxapp-login-demo](https://github.com/chunpu/wxapp-login-demo) 和 [wxapp-login-server](https://github.com/chunpu/wxapp-login-server) 两个项目都 clone 至本地

使用前请参考 [使用测试 appId](#使用测试-appid)

### wxapp-login-server

使用 Node.js 实现登录服务端

```sh
# 安装依赖
$ cnpm install

# 启动
$ npm start
```

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
