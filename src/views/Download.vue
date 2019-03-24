<template>
  <div class="box">
    <div class="qihangdai_xiazai">
      <h3>下款牛市</h3>
      <p class="qihangdai_xiazai_p1" @click="downloadApp">
          <span>安卓手机下载</span>
      </p>
      <p class="qihangdai_xiazai_p2" @click="downloadApp">
          <span>苹果手机下载</span>
      </p>
    </div>
    <div class="main_zhezhaoceng" v-if="isWeixin">
      <div class="main_zhezhaoceng_ceng"></div>
      <img src="../assets/images/zhezhaoceng.png" class="main_zhezhaoceng_img">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isWeixin: false
    }
  },
  created () {
  },
  methods: {
    downloadApp () {
      var iphone = window.navigator.appVersion.match(/iPhone/gi)
      var android = window.navigator.appVersion.match(/Android/gi)
      // 判断用户使用手机型号
      if (iphone) {
        // Ios用户下载地址
        window.location.href = 'http://47.104.189.49:8004/#/loanMarket'
      } else if (android) {
        var na = navigator.userAgent.toLowerCase()
        // 判断用户是否用微信打开
        if (na.indexOf('micromessenger') > 0) {
          this.isWeixin = true
        } else {
          // Android 用户下载地址
          window.location.href = 'https://qihangdai.oss-cn-zhangjiakou.aliyuncs.com/qihangdai.v1.0.1.apk'
        }
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import "../assets/css/download.css";

</style>
