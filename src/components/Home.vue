<template lang="pug">
  div(id="home",class="home")
    div(class="hello-text" v-if="musiclist.length===0") hello
      router-link(to="/helloLink" class="hello-link") click
    router-view
    ul(class="music-ul" v-if="musiclist.length!==0")
      li(v-for="(value,index) in showlist",class="music-li",@click="playMusic(value)")
        span(v-text="index+1" class="music-li-index")
        span(class="music-li-img")
          img(:src="value.img")
        span(v-text="value.name" class="music-li-name")
        span(v-text="value.singer" class="music-li-singer")
    Page(:total="musiclist.length",:current="pageNow",:page-size="pageSize",@on-change="changePage",v-if="musiclist.length > pageSize")
</template>

<script>
  export default{
    name: 'home',
    data () {
     return {
       musicUrl: '',
       pageNow: 1,
       pageSize: 10
     }
    },
//    props: {
//      musiclist: {
//        type: Array
//      }
//    },
    computed: {
      musiclist () {
        if (this.$route.params.musicList === undefined) {
          console.log('第一次加载')
          return []
        } else {
          console.log('有数据')
          return this.$route.params.musicList
        }
      },
      showlist () {
        return this.musiclist.slice((this.pageNow - 1) * this.pageSize, this.pageNow * this.pageSize)
      }
    },
    methods: {
      playMusic (val) {
        this.$store.state.audio.audioElement.setAttribute('src', val.url)
        this.$store.dispatch('play_newMusic', val)
      },
      getList () {
        return this.$props.musiclist.slice((this.pageNow - 1) * this.pageSize, this.pageNow * this.pageSize)
      },
      changePage (val) {
        this.pageNow = val
        this.getList()
      }
    }
  }
</script>

<style lang="scss">
  .home {
    position:fixed;
    top:102px;
    left:0;
    right:0;
    bottom:50px;
    overflow-y:auto;
    background:url("../../static/bg2.png") 0 100px;
    .hello-text{
      height:200px;
      line-height:200px;
      font-size:30px;
      font-weight:bold;
      text-align:center;
      color:#4c39ff;
    }
    .music-ul {
      border-top:1px solid #ccc;
      border-bottom:2px solid #dc0000;
      .music-li {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        &:not(:last-child) {
          border-bottom: 1px solid #ccc;
        }
        &:hover {
          color: #fff;
          background: #2d8cf0;
          transition: .6s;
          img {
            opacity: 1 !important;
          }
        }
        .music-li-index {
          display: inline-block;
          vertical-align: top;
          flex: 1;
          text-align: center;
        }
        .music-li-img {
          display: inline-block;
          flex: 2;
          img {
            width: 40px;
            height: 40px;
            opacity: .8;
          }
        }
        .music-li-name {
          display: inline-block;
          vertical-align: top;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 8;
        }
        .music-li-singer {
          display: inline-block;
          vertical-align: top;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 8;
        }
      }
    }
    .ivu-page{
      padding-left:40px;
      padding-top:6px;
    }
  }
</style>
