//app.js
import util from './utils/util'
import http from '@chunpu/http'
import Ready from 'min-ready'

const ready = Ready()
const qs = http.qs

http.init({
  baseURL: 'http://localhost:9999',
  wx
})

http.interceptors.response.use(response => {
  var {headers, data, status} = response
  if (data && typeof data === 'object') {
    Object.assign(response, data)
  }
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
    util.promisify(wx.checkSession)().then(() => {
      console.log('session 生效')
      return this.getUserInfo()
    }).catch(() => {
      return this.login()
    }).catch(err => {
      console.log(`登录失败`, err)
    })
  },
  login () {
    console.log('登录')
    return util.promisify(wx.login)().then(({code}) => {
      console.log(`code: ${code}`)
      return http.post('/oauth/login', {
        code,
        type: 'wxapp'
      })
    }).then(() => {
      return this.getUserInfo()
    })
  },
  getUserInfo () {
    return http.get('/user/info').then(response => {
      let data = response.data
      if (data && typeof data === 'object') {
        this.globalData.userInfo = data
        ready.open()
        return data
      }
      return Promise.reject(response)
    })
  },
  ready (func) {
    ready.queue(func)
  },
  globalData: {
    userInfo: null
  }
})
