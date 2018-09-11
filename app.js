//app.js
import util from './utils/util'
import http from '@chunpu/http'
import Ready from 'min-ready'

const ready = Ready()
const qs = http.qs

http.init({
  baseURL: 'http://localhost:8080',
  wx
})

http.interceptors.response.use(response => {
  var {headers, status} = response
  if (status >= 400) {
    return Promise.reject(new Error('error'))
  }
  var setCookie = headers['set-cookie'] || ''
  var cookie = setCookie.split('; ')[0]
  if (cookie) {
    var cookie = qs.parse(cookie)
    return util.promisify(wx.getStorage)({
      key: 'cookie'
    }).catch(() => {}).then(res => {
      res = res || {}
      var allCookie = res.allCookie || {}
      Object.assign(allCookie, cookie)
      return util.promisify(wx.setStorage)({
        key: 'cookie',
        data: allCookie
      })
    }).then(() => {
      return response
    })
  } else {
    return response
  }
})

http.interceptors.request.use(config => {
  return util.promisify(wx.getStorage)({
    key: 'cookie'
  }).catch(() => {}).then(res => {
    if (res && res.data) {
      Object.assign(config.headers, {
        Cookie: qs.stringify(res.data, ';', '=')
      })
    }
    return config
  })
  return config
})

App({
  onLaunch: function () {
    // // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
    util.promisify(wx.checkSession)().then(() => {
      console.log('已登录')
    }).catch(() => {
      console.log('未登录')
      return util.promisify(wx.login)().then(({code}) => {
        console.log(`code: ${code}`)
        return http.post('/oauth/login', {
          code,
          type: 'wxapp'
        })
      })
    }).then(() => {
      return http.get('/user/info')
    }).then(({data}) => {
      this.globalData.userInfo = data
      ready.open()
    }).catch(err => {
      console.log(`登录失败`, err)
    })
  },
  ready (func) {
    ready.queue(func)
  },
  globalData: {
    userInfo: null
  }
})
