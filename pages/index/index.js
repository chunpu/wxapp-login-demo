//index.js
import http from '@chunpu/http'

//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: null,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    app.ready(() => {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    })
  },
  setUserInfo (userInfo) {
    app.globalData.userInfo = userInfo
    this.setData({
      userInfo: userInfo
    })
  },
  getUserInfo: function(e) {
    var detail = e.detail
    console.log({detail})
    http.post('/user/bindinfo', {
      encryptedData: detail.encryptedData,
      iv: detail.iv,
      signature: detail.signature
    }).then(({data}) => {
      this.setUserInfo(data)
    })
  },
  getPhoneNumber(e) {
    var detail = e.detail
    console.log({ detail })
    http.post('/user/bindphone', {
      encryptedData: detail.encryptedData,
      iv: detail.iv
    }).then(({ data }) => {
      this.setUserInfo(data)
    })
  }
})
