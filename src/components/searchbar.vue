<template lang="pug">
  div(class="search-bar")
    ul(class="music-ul",v-if="musicList.length!==0")
      li(v-for="(value,index) in musicList",class="music-li",@click="playMusic(value)")
        span(v-text="index+1",class="music-li-index")
        span(class="music-li-img")
          img(:src="value.img")
        span(v-text="value.name",class="music-li-name")
        span(v-text="value.singer",class="music-li-singer")
</template>
<script>
  import qs from 'qs'
  export default{
    name: 'search-bar',
    data () {
      return {
      }
    },
    computed: {
      musicList () {
        return this.$store.state.audio.searchMusicList
      }
    },
    methods: {
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
  .search-bar{
    position: fixed;
    top: 102px;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
    .music-ul {
      border-top:1px solid #ccc;
      border-bottom:2px solid #dc0000;
    .music-li {
      display: flex;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
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
      flex: 1;
      display: inline-block;
      vertical-align: top;
      text-align: center;
    }
    .music-li-img {
      flex: 2;
      display: inline-block;
    img {
      width: 40px;
      height: 40px;
      opacity: .8;
    }
    }
    .music-li-name {
      flex: 8;
      display: inline-block;
      vertical-align: top;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .music-li-singer {
      flex: 8;
      display: inline-block;
      vertical-align: top;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    }
    }
  }
</style>
