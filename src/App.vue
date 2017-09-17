<template>
  <div id="app" class="app" >
    <v-header :user="userInfo"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/">首页</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/detail">详情</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/others">其他</router-link>
      </div>
    </div>
    <router-view :dataList="dataList"></router-view>
  </div>
</template>

<script>
  import header from '@/components/header'
  export default {
    name: 'app',
    data: function () {
      return {
        dataList: [
          { 'goods': '手机', 'price': 1000 },
          { 'goods': '电脑', 'price': 5000 },
          { 'goods': '充电器', 'price': 100 }
        ],
        userInfo: {
          userName: 'admin',
          userIcon: 'http://p1.music.126.net/v1jAfoHp37fPZf7uqoQulQ==/109951162999971756.jpg?param=180y180'
        }
      }
    },
    components:{
      'v-header':header
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 20px;
}
a{
  text-decoration: none;
  color:#000;
}
a.router-link-exact-active{
  color:indianred;
}
.app .tab{
  display:flex;
  height:40px;
  line-height:40px;
  font-size:16px;
  font-weight:bold;
  background:#fff;
}
.app .tab-item{
  flex:1;
  text-align:center;
}
</style>
