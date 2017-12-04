<template>
    <div id="header" class="header">
      <div class="icon" @click="showSide" title="侧边栏">
        <i class="fa fa-music" aria-hidden="true"></i>
      </div>
      <div class="search_text">
        <input class="search-input" placeholder="请输入..." v-model="search_content" @keyup.enter="search(search_content)">
        <i class="fa fa-search" @click="search(search_content)" aria-hidden="true"></i>
      </div>
      <div class="user_part">
        <i class="user_icon">
          <img v-if="user.userIcon" :src="user.userIcon" width="40">
        </i>
        <span class="user_name">{{user.userName}}</span>
      </div>
    </div>
</template>

<script>
  export default{
    name: 'header',
    data () {
      return {
        search_content: '',
        hotListState: false
      }
    },
    props: {
      user: {
        type: Object
      }
    },
   methods: {
      search (val) {
        if (val === '') {
          this.$custom.messages.warning('请输入搜索内容！')
          return
        } else {
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
                this.$router.push({path: '/'})
              }
            })
          .catch((res) => {
            this.$custom.waiting.hide()
            this.$custom.messages.error('搜索失败!')
          })
        }
      },
     showSide () {
        this.$store.dispatch('showSideBar')
     }
    }
  }
</script>

<style lang="scss">
    .header{
      display:flex;
      justify-content:center;
      height:60px;
      line-height:60px;
      color:#fff;
      background:#dc0000;
      .icon{
        display:inline-block;
        padding:0 20px;
        cursor: pointer;
        .fa{
          line-height:60px;
          font-size:20px;
          color:#fff;
        }
        &:hover{
          animation:sign .2s ;
        }
        img{
          vertical-align: middle;
        }
      }
      .search_text{
        flex:1;
        text-align:center;
        .search-input{
          padding:0 4px;
          height:26px;
          border-radius:4px;
          vertical-align:middle;
          font-size:12px;
          letter-spacing:2px;
        }
        i.fa{
          display:inline-block;
          vertical-align: middle;
          margin-left:6px;
          font-size:20px;
          cursor:pointer;
          transition:.3s;
          &:hover{
            transform:scale(1.2);
          }
        }
      }
      .user_part{
        display:inline-block;
        float:right;
        text-align: right;
        .user_name{
          font-size:16px;
          vertical-align:top;
        }
        .user_icon{
          display:inline-block;
          width:40px;
          height:40px;
          vertical-align: middle;
          border-radius:50%;
          border:2px solid #fff;
          background: #fff;
          overflow:hidden;
        }
      }
    }
    @keyframes sign {
      0% {transform: translate(0)}
      20% {transform: translateY(-2px)}
      80% {transform: translateY(2px)}
      100% {transform: translate(0)}
    }
</style>
