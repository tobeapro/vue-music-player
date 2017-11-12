<template lang="pug">
  div(id="home",class="home")
    div(class="home-default",v-if="musicList.length===0",ref="home")
      div(class="home-text") Welcome
      canvas(width="100%",height="100%",ref="myCanvas")
    ul(class="music-ul" v-if="musicList.length!==0")
      li(v-for="(value,index) in showlist",class="music-li",@click="playMusic(value)")
        span(v-text="index+1" class="music-li-index")
        span(class="music-li-img")
          img(:src="value.img")
        span(v-text="value.name" class="music-li-name")
        span(v-text="value.singer" class="music-li-singer")
    Page(:total="musicList.length",:current="pageNow",:page-size="pageSize",@on-change="changePage",v-if="musicList.length > pageSize")
</template>

<script>
  import Vue from 'vue'
  import VueSwiper from 'vue-awesome-swiper'
  Vue.use(VueSwiper)
  export default{
    name: 'home',
    data () {
     return {
       musicUrl: '',
       pageNow: 1,
       pageSize: 10,
       homeWidth: document.body.clientWidth,
       homeHeight: document.body.clientHeight - 152,
       ballNum: 50,
       ballTime: 500,
       color: ['rgb(70,222,222)', 'rgb(30,200,100)', 'rgb(238,20,130)', 'rgb(43,35,94)', 'rgb(255,200,100)', 'rgb(64,195,129)', 'rgb(5,11,250)', 'rgb(100,250,100)', 'rgb(0,255,255)', 'rgb(255,195,0)']
     }
    },
    mounted () {
      window.onresize = () => {
        return (() => {
          console.log(1)
          this.homeWidth = document.body.clientWidth
          this.homeHeight = document.body.clientHeight - 152
        })()
      }
      this.move()
    },
    watch: {
      homeWidth (val) {
        this.homeWidth = val
      },
      homeHeight (val) {
        this.homeHeight = val
      }
    },
    computed: {
      myCanvas () {
         this.$refs.myCanvas.width = this.homeWidth
         this.$refs.myCanvas.height = this.homeHeight
          return this.$refs.myCanvas
      },
      musicList () {
        return this.$store.state.audio.searchMusicList
      },
      showlist () {
        return this.musiclist.slice((this.pageNow - 1) * this.pageSize, this.pageNow * this.pageSize)
      }
    },
    methods: {
      move () {
        setInterval(() => {
          this.draw(this.myCanvas)
        }, this.ballTime)
      },
      draw (el) {
         let ele = el.getContext('2d')
          ele.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height)
          for (let i = 0; i < this.ballNum; i++) {
            ele.beginPath()
            ele.fillStyle = this.color[Math.floor(Math.random() * this.color.length)]
            ele.arc(Math.random() * this.myCanvas.width, Math.random() * this.myCanvas.height, 5, 0, 2 * Math.PI)
            ele.fill()
            ele.closePath()
          }
      },
      playMusic (val) {
        this.$store.state.audio.audioElement.setAttribute('src', val.url)
        this.$store.dispatch('play_newMusic', val)
      },
      getList () {
        return this.$props.musiclist.slice((this.pageNow - 1) * this.pageSize, this.pageNow * this.pageSize)
      },
      changePage (val) {
        this.pageNow = val
        this.getList()
      }
    }
  }
</script>

<style lang="scss">
  .home {
    position:fixed;
    top:102px;
    left:0;
    right:0;
    bottom:50px;
    overflow-y:auto;
    background:url("../../static/bg2.png") center -30px no-repeat;
    .home-default{
      position:relative;
      height:100%;
      font-size:30px;
      font-weight:bold;
      text-align:center;
      background:#fff;
      overflow:hidden;
      .home-text{
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
      }
    }
    .music-ul {
      border-top:1px solid #ccc;
      border-bottom:2px solid #dc0000;
      .music-li {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        &:not(:last-child) {
          border-bottom: 1px solid #ccc;
        }
        &:hover {
          color: #fff;
          background: #2d8cf0;
          transition: .6s;
          img {
            opacity: 1 !important;
          }
        }
        .music-li-index {
          display: inline-block;
          vertical-align: top;
          flex: 1;
          text-align: center;
        }
        .music-li-img {
          display: inline-block;
          flex: 2;
          img {
            width: 40px;
            height: 40px;
            opacity: .8;
          }
        }
        .music-li-name {
          display: inline-block;
          vertical-align: top;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 8;
        }
        .music-li-singer {
          display: inline-block;
          vertical-align: top;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 8;
        }
      }
    }
    .ivu-page{
      padding-left:40px;
      padding-top:6px;
    }
  }
</style>
