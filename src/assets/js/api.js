import axios from 'axios'
import md5 from 'js-md5'

axios.interceptors.request.use(config => {
  Object.assign(config.headers, {
    deviceInfo: JSON.stringify({}),
    sign: md5('123456')
  })
  config.data = md5(JSON.stringify(config.data))
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
  // 获取<金融生活> banner 列表
  getBannerList (options = {}) {
    const url = 'http://10.152.4.125:8080/meijie/facade/h5.do'
    Object.assign(options, {
      service: '011008',
      sid: 'b2a78dd9d6914289af5bb5cd15554256lVk6fV'
    })
    let data = 'jsonData=' + JSON.stringify(options)
    return axios.post(url, data)
  },
  // 获取<金融生活> -> 贷款超市列表
  getCreditMarketList (options = {}) {
    const url = 'http://10.152.4.125:8080/meijie/facade/h5.do'
    Object.assign(options, {
      service: '100022',
      sid: 'b2a78dd9d6914289af5bb5cd15554256lVk6fV'
    })
    let data = 'jsonData=' + JSON.stringify(options)
    return axios.post(url, data)
  },
  // 获取图形验证码接口
  getCaptcha (options = {}) {
    Object.assign(options, {
      sign: '123456'
    })
    return axios.post('/api/user/captcha/info', options)
  }
}
export default API
