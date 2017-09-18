<template>
    <div id="header" class="header">
      <a class="icon" href="#">
        <img width="40" src="//tva2.sinaimg.cn/crop.0.0.180.180.180/6694d955jw1e8qgp5bmzyj2050050aa8.jpg">
        <span class="title_text">云音乐</span>
      </a>
      <div class="search_text">
        <input class="el-input__inner">
        <i class="el-icon-search"></i>
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
    props: {
      user: {
        type: Object
      }
    }
  }
</script>

<style>
    .header{
      padding:0 20px;
      height:60px;
      line-height:60px;
      font-size:0px;
      color:#fff;
      background:#dc0000;
    }
    .header .icon{
      display:inline-block;
      width:40%;
      max-width:300px;
    }
    .header .icon:hover{
      animation:sign .2s ;
    }
    @keyframes sign {
      0 {transform: translate(0)}
      20% {transform: translateY(-2px)}
      80% {transform: translateY(2px)}
      100% {transform: translate(0)}
    }
    .header .icon img{
      vertical-align: middle;
    }
    .header .search_text{
      display:inline-block;
      width:30%;
      max-width:240px;
    }
    .header .search_text input{
      width:80%;
      height:26px;
      vertical-align:middle;
      font-size:12px;
    }
    .header .search_text i.el-icon-search{
      display:inline-block;
      vertical-align: middle;
      margin-left:6px;
      font-size:18px;
      cursor:pointer;
      transition:.3s;
    }
    .header .search_text i.el-icon-search:hover{
      transform:scale(1.2);
    }
    .header .title_text{
      display:inline-block;
      font-size:20px;
      font-weight:bold;
      color:#fff;
      vertical-align:top;
    }
    .header .user_part{
      display:inline-block;
      text-align: right;
      width:30%;
      float:right;
    }
    .header .user_name{
      margin:0 16px;
      font-size:16px;
      vertical-align:top;
    }
    .header .user_icon{
      display:inline-block;
      width:40px;
      height:40px;
      vertical-align: middle;
      border-radius:50%;
      border:2px solid #fff;
      background: #fff;
      overflow:hidden;
    }
</style>
