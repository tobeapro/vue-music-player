<template>
  <div id="app">
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
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 20px;
}
.tab{
  display:flex;
  height:40px;
  line-height:40px;
  background:deepskyblue;
}
.tab-item{
  flex:1;
  text-align:center;
}
</style>
