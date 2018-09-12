import http from '@chunpu/http'

http.init({
  baseURL: 'http://localhost:9999',
  wx
})

http.interceptors.response.use(response => {
  // 展开 response.data 并处理错误 code
  var {data} = response
  if (data && typeof data === 'object') {
    Object.assign(response, data)
    if (data.code !== 0) {
      return Promise.reject(new Error(data.message || 'error'))
    }
  }
})

http.interceptors.response.use(response => {
  var {status} = response
  if (status >= 400) {
    return Promise.reject(new Error('error'))
  }
})

http.interceptors.response.use(response => {
  // 种 cookie
  var {headers} = response
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
  // 给请求带上 cookie
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

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const promisify = original => {
  return function(opt) {
    return new Promise((resolve, reject) => {
      opt = Object.assign({
        success: resolve,
        fail: reject
      }, opt)
      original(opt)
    })
  }
}

module.exports = {
  formatTime: formatTime,
  promisify
}
