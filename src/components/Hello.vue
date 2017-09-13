<template>
  <div id="hello" class="hello">
     hello
    <router-link to="/helloLink">hello-link</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  Vue.use(VueRouter)
  const helloAgain = {template: '<div>hello again</div>'}
  export default new VueRouter({
    routes: [
      { path: '/helloLink', component: helloAgain }
    ]
  })
</script>

<style>
  .hello{
    text-align: center;
  }
</style>
