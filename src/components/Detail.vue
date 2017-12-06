<template lang="pug">
  div(class="rank-list")
    div(class="top-list clearFloat")
      div(class="top-list-item",v-for="(item,index) in topList")
        img(:src="item.img")
        div(class="detail")
          div(class="title") {{item.name}}
          ul(class="song")
            li(v-for="song in item.songList") {{song.songname}}--{{song.singername}}
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
    name: 'rank-list',
    data () {
      return {
        musicUrl: '',
        topList: []
      }
    },
    mounted () {
      this.$custom.waiting.show()
      this.$axios.get('/api/v8/fcg-bin/fcg_myqq_toplist.fcg?format=json ')
        .then(res => {
          if (res.status === 200) {
            let data = res.data.data.topList
            this.$custom.waiting.hide()
            this.topList = []
            data.forEach(item => {
              this.topList.push({
                id: item.id,
                name: item.topTitle,
                img: item.picUrl,
                songList: item.songList,
                playTime: item.listenCount
              })
            })
          } else {
            this.$custom.waiting.hide()
            this.$custom.messages.warning('加载失败')
          }
        })
        .catch(res => {
          this.$custom.waiting.hide()
          console.log(res)
        })
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
  .rank-list {
    position:fixed;
    top:102px;
    left:0;
    right:0;
    bottom:50px;
    overflow-y:auto;
    background:url("../../static/bg2.png") center -30px no-repeat;
    .top-list{
      .top-list-item{
        overflow:hidden;
        transition:all .3s ease;
        &:hover{
          background:rgba(0,0,0,.1)
        }
        &:not(:last-child){
          margin-bottom:10px;
        }
        img{
          display:inline-block;
          padding:4px;
          float:left;
          width:100px;
        }
        .detail{
          margin-left:110px;
          .title{
            line-height:26px;
            font-weight:bold;
          }
          .song{
            li{
              line-height:20px;
              color:#495060;
            }
          }
        }
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
