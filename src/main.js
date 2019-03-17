import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from '@/assets/js/api'

import '@/assets/js/flexible'
import '@/assets/css/reset.css'
import '@/assets/css/base.css'

import 'mint-ui/lib/style.css'

Vue.prototype.$http = api
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
