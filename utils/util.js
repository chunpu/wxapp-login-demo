import http from '@chunpu/http'

const qs = http.qs

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
  return response
})

http.interceptors.response.use(response => {
  var {status} = response
  if (status >= 400) {
    return Promise.reject(new Error('error'))
  }
  return response
})

http.interceptors.response.use(response => {
  // 种 cookie
  var {headers} = response
  var cookies = headers['set-cookie'] || ''
  cookies = cookies.split(/, */).reduce((prev, item) => {
    item = item.split(/; */)[0]
    var obj = qs.parse(item)
    return Object.assign(prev, obj)
  }, {})
  if (cookies) {
    return util.promisify(wx.getStorage)({
      key: 'cookie'
    }).catch(() => {}).then(res => {
      res = res || {}
      var allCookies = res.data || {}
      Object.assign(allCookies, cookies)
      return util.promisify(wx.setStorage)({
        key: 'cookie',
        data: allCookies
      })
    }).then(() => {
      return response
    })
  }
  return response
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

var util = module.exports = {
  formatTime: formatTime,
  promisify
}
