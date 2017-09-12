<template>
  <div class="tab">
      <div class="tab-item">
        <router-link to="/index">首页</router-link>
      </div>
      <div class="tab-item">
        详情
      </div>
      <div class="tab-item">
        其他
      </div>
       <router-view></router-view>
  </div>
</template>

<script>
  import detail from './detail'
  import Vue from 'vue'
  import vueRouter from 'vue-router'
  Vue.use(vueRouter)
export default {
  name: 'hello',
  components: { detail }
}
const routes = [
  { path: '/detail', component: detail }
]
const router = new vueRouter ({
   'routes': routes
})
</script>

<style>
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
