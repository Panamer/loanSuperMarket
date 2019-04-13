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
    {
      path: '/loanMarket',
      name: 'loanMarket',
      component: resolve => require(['@/views/LoanMarket.vue'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/Login.vue'], resolve)
    },
    {
      path: '/loginOut',
      name: 'loginOut',
      component: resolve => require(['@/views/LoginOut.vue'], resolve)
    },
    {
      path: '/mine',
      name: 'mine',
      component: resolve => require(['@/views/Mine.vue'], resolve)
    },
    {
      path: '/spread',
      name: 'spread',
      component: resolve => require(['@/views/Spread.vue'], resolve)
    },
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
