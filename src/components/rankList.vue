<template lang="pug">
  div(class="rank-list")
    div(class="top-list clearFloat")
      div(class="top-list-item",v-for="(item,index) in topList")
        img(:src="item.img")
        div(class="detail")
          div(class="title") {{item.name}}
          ul(class="song")
            li(v-for="song in item.songList") {{song.songname}}--{{song.singername}}
</template>

<script>
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
    methods: {
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
  }
</style>
