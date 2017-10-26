<template lang="pug">
  div(class="musicDetail",v-show="musicInfoStatus")
    div(class="music-mask",:style="{backgroundImage:'url('+musicInfo.img+')',backgroundSize:'cover'}")
    div(class="music-detail")
      div(class="music-title")
        i(class="fa fa-arrow-left fa-2x",@click="hideMusicInfo")
        span(class="music-name") {{musicInfo.name}}
        span(class="music-singer",v-if="musicInfo.singer") - {{musicInfo.singer}}
      div(class="music-content")
          img(class="music-img",:src="musicInfo.img",:class="musicStatus?'play':''")
      div(class="music-switch")
</template>
<script>
  export default {
    name: 'music-detail',
    computed: {
      musicInfoStatus () {
        return this.$store.state.audio.musicInfoStatus
      },
      musicInfo () {
        return this.$store.state.audio.music
      },
      musicStatus () {
        return this.$store.getters.getMusicStatus
      }
    },
    methods: {
      hideMusicInfo () {
        this.$store.dispatch('hide_musicInfo')
      }
    }
  }
</script>
<style lang="scss">
  .musicDetail{
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:10;
    background-color:#fff;
    .music-mask{
      position:fixed;
      top:0;
      left:0;
      right:0;
      bottom:0;
      filter:blur(30px);
    }
    .music-detail{
      position:fixed;
      z-index:10;
      color:#fff;
      .music-title{
        padding:10px 20px;
        line-height:40px;
        .fa{
          margin-right:20px;
          cursor:pointer;
        }
      }
    }
    .music-content{
      position:fixed;
      top:60px;
      left:0;
      right:0;
      bottom:60px;
      margin:0 20px;
      
      overflow:hidden;
      border-top:1px solid #fff;
      border-bottom:1px solid #fff;
      .music-img{
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        transform-origin:0 0;
        border-radius:50%;
        border:2px solid #fff;
        @keyframes rotation2{
          from {transform:rotate(0) translate(-50%,-50%)}
          to {transform:rotate(360deg) translate(-50%,-50%)}
        }
        &.play{
          animation:rotation2 6s linear infinite;
        }
      }
    }
    .music-switch{
      position: fixed;
      bottom:0;
      left:0;
      right:0;
      height:60px;
    }
  }
</style>
