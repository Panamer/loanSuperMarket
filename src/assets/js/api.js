import axios from 'axios'
import md5 from 'js-md5'
import qs from 'qs'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

axios.interceptors.request.use(config => {
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
    let data = null;
    console.log(Object.keys(options));
    if (Object.keys(options).length > 0) {
       console.log('1');
      data = 'sign=' + md5(qs.stringify(options) + '&key=123456')
    } else {
      data = 'sign=' + md5('&key=123456').toUpperCase()
    }
    return axios.post('/api/user/captcha/info', data)
  }
}
export default API
