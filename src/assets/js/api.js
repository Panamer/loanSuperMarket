import axios from 'axios';


const API = {
      // 获取<金融生活> banner 列表
  getBannerList(options = {}) {
    const url = 'http://10.152.4.125:8080/meijie/facade/h5.do';
    Object.assign(options, {
      service: '011008',
      sid:'b2a78dd9d6914289af5bb5cd15554256lVk6fV'
    });
    let data = 'jsonData=' + JSON.stringify(options);
    return axios.post(url, data);
  },
  // 获取<金融生活> -> 贷款超市列表
  getCreditMarketList(options = {}) {
    const url = 'http://10.152.4.125:8080/meijie/facade/h5.do';
    Object.assign(options, {
      service: '100022',
      sid: 'b2a78dd9d6914289af5bb5cd15554256lVk6fV'
    });
    let data = 'jsonData=' + JSON.stringify(options);
    return axios.post(url, data);
  }
}
export default API;