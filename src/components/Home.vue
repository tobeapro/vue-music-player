<template lang="pug">
  div(id="home",class="home") hello
    router-link(to="/helloLink") hello-link2
    router-view
</template>

<script>

</script>

<style>
  .home{
    text-align: center;
  }
</style>
