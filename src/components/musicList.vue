<template lang="pug">
  div(class="music-list")
    div(class="music-mask",@click="hideSide",v-show="listStatus")
    transition(name="list-fade")
      div(class="music-list-part",v-show="listStatus")
        div(class="handle")
          i(class="fa",:class="[{'fa-refresh':playWay===1},{'fa-random':playWay===2}]",@click="changePlayWay")
          span(class="pattern",v-if="playWay===1") 列表循环 ( {{musicList.length}} )
          span(class="pattern",v-if="playWay===2") 随机播放 ( {{musicList.length}} )
        ul(class="list")
          li(class="list-detail",v-for="(item,index) in musicList",@click="changeMusic(index)")
            i(class="fa",:class="[{'fa-volume-up':index === musicIndex},{'play':playStatus}]")
            span(class="list-name") {{item.name}}
            span(class="list-singer") ---{{item.singer}}
            i(class="fa fa-trash remove",@click.stop="removeMusic(index)")
</template>
<script>
  export default {
    name: 'musicList',
    methods: {
      hideSide () {
        this.$store.dispatch('hide_musciList')
      },
      changeMusic (num) {
        this.$store.dispatch('change_music', num)
      },
      changePlayWay () {
        this.$store.dispatch('change_playWay')
      },
      removeMusic (index) {
        this.$store.dispatch('remove_music', index)
      }
    },
    computed: {
      listStatus () {
        return this.$store.state.audio.musicListStatus
      },
      musicList () {
        return this.$store.getters.getMusicList
      },
      musicIndex () {
        return this.$store.state.audio.musicIndex
      },
      playStatus () {
        return this.$store.state.audio.playStatus
      },
      playWay () {
        return this.$store.state.audio.playWay
      }
    }
  }
</script>
<style lang="scss">
  .music-list{
    .music-mask {
      position: fixed;
      left: 0;
      right: 0;
      top:0;
      bottom: 0;
      z-index: 10;
      background:rgba(0,0,0,.5);
    }
    .music-list-part {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 11;
      height:300px;
      background:#fff;
      &.list-fade-enter-active,&.list-fade-leave-active{
        transition:  all .2s ease;
      }
      &.list-fade-enter,&.list-fade-leave-to{
        bottom:-300px;
      }
      .handle{
        padding-left:20px;
        height:40px;
        line-height:40px;
        border-bottom:1px solid #ddd;
        font-size:14px;
        .fa{
          margin-right:10px;
          font-size:16px;
          cursor:pointer;
        }
      }
      .list{
        height:260px;
        overflow-y:auto;
        .list-detail{
          padding-left:20px;
          line-height:30px;
          border-bottom:1px solid #ddd;
          cursor:pointer;
          &:hover{
            background:#eee;
          }
          .fa{
            transition:all .6s ease ;
            margin-right:10px;
            font-weight:bold;
            font-size:14px;
            color:#495060;
            &.play{
              color:#dc0000;
            }
          }
          .remove{
            float:right;
            margin-right:20px;
            line-height:30px;
            &:hover{
              color:#dc0000;
            }
          }
        }
      }
    }
  }
</style>
