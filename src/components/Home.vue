<template lang="pug">
  div(id="home",class="home") hello
    router-link(to="/helloLink") hello-link2
    router-view
    Table(:columns="columns2",:data="musiclist")
</template>

<script>
  export default{
    name: 'home',
    data () {
     return {
       columns2: [
         {
           type: 'index',
           align: 'center'
         },
         {
           title: '歌名',
           key: 'name'
         },
         {
           title: 'id',
           key: 'songid'
         },
         {
           title: '歌手',
           key: 'singer'
         }
       ],
       dataList2: []
     }
    },
    props: {
      musiclist: {
        type: Array
      }
    }
  }
</script>

<style>
  .home{
    text-align: center;
  }
</style>
