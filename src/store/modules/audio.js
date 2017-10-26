const audioInfo = {
  state: {
    music: {
      id: 0,
      name: '',
      singer: '',
      img: '',
      url: '',
      lyric: ''
    },
    audioElement: '',
    playStatus: false,
    musicListStatus: false,
    musicList: [
      {
        'id': 0,
        'name': '粤语残片',
        'singer': '陈奕迅',
        'img': 'https://y.gtimg.cn/music/photo_new/T002R150x150M000003nMzes28P7wv.jpg?max_age=2592000',
        'url': 'http://ws.stream.qqmusic.qq.com/1249555.m4a?fromtag=46',
        'lyric': ''
      },
      {
        'id': 2,
        'name': '白色球鞋',
        'singer': '陈奕迅',
        'img': 'https://y.gtimg.cn/music/photo_new/T002R150x150M000003nMzes28P7wv.jpg?max_age=2592000',
        'url': 'http://ws.stream.qqmusic.qq.com/1249555.m4a?fromtag=46',
        'lyric': ''
      }
    ],
    musicInfoStatus: false
  },
  mutations: {
    setAudioElement (state, ele) {
      state.audioElement = ele
    },
    setMusic (state, obj) {
      state.music = obj
    },
    changePlayStatus (state) {
      if (state.playStatus) {
        state.playStatus = false
        state.audioElement.pause()
      } else {
        state.playStatus = true
        state.audioElement.play()
      }
    },
    showMusicList (state) {
      state.musicListStatus = true
    },
    hideMusicList (state) {
      state.musicListStatus = false
    },
    showMusicInfo (state) {
      state.musicInfoStatus = true
    },
    hideMusicInfo (state) {
      state.musicInfoStatus = false
    }
  },
  actions: {
    set_audioElement ({commit}, ele) {
      commit('setAudioElement', ele)
    },
    set_music ({commit}, obj) {
      commit('setMusic', obj)
    },
    show_musicList ({commit}) {
      commit('showMusicList')
    },
    hide_musciList ({commit}) {
      commit('hideMusicList')
    },
    show_musicInfo ({commit}) {
      commit('showMusicInfo')
    },
    hide_musicInfo ({commit}) {
      commit('hideMusicInfo')
    }
  },
  getters: {
    getMusic (state) {
      return state.music
    },
    getMusicStatus (state) {
      return state.playStatus
    },
    getMusicList (state) {
      return state.musicList
    }
  }
}
export default audioInfo
