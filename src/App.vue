<template>
  <div class="app">
    <audio ref="audio"></audio>
    <v-header :user="userInfo" @datadetail="list"></v-header>
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
    <router-view :musiclist="musicList"></router-view>
    <bottom-bar></bottom-bar>
    <!--底部音乐-->
    <music-list></music-list>
    <!--播放列表-->
    <music-info></music-info>
    <!--当前播放-->
  </div>
</template>

<script>
  import header from '@/components/header'
  import sidebar from '@/components/Sidebar'
  import bottombar from '@/components/bottombar'
  import musicList from '@/components/musicList'
  import musicInfo from '@/components/musicInfo'
  export default {
    name: 'app',
    data: function () {
      return {
        userInfo: {
          userName: '',
          userIcon: ''
        },
        musicList: [],
        isSideShow: false
      }
    },
    created: function () {
      this.$axios.get('/user')
        .then((res) => {
          this.userInfo = res.data.data
          this.$refs.audio.setAttribute('src', res.data.data.music.url)
          this.$store.dispatch('set_music', res.data.data.music)
          this.$store.dispatch('set_audioElement', this.$refs.audio)
        })
        .catch((res) => {
          console.log(res)
        })
    },
    components: {
      'v-header': header,
      'side-bar': sidebar,
      'bottom-bar': bottombar,
      'music-list': musicList,
      'music-info': musicInfo
    },
    methods: {
      list: function (val) {
        this.musicList = val
        window.location.hash = '/'
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
  background:#fff;
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
