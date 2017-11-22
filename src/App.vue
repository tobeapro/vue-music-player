<template>
  <div class="app">
    <audio ref="audio" @canplay="musicCanPlay" @timeupdate="musicUpdate" @ended="musicNext"></audio>
    <v-header :user="userInfo" @datadetail="searchList"></v-header>
    <!--头部-->
    <side-bar :user="userInfo"></side-bar>
    <!--左侧栏-->
    <div class="tab">
      <div class="tab-item">
        <router-link to="/">
          <span>首页</span>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/detail">详情</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/others">其他</router-link>
      </div>
    </div>
    <router-view></router-view>
    <bottom-bar></bottom-bar>
    <!--底部音乐-->
    <music-list></music-list>
    <!--播放列表-->
    <music-detail></music-detail>
    <!--当前播放-->
  </div>
</template>

<script>
  import header from '@/components/header'
  import sidebar from '@/components/Sidebar'
  import bottombar from '@/components/bottombar'
  import musicList from '@/components/musicList'
  import musicDetail from '@/components/musicDetail'
  import qs from 'qs'
  export default {
    name: 'app',
    data () {
      return {
        userInfo: {
          userName: '',
          userIcon: ''
        },
        musicList: [],
        isSideShow: false
      }
    },
    watch: {
      musicList: function (val) {
        this.$store.dispatch('search_music', val)
      }
    },
    created () {
      this.$axios.get('/db/musicList/getList')
        .then((res) => {
          let list = res.data
          if (list.length > 0) {
            this.$store.dispatch('set_musicList', list)
            this.$store.dispatch('set_music', list[0])
            this.$refs.audio.setAttribute('src', list[0].url)
            this.$store.dispatch('set_audioElement', this.$refs.audio)
          } else {
            console.log('database is empty')
            list = this.$store.getters.getMusicList
            this.$store.dispatch('set_musicList', list)
            this.$store.dispatch('set_music', list[0])
            this.$refs.audio.setAttribute('src', list[0].url)
            this.$store.dispatch('set_audioElement', this.$refs.audio)
            this.$axios.post('/db/musicList/saveList', list)
              .then((res) => {
              console.log(res)
                if (res.status === 200) {
                  console.log('初始化数据成功')
                }
                if (res.status === 202) {
                  console.log('初始化失败')
                }
              })
              .catch((res) => {
                console.log('connect database music error')
              })
          }
        })
        .catch((res) => {
          console.log('connect error')
          let list = this.$store.getters.getMusicList
          list = this.$store.getters.getMusicList
          this.$store.dispatch('set_musicList', list)
          this.$store.dispatch('set_music', list[0])
          this.$refs.audio.setAttribute('src', list[0].url)
          this.$store.dispatch('set_audioElement', this.$refs.audio)
        })
      this.$axios.get('/user')
        .then((res) => {
          this.userInfo = res.data.data
        })
        .catch((res) => {
          console.log('can not connect user')
        })
//      if (window.localStorage.getItem('musicList') !== null) {
//        console.log(JSON.parse(window.localStorage.getItem('musicList')))
//        this.$store.state.audio.musicList = JSON.parse(window.localStorage.getItem('musicList'))
//      }
    },
    components: {
      'v-header': header,
      'side-bar': sidebar,
      'bottom-bar': bottombar,
      'music-list': musicList,
      'music-detail': musicDetail
    },
    methods: {
      searchList: function (val) {
        this.musicList = val
        this.$router.push({path: '/'})
      },
      musicCanPlay () {
        this.$store.dispatch('set_musicCurrentTime', this.$refs.audio)
        this.$store.dispatch('set_musicDurationTime', this.$refs.audio)
      },
      musicUpdate () {
        this.$store.dispatch('set_musicCurrentTime', this.$refs.audio)
      },
      musicNext () {
        this.$store.dispatch('play_nextMusic')
      }
    }
  }
</script>

<style>
html,body,div,span,
applet,object,iframe,
h1,h2,h3,h4,h5,h6,p,blockquote,pre,
a,abbr,acronym,address,big,cite,code,
del,dfn,em,font,img,ins,kbd,q,s,samp,
small,strike,strong,sub,sup,tt,var,
dd,dl,dt,li,ol,ul,
fieldset,form,label,legend,select,
table,caption,tbody,tfoot,thead,tr,th,td,input,button,i,span{
  margin:0;
  padding:0;
  border:0;
}
html,body{font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "WenQuanYi Micro Hei", "Microsoft Yahei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height:100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
input,button,textarea,td,th,select{outline:none;}
table {border-collapse:collapse;border-spacing:0;}
ol,ul{list-style: none;}
a{text-decoration:none;}
a:hover{text-decoration:none;cursor:pointer;}
.fl{float:left;}
.fr{float:right;}
.clearFloat:after{content:"";display:block;clear:both;}
.clearFloat{zoom:1;}
input[disabled], select[disabled]{
  background: #f9fafc !important;
  cursor: not-allowed !important;
}
.app{
  height:100%;

}
.app .tab{
  display:flex;
  position:relative;
  height:42px;
  line-height:40px;
  font-size:14px;
  font-weight:bold;
}
.app .tab-item{
  flex:1;
  text-align:center;
}
.app .tab-item a{
  display:inline-block;
  width:100%;
  color:#000;
  letter-spacing: 2px;
  border-bottom:2px solid transparent;
  transition:border-color .4s;
}
.app .tab-item a.router-link-exact-active{
  color:indianred;
  border-color:#dc0000;
}
</style>
