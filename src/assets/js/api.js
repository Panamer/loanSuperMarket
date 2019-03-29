import axios from 'axios'
import md5 from 'js-md5'
import qs from 'qs'
import router from '../../router'
import { mobileSyatem } from './utils.js'

const baseURL = 'http://47.92.172.184:9092'

axios.defaults.baseURL = baseURL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

axios.interceptors.request.use(config => {
  Object.assign(config.headers, {
    deviceInfo: JSON.stringify({ channel: mobileSyatem() })
  })
  return config
}, error => {
  console.log(error)
})

axios.interceptors.response.use(response => {
  if (response.data.code === -1003) {
    MessageBox({
      message: '您还未登录，请先去登录？',
      confirmButtonText: '去登录'
    }).then(action => {
      router.push({
        name: 'login'
      })
    })
  } else {
    return response
  }
}, error => {
  console.log(error)
})

const API = {
  baseURL,
  // 获取贷款超市列表
  getCreditMarketList (options = {}) {
    axios.defaults.headers.token = localStorage.getItem('token')
    Object.assign(options, {
      sign: md5(qs.stringify(options) + '&key=123456').toUpperCase()
    })
    return axios.post('/market/list', qs.stringify(options))
  },
  // 获取图形验证码接口
  getCaptcha () {
    const data = 'sign=' + md5('&key=123456').toUpperCase()
    return axios.post('/user/captcha/info', data)
  },
  // 获取短信验证码接口
  getMessage (options = {}) {
    Object.assign(options, {
      sign: md5(qs.stringify(options) + '&key=123456').toUpperCase()
    })
    return axios.post('/user/send/sms', qs.stringify(options))
  },
  // 登录接口
  login (options = {}) {
    Object.assign(options, {
      sign: md5(qs.stringify(options) + '&key=123456').toUpperCase()
    })
    return axios.post('/user/login', qs.stringify(options))
  },
  // 推广登录接口
  loginForSpread (options = {}) {
    // axios.defaults.headers.deviceInfo = JSON.stringify({ channel: mobileSyatem()})
    Object.assign(options, {
      sign: md5(qs.stringify(options) + '&key=123456').toUpperCase()
    })
    return axios.post('/user/channel/login', qs.stringify(options))
  },
  // 退出接口
  logout () {
    axios.defaults.headers.token = localStorage.getItem('token')
    const data = 'sign=' + md5('&key=123456').toUpperCase()
    return axios.post('/user/logout', data)
  },
  // 统计接口
  count () {
    axios.defaults.headers.token = localStorage.getItem('token')
    const data = 'sign=' + md5('&key=123456').toUpperCase()
    return axios.post('/market/addOrder', data)
  }
}
export default API
