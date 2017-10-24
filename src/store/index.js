import Vue from 'vue'
import Vuex from 'vuex'
import sidebar from './modules/sidebar.js'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  modules: {
    sidebar: sidebar
  }
})
export default store
