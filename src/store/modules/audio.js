const audioInfo = {
  state: {
    music: {
      id: 0,
      name: '',
      singer: '',
      img: '',
      url: '',
      lyric: ''
    }
  },
  mutations: {
    setMusic (state, obj) {
      state.music = obj
    }
  },
  actions: {
    set_music ({commit}, obj) {
      commit('setMusic', obj)
    }
  },
  getters: {
    getMusic: state => state.music
  }
}
export default audioInfo
