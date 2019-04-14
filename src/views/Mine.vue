<template>
    <v-layout>
        <div class="mine-wrapper">
            <div class="mine-top">
                <img src="../assets/images/touxiang.png" alt="">
                <p class="monile">手机号：<span>{{phone}}</span></p>
            </div>
            <div class="mine-white"></div>
            <div class="mine-button" @click="loginOut">退出登录</div>
        </div>
    </v-layout>
</template>
<script>
import VLayout from '@/components/Layout.vue'
import { MessageBox } from 'mint-ui'

export default {
  name: 'loan',
  data () {
    return {
      phone: localStorage.getItem('phone')
    }
  },
  components: {
    VLayout
  },
  beforeRouteEnter (to, from, next) {
    if (!localStorage.getItem('phone')) {
      MessageBox.confirm('您还未登录，请先去登录？').then(action => {
        next({
          name: 'login'
        })
      }, cancle => {})
    } else {
      next()
    }
  },
  methods: {
    loginOut () {
      MessageBox.confirm('确认退出 ').then(action => {
        localStorage.removeItem('token')
        localStorage.removeItem('phone')
        this.$router.push({
          name: 'loanMarket'
        })
        // this.$http.logout().then(res => {
        //   if (res.data.code === 1) {
        //     Toast('退出成功')
        //   } else {
        //     Toast(res.data.msg)
        //   }
        // })
      }, cancle => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.mine-wrapper::-webkit-scrollbar {
    width: 0px;
}
.mine-wrapper {
  width: 100%;
  flex: 1;
  -webkit-flex:1;
  overflow: auto;
  height: 100%;
  -webkit-overflow-scrolling: touch;
}
.mine-top{
    width: 100%;
    height: 240px;
    position: relative;
    left: -2px;
    background-image: url(../assets/images/bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding-top: 36px;
    img{
        width: 98px;
        height: 98px;
        margin: 0 auto 20px;;
        display: block;
    }
    .monile{
        width: 100%;
        text-align: center;
        color: #ffffff;
        font-size: 16px;
    }
}
.mine-white{
    width: 100%;
    height: 180px;
    position: relative;
    left: -2px;
    top: -16px;
    background-image: url(../assets/images/ditu.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.mine-button{
    width: 3.3rem;
    line-height: 0.8rem;
    background-image: url(../assets/images/button-bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    text-align: center;
    color: #ffffff;
}
</style>
