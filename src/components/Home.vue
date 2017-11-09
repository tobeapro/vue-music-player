<template lang="pug">
  div(id="home",class="home")
    div(class="home-default" v-if="musiclist.length===0")
      swiper(:options="swiperOption",:not-next-tick="notNextTick",ref="mySwiper")
        swiper-slide() I'm Slide 1
        swiper-slide() I'm Slide 2
        swiper-slide() I'm Slide 3
        swiper-slide() I'm Slide 4
        swiper-slide() I'm Slide 5
        swiper-slide() I'm Slide 6
        swiper-slide() I'm Slide 7
        div(class="swiper-pagination",slot="pagination")
        div(class="swiper-button-prev",slot="button-prev")
        div(class="swiper-button-next",slot="button-next")
        div(class="swiper-scrollbar",slot="scrollbar")
    ul(class="music-ul" v-if="musiclist.length!==0")
      li(v-for="(value,index) in showlist",class="music-li",@click="playMusic(value)")
        span(v-text="index+1" class="music-li-index")
        span(class="music-li-img")
          img(:src="value.img")
        span(v-text="value.name" class="music-li-name")
        span(v-text="value.singer" class="music-li-singer")
    Page(:total="musiclist.length",:current="pageNow",:page-size="pageSize",@on-change="changePage",v-if="musiclist.length > pageSize")
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
       notNextTick: true,
       swiperOption: {
         // swiper options 所有的配置同swiper官方api配置
         autoplay: 3000,
         direction: 'vertical',
         grabCursor: true,
         setWrapperSize: true,
         autoHeight: true,
         pagination: '.swiper-pagination',
         paginationClickable: true,
         prevButton: '.swiper-button-prev',
         nextButton: '.swiper-button-next',
         scrollbar: '.swiper-scrollbar',
         mousewheelControl: true,
         observeParents: true,
         // if you need use plugins in the swiper, you can config in here like this
         // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
         debugger: true,
         // swiper callbacks
         // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
         onTransitionStart (swiper) {
           console.log(swiper)
         }
         // more Swiper configs and callbacks...
         // ...
       }
     }
    },
    mounted () {
      // you can use current swiper instance object to do something(swiper methods)
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      console.log('this is current swiper instance object', this.swiper)
      this.swiper.slideTo(3, 1000, false)
    },
    computed: {
      swiper () {
        return this.$refs.mySwiper.swiper
      },
      musiclist () {
        return this.$store.state.audio.searchMusicList
      },
      showlist () {
        return this.musiclist.slice((this.pageNow - 1) * this.pageSize, this.pageNow * this.pageSize)
      }
    },
    methods: {
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
      font-size:30px;
      font-weight:bold;
      text-align:center;
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
