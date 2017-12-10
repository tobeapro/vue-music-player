<template lang="pug">
  div(class="search-bar")
    p(class="hot-title") 热门搜索
    p(class="hot-error",v-if="hotSearch.length===0")
      i(class="fa fa-times")
      span 好像服务器出了点错误
    ul(class="hot-list",v-if="hotSearch.length>0")
      li(v-for="(item,index) in hotSearch",@click="search(item)") {{item}}
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
        hotSearch: []
      }
    },
    mounted () {
      this.$custom.waiting.show()
      this.$axios.get('/api/splcloud/fcgi-bin/gethotkey.fcg?format=json')
        .then(res => {
          this.$custom.waiting.hide()
          this.hotSearch = []
          let data = res.data.data.hotkey
          data.forEach((item, index) => {
            if (index > 10) {
                return
            }
            this.hotSearch.push(item.k)
          })
        })
        .catch(res => {
          this.$custom.waiting.hide()
          this.$custom.messages.error('连接出错！')
        })
    },
    computed: {
      musicList () {
        return this.$store.state.audio.searchMusicList
      }
    },
    methods: {
      search (val) {
          this.$custom.waiting.show()
          this.$axios.get('/api/soso/fcgi-bin/search_for_qq_cp?format=json&n=30&w=' + val + '')
          .then((res) => {
            this.$custom.waiting.hide()
            if (res.data.data.song.list === []) {
              this.$custom.tip.warning('没有搜索结果！')
              return
            } else {
              this.hotListState = false
              this.searchList = []
              res.data.data.song.list.forEach(val => {
                this.searchList.push({
                  id: val.songid,
                  name: val.songname,
                  singer: val.singer[0].name,
                  img: 'https://y.gtimg.cn/music/photo_new/T002R150x150M000' + val.albummid + '.jpg?max_age=2592000',
                  url: 'http://ws.stream.qqmusic.qq.com/' + val.songid + '.m4a?fromtag=46',
                  lyric: ''
                })
              })
              this.$store.dispatch('search_music', this.searchList)
            }
          })
          .catch((res) => {
            this.$custom.waiting.hide()
            this.$custom.messages.error('搜索失败!')
          })
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
  .search-bar{
    position: fixed;
    top: 102px;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
    .hot-title{
      padding-left:12px;
      line-height:30px;
      font-size:14px;
      font-weight:bold;
    }
    .hot-error{
      padding-left:12px;
      line-height:26px;
      color:#dc0000;
      .fa{
        margin-right:6px;
      }
    }
    .hot-list{
      margin-bottom:10px;
      overflow:hidden;
      li{
        margin:2px 6px;
        padding:0 12px;
        display:inline-block;
        float:left;
        height:26px;
        line-height:26px;
        border:1px solid #000;
        cursor:pointer;
      }
    }
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
