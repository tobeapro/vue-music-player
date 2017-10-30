<template lang="pug">
  transition(name="detail-fade")
    div(class="musicDetail",v-show="musicInfoStatus")
      div(class="music-mask",:style="{backgroundImage:'url('+musicInfo.img+')',backgroundSize:'cover'}")
      div(class="music-detail")
        div(class="music-title")
          i(class="fa fa-arrow-left fa-2x",@click="hideMusicInfo")
          span(class="music-name") {{musicInfo.name}}
          span(class="music-singer",v-if="musicInfo.singer!=''") - {{musicInfo.singer}}
        div(class="music-content")
            div(class="music-play-show",:class="musicStatus?'play-show':''")
            div(class="music-cd-bg",:class="musicStatus?'play':''")
              img(class="music-img",:src="musicInfo.img")
            div(class="music-handle")
              div(class="music-handle-item")
                i(class="fa fa-heart-o")
              div(class="music-handle-item")
                i(class="fa fa-download")
              div(class="music-handle-item")
                i(class="fa fa-commenting-o")
              div(class="music-handle-item")
                i(class="fa fa-bars")
        div(class="music-switch")
          div(class="music-switch-item")
            i(class="fa",:class="[{'fa-refresh':playWay===1},{'fa-random':playWay===2}]",@click="changePlayWay")
          div(class="music-switch-item")
            i(class="fa fa-step-backward",@click="playPrev")
          div(class="music-switch-item")
            i(class="fa",:class="musicStatus?'fa-pause':'fa-play'",@click="changeMusicStatus")
          div(class="music-switch-item")
            i(class="fa fa-step-forward",@click="playNext")
          div(class="music-switch-item")
            i(class="fa fa-list",@click="showMusicList")
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
      },
      playWay () {
        return this.$store.state.audio.playWay
      }
    },
    methods: {
      hideMusicInfo () {
        this.$store.dispatch('hide_musicInfo')
      },
      showMusicList () {
        this.$store.dispatch('show_musicList')
      },
      changeMusicStatus () {
        this.$store.commit('changePlayStatus')
      },
      playPrev () {
        this.$store.dispatch('play_prevMusic')
      },
      playNext () {
        this.$store.dispatch('play_nextMusic')
      },
      changePlayWay () {
        this.$store.dispatch('change_playWay')
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
    z-index:9;
    background-color:#000;
    overflow:hidden;
    &.detail-fade-enter-active,&.detail-fade-leave-active{
      transition:all .2s linear;
    }
    &.detail-fade-enter,&.detail-fade-leave-to{
      top:100%;
    }
    .music-mask{
      position:absolute;
      top:0;
      left:0;
      right:0;
      bottom:0;
      filter:blur(30px);
    }
    .music-detail{
      position:absolute;
      left:0;
      right:0;
      top:0;
      bottom:0;
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
      .music-content{
        position:absolute;
        top:60px;
        left:0;
        right:0;
        bottom:60px;
        margin:0 20px;
        overflow:hidden;
        border-top:1px solid #fff;
        border-bottom:1px solid #fff;
        .music-play-show{
          transform: rotate(-20deg);
          transform-origin:0 0;
          transition:all .2s linear;
          position:absolute;
          left:50%;
          top:-6px;
          z-index:10;
          width:80px;
          height:160px;
          background:url(../../static/switch.png) no-repeat;
          background-size:100%;
          &.play-show{
            transform: rotate(0);
          }
        }
        .music-cd-bg{
          position:absolute;
          left:50%;
          top:60px;
          transform:translateX(-50%);
          transform-origin:0 20vh;
          width:40vh;
          height:40vh;
          background:url(../../static/cd-bg.png);
          background-size:100%;
          &.play{
            animation:rotation2 6s linear infinite;
          }
          @keyframes rotation2{
            from {transform:rotate(0) translateX(-50%)}
            to {transform:rotate(360deg) translateX(-50%)}
          }
          .music-img{
            position:absolute;
            left:50%;
            top:50%;
            width:26vh;
            transform:translate(-50%,-50%);
            border-radius:50%;
          }
        }
        .music-handle{
          position:absolute;
          left:0;
          right:0;
          bottom:10px;
          display:flex;
          height:40px;
          line-height:40px;
          text-align:center;
          .music-handle-item{
            flex:1;
            font-size:20px;
            .fa{
              cursor:pointer;
            }
          }
        }
      }
      .music-switch{
        position: fixed;
        bottom:0;
        left:0;
        right:0;
        display:flex;
        height:60px;
        line-height:60px;
        text-align:center;
        .music-switch-item{
          flex:1;
          font-size:24px;
          .fa{
            cursor:pointer;
          }
        }
      }
    }
  }
</style>
