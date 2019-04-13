import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: {
        name: 'loanMarket'
      }
    },
    // 首页
    {
      path: '/loanMarket',
      name: 'loanMarket',
      component: resolve => require(['@/views/LoanMarket.vue'], resolve)
    },
    // 登录页
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/Login.vue'], resolve)
    },
    // 我的tab
    {
      path: '/mine',
      name: 'mine',
      component: resolve => require(['@/views/Mine.vue'], resolve)
    },
    // 推广页
    {
      path: '/spread',
      name: 'spread',
      component: resolve => require(['@/views/Spread.vue'], resolve)
    },
    // 下载页
    {
      path: '/download',
      name: 'download',
      component: resolve => require(['@/views/Download.vue'], resolve)
    },
    // 服务协议
    {
      path: '/FWagreement',
      name: 'FWagreement',
      component: resolve => require(['@/views/fw-agreement.vue'], resolve)
    }
  ]
})

export default router
