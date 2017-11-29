// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/swiper.css'
import './assets/css/custom.css'
import custom from './assets/js/custom.js'
import Vuex from 'vuex'
import store from './store'
Vue.use(Vuex)
Vue.prototype.$axios = axios
Vue.prototype.$custom = custom
Vue.config.productionTip = false
/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  axios,
  store,
  custom,
  template: '<App/>',
  components: { App }
})

