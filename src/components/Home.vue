<template lang="pug">
  div(id="home",class="home")
    div(class="hello-text" v-if="musiclist.length===0") hello
      router-link(to="/helloLink" class="hello-link") click
    router-view
    ul
      li(v-for="(value,index) in musiclist.slice((pageNow - 1) * pageSize, pageNow * pageSize)",class="music-li",@click="playMusic(value.songid)")
        span(v-text="index+1" class="music-li-index")
        span(class="music-li-img")
          img(:src="value.img")
        span(v-text="value.name" class="music-li-name")
        span(v-text="value.singer" class="music-li-singer")
    Page(:total="musiclist.length",size="small",:current="pageNow",:page-size="pageSize",@on-change="changePage" v-if="musiclist.length!==0")
    audio(:src="musicUrl")
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
    props: {
      musiclist: {
        type: Array
      }
    },
    methods: {
      playMusic: (val) => {
        this.musicUrl = 'http://ws.stream.qqmusic.qq.com/' + val + '.m4a?fromtag=46'
        console.log(this.musicUrl)
      },
      changePage: (val) => {
        this.pageNow = val
        console.log(this.pageNow)
//        this.list = this.musiclist.slice((this.pageNow - 1) * this.pageSize, this.pageNow * this.pageSize)
      }
    }
  }
</script>

<style lang="scss">
  .home {
    .hello-text{
      height:200px;
      line-height:200px;
      font-size:30px;
      font-weight:bold;
      text-align:center;
      color:#4c39ff;
    }
    .music-li {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      display: flex;
      &:hover {
        color: #fff;
        background: #5edbff;
        transition: .4s;
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
        }
      }
      .music-li-name {
        display: inline-block;
        vertical-align: top;
        white-space:nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
        flex:8;
      }
      .music-li-singer {
        display: inline-block;
        vertical-align: top;
        white-space:nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
        flex: 8;
      }
    }
  }
</style>
