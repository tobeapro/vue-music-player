<template lang="pug">
  div(class="music-info",v-show="musicInfoStatus")
    div(class="music-detail")
      i(class="fa fa-arrow-left fa-2x")
      span(class="music-name")
      span(class="music-singer")
</template>
<script>
  export default {
    name: 'musicInfo',
    computed: {
      musicInfoStatus () {
        return this.$store.state.audio.musicInfoStatus
      }
    }
  }
</script>
<style lang="scss">
</style>
