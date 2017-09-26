// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import Vuex from 'vuex'
Vue.use(Vuex)
Vue.use(iview)
Vue.use(axios)
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
  components: { App }
})
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    Count (state, platform) {
      state.count = platform
    }
  },
  actions: {
    setCount ({commit}, platform) {
      commit('Count', platform)
    }
  },
  getters: {
    getCount: (state) => state.count
  }
})

