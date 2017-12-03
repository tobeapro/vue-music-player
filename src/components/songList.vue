<template lang="pug">
  transition(name="song-fade")
    div(class="song-list",v-if="songListStatus")
      div(class="song-list-header-mask",:style="{background:'url('+songList.bgImg+')',backgroundSize:'cover'}")
      div(class="song-list-header")
        div(class="song-list-title")
          i(class="fa fa-arrow-left fa-x",@click="hideSongList")
          span 歌单
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
    z-index:9;
    background:#fff;
    .song-list-header-mask{
      height:200px;
      overflow:hidden;
      filter:blur(30px);
    }
    .song-list-header{
      position:absolute;
      top:0;
      left:0;
      right:0;
      height:200px;
      font-size:12px;
      color:#fff;
      .song-list-title{
        height:40px;
        line-height:40px;
        font-size:16px;
        .fa{
          margin:0 20px;
        }
      }
      .song-list-info{
        .song-list-pic{
          img{
            width:80px;
            height:80px;
          }
        }
      }
    }
    .song-list-content{
      position:fixed;
      top:200px;
      left:0;
      right:0;
      bottom:0;
      background:#fff;
      .song-list-item{
        padding-left:12px;
        height:36px;
        line-height:36px;
        font-size:12px;
      }
    }
  }
</style>
