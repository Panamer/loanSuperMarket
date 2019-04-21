<template>
  <v-layout>
      <div class="find-wrapper">
        <div class="title-name">下款牛市</div>
        <div id="findBox">
            <!-- banner -->
            <mt-swipe :auto="3000" v-if="bannerList.length">
              <mt-swipe-item v-for="(item, index) in bannerList" :key="index">
                <a :href="item.h5Path">
                  <img :src="item.imagePath" alt="banner" />
                </a>
              </mt-swipe-item>
            </mt-swipe>
            <div id="findContent">
                <p class="describe">申请3个及以上产品的用户，可大幅度提高放款成功率</p>
                <!-- supermarket -->
                <section class="tabs-content supermarket-wrap">
                    <ul id="supermarket" class="find-list" v-for="(v, index) in loanList" :key="index">
                      <li class="supermarket">
                        <h3>
                            <i :style="{backgroundImage: 'url(' + v.icardUrl + ')'}"></i>
                            {{v.accountName}}
                        </h3>
                        <ul class="supermarket-content clearfix">
                            <li>
                                <p class="money">{{v.creditRange}}</p>
                                <p class="range">{{v.creditRangeDetail}}</p>
                            </li>
                            <li>
                                <p>{{v.loanTime}}</p>
                                <p>{{v.rateDetail}}</p>
                                <p>{{v.creditTerm}}</p>
                            </li>
                            <li>
                                <a class="supermarket-btn" @click="toThirdParty(v)">申请</a>
                            </li>
                        </ul>
                        <p class="desc">{{v.recommend}}</p>
                    </li>
                    </ul>
                </section>
                <!-- card -->
                <section class="tabs-content card-wrap">
                    <ul id="card" class="find-list"></ul>
                </section>
            </div>
        </div>
        <!-- error info -->
        <section id="errorInfo" class="error-page">
            <div class="error-tip"></div>
            <div class="error-text">
                <p>网络异常</p>
                <p>请检查您的网络设置</p>
            </div>
        </section>
    </div>
  </v-layout>
</template>

<script>
// @ is an alias to /src
import VLayout from '@/components/Layout.vue'
import '@/assets/css/about.css'
import { Toast, Swipe, SwipeItem, MessageBox } from 'mint-ui'
import * as utils from '@/assets/js/utils'

export default {
  name: 'loanMarket',
  data () {
    return {
      bannerList: [],
      loanList: []
    }
  },
  components: {
    VLayout,
    'mt-swipe': Swipe,
    'mt-swipe-item': SwipeItem
  },
  mounted () {
    this.init()
  },
  computed: {
  },
  methods: {
    init () {
      this.getLifeBannerList()
      this.getCreditMarketList()
    },
    // 跳转第三方(后期需加埋点)
    async toThirdParty (v) {
      const authen = await this.$http.authentication()
      if (authen && authen.data.code === 1) {
        this.authenOrapply(v, authen)
      }
    },
    // 点击申请的逻辑
    async authenOrapply (v, authen) {
      const authenticationState = authen.data.response.cont.authenticationState
      if (authenticationState.identityState === 0 ||
          authenticationState.livingBodyState === 0 ||
          authenticationState.operatorState === 0){   // 区分当前环境是安卓还是浏览器
          if (utils.mobileSyatem() === 'Android') {
              utils.connectWebViewJavascriptBridge(JSBridge => {
                JSBridge.callHandler('apply', `${localStorage.getItem('token')}`, encData => {})
          })
        } else {
          this.$router.push({
            name: 'authentication'
          })
        }
      } else if (authen.data.response.cont.isFirstOrder === 'true') { // 首次申请
        MessageBox({
          message: '一键申请最优质资金',
          confirmButtonText: '好的',
          closeOnClickModal: false
        }).then(action => {
          this.sendApplyMessage(v)
        })
      } else if (authen.data.response.cont.isFirstOrder === 'false') { // 有过一键申请
        this.sendApplyMessage(v)
      }
    },
    // 进件接口
    async sendApplyMessage (v) {
      let order = await this.$http.count({ channelId: v.id })
      if (order && order.data.code === 1) {
        Toast('申请成功')
        if(v.applyUrl) {
          setTimeout(() => {
            window.location.href = v.applyUrl
          }, 1000)
        }
      } else {
        Toast(order.data.msg)
      }
    },
    // 获取 banner 列表
    getLifeBannerList () {
      this.bannerList = [
        // { imagePath: 'http://dummyimage.com/200x100/FF6600' },
        { imagePath: 'http://img.1ppt.com/uploads/allimg/1902/1_190218135629_1.jpg' }
        // { imagePath: 'http://dummyimage.com/200x100/894FC4/FFF.png&text=!' }
      ]
    },
    // 获取贷款超市列表
    getCreditMarketList () {
      this.$http.getCreditMarketList({
        fromSource: 'H5',
        page: 1,
        pageSize: 10
      }).then(res => {
        if (res.data.code === 1) {
          this.loanList = res.data.response.cont
        } else {
          Toast(res.data.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.find-wrapper::-webkit-scrollbar {
    width: 0px;
}
.find-wrapper {
  width: 100%;
  // padding-top: 40px;
  flex: 1;
  -webkit-flex:1;
  overflow: auto;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  .mint-swipe {
    height: 122px;
    margin-top: 0.1rem;
    width: (355rem/100);
    a {
      display: block;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .title-name{
    position: absolute;
    top: 0.16rem;
    width: 100%;
    text-align: center;
    font-size: 12px;
    z-index: 2;
    color: #ffffff;
  }
}
</style>
