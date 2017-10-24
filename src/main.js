// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
import Vuex from 'vuex'
import store from './store'
Vue.use(Vuex)
Vue.use(iview)
Vue.component('icon', Icon)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  axios,
  store,
  iview,
  template: '<App/>',
  components: { App,Icon }
})

