import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
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
    }
  ]
})
