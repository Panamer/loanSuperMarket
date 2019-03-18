import axios from 'axios'
import md5 from 'js-md5'
import qs from 'qs'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

axios.interceptors.request.use(config => {
  console.log(config.data)
  Object.assign(config.headers, {
    deviceInfo: JSON.stringify({})
  })
  return config
}, error => {
  console.log(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  console.log(error)
})

axios.baseURL = 'http://47.104.189.49:9092'

const API = {
  // 获取 banner 列表
  getBannerList (options = {}) {
    const url = 'http://10.152.4.125:8080/meijie/facade/h5.do'
    Object.assign(options, {
      service: '011008',
      sid: 'b2a78dd9d6914289af5bb5cd15554256lVk6fV'
    })
    let data = 'jsonData=' + JSON.stringify(options)
    return axios.post(url, data)
  },
  // 获取贷款超市列表
  getCreditMarketList (options = {}) {
    axios.defaults.headers.token = localStorage.getItem("token");
    Object.assign(options, {
      sign: md5(qs.stringify(options) + '&key=123456').toUpperCase()
    })
    return axios.post('/api/market/list', qs.stringify(options))
  },
  // 获取图形验证码接口
  getCaptcha() {
    const data = 'sign=' + md5('&key=123456').toUpperCase()
    return axios.post('/api/user/captcha/info', data)
  },
  // 获取短信验证码接口
  getMessage(options = {}) {
    Object.assign(options, {
      sign: md5(qs.stringify(options) + '&key=123456').toUpperCase()
    })
    return axios.post('/api/user/send/sms', qs.stringify(options))
  },
  // 登录接口
  login(options = {}) {
    Object.assign(options, {
      sign: md5(qs.stringify(options) + '&key=123456').toUpperCase()
    })
    return axios.post('/api/user/login', qs.stringify(options))
  },
  // 退出接口
  logout() {
    axios.defaults.headers.token = localStorage.getItem("token");
    const data = 'sign=' + md5('&key=123456').toUpperCase()
    return axios.post('/api/user/logout', data)
  }
}
export default API
