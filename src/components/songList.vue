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
              img(:src="songList.bgImg",:title="songList.name")
            div(class="song-list-detail")
              div(class="song-list-name") {{songList.name}}
              div(class="song-list-intro") 简介
                i(class="fa fa-chevron-right")
        div(class="song-list-content")
          div(class="song-list-item",v-for="(item,index) in songList.list",@click="playMusic(item)")
            span(class="song-list-item-index") {{index+1}}、
            span(class="song-list-item-name") {{item.name}}
</template>

<script>
import qs from 'qs'
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
    },
    playMusic (val) {
      this.$store.state.audio.audioElement.setAttribute('src', val.url)
      this.$store.dispatch('play_newMusic', val)
      this.$axios.post('/db/musicList/save', qs.stringify(val))
        .then(res => {
          if (res.status === 200) {
            console.log('添加成功')
          }
          if (res.status === 202) {
            console.log('已存在')
          }
          if (res.status === 500) {
            console.log('添加失败')
          }
        })
        .catch(res => {
          console.log(res)
        })
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
      position: absolute;
      z-index:1;
      left: 0;
      right: 0;
      top: 0;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color:#fff;
      .fa {
        font-size: 16px;
        margin: 0 10px;
        padding: 6px;
      }
    }
    .song-list-part {
      position: fixed;
      top: 40px;
      left: 0;
      right: 0;
      bottom: 50px;
      overflow-y:auto;
      .song-list-header {
        font-size: 12px;
        color: #fff;

        .song-list-info {
          display:flex;
          .song-list-pic {
            display:inline-block;
            padding:10px 20px;
            font-size:0;
            img {
              width: 80px;
              height: 80px;
            }
          }
          .song-list-detail {
            flex:1;
            .song-list-name {
              margin-top:20px;
              height: 40px;
              line-height:40px;
            }
            .song-list-intro{
              cursor:pointer;
            &:hover{
              text-decoration:underline;
            }
              .fa{
                margin-left:6px;
              }
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
          &:hover{
            background:#eee;
          }
        }
      }
    }
  }
</style>
