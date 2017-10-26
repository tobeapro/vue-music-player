<template lang="pug">
  div(class="bottom-bar",@click="showMusicInfo")
    div(class="music-info")
      img(:src="musicInfo.img")
      div(class="music-detail")
        div(class="music-name",v-text="musicInfo.name")
        div(class="music-singer",v-text="musicInfo.singer")
    div(class="music-play",@click.stop="playMusic")
      i(class="fa fa-2x",:class="musicStatus?'fa-pause-circle-o':'fa-play-circle-o'")
    div(class="music-list",@click.stop="showMusicList")
      i(class="fa fa-list fa-2x")
</template>
<script>
  export default {
    name: 'bottombar',
    methods: {
      playMusic () {
        this.$store.commit('changePlayStatus')
      },
      showMusicList () {
        this.$store.dispatch('show_musicList')
      },
      showMusicInfo () {
        this.$store.dispatch('show_musicInfo')
      }
    },
    computed: {
      musicStatus () {
        return this.$store.getters.getMusicStatus
      },
      musicInfo () {
        return this.$store.getters.getMusic
      }
    }
  }
</script>
<style lang="scss">
  .bottom-bar{
    position:fixed;
    left:0;
    right:0;
    bottom:0;
    z-index:9;
    display:flex;
    height:50px;
    box-shadow:2px 0 10px #000;
    background:#fff;
    .music-info{
      display:flex;
      padding:2px 12px;
      font-size:0;
      img{
        width:46px;
        height:46px;
        border-radius:50%;
      }
      .music-detail{
        margin-left:10px;
        .music-name{
          line-height:26px;
          font-size:12px;
          font-weight:bold;
        }
        .music-singer{
          line-height:20px;
          color:#aaa;
          font-size:12px;
        }
      }
    }
    .music-play{
      position:absolute;
      right:80px;
      top:50%;
      transform:translateY(-50%);
      .fa{
        cursor:pointer;
      }
    }
    .music-list{
      position:absolute;
      right:20px;
      top:50%;
      transform:translateY(-50%);
      .fa{
        cursor:pointer;
      }
    }
  }
</style>
