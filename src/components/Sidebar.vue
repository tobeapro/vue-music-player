<template lang="pug">
  div(class="sidebar",v-show="sideStatus")
    div(class="sidebar-mask",@click="hideSide")
    div(class="sidebar-content")
      div(class="user-header")
        div(class="user-header-info")
          div(class="user-header-img")
            img(:src="user.userIcon",width="40")
          div(class="user-header-name")
            span(class="name",v-text="user.userName")
            span(class="lv") lv7
          div(class="user-header-sign")
            span(class="sign")
              i(class="fa fa-flag",aria-hidden="true")
              span 签到
        div(class="user-header-info")
          div(class="user-header-item")
            div(class="title") 动态
            div(class="content") 0
          div(class="user-header-item")
            div(class="title") 关注
            div(class="content") 2
          div(class="user-header-item")
            div(class="title") 粉丝
            div(class="content") 2
          div(class="user-header-item")
            i(class="fa fa-pencil")
            div(class="title") 我的资料
      div(class="user-body")
        i(class="split-border")
        div(class="user-body-item")
          i(class="fa fa-comment-o")
          span 我的消息
        div(class="user-body-item")
          i(class="fa fa-user-o")
          span 会员中心
        div(class="user-body-item")
          i(class="fa fa-shopping-bag")
          span 商城
        div(class="user-body-item")
          i(class="fa fa-headphones")
          span 在线听歌免流量
        i(class="split-border")
        div(class="user-body-item")
          i(class="fa fa-cog")
          span 设置
        div(class="user-body-item")
          i(class="fa fa-qrcode")
          span 扫一扫
        div(class="user-body-item")
          i(class="fa fa-shopping-bag")
          span 个性换肤
        div(class="user-body-item")
          i(class="fa fa-moon-o")
          span 夜间模式
        div(class="user-body-item")
          i(class="fa fa-user-times")
          span 定时关闭
        div(class="user-body-item")
          i(class="fa fa-clock-o")
          span 音乐闹钟
        div(class="user-body-item")
          i(class="fa fa-bus")
          span 驾驶模式
        i(class="split-border")
        div(class="user-body-item")
          i(class="fa fa-share-square-o")
          span 分享网易云音乐
        div(class="user-body-item")
          i(class="fa fa-info")
          span 关于
        i(class="split-border")
      div(class="user-footer")
        span(class="text") 退出登录
</template>

<script>
  export default {
    name: 'sidebar',
    props: {
      user: {
        type: Object
      }
    },
    computed: {
      sideStatus () {
        return this.$store.state.sidebar.showStatus
      }
    },
    methods: {
      hideSide () {
        this.$store.dispatch('hideSideBar')
      }
    }
  }
</script>

<style lang="scss">
  .sidebar{
    .sidebar-mask{
      position:fixed;
      top:0;
      left:0;
      right:0;
      bottom:0;
      z-index:10;
      background:rgba(0,0,0,.5);
    }
    .sidebar-content{
      position:fixed;
      top:0;
      left:0;
      bottom:0;
      width:300px;
      z-index:11;
      background:#fff;
      overflow-y:auto;
      .user-header-info{
        display:flex;
        .user-header-img{
          padding:20px;
          height:80px;
          flex:1;
          border-bottom:1px solid #ddd;
          img{
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
          }
        }
        .user-header-name{
          flex:2;
          height:80px;
          border-bottom:1px solid #ddd;
          .name{
            display:inline-block;
            margin-top:20px;
            width:100%;
            height:30px;
            line-height:30px;
            font-size:14px;
            font-weight:bold;
            color:#000;
          }
          .lv{
            display: inline-block;
            padding:0 10px;
            height:20px;
            line-height:20px;
            border:1px solid #ddd;
            -webkit-border-radius: 6px;
            -moz-border-radius: 6px;
            border-radius: 6px;
          }
        }
        .user-header-sign{
          flex:1;
          height:80px;
          border-bottom:1px solid #ddd;
          .sign{
            display: inline-block;
            margin:30px auto;
            padding:0 6px;
            height:20px;
            line-height:20px;
            color:#dc0000;
            border:1px solid #dc0000;
            -webkit-border-radius: 6px;
            -moz-border-radius: 6px;
            border-radius: 6px;
            .fa{
              margin-right:2px;
            }
          }
        }
        .user-header-item{
          margin:8px 0;
          flex:1;
          text-align:center;
          &:not(:last-child){
            border-right:1px solid #ddd;
          }
          .title{
            color:#aaa;
          }
          .content{
            font-weight:bold;
          }
          .fa{
            color:#aaa;
          }
        }
      }
      .user-body{
        padding-bottom:40px;
        font-size:0;
        .user-body-item{
          padding:0 10px;
          line-height:26px;
          font-size:12px;
          cursor:pointer;
          &:hover{
            background:#eee;
          }
          .fa{
            margin-right:10px;
          }
        }
        .split-border{
          display:inline-block;
          width:100%;
          height:0;
          border-bottom:4px solid #ddd;
        }
      }
      .user-footer{
        position:fixed;
        left:0;
        bottom:0;
        z-index:1;
        width:300px;
        height:40px;
        line-height:40px;
        text-align:center;
        font-weight:bold;
        font-size:14px;
        color:#dc0000;
        background:#fff;
        border-top:1px solid #ddd;
        .text{
          cursor:pointer;
          &:hover{
            color:#ff0000;
          }
        }
      }
    }
  }
</style>
