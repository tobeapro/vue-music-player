<template>
    <div id="header" class="header">
      <a class="icon" href="#">
        <img width="40" src="../assets/icon.png">
        <span class="title_text">云音乐</span>
      </a>
      <div class="search_text">
        <Spin size="large" fix v-if="searchListState"></Spin>
        <input class="ivu-input" placeholder="请输入..." v-model="search_content" @keyup.enter="search(search_content)">
        <i class="ivu-icon ivu-icon-ios-search-strong" @click="search(search_content)"></i>
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
        hotListState: false,
        searchListState: false
      }
    },
    props: {
      user: {
        type: Object
      }
    },
   methods: {
      search: function (val) {
        if (val === '') {
          this.$Message.warning('请输入搜索信息')
        } else {
          this.searchListState = true
          this.$axios.get('/api/soso/fcgi-bin/search_for_qq_cp?format=json&n=30&w=' + val + '')
          .then((res) => {
              if (res.data.data.song.list !== []) {
                this.hotListState = false
                this.searchListState = false
                this.searchList = []
                res.data.data.song.list.forEach(val => {
                  this.searchList.push({
                    name: val.songname,
                    img: 'https://y.gtimg.cn/music/photo_new/T002R150x150M000' + val.albummid + '.jpg?max_age=2592000',
                    songid: val.songid,
                    singer: val.singer[0].name
                  })
                })
                this.$emit('datadetail', this.searchList)
              }
            })
          .catch((res) => {
            this.searchListState = false
            this.$Message.warning('搜索出错')
            console.log(res)
          })
        }
      }
    }
  }
</script>

<style lang="scss">
    .header{
      padding-left:20px;
      height:60px;
      line-height:60px;
      font-size:0px;
      color:#fff;
      background:#dc0000;
      .icon{
        display:inline-block;
        width:40%;
        max-width:300px;
        &:hover{
          animation:sign .2s ;
        }
        img{
          vertical-align: middle;
        }
      }
      .search_text{
        display:inline-block;
        width:30%;
        max-width:240px;
        input{
          width:80%;
          height:26px;
          vertical-align:middle;
          font-size:12px;
        }
        i.ivu-icon-ios-search-strong{
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
      .title_text{
        display:inline-block;
        font-size:20px;
        font-weight:bold;
        color:#fff;
        vertical-align:top;
      }
      .user_part{
        display:inline-block;
        text-align: right;
        width:30%;
        float:right;
        .user_name{
          margin:0 16px;
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
    @keyframes sign{
      0 {transform: translate(0)}
      20% {transform: translateY(-2px)}
      80% {transform: translateY(2px)}
      100% {transform: translate(0)}
    }
</style>
