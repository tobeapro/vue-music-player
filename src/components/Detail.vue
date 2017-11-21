<template lang="pug">
  div(class="detail")
    swiper(:options="swiperOption",:not-next-tick="notNextTick",ref="mySwiper")
      swiper-slide(v-for="(value,index) in musicList",:key="index",v-if="musicList.length > 0")
        a(:href="value.linkUrl",target="_blank")
          img(:src="value.picUrl")
      swiper-slide(v-if="musicList.length === 0") slide1
      swiper-slide(v-if="musicList.length === 0") slide2
      swiper-slide(v-if="musicList.length === 0") slide3
      swiper-slide(v-if="musicList.length === 0") slide4
      swiper-slide(v-if="musicList.length === 0") slide5
      div(class="swiper-pagination",slot="pagination")
      div(class="swiper-button-prev",slot="button-prev")
      div(class="swiper-button-next",slot="button-next")
      div(class="swiper-scrollbar",slot="scrollbar")
</template>

<script>
export default{
  name: 'detail',
  data: function () {
    return {
      musicList: [],
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
        this.musicList = res.data.data.slider
      })
      .catch((res) => {
        console.log(res)
      })
  },
  filters: {
    priceFilter: function (val) {
      return '¥' + ' ' + val
    }
  }
}
</script>

<style lang="scss">
  .detail{
    position:fixed;
    top:102px;
    left:0;
    right:0;
    bottom:50px;
    .swiper-container{
      margin-left: auto;
      margin-right: auto;
      position: relative;
      height:100%;
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
        }
      }
      .swiper-pagination-bullet{
        width:12px;
        height:12px;
      }
    }
  }
</style>
