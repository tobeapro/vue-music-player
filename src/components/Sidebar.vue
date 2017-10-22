<template lang="pug">
  div(class="sidebar" v-show="sideStatus")
    div(class="sidebar-mask",@click="hideSide")
    div(class="sidebar-content")
</template>

<script>
  export default{
    name: 'sidebar',
    data () {
      return {
        sideStatus: false
      }
    },
    methods: {
      hideSide () {
        this.sideStatus = false
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
      width:280px;
      z-index:11;
      background:#fff;
      overflow-y:auto;
    }
  }
</style>
