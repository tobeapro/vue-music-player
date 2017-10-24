const sideBar = {
  state: {
    showStatus: false
  },
  mutations: {
    showBar (state) {
      state.showStatus = true
    },
    hideBar (state) {
      state.showStatus = false
    }
  },
  actions: {
    showSideBar ({commit}) {
      commit('showBar')
    },
    hideSideBar ({commit}) {
      commit('hideBar')
    }
  },
  getters: {
    getStatus (state) {
      return state.showStatus
    }
  }
}
export default sideBar
