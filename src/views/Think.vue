<template>
  <div class="box">
      <img src="../assets/images/u.jpg" class="go" alt="">
      <p style="margin-top:300px">请点击右上角功能键</p>
      <p>选择在浏览器打开</p>
  </div>
</template>

<script>
export default {
  created () {
    if (!this.is_weixin()) {
      window.location.href = 'http://download.qihangdai.566.sh/download.html'
    }
  },
  methods: {
    is_weixin () {
      var ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) === 'micromessenger') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.box {
  overflow: hidden;
  height: 100vh;
  width: 100vw;
background: #fff;
  .go {
    float: right;
    margin-top: 20px;
    margin-right: -100px;
  }
  p {
    text-align: center;
    font-size: 30px;
    margin-top: 20px;
  }
}
</style>
