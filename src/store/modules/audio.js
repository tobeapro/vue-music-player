const audioInfo = {
  state: {
    searchMusicList: [],
    music: {
      id: 0,
      name: '',
      singer: '',
      img: '',
      url: '',
      lyric: ''
    },
    musicCurrentTime: 0,
    musicDurationTime: 0,
    musicIndex: 0,
    audioElement: '',
    playStatus: false,
    musicListStatus: false,
    playWay: 1,
    musicList: [
      {
        'id': 1249555,
        'name': '粤语残片',
        'singer': '陈奕迅',
        'img': 'https://y.gtimg.cn/music/photo_new/T002R150x150M000003nMzes28P7wv.jpg?max_age=2592000',
        'url': 'http://ws.stream.qqmusic.qq.com/1249555.m4a?fromtag=46',
        'lyric': ''
      },
      {
        'id': 410316,
        'name': '青花瓷',
        'singer': '周杰伦',
        'img': 'https://y.gtimg.cn/music/photo_new/T002R150x150M000002eFUFm2XYZ7z.jpg?max_age=2592000',
        'url': 'http://ws.stream.qqmusic.qq.com/410316.m4a?fromtag=46',
        'lyric': ''
      }
    ],
    musicInfoStatus: false
  },
  mutations: {
    searchMusic (state, ary) {
      state.searchMusicList = ary
    },
    setAudioElement (state, ele) {
      state.audioElement = ele
    },
    setMusic (state, obj) {
      state.music = obj
    },
    setMusicList (state, obj) {
      state.musicList = obj
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
    playPrevMusic (state) {
      let len = state.musicList.length
      if (state.playWay === 2) {
        let index = Math.floor(Math.random() * len)
        if (index === state.musicIndex) {
          state.musicIndex--
          if (state.musicIndex < 0) {
            state.musicIndex = len - 1
          }
        } else {
          state.musicIndex === index
        }
      } else {
        state.musicIndex--
        if (state.musicIndex < 0) {
          state.musicIndex = len - 1
        }
      }
      state.music = state.musicList[state.musicIndex]
      state.audioElement.setAttribute('src', state.musicList[state.musicIndex].url)
      state.playStatus = true
      state.audioElement.load()
      state.audioElement.play()
    },
    playNextMusic (state) {
      let len = state.musicList.length
      if (state.playWay === 2) {
        let index = Math.floor(Math.random() * len)
        if (index === state.musicIndex) {
          state.musicIndex++
          if (state.musicIndex >= len) {
            state.musicIndex = 0
          }
        } else {
          state.musicIndex = index
        }
      } else {
        state.musicIndex++
        if (state.musicIndex >= len) {
          state.musicIndex = 0
        }
      }
      state.music = state.musicList[state.musicIndex]
      state.audioElement.setAttribute('src', state.musicList[state.musicIndex].url)
      state.playStatus = true
      state.audioElement.load()
      state.audioElement.play()
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
    },
    playNewMusic (state, obj) {
      for (let i = 0; i < state.musicList.length; i++) {
        if (state.musicList[i].id === obj.id) {
          state.music = obj
          state.musicIndex = i
          state.playStatus = true
          state.audioElement.load()
          state.audioElement.play()
          return
        } else {
          continue
        }
      }
      state.musicList.unshift(obj)
      state.musicIndex = 0
      state.music = obj
      state.playStatus = true
      state.audioElement.load()
      state.audioElement.play()
    },
    changeMusic (state, index) {
      if (state.musicIndex === index) {
        state.playStatus = true
        state.audioElement.load()
        state.audioElement.play()
        return
      } else {
        state.musicIndex = index
        state.music = state.musicList[index]
        state.audioElement.setAttribute('src', state.musicList[index].url)
        state.playStatus = true
        state.audioElement.load()
        state.audioElement.play()
      }
    },
    changePlayWay (state) {
      let way = state.playWay
      if (way === 1) {
        state.playWay = 2
      } else if (way === 2) {
        state.playWay = 1
      } else {
        return
      }
    },
    removeMusic (state, obj) {
      let musicList = state.musicList
      let index = obj.index
      let playIndex = obj.playIndex
      musicList.splice(index, 1)
      if (index === playIndex) {
        index = index === musicList.length ? 0 : index
        state.music = musicList[index]
        state.audioElement.setAttribute('src', musicList[index].url)
        if (state.playStatus) {
          state.audioElement.load()
          state.audioElement.play()
        }
      }
    },
    setMusicCurrentTime (state, obj) {
      state.musicCurrentTime = obj.currentTime
    },
    setMusicDurationTime (state, obj) {
      state.musicDurationTime = obj.duration
    }
  },
  actions: {
    search_music ({commit}, ary) {
      commit('searchMusic', ary)
    },
    set_audioElement ({commit}, ele) {
      commit('setAudioElement', ele)
    },
    set_music ({commit}, obj) {
      commit('setMusic', obj)
    },
    set_musicList ({commit}, obj) {
      commit('setMusicList', obj)
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
    },
    play_prevMusic ({commit}) {
      commit('playPrevMusic')
    },
    play_nextMusic ({commit}) {
      commit('playNextMusic')
    },
    play_newMusic ({commit}, obj) {
      commit('playNewMusic', obj)
    },
    change_music ({commit}, index) {
      commit('changeMusic', index)
    },
    change_playWay ({commit}) {
      commit('changePlayWay')
    },
    remove_music ({commit}, obj) {
      commit({
        type: 'removeMusic',
        index: obj.index,
        playIndex: obj.playIndex
      })
    },
    set_musicCurrentTime ({commit}, obj) {
      commit('setMusicCurrentTime', obj)
    },
    set_musicDurationTime ({commit}, obj) {
      commit('setMusicDurationTime', obj)
    }
  },
  getters: {
    getMusic (state) {
      return state.music
    },
    getAudioElement (state) {
      return state.audioElement
    },
    getMusicStatus (state) {
      return state.playStatus
    },
    getMusicList (state) {
      return state.musicList
    },
    getMusicCurrentTime (state) {
      return state.musicCurrentTime
    },
    getMusicDurationTime (state) {
      return state.musicDurationTime
    }
  }
}
export default audioInfo
