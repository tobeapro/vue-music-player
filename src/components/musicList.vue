<template lang="pug">
  div(class="music-list")
    div(class="music-mask",@click="hideSide",v-show="listStatus")
    transition(name="list-fade")
      div(class="music-list-part",v-show="listStatus")
        div(class="handle")
          i(class="fa fa-random")
          span(class="pattern") 随机播放( {{musicList.length}} )
        ul(class="list")
          li(class="list-detail",v-for="(item,index) in musicList",@click="changeMusic(index)")
            span(class="list-name") {{item.name}}
            span(class="list-singer") ---{{item.singer}}
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
      }
    },
    computed: {
      listStatus () {
        return this.$store.state.audio.musicListStatus
      },
      musicList () {
        return this.$store.getters.getMusicList
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
        }
      }
    }
  }
</style>
