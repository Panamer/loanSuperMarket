<template>
  <div id="find" class="find-wrapper">
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
                            <i style="background-image: url(${v.icardUrl});"></i>
                            {{v.creditName}}
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
                                <a class="supermarket-btn" @click="toThirdParty(v.applyUrl)">申请</a>
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
</template>

<script>
import '@/assets/css/about.css'
import { Toast, Swipe, SwipeItem } from 'mint-ui';

export default {
  data () {
    return {
      bannerList: [],
      loanList: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getLifeBannerList();
      this.getCreditMarketList();
    },
    // 跳转第三方(后期需加埋点)
    toThirdParty(url) {
      window.location.href = url;
    },
    // 获取 banner 列表
    getLifeBannerList() {
      this.$http.getBannerList({ 'app_platform': 'h5' }).then(res => {
        if (res.data.code === '000') {
          this.bannerList = res.data.data.result;
        } else {
          Toast(res.data.msg);
        }
      });
    },
    // 获取贷款超市列表
    getCreditMarketList() {
      this.$http.getCreditMarketList({ 'app_platform': 'app' }).then(res => {
        if (res.data.code === '000') {
          this.loanList = res.data.data.creditMarketList;
        } else {
          Toast(res.data.msg);
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
