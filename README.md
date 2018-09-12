微信小程序登录 demo
===

此项目是demo的客户端, 和 [wxapp-login-server](https://github.com/chunpu/wxapp-login-server) 是兄弟项目

Usage
---

1. 先把 [wxapp-login-demo](https://github.com/chunpu/wxapp-login-demo) 和 [wxapp-login-server](https://github.com/chunpu/wxapp-login-server) clone 至本地
1. 使用最新版微信开发者工具(需[支持npm](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)) 新建项目打开
1. 点击测试号: 小程序, 如图所示
1. 打开 <https://developers.weixin.qq.com/sandbox> 获取自己的 appId 和 appSecret, 并修改 wxapp-login-server 中的 config.js
1. 在 wxapp-login-server 中 npm start 启动
1. 根据文档安装依赖 `cnpm install --production` 并构建 npm
1. 点击编译查看效果

实现功能
---

- 支持自定义登录态, 完全清除缓存依然可以返回正确的用户信息
- 支持绑定用户信息
- 支持绑定用户手机号
