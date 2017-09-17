<template>
    <div id="header" class="header">
      <i class="icon"></i>
      <span class="title_text">网易云音乐</span>
      <i class="user_icon">
        <img v-if="user.userIcon" :src="user.userIcon" width="30">
      </i>
      <span class="user_name">{{user.userName}}</span>
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
      height:40px;
      line-height:40px;
      font-size:0px;
      color:#fff;
      background:red;
    }
    .header .icon{
      display:inline-block;
      width:30px;
      height:30px;
      background: #fff;
    }
    .header .title_text{
      display:inline-block;
      font-size:12px;
      vertical-align:top;
    }
    .header .user_name{
      font-size:14px;
      vertical-align:top;
    }
    .header .user_icon{
      display:inline-block;
      width:30px;
      height:30px;
      border-radius:50%;
      border:2px solid #fff;
      background: #fff;
      overflow:hidden
    }
</style>
