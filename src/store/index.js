import Vue from 'vue'
import Vuex from 'vuex'
import sidebar from './modules/sidebar.js'
import audio from './modules/audio.js'
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
    sidebar: sidebar,
    audio: audio
  }
})
export default store
