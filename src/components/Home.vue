<template lang="pug">
  div(class="home")
    swiper(:options="swiperOption",:not-next-tick="notNextTick",ref="mySwiper")
      swiper-slide(v-for="(value,index) in dailyMusic",:key="index",v-if="dailyMusic.length > 0")
        a(:href="value.linkUrl",target="_blank")
          img(:src="value.picUrl")
      swiper-slide(v-if="dailyMusic.length === 0") slide1
      swiper-slide(v-if="dailyMusic.length === 0") slide2
      swiper-slide(v-if="dailyMusic.length === 0") slide3
      swiper-slide(v-if="dailyMusic.length === 0") slide4
      swiper-slide(v-if="dailyMusic.length === 0") slide5
      div(class="swiper-pagination",slot="pagination")
      div(class="swiper-scrollbar",slot="scrollbar")
    div(class="self-musicList")
      div(class="song-lists") 我的歌单
      div(class="song-list-item",v-for="(item,index) in songList",@click="checkSongList(item)")
        div(class="song-list-pic")
          img(:src="item.bgImg")
        div(class="song-list-content")
          div(class="song-list-name",v-text="item.name")
          div(class="song-list-num") 共{{item.list.length}}首
</template>
<script>
  import Vue from 'vue'
  import swiper from 'vue-awesome-swiper'
  Vue.use(swiper)
  export default{
    name: 'home',
    data: function () {
      return {
        dailyMusic: [],
        songList: [],
        notNextTick: true,
        swiperOption: {
          autoplay: 3000,
          direction: 'horizontal',
          grabCursor: true,
          setWrapperSize: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          prevButton: '.swiper-button-prev',
          nextButton: '.swiper-button-next',
          scrollbar: '.swiper-scrollbar',
          mousewheelControl: true,
          observeParents: true,
          debugger: true,
          onTransitionStart (swiper) {
          }
        }
      }
    },
    computed: {
      swiper () {
        return this.$refs.mySwiper.swiper
      }
    },
    created () {
      this.$axios.get('/api/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=jsonp&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1492177982521')
        .then((res) => {
          this.dailyMusic = res.data.data.slider
        })
        .catch((res) => {
          console.log(res)
        })
      this.$axios.get('../../static/data.json')
        .then((res) => {
          this.songList = res.data.musicList
        })
        .catch((res) => {
          console.log(res)
        })
    },
    methods: {
      checkSongList (val) {
        this.$store.dispatch('set_songList', val)
      }
    },
    filters: {
      priceFilter: function (val) {
        return '¥' + ' ' + val
      }
    }
  }
</script>

<style lang="scss">
  .home{
    position:fixed;
    top:102px;
    left:0;
    right:0;
    bottom:50px;
    overflow-y:auto;
    .swiper-container{
      margin-left: auto;
      margin-right: auto;
      position: relative;
      height:220px;
      overflow: hidden;
      z-index: 1;
      .swiper-wrapper{
        height:100%;
        .swiper-slide{
          display:flex;
          float:left;
          height:100%;
          align-items: center;
          justify-content: center;
          a {
            display:inline-block;
            width:100%;
            height:220px;
            img {
              width: 100%;
              height: 220px;
            }
          }
        }
      }
      .swiper-pagination-bullet{
        width:12px;
        height:12px;
        background:#fff;
        opacity:1;
        &.swiper-pagination-bullet-active{
          background:#007aff;
        }
      }
    }
    .song-lists{
      padding-left:12px;
      line-height:30px;
      background:#ddd;
    }
    .song-list-item {
      height:50px;
      font-size:0;
      vertical-align: middle;
      border-bottom:1px solid #ddd;
      cursor: pointer;
      .song-list-pic {
        display:inline-block;
        padding-left:10px;
        img {
          width: 40px;
          height: 40px;
        }
      }
      .song-list-content {
        display:inline-block;
        padding-left:10px;
        .song-list-name {
          height: 30px;
          line-height:30px;
          font-size:14px;
        }
        .song-list-num {
          height: 20px;
          line-height:20px;
          font-size:14px;
          color:#aaa;
        }
      }
    }
  }
</style>
