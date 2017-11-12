<template lang="pug">
  div(class="detail")
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
</template>

<script>
export default{
  name: 'detail',
  data: function () {
    return {
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
          console.log(swiper)
        }
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  created: function () {
    this.$axios.get('/user/detail')
      .then((res) => {
        this.dataList = res.data.data
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
        width:16px;
        height:16px;
      }
    }
  }
</style>
