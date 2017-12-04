<template lang="pug">
  transition(name="song-fade")
    div(class="song-list",v-if="songListStatus")
      div(class="song-list-header-mask",:style="{background:'url('+songList.bgImg+')',backgroundSize:'cover'}")
      div(class="song-list-title")
        i(class="fa fa-arrow-left fa-2x",@click="hideSongList")
        span 歌单
      div(class="song-list-part")
        div(class="song-list-header")
          div(class="song-list-info")
            div(class="song-list-pic")
              img(:src="songList.bgImg")
        div(class="song-list-content")
          div(class="song-list-item",v-for="(item,index) in songList.list")
            span(class="song-list-item-index") {{index+1}}、
            span(class="song-list-item-name") {{item.name}}
</template>

<script>
export default{
  name: 'songList',
  data () {
    return {
    }
  },
  computed: {
    songListStatus () {
      return this.$store.getters.getSongListStatus
    },
    songList () {
      return this.$store.getters.getSongList
    }
  },
  methods: {
    hideSongList () {
      this.$store.dispatch('hide_songList')
    }
  }
}
</script>

<style lang="scss">
  .song-list{
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:8;
    background:#fff;
    &.song-fade,
    .song-list-header-mask{
      position:absolute;
      z-index:-1;
      top:0;
      left:0;
      right:0;
      height:200px;
      overflow:hidden;
      filter:blur(30px);
    }
    .song-list-title {
      position: fixed;
      z-index:1;
      left: 0;
      right: 0;
      top: 0;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      color:#fff;
      .fa {
        font-size: 16px;
        margin: 0 10px;
        padding: 6px;
      }
    }
    .song-list-part {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 50px;
      overflow-y:auto;
      .song-list-header {
        padding-top: 40px;
        height: 200px;
        font-size: 12px;
        color: #fff;
        overflow-y: auto;
        background: rgba(0, 0, 0, .6);
        .song-list-info {
          .song-list-pic {
            img {
              width: 80px;
              height: 80px;
            }
          }
        }
      }
      .song-list-content {
        background: #fff;
        .song-list-item {
          padding-left: 12px;
          height: 36px;
          line-height: 36px;
          font-size: 12px;
          border-bottom:1px solid #ddd;
        }
      }
    }
  }
</style>
